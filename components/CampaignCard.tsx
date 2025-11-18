'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import Link from 'next/link';

interface Campaign {
  id: string;
  title: string;
  description: string;
  goal: number;
  raised: number;
  image?: string;
  user: { name: string };
}

export function CampaignCard({ campaign }: { campaign: Campaign }) {
  const progress = (campaign.raised / campaign.goal) * 100;

  return (
    <Link href={`/campaign/${campaign.id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        {campaign.image && (
          <Image src={campaign.image} alt={campaign.title} width={400} height={200} className="w-full h-48 object-cover" />
        )}
        <CardHeader>
          <CardTitle className="text-xl">{campaign.title}</CardTitle>
          <Badge variant="secondary">By {campaign.user.name}</Badge>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">{campaign.description}</p>
          <div className="space-y-2">
            <div className="flex justify-between text-sm font-medium">
              <span>${campaign.raised.toLocaleString()}</span>
              <span>of ${campaign.goal.toLocaleString()}</span>
            </div>
            <Progress value={progress} className="h-2" />
            <p className="text-xs text-gray-500">{Math.round(progress)}% funded</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
