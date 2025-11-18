// Add this to the same file as GET, but for POST
export async function POST(req: NextRequest) {
  const { title, description, goal, image, endDate } = await req.json();
  const session = await getServerSession(authOptions); // Import from next-auth

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const campaign = await prisma.campaign.create({
    data: {
      title,
      description,
      goal,
      image,
      endDate: endDate ? new Date(endDate) : undefined,
      userId: session.user.id,
    },
  });

  return NextResponse.json(campaign);
}
