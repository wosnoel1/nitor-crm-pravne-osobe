
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

    // Get basic stats
    const [totalLeads, convertedLeads, leadsWithValue] = await Promise.all([
      prisma.lead.count({ where: whereClause }),
      prisma.lead.count({ 
        where: { 
          ...whereClause, 
          convertedAt: { not: null } 
        } 
      }),
      prisma.lead.findMany({
        where: {
          ...whereClause,
          value: { not: null }
        },
        select: {
          value: true,
          convertedAt: true,
        },
      }),
    ]);

    // Calculate values
    const totalValue = leadsWithValue.reduce((sum, lead) => 
      sum + (lead.value ? Number(lead.value) : 0), 0);
    
    const convertedValue = leadsWithValue
      .filter(lead => lead.convertedAt)
      .reduce((sum, lead) => sum + (lead.value ? Number(lead.value) : 0), 0);

    const conversionRate = totalLeads > 0 ? (convertedLeads / totalLeads) * 100 : 0;
    const activeLeads = totalLeads - convertedLeads;

    // Monthly growth calculation (simplified for Faza 1)
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);

    const lastMonthLeads = await prisma.lead.count({
      where: {
        ...whereClause,
        createdAt: { gte: lastMonth },
      },
    });

    const monthlyGrowth = {
      leads: totalLeads > 0 ? ((lastMonthLeads / totalLeads) * 100) : 0,
      revenue: 15.2, // Placeholder
      conversion: 8.5, // Placeholder
    };

    const stats = {
      totalLeads,
      convertedLeads,
      conversionRate,
      totalValue,
      convertedValue,
      activeLeads,
      monthlyGrowth,
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Dashboard stats error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' }, 
      { status: 500 }
    );
  }
}
