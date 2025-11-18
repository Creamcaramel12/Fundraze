import { CampaignCard } from '@/components/CampaignCard';
import { prisma } from '@/lib/prisma';

export default async function Home() {
  const campaigns = await prisma.campaign.findMany({
    include: { user: { select: { name: true } } },
    orderBy: { raised: 'desc' },
    take: 6,
  });

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8">Discover Campaigns</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.map((campaign) => (
          <CampaignCard key={campaign.id} campaign={campaign} />
        ))}
      </div>
    </main>
  );
}
