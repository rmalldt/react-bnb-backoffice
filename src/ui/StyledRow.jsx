import styled, { css } from 'styled-components';

const StyledRow = styled.div`
  display: flex;

  ${props =>
    props.type == 'horizontal' &&
    css`
      align-items: center;
      justify-content: space-between;
    `}

  ${props =>
    props.type == 'vertical' &&
    css`
      flex-direction: column;
      gap: 1.6rem;
    `}
`;

StyledRow.defaultProps = {
  type: 'vertical',
};

export default StyledRow;
