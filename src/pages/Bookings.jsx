import StyledHeading from '../ui/StyledHeading';
import StyledRow from '../ui/StyledRow';
import BookingTable from '../features/bookings/BookingTable';

function Bookings() {
  return (
    <>
      <StyledRow type="horizontal">
        <StyledHeading as="h1">All bookings</StyledHeading>
      </StyledRow>
      <BookingTable />
    </>
  );
}

export default Bookings;
