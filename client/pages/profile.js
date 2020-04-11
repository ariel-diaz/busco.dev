import React, { useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import useSWR from 'swr';
import axios from '../utils/axios';
import Link from 'next/link';
import api from '../utils/api';
import { useUser } from '../contexts/user';
import SelectMultiple from '../components/SelectMultiple';
import Container from '../components/Container';
import Button from '../components/Button';
import SelectCities from '../components/SelectCities';

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 14px;
  width: 300px;
  padding: 24px;
`;
const Label = styled.label`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 12px;
`;

const WrapperSuccess = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export default function Profile() {
  const { register, handleSubmit } = useForm();
  const [success, setSuccess] = useState(false);
  const {
    data: cities,
    error: errorCities,
    loading: loadingCities,
  } = useSWR(api.cities, url =>
    axios.get(url).then(({ data }) => data.payload)
    );
    const {
      data: skills,
      error: errorSkills,
      loading: loadingSkills,
    } = useSWR(api.skills, url =>
      axios.get(url).then(({ data }) => data.payload)
      );
      const { user, updateUser, loading } = useUser();
      const [skillsSelected, setSkillsSelected] = useState([]);
      
      React.useEffect(() => {
          if(user && !loading) setSkillsSelected(user.skills)
      }, [user])

  const onSubmit = async data => {
    try {
      const profileData = {
        _id: user._id,
        ...data,
        skills: [...skillsSelected],
      };
      const res = await updateUser(profileData);
      setSuccess(true);
    } catch(e) {
      
    }
  };

  if (loading || loadingCities || loadingSkills || !user) {
    return <div> Loading ...</div>;
  }

  if(success) {
    return <WrapperSuccess>
      <h3> Actualizaste tu perfil!!!</h3>
  
      <Button onClick={() => setSuccess(false)}>
          Volver a editar
      </Button>
      <Link href="/"><a>Ir a la home</a></Link>
    </WrapperSuccess>
  }

    return (
    <Container>
      <h1> Hola {user.name}, completa tu perfil! </h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Label>
          Skills
          <SelectMultiple
            defaultValue={user.skills}
            list={skills}
            addedList={skillsSelected}
            setAddedList={setSkillsSelected}
          />
        </Label>
        <Label>
          De donde sos?
          <SelectCities
            name="city"
            cities={cities}
            defaultValue={user && user.city}
            ref={register}
          />
        </Label>
        <Label>
          Nivel de ingles
          <select
            name="english"
            ref={register}
            defaultValue={user && user.english}
          >
            <option value="BASIC">Básico</option>
            <option value="INTERMEDIATE">Intermedio</option>
            <option value="ADVANCE">Avanzado</option>
          </select>
        </Label>
        <Label>
          Portfolio
          <input
            type="text"
            name="portfolio"
            ref={register}
            defaultValue={user && user.portfolio}
          />
        </Label>
        <Label>
          Linkedin
          <input
            type="text"
            name="linkedin"
            ref={register}
            defaultValue={user && user.linkedin}
          />
        </Label>
        <Label>
          Github
          <input
            type="text"
            name="github"
            ref={register}
            defaultValue={user && user.github}
          />
        </Label>
        <Label>
          Tenes experiencia?
          <input
            type="checkbox"
            name="experience"
            ref={register}
            defaultChecked={user && user.experience}
          />
        </Label>
        <Button type="submit"> Actualizar perfil </Button>
      </Form>

      <Link href="/">
        <a> Volver a la home </a>
      </Link>
    </Container>
  );
}
