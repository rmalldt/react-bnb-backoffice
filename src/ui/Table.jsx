import PropTypes from 'prop-types';
import { createContext, useContext } from 'react';
import styled from 'styled-components';

Table.propTypes = {
  children: PropTypes.any,
  columns: PropTypes.string,
};

Header.propTypes = {
  children: PropTypes.any,
};

Row.propTypes = {
  children: PropTypes.any,
};

Body.propTypes = {
  data: PropTypes.array,
  render: PropTypes.func,
};

// Table container
const StyledTable = styled.div`
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

// Base Row: Set grid columns based on props value
const StyledBaseRow = styled.div`
  display: grid;
  grid-template-columns: ${props => props.$columns};
  column-gap: 2.4rem;
  align-items: center;
  transition: none;
`;

// Header based in StyledBaseRow
// 1. StyledBaseRow is executes first
// 2. Then StyledHeader is applied on top of StyledBaseRow
const StyledHeader = styled(StyledBaseRow)`
  padding: 1.6rem 2.4rem;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
`;

const StyledRow = styled(StyledBaseRow)`
  padding: 1.2rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const StyledBody = styled.section`
  margin: 0.4rem 0;
`;

const StyledFooter = styled.footer`
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  padding: 1.2rem;

  /* This will hide the footer when it contains no child elements. Possible thanks to the parent selector :has 🎉 */
  &:not(:has(*)) {
    display: none;
  }
`;

const StyledEmpty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;

const TableContext = createContext();

function Table({ children, columns }) {
  return (
    <TableContext.Provider value={{ columns }}>
      <StyledTable role="table">{children}</StyledTable>
    </TableContext.Provider>
  );
}

function Header({ children }) {
  const { columns } = useContext(TableContext);
  return (
    <StyledHeader role="row" $columns={columns} as="header">
      {children}
    </StyledHeader>
  );
}

function Row({ children }) {
  const { columns } = useContext(TableContext);
  return (
    <StyledRow role="row" $columns={columns}>
      {children}
    </StyledRow>
  );
}

function Body({ data, render }) {
  if (!data.length) return <StyledEmpty>No data found</StyledEmpty>;
  return <StyledBody>{data.map(render)}</StyledBody>;
}

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
Table.Footer = StyledFooter;

export default Table;