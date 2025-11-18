'use client';

import { useSession } from 'next-auth/react';
import CreateCampaignForm from '@/components/CreateCampaignForm';

export default function Dashboard() {
  const { data: session } = useSession();

  if (!session) {
    return <div>Please sign in to access your dashboard.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Your Dashboard</h1>
      <CreateCampaignForm />
      {/* Add list of user's campaigns here */}
    </div>
  );
}
