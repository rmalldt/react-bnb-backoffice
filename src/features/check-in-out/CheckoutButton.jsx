import PropTypes from 'prop-types';
import * as S from '../../styles';
import { useCheckout } from './useCheckout';

CheckoutButton.propTypes = {
  bookingId: PropTypes.number,
};

function CheckoutButton({ bookingId }) {
  const { checkout, isCheckingOut } = useCheckout();

  return (
    <S.Button
      $variation="primary"
      $size="small"
      onClick={() => checkout(bookingId)}
      disabled={isCheckingOut}
    >
      Check out
    </S.Button>
  );
}

export default CheckoutButton;
