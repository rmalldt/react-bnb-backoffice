import CabinTable from '../features/cabins/CabinTable';
import StyledHeading from '../ui/StyledHeading';
import StyledRow from '../ui/StyledRow';

import AddCabin from '../features/cabins/AddCabin';

function Cabins() {
  return (
    <>
      <StyledRow type="horizontal">
        <StyledHeading as="h1">All cabins</StyledHeading>
        <p>sort/filter</p>
      </StyledRow>
      <StyledRow>
        <CabinTable />
        <AddCabin />
      </StyledRow>
    </>
  );
}

export default Cabins;
