import prisma from '@/lib/prisma';
import { comparePassword, generateToken } from '@/utils/auth';

export async function POST(request) {
  const { email, password } = await request.json();

  const user = await prisma.user.findUnique({ where: { email }});

  if (!user) {
    return new Response(
      JSON.stringify(
        { error: 'Usuário não encontrado' },
        { status: 401 }
      )
    );
  }

  const isValid = await comparePassword(password, user.password);

  if (!isValid) {
    return new Response(
      JSON.stringify(
        { error: 'Senha incorreta' },
        { status: 401 }
      )
    );
  }

  const token = generateToken(user);

  return new Response(
    JSON.stringify(
      { token },
      { status: 200 }
    )
  );
}
