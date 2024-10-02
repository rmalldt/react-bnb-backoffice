import styled from 'styled-components';
import { format, isToday } from 'date-fns';
import PropTypes from 'prop-types';

import * as S from '../../styles';
import Table from '../../ui/Table';

import { formatCurrency } from '../../utils/helpers';
import { formatDistanceFromNow } from '../../utils/helpers';

BookingRow.propTypes = {
  booking: PropTypes.object,
};

const StyledCabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`;

const StyledStacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const StyledAmount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
`;

function BookingRow({ booking }) {
  const {
    id: bookingId,
    createdAt,
    startDate,
    endDate,
    numNights,
    numGuests,
    totalPrice,
    status,
    guests: { fullName: guestName, email },
    cabins: { name: cabinName },
  } = booking;

  const statusToTagName = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
  };

  return (
    <Table.Row>
      <StyledCabin>{cabinName}</StyledCabin>

      <StyledStacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </StyledStacked>

      <StyledStacked>
        <span>
          {isToday(new Date(startDate))
            ? 'Today'
            : formatDistanceFromNow(startDate)}{' '}
          &rarr; {numNights} night stay
        </span>
        <span>
          {format(new Date(startDate), 'MMM dd yyyy')} &mdash;{' '}
          {format(new Date(endDate), 'MMM dd yyyy')}
        </span>
      </StyledStacked>

      <S.TagSpan type={statusToTagName[status]}>
        {status.replace('-', ' ')}
      </S.TagSpan>

      <StyledAmount>{formatCurrency(totalPrice)}</StyledAmount>
    </Table.Row>
  );
}

export default BookingRow;
