import React, { useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Button from '../components/Button';
import Input from '../components/Input';
import { useUser } from '../contexts/user';
import Container from '../components/Container';

const Form = styled.form`
  display: grid;
  grid-template-columns: 400px;
  grid-gap: 24px;
  padding: 32px 0px 72px;
`;

const TextError = styled.span`
  color: red;
`;

export default function Register() {
  const { handleSubmit, register } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();
  const { signUp } = useUser();

  const onSubmit = async data => {
    try {
      setLoading(true);
      await signUp(data);

      router.push('/');
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <h1> Unite a Busco.dev!</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input name="name" type="text" placeholder="Nombre" ref={register} />
        <Input name="email" type="text" placeholder="Email" ref={register} />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          ref={register}
        />
        <Button type="submit" disabled={loading}>
          Crear cuenta
        </Button>

        {error && <TextError> No se puede crear la cuenta.</TextError>}
      </Form>

      <Link href="/login">
        <a>Ya tengo cuenta</a>
      </Link>
    </Container>
  );
}
