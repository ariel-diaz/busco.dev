import React, { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useUser } from '../contexts/user';
import Button from '../components/Button';
import Input from '../components/Input';
import Container from '../components/Container';
import LocalStorageService from '../utils/localStorageService';
import api from '../utils/api';

const Title = styled.span``;

const Form = styled.form`
  display: grid;
  grid-template-columns: 300px;
  grid-gap: 24px;
  padding: 32px 0px 72px;
`;

const TextError = styled.span`
color:red
`
export default function Login() {
  const { signIn } = useUser();
  const { handleSubmit, register } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();

  const onSubmit = async ({ email, password }) => {
    try {
      setLoading(false);
      const status = await signIn(email, password);
  
      if (status > 200) {
        alert('Error AL LOGUEAR');
      }
      router.push('/');
    } catch (error) {
        setError(true)
    }
  };

  React.useEffect(() => {
    const localStorageService = LocalStorageService.getService();
    window.localStorage.removeItem('user');
    localStorageService.clearToken();
  }, []);

  return (
    <Container>
      <Title>Iniciar sesion</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input name="email" type="text" placeholder="Email" ref={register} />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          ref={register}
        />
        <Button type="submit" disabled={loading}>
          Iniciar sesion
        </Button>
        {error && <TextError> Email o contraseña no existe </TextError>}
      </Form>
      <Link href="/register">
        <a>Crear una cuenta</a>
      </Link>
      <br />
      
      <Link href={api.authGithub}>
        <a>Iniciar sesion o crear cuenta con Github</a>
      </Link>
    </Container>
  );
}
