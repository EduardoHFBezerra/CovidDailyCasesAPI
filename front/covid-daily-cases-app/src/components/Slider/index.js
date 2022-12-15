import { useState } from "react";
import { Container, Header } from "./styles";
import RangeSlider from 'react-bootstrap-range-slider';

const convertToDate = (date) => {
  return new Date(parseInt(date,10)).toLocaleDateString("pt-BR");
};

export const Slider = () => {
  const initDate = new Date("2017, 02, 01").getTime();
  const endDate = new Date("2019, 12, 31").getTime();
  const [range, setRange] = useState(initDate);
  
  const handleChange = (e) => {
    setRange(e.target.value);
  };

  return (
    <Container>
      <Header>Covid Daily Cases</Header>
      <RangeSlider
        min={initDate}
        max={endDate}
        value={range}
        step={86400000}
        onChange={handleChange}
        tooltipLabel={currentValue => `${convertToDate(currentValue)}`}
        tooltipPlacement='top'
        tooltip='on'
        variant='info'
      />
    </Container>
  );
};