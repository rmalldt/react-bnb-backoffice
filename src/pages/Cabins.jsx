import CabinTable from '../features/cabins/CabinTable';
import * as S from '../styles';

import AddCabin from '../features/cabins/AddCabin';
import CabinTableOperations from '../features/cabins/CabinTableOperations';

function Cabins() {
  return (
    <>
      <S.Row type="horizontal">
        <S.Heading as="h1">All cabins</S.Heading>
        <CabinTableOperations />
      </S.Row>
      <S.Row>
        <CabinTable />
        <AddCabin />
      </S.Row>
    </>
  );
}

export default Cabins;
