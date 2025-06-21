import prisma from "@/lib/prisma";
import { hashPassword } from '@/utils/auth';

export async function POST(request) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return new Response(
      JSON.stringify(
        { error: 'Email e senha são obrigatórios' },
        { status: 400 }
      )
    )
  }

  const existingUser = await prisma.user.findUnique({ where: email });

  if (existingUser) {
    return new Response(
      JSON.stringify(
        { error: 'Email já cadastrado' },
        { status: 400 }
      )
    );
  }

  const hashedPassword = await hashPassword(password);

  await prisma.user.create({
    email: {
      email,
      password: hashedPassword
    }
  });

  return new Response(
    JSON.stringify(
      { success: true },
      { status: 201 }
    )
  );
}
