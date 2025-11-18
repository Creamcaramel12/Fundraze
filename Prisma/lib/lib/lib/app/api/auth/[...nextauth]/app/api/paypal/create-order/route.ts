import { NextRequest, NextResponse } from 'next/server';
import { paypalClient } from '@/lib/paypal';

export async function POST(req: NextRequest) {
  const { amount, campaignId } = await req.json();

  const request = new paypal.orders.OrdersCreateRequest();
  request.prefer("return=representation");
  request.requestBody({
    intent: 'CAPTURE',
    purchase_units: [{
      amount: {
        currency_code: 'USD',
        value: amount.toFixed(2),
      },
      description: `Donation to ${campaignId}`,
    }],
  });

  try {
    const order = await paypalClient.execute(request);
    return NextResponse.json({ id: order.result.id });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}
