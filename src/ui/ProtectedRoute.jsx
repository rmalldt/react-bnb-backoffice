import PropTypes from 'prop-types';
import { useUser } from '../features/authentication/useUser';
import * as S from '../styles';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

ProtectedRoute.propTypes = {
  children: PropTypes.object,
};

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  // 1. Load authenticated User
  const { isLoading, isAuthenticated, isFetching } = useUser();

  console.log('Protected Route', isAuthenticated);

  // 2. If there is NO authenticated User, redirect to the /login
  useEffect(() => {
    if (!isAuthenticated && !isLoading && !isFetching) navigate('/login');
  }, [isAuthenticated, isLoading, isFetching, navigate]);

  // 3. While loading, show spinner
  if (isLoading)
    return (
      <S.FullPageDiv>
        <S.Spinner />;
      </S.FullPageDiv>
    );

  // 4. If there is User, render the app
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
