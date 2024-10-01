import * as S from '../styles';
import BookingTable from '../features/bookings/BookingTable';

function Bookings() {
  return (
    <>
      <S.Row type="horizontal">
        <S.Heading as="h1">All bookings</S.Heading>
      </S.Row>
      <BookingTable />
    </>
  );
}

export default Bookings;
