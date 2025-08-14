
import { PrismaClient, Role, Priority, ActivityType, AuditAction } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Clear existing data in development
  console.log('Cleaning up existing data...');
  await prisma.auditLog.deleteMany({});
  await prisma.processActivity.deleteMany({});
  await prisma.document.deleteMany({});
  await prisma.lead.deleteMany({});
  await prisma.agent.deleteMany({});
  await prisma.leadStatus.deleteMany({});
  await prisma.leadSource.deleteMany({});

  console.log('Creating lead sources...');
  // Create Lead Sources
  const sources = await Promise.all([
    prisma.leadSource.create({
      data: {
        name: 'Web stranica',
        color: '#3B82F6',
        isActive: true,
      },
    }),
    prisma.leadSource.create({
      data: {
        name: 'Društvene mreže',
        color: '#EF4444',
        isActive: true,
      },
    }),
    prisma.leadSource.create({
      data: {
        name: 'Email kampanja',
        color: '#10B981',
        isActive: true,
      },
    }),
    prisma.leadSource.create({
      data: {
        name: 'Preporuka',
        color: '#F59E0B',
        isActive: true,
      },
    }),
    prisma.leadSource.create({
      data: {
        name: 'Telefonski poziv',
        color: '#8B5CF6',
        isActive: true,
      },
    }),
    prisma.leadSource.create({
      data: {
        name: 'Sajam/Događaj',
        color: '#06B6D4',
        isActive: true,
      },
    }),
  ]);

  console.log('Creating lead statuses...');
  // Create Lead Statuses
  const statuses = await Promise.all([
    prisma.leadStatus.create({
      data: {
        name: 'Novi lead',
        color: '#6B7280',
        order: 1,
        isActive: true,
        isFinal: false,
      },
    }),
    prisma.leadStatus.create({
      data: {
        name: 'Kontaktiran',
        color: '#3B82F6',
        order: 2,
        isActive: true,
        isFinal: false,
      },
    }),
    prisma.leadStatus.create({
      data: {
        name: 'Kvalificiran',
        color: '#10B981',
        order: 3,
        isActive: true,
        isFinal: false,
      },
    }),
    prisma.leadStatus.create({
      data: {
        name: 'Prezentacija',
        color: '#F59E0B',
        order: 4,
        isActive: true,
        isFinal: false,
      },
    }),
    prisma.leadStatus.create({
      data: {
        name: 'Pregovaranje',
        color: '#EF4444',
        order: 5,
        isActive: true,
        isFinal: false,
      },
    }),
    prisma.leadStatus.create({
      data: {
        name: 'Zatvoreno - Uspješno',
        color: '#059669',
        order: 6,
        isActive: true,
        isFinal: true,
      },
    }),
    prisma.leadStatus.create({
      data: {
        name: 'Zatvoreno - Neuspješno',
        color: '#DC2626',
        order: 7,
        isActive: true,
        isFinal: true,
      },
    }),
  ]);

  console.log('Creating agents...');
  // Create Agents with agent codes
  const agents = await Promise.all([
    // Admin
    prisma.agent.create({
      data: {
        agentCode: 'AD001',
        firstName: 'Ana',
        lastName: 'Marković',
        email: 'ana.markovic@nitor.com',
        role: Role.ADMIN,
        isActive: true,
      },
    }),
    // Manager
    prisma.agent.create({
      data: {
        agentCode: 'MG001',
        firstName: 'Marko',
        lastName: 'Petrov',
        email: 'marko.petrov@nitor.com',
        role: Role.MANAGER,
        isActive: true,
      },
    }),
    // Agents
    prisma.agent.create({
      data: {
        agentCode: 'AG001',
        firstName: 'Petra',
        lastName: 'Novak',
        email: 'petra.novak@nitor.com',
        role: Role.AGENT,
        isActive: true,
      },
    }),
    prisma.agent.create({
      data: {
        agentCode: 'AG002',
        firstName: 'Nikola',
        lastName: 'Jovanović',
        email: 'nikola.jovanovic@nitor.com',
        role: Role.AGENT,
        isActive: true,
      },
    }),
    prisma.agent.create({
      data: {
        agentCode: 'AG003',
        firstName: 'Sara',
        lastName: 'Babić',
        email: 'sara.babic@nitor.com',
        role: Role.AGENT,
        isActive: true,
      },
    }),
  ]);

  console.log('Creating sample leads...');
  // Create sample leads
  const sampleLeads = await Promise.all([
    prisma.lead.create({
      data: {
        firstName: 'Milan',
        lastName: 'Stojanović',
        email: 'milan.stojanovic@example.com',
        phone: '+385 99 123 4567',
        company: 'Tech Solutions d.o.o.',
        position: 'IT Manager',
        sourceId: sources[0].id, // Web stranica
        statusId: statuses[1].id, // Kontaktiran
        priority: Priority.HIGH,
        value: 15000,
        notes: 'Zainteresiran za ERP sustav, traži ponudu do kraja mjeseca.',
        agentId: agents[2].id, // AG001
      },
    }),
    prisma.lead.create({
      data: {
        firstName: 'Iva',
        lastName: 'Horvat',
        email: 'iva.horvat@example.com',
        phone: '+385 98 765 4321',
        company: 'Marketing Pro',
        position: 'CEO',
        sourceId: sources[1].id, // Društvene mreže
        statusId: statuses[2].id, // Kvalificiran
        priority: Priority.MEDIUM,
        value: 8500,
        notes: 'Traži CRM sustav za malu tvrtku, budžet ograničen.',
        agentId: agents[3].id, // AG002
      },
    }),
    prisma.lead.create({
      data: {
        firstName: 'Tomislav',
        lastName: 'Knežević',
        email: 'tomislav.knezevic@example.com',
        phone: '+385 91 555 6666',
        company: 'Consulting Group',
        position: 'Partner',
        sourceId: sources[3].id, // Preporuka
        statusId: statuses[5].id, // Zatvoreno - Uspješno
        priority: Priority.HIGH,
        value: 25000,
        notes: 'Uspješno zatvorena prodaja kompletnog CRM sustava.',
        agentId: agents[2].id, // AG001
        convertedAt: new Date('2024-01-15'),
      },
    }),
  ]);

  console.log('Creating sample activities...');
  // Create sample process activities
  await Promise.all([
    prisma.processActivity.create({
      data: {
        type: ActivityType.CALL,
        title: 'Inicijalni poziv',
        description: 'Predstavljen NITOR CRM, dogovoren meeting za sljedeći tjedan.',
        leadId: sampleLeads[0].id,
        agentId: agents[2].id,
        completedAt: new Date('2024-01-10'),
      },
    }),
    prisma.processActivity.create({
      data: {
        type: ActivityType.EMAIL,
        title: 'Poslana ponuda',
        description: 'Poslana detaljana ponuda s cijenama i specifikacijama.',
        leadId: sampleLeads[1].id,
        agentId: agents[3].id,
        completedAt: new Date('2024-01-12'),
      },
    }),
    prisma.processActivity.create({
      data: {
        type: ActivityType.FOLLOW_UP,
        title: 'Praćenje ponude',
        description: 'Potrebno pratiti odgovor na poslanu ponudu.',
        leadId: sampleLeads[0].id,
        agentId: agents[2].id,
        scheduledAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // Za 3 dana
      },
    }),
  ]);

  console.log('✅ Database seeded successfully!');
  console.log('\n📋 Sample Agent Codes:');
  console.log('Admin: AD001 (Ana Marković)');
  console.log('Manager: MG001 (Marko Petrov)');
  console.log('Agents: AG001 (Petra Novak), AG002 (Nikola Jovanović), AG003 (Sara Babić)');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
