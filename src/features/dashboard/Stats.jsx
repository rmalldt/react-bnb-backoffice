import PropTypes from 'prop-types';
import StatDataBox from './StatDataBox';
import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from 'react-icons/hi2';
import { formatCurrency } from '../../utils/helpers';

Stats.propTypes = {
  bookings: PropTypes.array,
  confirmedStays: PropTypes.array,
  numDays: PropTypes.number,
  numCabins: PropTypes.number,
};

function Stats({ bookings, confirmedStays, numDays, numCabins }) {
  const numBookings = bookings.length;
  const totalSales = bookings.reduce(
    (acc, cur) => acc + (cur.totalPrice + cur.extrasPrice),
    0
  );

  const checkIns = confirmedStays.length;

  const occupancy =
    confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
    (numDays * numCabins);

  return (
    <>
      <StatDataBox
        title="Bookings"
        icon={<HiOutlineBriefcase />}
        color="blue"
        value={numBookings}
      />
      <StatDataBox
        title="Sales"
        icon={<HiOutlineBanknotes />}
        color="green"
        value={formatCurrency(totalSales)}
      />
      <StatDataBox
        title="Check ins"
        icon={<HiOutlineCalendarDays />}
        color="indigo"
        value={checkIns}
      />
      <StatDataBox
        title="Occupancy Rate"
        icon={<HiOutlineChartBar />}
        color="yellow"
        value={`${Math.round(occupancy * 100)}%`}
      />
    </>
  );
}

export default Stats;
