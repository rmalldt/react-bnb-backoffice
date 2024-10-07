import { RESULTS_PER_PAGE } from '../utils/AppConstants';
import { getToday } from '../utils/helpers';
import supabase from './supabase';

export async function getBookings({ filter, sortBy, page }) {
  let query = supabase
    .from('bookings')
    .select('*, cabins(name), guests(fullName, email)}', {
      count: 'exact',
    });

  // Filter
  if (filter) {
    query = query.eq(filter.field, filter.value);
  }

  // Sort
  if (sortBy) {
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === 'asc',
    });
  }

  // Pagination
  // Range is zero-based. E.g, if we need 10 rows, start = 0 and end = 9
  if (page) {
    const from = (page - 1) * RESULTS_PER_PAGE;
    const to = from + RESULTS_PER_PAGE - 1;
    query = query.range(from, to);
  }

  const { data, count, error } = await query;

  if (error) {
    console.error(error);
    throw new Error('Could not load bookings', { cause: error });
  }
  return { data, count };
}

export async function getBooking(id) {
  const { data, error } = await supabase
    .from('bookings')
    .select('*, cabins(*), guests(*)')
    .eq('id', id)
    .single();

  if (error) {
    console.error(error);
    throw new Error('Could not find booking', { cause: error });
  }
  return data;
}

// Returns all BOOKINGS that were created after the given date.
// The BOOKINGS corresponds to createdAt column in DB.
// NOTE: date needs to be ISO string.
export async function getBookingsAfterDate(date) {
  const { data, error } = await supabase
    .from('bookings')
    .select('createdAt, totalPrice, extrasPrice')
    .gte('createdAt', date)
    .lte('createdAt', getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error('Could not load bookings', { cause: error });
  }
  return data;
}

// Returns all STAYS that are were created after the given date
// The STAYS corresponds to startDate column in DB.
// NOTE: date needs to be ISO string.
export async function getStaysAfterDate(date) {
  const { data, error } = await supabase
    .from('bookings')
    .select('*, guests(fullName)')
    .gte('startDate', date)
    .lte('startDate', getToday());

  if (error) {
    console.error(error);
    throw new Error('Could not load bookings', { cause: error });
  }
  return data;
}

// Activity means that there is a check in (guest arriving) or
// a check out today (guest leaving)
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from('bookings')
    .select('*, guests(fullName, nationality, countryFlag)')
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
    )
    .order('createdAt');

  if (error) {
    console.error(error);
    throw new Error('Could not load bookings', { cause: error });
  }
  return data;
}

export async function updateBooking(id, obj) {
  const { data, error } = await supabase
    .from('bookings')
    .update(obj)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error('Could not load bookings', { cause: error });
  }
  return data;
}

export async function deleteBooking(id) {
  const { data, error } = await supabase.from('bookings').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Could not load bookings', { cause: error });
  }
  return data;
}
