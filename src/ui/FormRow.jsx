import PropTypes from 'prop-types';
import * as S from '../styles';

FormRow.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  children: PropTypes.any,
};

function FormRow({ label, error, children }) {
  return (
    <S.FormRowContainer>
      {label && <S.FormLabel htmlFor={children.props.id}>{label}</S.FormLabel>}
      {children}
      {error && <S.Error>{error}</S.Error>}
    </S.FormRowContainer>
  );
}

export default FormRow;
