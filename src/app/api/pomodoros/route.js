import prisma from "@/lib/prisma";
import { authenticate } from "@/middleware/auth";

export async function POST(request) {
  try {
    const userData = await authenticate(request);
    const { duration } = await request.json();

    if (!duration || duration <= 0) {
      return new Response(
        JSON.stringify(
          { error: 'Duração inválida'},
          { status: 400 }
        )
      );
    }

    const pomodoro = await prisma.pomodoro.create({
      data: {
        userId: userData.userId,
        duration: duration
      }
    });

    return new Response(
      JSON.stringify(
        { success: true, pomodoro },
        { status: 201 }
      )
    );
  } catch(error ){
    return new Response(
      JSON.stringify(
        { error: error.message },
        { status: 401 }
      )
    );
  }
}
