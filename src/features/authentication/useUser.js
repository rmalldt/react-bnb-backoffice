import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../../services/apiAuth';

export function useUser() {
  const {
    data: user,
    isLoading,
    isFetching,
    error,
  } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser,
  });

  const isAuthenticated = user?.role === 'authenticated';
  return { user, isLoading, error, isAuthenticated, isFetching };
}
