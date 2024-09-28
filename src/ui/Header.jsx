import styled from 'styled-components';
import StyledHeading from './StyledHeading';

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
  grid-column: 2 / 3;
  grid-row: 1 /2;
`;

function Header() {
  return (
    <StyledHeader>
      <StyledHeading as="h1">The Office</StyledHeading>
    </StyledHeader>
  );
}

export default Header;
