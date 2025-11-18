'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useSession } from 'next-auth/react';

export default function CreateCampaignForm() {
  const [formData, setFormData] = useState({ title: '', description: '', goal: 0 });
  const { data: session } = useSession();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) return;

    const res = await fetch('/api/campaigns', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      alert('Campaign created!');
      // Reset form or redirect
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <Input placeholder="Campaign Title" onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
      <Textarea placeholder="Description" onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
      <Input type="number" placeholder="Goal Amount" onChange={(e) => setFormData({ ...formData, goal: parseFloat(e.target.value) })} />
      <Button type="submit" disabled={!session}>Create Campaign</Button>
    </form>
  );
  }
