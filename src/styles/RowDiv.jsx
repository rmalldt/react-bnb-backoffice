import styled, { css } from 'styled-components';

const RowDiv = styled.div`
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

RowDiv.defaultProps = {
  type: 'vertical',
};

export default RowDiv;
