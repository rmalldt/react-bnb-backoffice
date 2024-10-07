import { useQuery } from '@tanstack/react-query';
import { getStaysTodayActivity } from '../../services/apiBookings';

export function useTodayActivity() {
  const { data: stays, isLoading } = useQuery({
    queryKey: ['today-activity'],
    queryFn: getStaysTodayActivity,
  });

  console.log(stays);

  return { stays, isLoading };
}