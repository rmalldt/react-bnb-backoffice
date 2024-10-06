import styled from 'styled-components';
import { useRecentBookings } from './useRecentBookings';
import * as S from '../../styles';
import { useRecentStays } from './useRecentStays';

const DashboardLayoutDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashBoardLayout() {
  const { bookings, isLoading: isLoadingBookings } = useRecentBookings();
  const { stays, confirmedStays, isLoadingStays } = useRecentStays();

  if (isLoadingBookings || isLoadingStays) return <S.Spinner />;

  console.log(bookings);
  console.log('total stays', stays);
  console.log('confirmed stays', confirmedStays);

  return (
    <DashboardLayoutDiv>
      <div>Statistics Overview</div>
      <div>List of activity</div>
      <div>Stay duration chart</div>
      <div>Sales chart</div>
    </DashboardLayoutDiv>
  );
}

export default DashBoardLayout;
