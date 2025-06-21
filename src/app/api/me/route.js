import prisma from "@/lib/prisma";
import { authenticate } from '@/middleware/auth';

export async function GET(request) {
  try {
    const userData = await authenticate(request);

    const user = await prisma.user.findUnique({
      where: { id: userData.userId },
      select: { id: true, email: true }
    });

    return new Response(
      JSON.stringify(user),
      { status: 200 }
    );
  } catch(error) {
    return new Response(
      JSON.stringify(
        { error: error.message },
        { status: 401 }
      )
    );
  }
}
