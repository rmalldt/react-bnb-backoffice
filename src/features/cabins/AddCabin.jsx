import StyledButton from '../../ui/StyledButton';
import Modal from '../../ui/Modal';
import CreateCabinForm from './CreateCabinForm';
import CabinTable from './CabinTable';

function AddCabin() {
  return (
    <Modal>
      <Modal.Open opens="cabin-form">
        <StyledButton>Add new cabin</StyledButton>
      </Modal.Open>
      <Modal.Window name="cabin-form">
        <CreateCabinForm />
      </Modal.Window>

      <Modal.Open opens="table">
        <StyledButton>Show table</StyledButton>
      </Modal.Open>
      <Modal.Window name="table">
        <CabinTable />
      </Modal.Window>
    </Modal>
  );
}

// function AddCabin() {
//   const [isOpenModel, setIsOpenModel] = useState(false);
//   return (
//     <div>
//       <StyledButton onClick={() => setIsOpenModel(show => !show)}>
//         Add a new cabin
//       </StyledButton>
//       {isOpenModel && (
//         <Modal onCloseModal={() => setIsOpenModel(false)}>
//           <CreateCabinForm onCloseModal={() => setIsOpenModel(false)} />
//         </Modal>
//       )}
//     </div>
//   );
// }

export default AddCabin;
