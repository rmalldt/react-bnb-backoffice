import { useCabins } from './useCabins';
import StyledSpinner from '../../ui/StyledSpinner';
import CabinRow from './CabinRow';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import { useSearchParams } from 'react-router-dom';

function CabinTable() {
  const { cabins, isLoading } = useCabins();
  const [searchParams] = useSearchParams();

  if (isLoading) return <StyledSpinner />;

  const filterBy = searchParams.get('discount') || 'all';
  let filteredCabins;
  if (filterBy === 'all') filteredCabins = cabins;
  if (filterBy === 'no-discount')
    filteredCabins = cabins.filter(cabin => cabin.discount === 0);
  if (filterBy === 'with-discount')
    filteredCabins = cabins.filter(cabin => cabin.discount > 0);

  const sortBy = searchParams.get('sortBy') || '';
  const [field, direction] = sortBy.split('-');

  const modifier = direction === 'asc' ? 1 : -1;

  const sortedCabins = filteredCabins.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedCabins}
          render={cabin => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
