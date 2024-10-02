import PropTypes from 'prop-types';
import { useSearchParams } from 'react-router-dom';
import styled, { css } from 'styled-components';

Filter.propTypes = {
  filterField: PropTypes.string,
  options: PropTypes.array,
};

const FilterDiv = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;

  display: flex;
  gap: 0.4rem;
`;

const FilterButton = styled.button`
  background-color: var(--color-grey-0);
  border: none;

  ${props =>
    props.$active === 'active' &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

function Filter({ filterField, options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(filterField) || options[0];

  function handleClick(value) {
    searchParams.set(filterField, value);
    setSearchParams(searchParams);
  }

  return (
    <FilterDiv>
      {options.map(option => (
        <FilterButton
          key={option.label}
          onClick={() => handleClick(option.value)}
          $active={option.value === currentFilter ? 'active' : ''}
          disabled={option.value === currentFilter}
        >
          {option.label}
        </FilterButton>
      ))}
    </FilterDiv>
  );
}

export default Filter;
