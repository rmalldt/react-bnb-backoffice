import styled from 'styled-components';
import * as S from '../styles';
import PropTypes from 'prop-types';
import GlobalStyles from '../styles/GlobalStyles';

ErrorFallback.propTypes = {
  error: PropTypes.object,
  resetErrorBoundary: PropTypes.object,
};

const ErrorFallbackDiv = styled.main`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4.8rem;
`;

const ErrorBoxDiv = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 4.8rem;
  flex: 0 1 96rem;
  text-align: center;

  & h1 {
    margin-bottom: 1.6rem;
  }

  & p {
    font-family: 'Sono';
    margin-bottom: 3.2rem;
    color: var(--color-grey-500);
  }
`;

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <>
      <GlobalStyles />
      <ErrorFallbackDiv>
        <ErrorBoxDiv>
          <S.Heading as="h1">Something went wrong!</S.Heading>
          <p>{error.message}</p>
          <S.Button onClick={resetErrorBoundary}>Try Again</S.Button>
        </ErrorBoxDiv>
      </ErrorFallbackDiv>
    </>
  );
}

export default ErrorFallback;
