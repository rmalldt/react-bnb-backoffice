import styled from 'styled-components';

const DashboardLayoutDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashBoardLayout() {
  return (
    <DashboardLayoutDiv>
      <div>Statistics Overview</div>
      <div>List of activity</div>
      <div>Stay duration chart</div>
      <div>Sales chart</div>
    </DashboardLayoutDiv>
  );
}

export default DashBoardLayout;
