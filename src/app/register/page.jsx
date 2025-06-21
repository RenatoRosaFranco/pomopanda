'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' }
    });

    const data = await res.json();

    if (res.ok) {
      alert('Cadastro realizado! Faça o login.');
      router.push('/login');
    } else {
      alert(data.error || 'Erro no cadastro');
    }
  };

  return(
    <div className="container mt-5">
      <h2>Cadastro</h2>
      <form onSubmit={handleSubmit}>
        <input className="form-control mb-2" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <input className="form-control mb-2" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Senha" required />
        <button className="btn btn-success" type="submit">Cadastrar</button>
      </form>
    </div>
  );
}
