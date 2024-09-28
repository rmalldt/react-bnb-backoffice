import { useState } from 'react';
import CabinTable from '../features/cabins/CabinTable';
import StyledButton from '../ui/StyledButton';
import StyledHeading from '../ui/StyledHeading';
import StyledRow from '../ui/StyledRow';
import CreateCabinForm from '../features/cabins/CreateCabinForm';

function Cabins() {
  const [showForm, setShowForm] = useState(false);
  return (
    <>
      <StyledRow type="horizontal">
        <StyledHeading as="h1">All cabins</StyledHeading>
        <p>sort/filter</p>
      </StyledRow>
      <StyledRow>
        <CabinTable />
        <StyledButton onClick={() => setShowForm(show => !show)}>
          Add a new cabin
        </StyledButton>
        {showForm && <CreateCabinForm />}
      </StyledRow>
    </>
  );
}

export default Cabins;
