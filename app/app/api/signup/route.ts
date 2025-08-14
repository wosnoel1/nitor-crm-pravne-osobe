
import { NextResponse } from 'next/server';

export async function POST() {
  // Signup nije podržan jer koristimo agent kodove
  return NextResponse.json(
    { 
      error: 'Signup nije podržan', 
      message: 'NITOR CRM koristi agent kodove umjesto klasične registracije. Molimo kontaktirajte administratora za dobivanje agent koda.' 
    },
    { status: 400 }
  );
}

export async function GET() {
  return NextResponse.json(
    { 
      error: 'Signup nije podržan', 
      message: 'NITOR CRM koristi agent kodove umjesto klasične registracije.' 
    },
    { status: 400 }
  );
}
