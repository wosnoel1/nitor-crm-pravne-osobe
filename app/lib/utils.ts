
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Role } from '@prisma/client';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Permission helpers
export function hasPermission(userRole: Role, requiredPermission: string): boolean {
  const permissions: Record<Role, string[]> = {
    ADMIN: ['delete_documents', 'view_all_leads', 'manage_agents', 'view_reports'],
    MANAGER: ['view_team_leads', 'view_reports', 'manage_team'],
    AGENT: ['view_own_leads', 'add_documents', 'edit_own_leads'],
  };

  return permissions[userRole]?.includes(requiredPermission) || false;
}

export function canDeleteDocuments(userRole: Role): boolean {
  return userRole === Role.ADMIN;
}

export function canViewAllLeads(userRole: Role): boolean {
  return userRole === Role.ADMIN || userRole === Role.MANAGER;
}

// Formatting helpers
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('hr-HR', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount);
}

export function formatDate(date: Date | string): string {
  const d = new Date(date);
  return new Intl.DateTimeFormat('hr-HR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(d);
}

export function formatDateTime(date: Date | string): string {
  const d = new Date(date);
  return new Intl.DateTimeFormat('hr-HR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(d);
}

// Agent code helpers
export function generateAgentCode(role: Role, sequence: number): string {
  const prefix = {
    ADMIN: 'AD',
    MANAGER: 'MG',
    AGENT: 'AG',
  };
  
  return `${prefix[role]}${sequence.toString().padStart(3, '0')}`;
}

export function getAgentFullName(firstName: string, lastName: string): string {
  return `${firstName} ${lastName}`;
}

export function getRoleDisplayName(role: Role): string {
  const roleNames = {
    ADMIN: 'Administrator',
    MANAGER: 'Manager',
    AGENT: 'Agent',
  };
  
  return roleNames[role];
}

// Status helpers
export function getStatusColor(statusName: string): string {
  const statusColors: Record<string, string> = {
    'Novi lead': 'bg-gray-100 text-gray-800',
    'Kontaktiran': 'bg-blue-100 text-blue-800',
    'Kvalificiran': 'bg-green-100 text-green-800',
    'Prezentacija': 'bg-yellow-100 text-yellow-800',
    'Pregovaranje': 'bg-orange-100 text-orange-800',
    'Zatvoreno - Uspješno': 'bg-emerald-100 text-emerald-800',
    'Zatvoreno - Neuspješno': 'bg-red-100 text-red-800',
  };
  
  return statusColors[statusName] || 'bg-gray-100 text-gray-800';
}

export function getPriorityColor(priority: string): string {
  const priorityColors: Record<string, string> = {
    LOW: 'bg-gray-100 text-gray-800',
    MEDIUM: 'bg-yellow-100 text-yellow-800',
    HIGH: 'bg-orange-100 text-orange-800',
    URGENT: 'bg-red-100 text-red-800',
  };
  
  return priorityColors[priority] || 'bg-gray-100 text-gray-800';
}

// Validation helpers
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePhone(phone: string): boolean {
  const phoneRegex = /^\+?[\d\s\-\(\)]+$/;
  return phoneRegex.test(phone);
}

export function validateAgentCode(agentCode: string): boolean {
  const agentCodeRegex = /^(AG|MG|AD)\d{3}$/;
  return agentCodeRegex.test(agentCode);
}

// Google Calendar integration placeholders
export function generateCalendarEventTitle(leadName: string, activityType: string): string {
  return `${activityType}: ${leadName}`;
}

export function generateCalendarEventDescription(lead: any, activity: any): string {
  return `Lead: ${lead.firstName} ${lead.lastName}\nTvrtka: ${lead.company || 'N/A'}\nEmail: ${lead.email || 'N/A'}\nTelefon: ${lead.phone || 'N/A'}\n\nNapomena: ${activity.description || 'Nema napomene'}`;
}
