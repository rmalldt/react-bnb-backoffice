import { formatDistance, parseISO } from 'date-fns';
import { differenceInDays } from 'date-fns';

// Works for both Date objects and strings (which come from Supabase)
export function subtractDates(dateStr1, dateStr2) {
  return differenceInDays(
    parseISO(String(dateStr1)),
    parseISO(String(dateStr2))
  );
}

export function formatDistanceFromNow(dateStr) {
  return formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  })
    .replace('about ', '')
    .replace('in', 'In');
}

// Supabase needs ISO date string. On every call we create today (new Date),
// which will have different 'minutes' and 'seconds'. We remove time part
// from today in order to compare with the dates in DB.
export function getToday(options = {}) {
  const today = new Date();
  // This is necessary to compare with createdAt from Supabase, because
  // the new Date is not at 0.0.0.0, so we need to set the date to be END
  // of the day when we compare it with earlier dates.
  if (options?.end) {
    today.setUTCHours(23, 59, 59, 999); // set to the last second of the day
  } else {
    today.setUTCHours(0, 0, 0, 0);
  }
  return today.toISOString(); // supabase uses ISO string
}

export function formatCurrency(value) {
  return new Intl.NumberFormat('en', {
    style: 'currency',
    currency: 'GBP',
  }).format(value);
}
