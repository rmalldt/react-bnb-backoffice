import * as S from '../styles';
import BookingTable from '../features/bookings/BookingTable';

function Bookings() {
  return (
    <>
      <S.RowDiv type="horizontal">
        <S.Heading as="h1">All bookings</S.Heading>
      </S.RowDiv>
      <BookingTable />
    </>
  );
}

export default Bookings;
