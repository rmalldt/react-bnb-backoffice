import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as S from '../styles';

Empty.propTypes = {
  resourceName: PropTypes.string,
};

const EmptyDiv = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4.8rem;
`;

function Empty({ resourceName }) {
  return (
    <EmptyDiv>
      <S.Heading as="h2">No {resourceName} could be found.</S.Heading>
    </EmptyDiv>
  );
}

export default Empty;
