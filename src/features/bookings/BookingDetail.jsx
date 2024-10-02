import styled from 'styled-components';
import BookingDataBox from './BookingDataBox';
import * as S from '../../styles';
import { useMoveBack } from '../../hooks/useMoveBack';
import { useQuery } from '@tanstack/react-query';
import { getBooking } from '../../services/apiBookings';
import { useParams } from 'react-router-dom';
import { useBooking } from './useBooking';

const HeadingGroupDiv = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { booking, isLoading } = useBooking();
  const moveBack = useMoveBack();

  if (isLoading) return <S.Spinner />;

  console.log(booking);

  const { id, status } = booking;

  const statusToTagName = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
  };

  return (
    <>
      <S.RowDiv type="horizontal">
        <HeadingGroupDiv>
          <S.Heading as="h1">Booking #{id}</S.Heading>
          <S.TagSpan type={statusToTagName[status]}>
            {status.replace('-', ' ')}
          </S.TagSpan>
        </HeadingGroupDiv>
        <S.ButtonText onClick={moveBack}>&larr; Back</S.ButtonText>
      </S.RowDiv>

      <BookingDataBox booking={booking} />

      <S.ButtonGroup>
        <S.Button $variation="secondary" onClick={moveBack}>
          Back
        </S.Button>
      </S.ButtonGroup>
    </>
  );
}

export default BookingDetail;
