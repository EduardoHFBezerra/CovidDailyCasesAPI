import { Container, Header } from "./styles";
import RangeSlider from 'react-bootstrap-range-slider';
import { useEffect } from "react";
import api from './../../api/cases';

export const Slider = (props) => {

  useEffect(() => {
    const getDates = async () => {
      const responseDates = await api.get(`dates`);
      props.setDates(responseDates.data);
    }
    getDates();
  }, [props]);
  
  const handleChange = (e) => {
    props.setRange(e.target.value);
  };

  return (
    <Container>
      <Header>Covid Daily Cases</Header>
      <RangeSlider
        min={0}
        max={props.dates.length-1}
        value={props.range}
        onChange={handleChange}
        tooltipLabel={currentValue => `${props.dates[currentValue]}`}
        tooltipPlacement='top'
        tooltip='on'
        variant='info'
      />
    </Container>
  );
};