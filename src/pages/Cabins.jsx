import CabinTable from '../features/cabins/CabinTable';
import * as S from '../styles';
import AddCabin from '../features/cabins/AddCabin';
import CabinTableOperations from '../features/cabins/CabinTableOperations';

function Cabins() {
  return (
    <>
      <S.RowDiv type="horizontal">
        <S.Heading as="h1">All cabins</S.Heading>
        <CabinTableOperations />
      </S.RowDiv>
      <S.RowDiv>
        <CabinTable />
        <AddCabin />
      </S.RowDiv>
    </>
  );
}

export default Cabins;
