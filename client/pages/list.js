import React, { useState, useEffect } from 'react';
import axios from '../utils/axios';
import styled from 'styled-components';
import api from '../utils/api';
import Card from '../components/Card';
import Container from '../components/Container';
import Filters from '../components/Filters';
import Pagination from '../components/Pagination';
import useSWR from 'swr';

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

export default function List() {
  const { data, error, loading } = useSWR(api.list, (url) => axios.get(url).then(resp => resp.data))

  const [list, setList] = useState(null);
  const [paginate, setPaginate] = useState(null);
  const [loadingFilters, setLoadingFilters] = useState(false);
  const [filters, setFilters] = useState(null);

  useEffect(() => {
    // TODO: D:
    if(data) {
      const {
        payload: firstList,
        page: initPage,
        pageSize: initPageSize,
        total: initTotal,
      } = data;

      setList(firstList);
      setPaginate({
        page: initPage,
        pageSize: initPageSize,
        total: initTotal,
      });
    }
  }, [data])
  

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
  
  if(loading) {
    return <div> Loading... </div>
  }

  if(error) {
    return <div> error </div>
  }

  
  return (
    <Container>
      <Wrapper>
        <Filters filterList={filterList} />
        <ListContainer>
          <h1> Desarrolladores </h1>
          <CardsContainer>
            {loadingFilters && <div> Loading... </div>}
            {!loadingFilters && list && list.length === 0 && (
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
