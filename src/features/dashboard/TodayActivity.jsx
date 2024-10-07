import styled from 'styled-components';
import * as S from '../../styles';
import { useTodayActivity } from './useTodayActivity';
import TodayItem from './TodayItem';

const ActivityDiv = styled(S.DashboardDivBox)`
  padding-top: 1.8rem;
  grid-column: 1 / span 2;
`;

const ActivityList = styled.ul`
  overflow: scroll;
  overflow-x: hidden;
`;

const NoActivity = styled.p`
  text-align: center;
  font-size: 1.8rem;
  font-weight: 500;
  margin-top: 0.8rem;
`;

function TodayActivity() {
  const { stays, isLoading } = useTodayActivity();
  return (
    <ActivityDiv>
      <S.RowDiv type="horizontal">
        <S.Heading as="h2">Today</S.Heading>
      </S.RowDiv>

      {!isLoading ? (
        stays.length > 0 ? (
          <ActivityList>
            {stays.map(stay => (
              <TodayItem stay={stay} key={stay.id} />
            ))}
          </ActivityList>
        ) : (
          <NoActivity>No Activity Today</NoActivity>
        )
      ) : (
        <S.Spinner />
      )}
    </ActivityDiv>
  );
}

export default TodayActivity;
