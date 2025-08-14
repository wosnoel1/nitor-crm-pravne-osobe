
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { canViewAllLeads } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { user } = session;
    const canViewAll = canViewAllLeads(user.role);
    
    // Parse query parameters
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = parseInt(searchParams.get('offset') || '0');
    const recent = searchParams.get('recent') === 'true';
    
    // Build query based on permissions
    const whereClause = canViewAll ? {} : { agentId: user.id };
    
    // Build order clause
    const orderBy = recent 
      ? { createdAt: 'desc' as const }
      : { updatedAt: 'desc' as const };

    const [leads, totalCount] = await Promise.all([
      prisma.lead.findMany({
        where: whereClause,
        include: {
          agent: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              agentCode: true,
            },
          },
          source: {
            select: {
              id: true,
              name: true,
              color: true,
            },
          },
          status: {
            select: {
              id: true,
              name: true,
              color: true,
              isFinal: true,
            },
          },
          _count: {
            select: {
              documents: true,
              processActivities: true,
            },
          },
        },
        orderBy,
        take: limit,
        skip: offset,
      }),
      prisma.lead.count({ where: whereClause }),
    ]);

    return NextResponse.json({
      leads,
      totalCount,
      hasMore: offset + limit < totalCount,
    });
  } catch (error) {
    console.error('Leads API error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' }, 
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { user } = session;
    
    // Create lead
    const lead = await prisma.lead.create({
      data: {
        ...body,
        agentId: user.id,
      },
      include: {
        agent: true,
        source: true,
        status: true,
      },
    });

    // Log creation activity
    await prisma.auditLog.create({
      data: {
        tableName: 'leads',
        recordId: lead.id,
        action: 'CREATE',
        newValues: body,
        agentId: user.id,
      },
    });

    return NextResponse.json({ lead }, { status: 201 });
  } catch (error) {
    console.error('Create lead error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' }, 
      { status: 500 }
    );
  }
}
