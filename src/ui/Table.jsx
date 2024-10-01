import PropTypes from 'prop-types';
import { createContext, useContext } from 'react';
import * as S from '../styles';

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

const TableContext = createContext();

function Table({ children, columns }) {
  return (
    <TableContext.Provider value={{ columns }}>
      <S.TableContainer role="table">{children}</S.TableContainer>
    </TableContext.Provider>
  );
}

function Header({ children }) {
  const { columns } = useContext(TableContext);
  return (
    <S.TableHeader role="row" $columns={columns} as="header">
      {children}
    </S.TableHeader>
  );
}

function Row({ children }) {
  const { columns } = useContext(TableContext);
  return (
    <S.TableRow role="row" $columns={columns}>
      {children}
    </S.TableRow>
  );
}

function Body({ data, render }) {
  if (!data.length) return <S.TableEmpty>No data found</S.TableEmpty>;
  return <S.TableBody>{data.map(render)}</S.TableBody>;
}

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
Table.Footer = S.TableFooter;

export default Table;
