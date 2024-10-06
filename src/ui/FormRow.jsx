import PropTypes from 'prop-types';
import styled from 'styled-components';

FormRow.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  children: PropTypes.any,
};

const FormRowDiv = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1.2fr 1fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const FormLabel = styled.label`
  font-weight: 500;
`;

const FormError = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function FormRow({ label, error, children }) {
  console.log(error);
  return (
    <FormRowDiv>
      {label && <FormLabel htmlFor={children.props.id}>{label}</FormLabel>}
      {children}
      {error && <FormError>{error}</FormError>}
    </FormRowDiv>
  );
}

export default FormRow;
