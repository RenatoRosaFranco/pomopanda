import { verifyToken } from "@/utils/auth";

export async function authenticate(request) {
  const authHeader = request.headers.get('authorization');

  if (!authHeader || authHeader.startsWith('Bearer ')) {
    throw new Error('Token não fornecido');
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verifyToken(token);
    return decoded;
  } catch (error) {
    throw new Error('Token inválido');
  }
}
