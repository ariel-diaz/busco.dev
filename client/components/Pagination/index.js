import React from 'react'
import styled from 'styled-components'

const PaginationContainer = styled.div`
  justify-self: center;
`;
const PaginationBtn = styled.button``;
const PaginationNumber = styled.button`
  margin: 0px 4px;
  color: ${props => (props.active ? 'red' : 'none')};
`;

const Pagination = ({page = 1, pageSize = 2, total = 2, onChange }) => {
  const totalPages = Math.round(total / pageSize);
  const pagination = direction => onChange(direction + page);
  const setPage = p => onChange(p);
  return (
    <PaginationContainer>
      <PaginationBtn
        disabled={page === 1}
        type="button"
        onClick={() => pagination(-1)}
      >
        Anterior
      </PaginationBtn>
      {[...Array(totalPages)].map((_, i) => (
        <PaginationNumber
          active={i + 1 === page}
          key={i}
          onClick={() => setPage(i + 1)}
        >
          {i + 1}
        </PaginationNumber>
      ))}
      <PaginationBtn
        disabled={page === totalPages}
        onClick={() => pagination(1)}
      >
        Siguiente
      </PaginationBtn>
    </PaginationContainer>
  );
};

export default Pagination;