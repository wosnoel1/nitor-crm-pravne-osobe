
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { canViewAllLeads } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { user } = session;
    const canViewAll = canViewAllLeads(user.role);

    // Build query based on permissions
    const whereClause = canViewAll ? {} : { agentId: user.id };

    // Get last 30 days data (simplified for Faza 1)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const leads = await prisma.lead.findMany({
      where: {
        ...whereClause,
        createdAt: { gte: thirtyDaysAgo },
      },
      select: {
        createdAt: true,
        convertedAt: true,
        value: true,
      },
      orderBy: { createdAt: 'asc' },
    });

    // Generate weekly aggregation for the chart
    const weeks: string[] = [];
    const weeklyData = { 
      leads: [] as number[], 
      conversions: [] as number[], 
      revenue: [] as number[] 
    };
    
    for (let i = 0; i < 4; i++) {
      const weekStart = new Date(thirtyDaysAgo);
      weekStart.setDate(weekStart.getDate() + (i * 7));
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekEnd.getDate() + 7);
      
      weeks.push(`Tjedan ${i + 1}`);
      
      const weekLeads = leads.filter(lead => 
        lead.createdAt >= weekStart && lead.createdAt < weekEnd
      );
      
      const weekConversions = weekLeads.filter(lead => lead.convertedAt);
      const weekRevenue = weekConversions.reduce((sum, lead) => 
        sum + (lead.value ? Number(lead.value) : 0), 0);
      
      weeklyData.leads.push(weekLeads.length);
      weeklyData.conversions.push(weekConversions.length);
      weeklyData.revenue.push(weekRevenue);
    }

    const chartData = {
      labels: weeks,
      datasets: weeklyData,
    };

    return NextResponse.json(chartData);
  } catch (error) {
    console.error('Performance chart error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' }, 
      { status: 500 }
    );
  }
}
