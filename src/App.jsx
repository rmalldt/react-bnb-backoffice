import styled from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import Button from './ui/Button';

const StyledApp = styled.div`
  height: 100vh;
  background-color: beige;
  padding: 0.8rem 1.2rem;
`;

const H1 = styled.h1`
  font-size: 30px;
  font-weight: 600;
  background-color: aquamarine;
`;

const Input = styled.input`
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 0.8rem1.2rem;
  padding: 10px;
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <H1>BnBBackOffice</H1>
        <Button onClick={() => alert('Playing')}>Play</Button>
        <Button onClick={() => alert('Stop')}>Stop</Button>
        <Input type="text" placeholder="Type something" />
      </StyledApp>
    </>
  );
}

export default App;
