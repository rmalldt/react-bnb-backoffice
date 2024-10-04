import styled from 'styled-components';
import BookingDataBox from './BookingDataBox';
import * as S from '../../styles';
import { useMoveBack } from '../../hooks/useMoveBack';
import { useBooking } from './useBooking';
import { useNavigate } from 'react-router-dom';
import { useCheckout } from '../check-in-out/useCheckout';
import { useDeleteBooking } from './useDeleteBooking';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';

const HeadingGroupDiv = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { booking, isLoading } = useBooking();
  const { checkout, isCheckingOut } = useCheckout();
  const { deleteBooking, isDeleting } = useDeleteBooking();

  const moveBack = useMoveBack();
  const navigate = useNavigate();

  if (isLoading) return <S.Spinner />;

  const { id: bookingId, status } = booking;

  const statusToTagName = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
  };

  return (
    <>
      <S.RowDiv type="horizontal">
        <HeadingGroupDiv>
          <S.Heading as="h1">Booking #{bookingId}</S.Heading>
          <S.TagSpan type={statusToTagName[status]}>
            {status.replace('-', ' ')}
          </S.TagSpan>
        </HeadingGroupDiv>
        <S.ButtonText onClick={moveBack}>&larr; Back</S.ButtonText>
      </S.RowDiv>

      <BookingDataBox booking={booking} />

      <S.ButtonGroup>
        {status === 'unconfirmed' && (
          <S.Button onClick={() => navigate(`/checkin/${bookingId}`)}>
            Check in
          </S.Button>
        )}
        {status === 'checked-in' && (
          <S.Button
            onClick={() => checkout(bookingId)}
            disabled={isCheckingOut}
          >
            Check out
          </S.Button>
        )}
        <Modal>
          <Modal.Open opens="delete">
            <S.Button $variation="danger" disabled={isDeleting}>
              Delete Booking
            </S.Button>
          </Modal.Open>
          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="booking"
              onConfirm={() => {
                deleteBooking(bookingId);
                navigate(-1);
              }}
              disabled={isDeleting}
            />
          </Modal.Window>
        </Modal>
        <S.Button $variation="secondary" onClick={moveBack}>
          Back
        </S.Button>
      </S.ButtonGroup>
    </>
  );
}

export default BookingDetail;
