import PropTypes from 'prop-types';
import styled from 'styled-components';

FormRowVertical.propTypes = {
  label: PropTypes.string,
  error: PropTypes.any,
  children: PropTypes.object,
};

const FormFowVerticalDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 1.2rem 0;
`;

const FormLabel = styled.label`
  font-weight: 500;
`;

const FormError = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function FormRowVertical({ label, error, children }) {
  return (
    <FormFowVerticalDiv>
      {label && <FormLabel>{label}</FormLabel>}
      {children}
      {error && <FormError>{error}</FormError>}
    </FormFowVerticalDiv>
  );
}

export default FormRowVertical;
