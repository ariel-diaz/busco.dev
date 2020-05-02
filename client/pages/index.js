import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useUser } from '../contexts/user';
import Container from '../components/Container';
import Login from '../components/LoginComponent';


const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const WrapperText = styled.div`

`

const WrapperLogin = styled.div`
`

export default function Index() {
  const { user, loading } = useUser();
  const router = useRouter();

  // useEffect(() => {
  //   if (!user && !loading) {
  //     router.push('/login');
  //   }
  // }, [loading]);

  if (loading) {
    return <div> Loading ... </div>;
  }

    return (
      <Container>
        <Wrapper>
          <WrapperText>
          <h1> Bienvenido {user && user.name} </h1>
          <p> POSTULATE, Hace que te encuentren!</p>
          <Link href="/profile">
            <a>COMPLETAR</a>
          </Link>
          <Link href="/list">
            <a>Ver listado</a>
          </Link>
          </WrapperText>

          <WrapperLogin>
            <Login />
          </WrapperLogin>
        </Wrapper>
      </Container>
    );
}
