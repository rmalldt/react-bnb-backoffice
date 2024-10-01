import * as S from '../styles';
import { add } from 'date-fns';

function fromToday(numDays, withTime = false) {
  const date = add(new Date(), { days: numDays });
  if (!withTime) date.setUTCHours(0, 0, 0, 0);
  return date.toISOString();
}

function Dashboard() {
  const date1 = fromToday(0, true);
  const date2 = fromToday(-5);
  const date3 = fromToday(5);

  console.log(date1);
  console.log(date2);
  console.log(date3);

  return (
    <S.Row type="horizontal">
      <S.Heading as="h1">Dashboard</S.Heading>
    </S.Row>
  );
}

export default Dashboard;
