import * as S from '../styles';
import { add } from 'date-fns';

function fromToday(numDays, withTime = false) {
  const date = add(new Date(), { days: numDays });
  if (!withTime) date.setUTCHours(0, 0, 0, 0);
  return date.toISOString();
}

function Dashboard() {
  return (
    <S.RowDiv type="horizontal">
      <S.Heading as="h1">Dashboard</S.Heading>
    </S.RowDiv>
  );
}

export default Dashboard;
