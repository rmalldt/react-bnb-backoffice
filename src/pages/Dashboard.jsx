import * as S from '../styles';
import DashBoardLayout from '../features/dashboard/DashBoardLayout';
import DashboardFilter from '../features/dashboard/DashboardFilter';

function Dashboard() {
  return (
    <>
      <S.RowDiv type="horizontal">
        <S.Heading as="h1">Dashboard</S.Heading>
        <DashboardFilter />
      </S.RowDiv>
      <DashBoardLayout />
    </>
  );
}

export default Dashboard;
