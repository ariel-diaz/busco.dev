import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useUser } from '../contexts/user';

export default function Index() {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, []);

  return (
    <>
      <h1> Bienvenido {user && user.name} </h1>
      <p>
        {' '}
        Completa tu perfil{' '}
        <Link href="/profile">
          <a>COMPLETAR</a>
        </Link>
      </p>
    </>
  );
}
