import { useEffect, useState } from 'react';
import Heading from '../ui/Heading';
import Row from '../ui/Row';
import { getCabins } from '../services/apiCabins';

function Cabins() {
  const [cabins, setCabins] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCabins();
      setCabins(data);
    };
    fetchData();
  }, []);

  console.log(cabins);

  return (
    <Row type="horizontal">
      <Heading as="h1">All cabins</Heading>
      <p>TEST</p>
    </Row>
  );
}

export default Cabins;
