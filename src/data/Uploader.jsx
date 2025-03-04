import { useState } from 'react';
import { isFuture, isPast, isToday } from 'date-fns';
import supabase from '../services/supabase';
import * as S from '../styles';
import { subtractDates } from '../utils/helpers';
import { bookings } from './data-bookings';
import { cabins } from './data-cabins';
import { guests } from './data-guests';
import styled from 'styled-components';

// Postgresql array indexing starts with 1
async function deleteGuests() {
  const { error } = await supabase.from('guests').delete().gt('id', 0);
  if (error) console.log(error.message);
}

async function deleteCabins() {
  const { error } = await supabase.from('cabins').delete().gt('id', 0);
  if (error) console.log(error.message);
}

async function deleteBookings() {
  const { error } = await supabase.from('bookings').delete().gt('id', 0);
  if (error) console.log(error.message);
}

async function createGuests() {
  const { error } = await supabase.from('guests').insert(guests);
  if (error) console.log(error.message);
}

async function createCabins() {
  const { error } = await supabase.from('cabins').insert(cabins);
  if (error) console.log(error.message);
}

/**
 * Bookings has guestId and cabinId as FKs.
 * On uploading sample data each time, the PK's are auto-generated.
 * So it will be different Cabins and Guests data on each upload.
 * Therefore, first, fetch guestIds and cabinIds from DB and then replace
 * the IDs in the sample booking data with the actual Ids from the DB.
 */
async function createBookings() {
  // Fetch guests id from DB
  const { data: guestsIds } = await supabase
    .from('guests')
    .select('id')
    .order('id');
  const allGuestIds = guestsIds.map(guest => guest.id);

  // Fetch cabins id from DB
  const { data: cabinsIds } = await supabase
    .from('cabins')
    .select('id')
    .order('id');
  const allCabinIds = cabinsIds.map(cabin => cabin.id);

  // Prepare sample bookings data
  const finalBookings = bookings.map(booking => {
    const cabin = cabins.at(booking.cabinId - 1);
    const numNights = subtractDates(booking.endDate, booking.startDate);
    const cabinPrice = numNights * (cabin.regularPrice - cabin.discount);
    const extrasPrice = booking.hasBreakfast
      ? numNights * 15 * booking.numGuests
      : 0;
    const totalPrice = cabinPrice + extrasPrice;

    let status;
    if (
      isPast(new Date(booking.endDate)) &&
      !isToday(new Date(booking.endDate))
    )
      status = 'checked-out';
    if (
      isFuture(new Date(booking.startDate)) ||
      isToday(new Date(booking.startDate))
    )
      status = 'unconfirmed';
    if (
      (isFuture(new Date(booking.endDate)) ||
        isToday(new Date(booking.endDate))) &&
      isPast(new Date(booking.startDate)) &&
      !isToday(new Date(booking.startDate))
    )
      status = 'checked-in';

    return {
      ...booking,
      numNights,
      cabinPrice,
      extrasPrice,
      totalPrice,
      guestId: allGuestIds.at(booking.guestId - 1), // replace sample ids with actual once
      cabinId: allCabinIds.at(booking.cabinId - 1), // replace sample ids with actual once
      status,
    };
  });
  console.log(finalBookings);
  const { error } = await supabase.from('bookings').insert(finalBookings);
  if (error) console.log(error.message);
}

const UploaderDiv = styled.div`
  margin-top: auto;
  background-color: var(--color-indigo-100);
  color: var(--color-grey-900);
  padding: 20px;
  border-radius: 5px;
  text-align: center;

  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const UploaderButton = styled(S.Button)`
  width: 18rem;
  height: 3.2rem;
`;

function Uploader() {
  const [isLoading, setIsLoading] = useState(false);

  async function uploadAll() {
    setIsLoading(true);
    // Delete bookings first (contains FK from guests and cabins)
    await deleteBookings();
    await deleteGuests();
    await deleteCabins();

    // Create bookings at last (contains FK from guests and cabins)
    await createGuests();
    await createCabins();
    await createBookings();

    setIsLoading(false);
  }

  async function uploadBookings() {
    setIsLoading(true);
    await deleteBookings();
    await createBookings();
    setIsLoading(false);
  }

  return (
    <UploaderDiv>
      <h4>SAMPLE DATA</h4>
      <UploaderButton $size="small" onClick={uploadAll} disabled={isLoading}>
        Upload ALL
      </UploaderButton>
      <UploaderButton
        $size="small"
        onClick={uploadBookings}
        disabled={isLoading}
      >
        Upload bookings ONLY
      </UploaderButton>
    </UploaderDiv>
  );
}

export default Uploader;
