
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from './db';
import { AuthAgent } from './types';
import { Role } from '@prisma/client';

declare module 'next-auth' {
  interface Session {
    user: AuthAgent;
  }
  interface User extends AuthAgent {}
}

declare module 'next-auth/jwt' {
  interface JWT extends AuthAgent {}
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'agent-code',
      name: 'Agent Code',
      credentials: {
        agentCode: { 
          label: 'Agent Code', 
          type: 'text', 
          placeholder: 'AG001, MG001, AD001...' 
        },
      },
      async authorize(credentials) {
        if (!credentials?.agentCode) {
          throw new Error('Agent code je obavezan');
        }

        try {
          // Find agent by agent code
          const agent = await prisma.agent.findUnique({
            where: {
              agentCode: credentials.agentCode.toUpperCase(),
            },
          });

          if (!agent) {
            throw new Error('Neispravni agent kod');
          }

          if (!agent.isActive) {
            throw new Error('Agent račun nije aktivan');
          }

          // Update last login
          await prisma.agent.update({
            where: { id: agent.id },
            data: { lastLogin: new Date() },
          });

          // Log login activity
          await prisma.auditLog.create({
            data: {
              tableName: 'agents',
              recordId: agent.id,
              action: 'LOGIN',
              newValues: { agentCode: agent.agentCode },
              agentId: agent.id,
            },
          });

          return {
            id: agent.id,
            agentCode: agent.agentCode,
            firstName: agent.firstName,
            lastName: agent.lastName,
            email: agent.email,
            role: agent.role,
            isActive: agent.isActive,
          };
        } catch (error) {
          console.error('Auth error:', error);
          throw error;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.agentCode = user.agentCode;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.email = user.email;
        token.role = user.role;
        token.isActive = user.isActive;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id as string,
          agentCode: token.agentCode as string,
          firstName: token.firstName as string,
          lastName: token.lastName as string,
          email: token.email as string,
          role: token.role as any,
          isActive: token.isActive as boolean,
        };
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 8 * 60 * 60, // 8 hours
  },
  secret: process.env.NEXTAUTH_SECRET,
};
