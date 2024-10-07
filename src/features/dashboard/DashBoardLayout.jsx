import styled from 'styled-components';
import { useRecentBookings } from './useRecentBookings';
import * as S from '../../styles';
import { useRecentStays } from './useRecentStays';
import Stats from './Stats';
import { useCabins } from '../cabins/useCabins';
import SalesChart from './SalesChart';
import StayDurationChart from './StayDurationChart';

const DashboardLayoutDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashBoardLayout() {
  const { bookings, isLoading: isLoadingBookings } = useRecentBookings();

  const {
    confirmedStays,
    isLoading: isLoadingStays,
    numDays,
  } = useRecentStays();

  const { cabins, isLoading: isLoadingCabins } = useCabins();

  console.log('bookings', bookings);
  // console.log('stays', stays);
  // console.log('confirmedStays', confirmedStays);

  if (isLoadingBookings || isLoadingStays || isLoadingCabins)
    return <S.Spinner />;

  return (
    <DashboardLayoutDiv>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        numCabins={cabins.length}
      />
      <div>Todays Activity</div>
      <div>Stay duration chart</div>
      <StayDurationChart confirmedStays={confirmedStays} />
      <SalesChart bookings={bookings} numDays={numDays} />
    </DashboardLayoutDiv>
  );
}

export default DashBoardLayout;
