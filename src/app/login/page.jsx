'use client';

import React, { useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/contexts/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' }
    });

    const data = await res.json();

    if (res.ok) {
      const userInfo = await fetch('/api/me', {
        headers: { Authorization: `Bearer ${data.token}` }
      });

      const user = await userInfo.json();

      login(user, data.token);
      router.push('/');
    } else {
      alert(data.error || 'Erro ao logar');
    }
  };

  return(
    <div className="container mt-5">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input className="form-control mb-2" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <input className="form-control mb-2" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Senha" required />
        <button className="btn btn-primary" type="submit">Entrar</button>
      </form>
    </div>
  );
}
