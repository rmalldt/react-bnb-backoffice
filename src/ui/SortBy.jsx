import PropTypes from 'prop-types';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

SortBy.propTypes = {
  options: PropTypes.array,
};

const StyledSelect = styled.select`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${props =>
      props.$type === 'grey'
        ? 'var(--color-grey-300)'
        : 'var(--color-grey-100)'};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = searchParams.get('sortBy') || '';

  function handleChange(e) {
    searchParams.set('sortBy', e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <StyledSelect value={sortBy} $type="grey" onChange={handleChange}>
      {options.map(option => (
        <option key={option.label} value={option.value}>
          {option.label}
        </option>
      ))}
    </StyledSelect>
  );
}

export default SortBy;
