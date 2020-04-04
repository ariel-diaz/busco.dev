import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import useSWR from 'swr';
import axios from 'axios';
import api from '../utils/api';
import { useUser } from '../contexts/user';
import useOnClickOutside from '../utils/hooks/useOnClickOutside';

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 14px;
  width: 300px;
  padding: 24px;
`;

const InputSearch = styled.input`
  width: 100%;
`;
const Item = styled.button`
  background: none;
  border: 1px solid red;
  padding: 8px;
  margin-right: 4px;
`;
const ResultSearch = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 12px;
  padding: 12px 0px;

  background: #ffffff;
  border: 1px solid black;

  position: absolute;
  width: 100%;
`;
const SelectMultipleContainer = styled.div`
  position: relative;
`;
const SelectItems = styled.div`
  display: flex;
  margin-top: 8px;
`;
const ResultItem = styled.button`
  padding: 4px;
  background: none;
  border: none;

  &:hover {
    background-color: red;
    color: white;
  }
`;

const Label = styled.label`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 12px;
`;

const SelectMultiple = ({ focus, list, setAddedList, addedList }) => {
  const [results, setResults] = useState([]);
  const [term, setTerm] = useState('');
  const ref = useRef(null);

  useOnClickOutside(ref, () => {
    setTerm('');
    setResults([]);
  });

  const handleChange = ({ target }) => {
    const term = target.value;
    const newResults = [...list].filter(
      item => !addedList.includes(item) && item.includes(term.toUpperCase())
    );
    setTerm(term);
    setResults(newResults);
  };

  const addItem = text => {
    const newAddedList = [...addedList, text];

    setResults([]);
    setTerm('');

    setAddedList(newAddedList);
  };

  const removeItem = text => {
    console.log('TEXT', text);
    const newAddedList = [...addedList].filter(item => item !== text);
    setAddedList(newAddedList);
  };

  return (
    <SelectMultipleContainer ref={ref}>
      <InputSearch type="search" name="search" onChange={handleChange} />
      {term && term.length > 0 && (
        <ResultSearch>
          {results.length === 0 && (
            <span> No hay resultados para esta busqueda.</span>
          )}
          {results.map(text => (
            <ResultItem type="button" onClick={() => addItem(text)}>
              {text}
            </ResultItem>
          ))}
        </ResultSearch>
      )}
      <SelectItems>
        {addedList.map(text => (
          <Item type="button" onClick={() => removeItem(text)}>
            {text}
          </Item>
        ))}
      </SelectItems>
    </SelectMultipleContainer>
  );
};

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
          <select name="city" ref={register} defaultValue={user.profile.city}>
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
            defaultValue={user.profile.english}
          >
            <option value="BASIC">Básico</option>
            <option value="INTERMEDIATE">Intermedio</option>
            <option value="ADVANCE">Avanzado</option>
          </select>
        </Label>
        <Label>
          {' '}
          Portfolio
          <input
            type="text"
            name="porfolio"
            ref={register}
            defaultValue={user.profile.portfolio}
          />
        </Label>
        <Label>
          {' '}
          Linkedin
          <input
            type="text"
            name="linkedin"
            ref={register}
            defaultValue={user.profile.linkedin}
          />
        </Label>
        <Label>
          Github
          <input
            type="text"
            name="github"
            ref={register}
            defaultValue={user.profile.github}
          />
        </Label>
        <Label>
          Tenes experiencia?
          <input
            type="checkbox"
            name="experience"
            ref={register}
            defaultChecked={user.profile.experience}
          />
        </Label>
        <input type="submit" value="Actualizar perfil" />
      </Form>
    </>
  );
}
