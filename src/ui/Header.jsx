import styled from 'styled-components';
import Heading from './Heading';

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
      <Heading as="h1">The title</Heading>
      <Heading as="h2">The sub-title</Heading>
    </StyledHeader>
  );
}

export default Header;
