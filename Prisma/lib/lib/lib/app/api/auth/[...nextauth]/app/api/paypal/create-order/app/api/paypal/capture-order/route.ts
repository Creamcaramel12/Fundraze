import { NextRequest, NextResponse } from 'next/server';
import { paypalClient } from '@/lib/paypal';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  const { orderID, campaignId } = await req.json();

  const request = new paypal.orders.OrdersCaptureRequest(orderID);
  request.requestBody({});

  try {
    const capture = await paypalClient.execute(request);
    const captureData = capture.result.purchase_units[0].payments.captures[0];

    await prisma.donation.create({
      data: {
        amount: parseFloat(captureData.amount.value),
        campaignId,
        payerEmail: capture.result.payer.email_address,
        paypalOrderId: orderID,
      },
    });

    await prisma.campaign.update({
      where: { id: campaignId },
      data: { raised: { increment: parseFloat(captureData.amount.value) } },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Payment failed' }, { status: 500 });
  }
              }
