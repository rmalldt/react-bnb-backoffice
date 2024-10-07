import PropTypes from 'prop-types';
import CheckoutButton from './../check-in-out/CheckoutButton';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import * as S from '../../styles';

TodayItem.propTypes = {
  stay: PropTypes.object,
};

const TodayItemDiv = styled.li`
  display: grid;
  grid-template-columns: 9rem 2rem 1fr 7rem 9rem;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
  /* &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  } */
`;

const GuestDiv = styled.div`
  font-weight: 500;
`;

function TodayItem({ stay }) {
  const { id, status, guests, numNights } = stay;

  const statusToAction = {
    unconfirmed: {
      action: 'arriving',
      tag: 'green',
      button: (
        <S.Button
          $variation="primary"
          $size="small"
          as={Link}
          to={`/checkin/${id}`}
        >
          Check in
        </S.Button>
      ),
    },
    'checked-in': {
      action: 'departing',
      tag: 'blue',
      button: <CheckoutButton bookingId={id} />,
    },
  };

  return (
    <TodayItemDiv>
      <S.TagSpan type={statusToAction[status].tag}>
        {statusToAction[status].action}
      </S.TagSpan>
      <S.FlagImg src={guests.countryFlag} alt={`Flag of ${guests.country}`} />
      <GuestDiv>{guests.fullName}</GuestDiv>
      <div>{numNights} nights</div>

      {statusToAction[status].button}
    </TodayItemDiv>
  );
}

export default TodayItem;
