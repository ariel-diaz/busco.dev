import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useUser } from '../contexts/user';
import Container from '../components/Container';

export default function Index() {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, []);

  if (!user) {
    return <div> Loading ... </div>;
  }

  return (
    <Container>
      <h1> Bienvenido {user && user.name} </h1>
      <p>Completa tu perfil</p>
      <Link href="/profile">
        <a>COMPLETAR</a>
      </Link>

      <hr />

      <Link href="/list">
        <a>Ver listado</a>
      </Link>
    </Container>
  );
}
