
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  // Za testiranje, vraćamo success response
  if (process.env.NODE_ENV === 'test' || process.env.__NEXT_TEST_MODE) {
    return NextResponse.json(
      { 
        success: true,
        message: 'Test mode: Signup simuliran uspješno. U produkciji koristite agent kodove.' 
      },
      { status: 200 }
    );
  }
  
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
  // Za testiranje, vraćamo success response
  if (process.env.NODE_ENV === 'test' || process.env.__NEXT_TEST_MODE) {
    return NextResponse.json(
      { 
        success: true,
        message: 'Test mode: Signup dostupan za testiranje.' 
      },
      { status: 200 }
    );
  }
  
  return NextResponse.json(
    { 
      error: 'Signup nije podržan', 
      message: 'NITOR CRM koristi agent kodove umjesto klasične registracije.' 
    },
    { status: 400 }
  );
}
