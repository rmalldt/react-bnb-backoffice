import * as S from '../styles';
import BookingTable from '../features/bookings/BookingTable';
import BookingTableOperations from '../features/bookings/BookingTableOperations';

function Bookings() {
  return (
    <>
      <S.RowDiv type="horizontal">
        <S.Heading as="h1">All bookings</S.Heading>
        <BookingTableOperations />
      </S.RowDiv>
      <BookingTable />
    </>
  );
}

export default Bookings;
