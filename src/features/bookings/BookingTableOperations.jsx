import SortBy from '../../ui/SortBy';
import Filter from '../../ui/Filter';
import * as S from '../../styles';

function BookingTableOperations() {
  return (
    <S.TableOperationsDiv>
      <Filter
        filterField="status"
        options={[
          { label: 'All', value: 'all' },
          { label: 'Checked out', value: 'checked-out' },
          { label: 'Checked in', value: 'checked-in' },
          { label: 'Unconfirmed', value: 'unconfirmed' },
        ]}
        searchParamsToSet={[{ name: 'page', value: 1 }]}
      />

      <SortBy
        options={[
          { label: 'Sort by date (recent first)', value: 'startDate-desc' },
          { label: 'Sort by date (earlier first)', value: 'startDate-asc' },
          { label: 'Sort by amount (low first)', value: 'totalPrice-asc' },
          {
            label: 'Sort by amount (high first)',
            value: 'totalPrice-desc',
          },
        ]}
      />
    </S.TableOperationsDiv>
  );
}

export default BookingTableOperations;
