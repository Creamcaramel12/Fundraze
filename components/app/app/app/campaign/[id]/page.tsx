'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { PayPalButton } from '@/components/PayPalButton';
import { CampaignCard } from '@/components/CampaignCard'; // Reuse for display
import { prisma } from '@/lib/prisma'; // Server component for fetch

// Make this a server component for initial data
export default async function CampaignPage({ params }: { params: { id: string } }) {
  const campaign = await prisma.campaign.findUnique({
    where: { id: params.id },
    include: { user: true, donations: true },
  });

  if (!campaign) return <div>Campaign not found</div>;

  const [donationAmount, setDonationAmount] = useState(10);

  const handleDonationSuccess = () => {
    // Refresh page or update state
    window.location.reload();
  };

  return (
    <div className="container mx-auto p-4">
      <CampaignCard campaign={campaign} />
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Support This Campaign</h2>
        <input
          type="number"
          value={donationAmount}
          onChange={(e) => setDonationAmount(parseFloat(e.target.value))}
          className="border p-2 mr-2"
        />
        <PayPalButton amount={donationAmount} campaignId={campaign.id} onSuccess={handleDonationSuccess} />
      </div>
    </div>
  );
}
