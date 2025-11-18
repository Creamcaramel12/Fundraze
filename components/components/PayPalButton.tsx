'use client';

import { useEffect, useRef } from 'react';

interface PayPalButtonProps {
  amount: number;
  campaignId: string;
  onSuccess: () => void;
}

export default function PayPalButton({ amount, campaignId, onSuccess }: PayPalButtonProps) {
  const paypalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (paypalRef.current && typeof window !== 'undefined') {
      const script = document.createElement('script');
      script.src = 'https://www.paypal.com/sdk/js?client-id=' + process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID + '&currency=USD';
      script.onload = () => {
        // @ts-ignore
        window.paypal.Buttons({
          createOrder: async () => {
            const res = await fetch('/api/paypal/create-order', {
              method: 'POST',
              body: JSON.stringify({ amount, campaignId }),
            });
            const order = await res.json();
            return order.id;
          },
          onApprove: async (data: any) => {
            const res = await fetch('/api/paypal/capture-order', {
              method: 'POST',
              body: JSON.stringify({ orderID: data.orderID, campaignId }),
            });
            if (res.ok) {
              onSuccess();
            }
          },
        }).render(paypalRef.current);
      };
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [amount, campaignId, onSuccess]);

  return <div ref={paypalRef} />;
}
