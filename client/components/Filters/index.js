import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useSWR from 'swr';
import styled from 'styled-components';
import { fetcher } from '../../utils/functions';
import SelectCities from '../SelectCities';
import SelectMultiple from '../SelectMultiple';
import Input from '../Input';
import api from '../../utils/api';

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

export default Filters;
