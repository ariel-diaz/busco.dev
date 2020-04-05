import React, { useState } from 'react';
import axios from 'axios';
import useSWR from 'swr';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import api from '../utils/api';
import Card from '../components/Card';
import Container from '../components/Container';
import SelectCities from '../components/SelectCities';
import SelectMultiple from '../components/SelectMultiple';
import Input from '../components/Input';
import Button from '../components/Button';

const ListContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 24px;
`;

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(5, 180px);
  grid-gap: 12px;
`;

const Wrapper = styled.div`
  display: grid;
  margin: 0px 24px;

  grid-gap: 24px;

  width: calc(100% - 48px);
  grid-template-columns: 1fr 3fr;
`;
const FiltersContainer = styled.form`
  display: flex;
  flex-direction: column;
`;

const LabelFilter = styled.label`
  display: flex;
  flex-direction: column;
  max-width: 250px;
  margin-bottom: 12px;
`;

const ButtonFilter = styled.button`
  padding: 8px;
  max-width: 240px;
  background: none;
  margin-top: 24px;
  margin-bottom: 24px;
`;

const fetcher = url => axios.get(url).then(({ data }) => data.payload);

const Filters = ({ filterList }) => {
  const { handleSubmit, register } = useForm();
  const { data: cities, error: errorCities, loading: loadingCities } = useSWR(
    api.cities,
    fetcher
  );
  const { data: skills, error: errorSkills, loading: loadingSkills } = useSWR(
    api.skills,
    fetcher
  );
  const [skillsSelected, setSkillsSelected] = useState([]);

  const onSubmit = filters => {
    const cleanFilters = Object.fromEntries(
      Object.entries(filters).filter(([key, value]) => value)
    );
    if (skillsSelected.length > 0) {
      cleanFilters.skills = skillsSelected;
    }
    filterList(cleanFilters);
  };

  return (
    <FiltersContainer onSubmit={handleSubmit(onSubmit)}>
      <h1>Filtros </h1>

      <ButtonFilter type="submit"> Aplicar filtros </ButtonFilter>

      <LabelFilter>
        Con Github
        <Input name="github" type="checkbox" ref={register} />
      </LabelFilter>

      <LabelFilter>
        Con Linkedin
        <Input name="linkedin" type="checkbox" ref={register} />
      </LabelFilter>

      <LabelFilter>
        Con Portfolio
        <Input name="portfolio" type="checkbox" ref={register} />
      </LabelFilter>

      <LabelFilter>
        Con Experiencia
        <Input name="experience" type="checkbox" ref={register} />
      </LabelFilter>

      <LabelFilter>
        Nivel de ingles
        <select name="english" ref={register}>
          <option value="">Todos</option>
          <option value="BASIC">Básico</option>
          <option value="INTERMEDIATE">Intermedio</option>
          <option value="ADVANCE">Avanzado</option>
        </select>
      </LabelFilter>

      <LabelFilter>
        Ciudad
        <SelectCities
          name="city"
          cities={cities}
          defaultValue=""
          ref={register}
          isFilter
        />
      </LabelFilter>

      <LabelFilter>
        Tecnologias
        <SelectMultiple
          list={skills}
          addedList={skillsSelected}
          setAddedList={setSkillsSelected}
        />
      </LabelFilter>
    </FiltersContainer>
  );
};

export default function List({ firstList }) {
  const [list, setList] = useState(firstList);
  const [loadingFilters, setLoadingFilters] = useState(false);
  const filterList = async filters => {
    try {
      setLoadingFilters(true);
      console.log('filters', filters);

      const params = Object.entries(filters)
        .map(([key, val]) => `${key}=${val}`)
        .join('&');
      const response = await axios.get(`${api.list}?${params}`);

      setList(response.data.payload);
    } catch (error) {
      console.log('Error', error);
    } finally {
      setLoadingFilters(false);
    }
  };

  return (
    <Container>
      <Wrapper>
        <Filters filterList={filterList} />
        <ListContainer>
          <h1> Desarrolladores </h1>
          <CardsContainer>
            {loadingFilters && <div> Loading... </div>}
            {!loadingFilters && list.length === 0 && (
              <div> No hay resultados para esta busqueda</div>
            )}
            {!loadingFilters &&
              list &&
              list.map(user => <Card key={user._id} {...user} />)}
          </CardsContainer>
        </ListContainer>
      </Wrapper>
    </Container>
  );
}

List.getInitialProps = async () => {
  const response = await axios.get(api.list);
  return {
    firstList: response.data.payload,
  };
};
