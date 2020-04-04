import React, { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useUser } from '../contexts/user';
import Button from '../components/Button';
import Input from '../components/Input';
import Link from 'next/link';

const LoginContainer = styled.div`
  display: grid;
  grid-template-columns: 300px;
  grid-gap: 24px;
  padding: 24px;
`;

const Title = styled.span``;

export default function Login() {
  const { signIn, user } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const login = async () => {
    setLoading(false);
    const status = await signIn(email, password);

    if (status > 200) {
      alert('Error AL LOGUEAR');
    }
    router.push('/');
  };

  React.useEffect(() => {
    window.localStorage.removeItem('user');
    window.localStorage.removeItem('token');
  }, []);

  return (
    <LoginContainer>
      <Title>Iniciar sesion</Title>
      <Input
        type="text"
        placeholder="Email"
        onChange={({ target }) => setEmail(target.value)}
      />
      <Input
        type="password"
        placeholder="Password"
        onChange={({ target }) => setPassword(target.value)}
      />
      <Button type="button" onClick={login} disabled={loading}>
        Iniciar sesion
      </Button>
      <Link href="/register">Crear una cuenta </Link>
    </LoginContainer>
  );
}
