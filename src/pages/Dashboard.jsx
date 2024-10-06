import * as S from '../styles';
import DashBoardLayout from '../ui/DashBoardLayout';

function Dashboard() {
  return (
    <>
      <S.RowDiv type="horizontal">
        <S.Heading as="h1">Dashboard</S.Heading>
        <p>
          <strong>Button</strong>
        </p>
      </S.RowDiv>
      <DashBoardLayout />
    </>
  );
}

export default Dashboard;
