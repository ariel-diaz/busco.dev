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

const Pagination = ({ page: initPage, pageSize, total, onChange }) => {
  const totalPages = Math.round(total / pageSize);
  const pagination = direction => onChange(direction + initPage);
  const setPage = p => onChange(p);

  return (
    <PaginationContainer>
      <PaginationBtn
        disabled={initPage === 1}
        type="button"
        onClick={() => pagination(-1)}
      >
        Anterior
      </PaginationBtn>
      {[...Array(totalPages)].map((_, i) => (
        <PaginationNumber
          active={i + 1 === initPage}
          key={i}
          onClick={() => setPage(i + 1)}
        >
          {i + 1}
        </PaginationNumber>
      ))}
      <PaginationBtn
        disabled={initPage === totalPages}
        onClick={() => pagination(1)}
      >
        Siguiente
      </PaginationBtn>
    </PaginationContainer>
  );
};

export default Pagination;