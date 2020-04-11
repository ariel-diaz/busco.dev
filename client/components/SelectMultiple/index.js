import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import useOnClickOutside from '../../utils/hooks/useOnClickOutside';

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

const SelectMultiple = ({ list, setAddedList, addedList }) => {
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

    setResults('');
    setTerm('');

    setAddedList(newAddedList);
  };

  const removeItem = text => {
    const newAddedList = [...addedList].filter(item => item !== text);
    setAddedList(newAddedList);
  };

  return (
    <SelectMultipleContainer ref={ref}>
      <InputSearch
        type="search"
        name="search"
        onChange={handleChange}
        autoComplete="off"
        value={term}
      />
      {term && term.length > 0 && (
        <ResultSearch>
          {results.length === 0 && (
            <span> No hay resultados para esta busqueda.</span>
          )}
          {results.map((text, i) => (
            <ResultItem
              key={`${i}-${text}`}
              type="button"
              onClick={() => addItem(text)}
            >
              {text}
            </ResultItem>
          ))}
        </ResultSearch>
      )}
      <SelectItems>
        {addedList.map(text => (
          <Item key={text} type="button" onClick={() => removeItem(text)}>
            {text}
          </Item>
        ))}
      </SelectItems>
    </SelectMultipleContainer>
  );
};

export default SelectMultiple;
