import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import styled from 'styled-components';

const AppLayoutDiv = styled.div`
  height: 100vh;
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
`;

const MainDiv = styled.main`
  background-color: var(--color-grey-50);
  padding: 2rem 4.8rem 6.4rem;
  grid-column: 2 / 3;
  grid-row: 2 / 3;
  overflow: scroll;
`;

const OutletDiv = styled.div`
  max-width: 140rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

function AppLayout() {
  return (
    <AppLayoutDiv>
      <Header />
      <Sidebar />
      <MainDiv>
        <OutletDiv>
          <Outlet />
        </OutletDiv>
      </MainDiv>
    </AppLayoutDiv>
  );
}

export default AppLayout;
