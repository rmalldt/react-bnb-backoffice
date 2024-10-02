import PropTypes from 'prop-types';
import * as S from '../styles';

ConfirmDelete.propTypes = {
  resourceName: PropTypes.string,
  onConfirm: PropTypes.func,
  disabled: PropTypes.bool,
  onCloseModal: PropTypes.func,
};

function ConfirmDelete({ resourceName, onConfirm, disabled, onCloseModal }) {
  return (
    <S.ConfirmationDiv>
      <S.Heading as="h3">Delete {resourceName}</S.Heading>
      <p>
        Are you sure you want to delete this {resourceName} permanently? This
        action cannot be undone.
      </p>

      <div>
        <S.Button
          $variation="secondary"
          onClick={onCloseModal}
          disabled={disabled}
        >
          Cancel
        </S.Button>
        <S.Button $variation="danger" disabled={disabled} onClick={onConfirm}>
          Delete
        </S.Button>
      </div>
    </S.ConfirmationDiv>
  );
}

export default ConfirmDelete;
