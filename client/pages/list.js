import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import api from '../utils/api';
import Card from '../components/Card';
import Container from '../components/Container';
import Filters from '../components/Filters';
import Pagination from '../components/Pagination';

const ListContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 24px;
`;

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 12px;
`;

const Wrapper = styled.div`
  display: grid;
  margin: 0px 24px;

  grid-gap: 24px;

  width: calc(100% - 48px);
  grid-template-columns: 1fr 3fr;
`;


export default function List({
  firstList,
  page: initPage,
  total: initTotal,
  pageSize: initPageSize,
}) {
  const [list, setList] = useState(firstList);
  const [loadingFilters, setLoadingFilters] = useState(false);
  const [paginate, setPaginate] = useState({
    page: initPage,
    pageSize: initPageSize,
    total: initTotal,
  });
  const [filters, setFilters] = useState(null);

  const getParams = obj =>
    Object.entries(obj)
      .map(([key, val]) => `${key}=${val}`)
      .join('&');

  const filterList = async (query, page = 1) => {
    setFilters(query);
    try {
      setLoadingFilters(true);

      const params = getParams({
        ...query,
        page,
      });

      const {
        data: { payload, ...pagination },
      } = await axios.get(`${api.list}?${params}`);

      setPaginate({
        ...pagination,
        page,
      });
      setList(payload);
    } catch (error) {
      console.log('Error', error);
    } finally {
      setLoadingFilters(false);
    }
  };

  const handlePaginate = page => {
    filterList(filters, page);
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

          <Pagination {...paginate} onChange={handlePaginate} />
        </ListContainer>
      </Wrapper>
    </Container>
  );
}

List.getInitialProps = async () => {
  const response = await axios.get(api.list);
  const { page, pageSize, total } = response.data;
  return {
    firstList: response.data.payload,
    page,
    pageSize,
    total,
  };
};
