import styled from 'styled-components';
import PropTypes from 'prop-types';
import { formatCurrency } from '../../utils/helpers';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCabin } from '../../services/apiCabins';
import toast from 'react-hot-toast';

CabinRow.propTypes = {
  cabin: PropTypes.object,
};

const StyledTableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const StyledImg = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const StyledCabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`;

const StyledPrice = styled.div`
  font-family: 'Sono';
  font-weight: 600;
`;

const StyledDiscount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const queryClient = useQueryClient();

  const {
    id: cabinId,
    name,
    max_capacity,
    regular_price,
    discount,
    image,
  } = cabin;

  const { isLoading: isDeleting, mutate } = useMutation({
    // Function reference to API call
    mutationFn: deleteCabin,

    onSuccess: () => {
      toast.success('Cabin successfully deleted');
      // On success invalidate the cache and make the fresh fetch to display latest state
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });
    },

    onError: err => toast.error(err.message),
  });

  return (
    <StyledTableRow role="row">
      <StyledImg src={image} />
      <StyledCabin>{name}</StyledCabin>
      <div>Fits upto {max_capacity}</div>
      <StyledPrice>{formatCurrency(regular_price)}</StyledPrice>
      <StyledDiscount>{formatCurrency(discount)}</StyledDiscount>
      <button onClick={() => mutate(cabinId)} disabled={isDeleting}>
        Delete
      </button>
    </StyledTableRow>
  );
}

export default CabinRow;
