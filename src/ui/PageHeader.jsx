import styled from 'styled-components';
import * as S from '../styles';
import Logout from '../features/authentication/Logout';

const HeaderDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

function PageHeader() {
  return (
    <S.Header>
      <HeaderDiv>
        <S.Heading as="h1">Heading</S.Heading>
        <Logout />
      </HeaderDiv>
    </S.Header>
  );
}

export default PageHeader;
