
import { Agent, Lead, Document, ProcessActivity, LeadSource, LeadStatus, Role, Priority, ActivityType, AuditAction } from '@prisma/client';

// Re-export Prisma enums for use in other files
export { Role, Priority, ActivityType, AuditAction } from '@prisma/client';

// Extended types with relations
export type AgentWithRelations = Agent & {
  leads?: Lead[];
  documents?: Document[];
  processActivities?: ProcessActivity[];
  _count?: {
    leads: number;
    documents: number;
    processActivities: number;
  };
};

export type LeadWithRelations = Lead & {
  agent?: Agent;
  source?: LeadSource;
  status?: LeadStatus;
  documents?: Document[];
  processActivities?: ProcessActivity[];
  _count?: {
    documents: number;
    processActivities: number;
  };
};

export type ActivityWithRelations = ProcessActivity & {
  agent?: Agent;
  lead?: Lead;
};

// Dashboard statistics types
export interface DashboardStats {
  totalLeads: number;
  convertedLeads: number;
  conversionRate: number;
  totalValue: number;
  convertedValue: number;
  activeLeads: number;
}

export interface AgentPerformance {
  agentId: string;
  agentName: string;
  agentCode: string;
  totalLeads: number;
  convertedLeads: number;
  conversionRate: number;
  totalValue: number;
  convertedValue: number;
}

export interface SourceAnalysis {
  sourceId: string;
  sourceName: string;
  totalLeads: number;
  convertedLeads: number;
  conversionRate: number;
  color?: string;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Form types
export interface LoginForm {
  agentCode: string;
}

export interface LeadForm {
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  company?: string;
  position?: string;
  sourceId: string;
  statusId: string;
  priority: Priority;
  value?: number;
  notes?: string;
}

export interface ActivityForm {
  type: ActivityType;
  title: string;
  description?: string;
  leadId?: string;
  scheduledAt?: Date;
}

// Auth types
export interface AuthAgent {
  id: string;
  agentCode: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  isActive: boolean;
}

export interface AuthSession {
  user: AuthAgent;
  expires: string;
}

// Filter types
export interface LeadFilters {
  search?: string;
  statusId?: string;
  sourceId?: string;
  priority?: Priority;
  agentId?: string;
  dateFrom?: string;
  dateTo?: string;
  converted?: boolean;
}

// Calendar integration types (placeholder for Google Calendar)
export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  start: Date;
  end: Date;
  activityId?: string;
  leadId?: string;
}

export interface GoogleCalendarConfig {
  clientId?: string;
  clientSecret?: string;
  redirectUri?: string;
  accessToken?: string;
  refreshToken?: string;
}
