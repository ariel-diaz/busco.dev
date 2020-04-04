import React, { useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import useSWR from 'swr';
import axios from 'axios';
import api from '../utils/api';
import { useUser } from '../contexts/user';
import SelectMultiple from '../components/SelectMultiple'
import Link from 'next/link';

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


export default function Profile() {
  const { user, updateUser } = useUser();
  const { register, handleSubmit, watch, errors } = useForm();
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
  const [focus, setFocus] = useState(false);
  const [skillsSelected, setSkillsSelected] = useState(
    (user && user.profile && user.profile.skills) || []
  );

  const onSubmit = async data => {
    const profileData = {
      _id: user._id,
      ...data,
      skills: [...skillsSelected],
    };

    console.log('ProfileData', profileData);

    await updateUser(profileData);
  };

  if (!user || loadingCities || loadingSkills) {
    return <div> Loading ...</div>;
  }

  return (
    <>
      <h1> Hola {user.name}, completa tu perfil! </h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Label>
          Skills
          <SelectMultiple
            list={skills}
            focus={focus}
            addedList={skillsSelected}
            setAddedList={setSkillsSelected}
          />
        </Label>
        <Label>
          De donde sos?
          <select name="city" ref={register} defaultValue={user.profile && user.profile.city}>
            {cities &&
              cities.map(({ provincia, iso_31662 }) => (
                <option key={iso_31662} value={provincia}>
                  {provincia}
                </option>
              ))}
          </select>
        </Label>
        <Label>
          Nivel de ingles
          <select
            name="english"
            ref={register}
            defaultValue={user.profile && user.profile.english}
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
            name="porfolio"
            ref={register}
            defaultValue={user.profile  && user.profile.portfolio}
          />
        </Label>
        <Label>
          Linkedin
          <input
            type="text"
            name="linkedin"
            ref={register}
            defaultValue={user.profile && user.profile.linkedin}
          />
        </Label>
        <Label>
          Github
          <input
            type="text"
            name="github"
            ref={register}
            defaultValue={user.profile && user.profile.github}
          />
        </Label>
        <Label>
          Tenes experiencia?
          <input
            type="checkbox"
            name="experience"
            ref={register}
            defaultChecked={user.profile && user.profile.experience}
          />
        </Label>
        <input type="submit" value="Actualizar perfil" />
      </Form>


      <Link href="/">
        <a> Volver a la home </a>
      </Link>
    </>
  );
}
