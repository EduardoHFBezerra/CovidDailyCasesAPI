import { Container } from "./App.styles";
import { Slider } from "./components/Slider";
import { useState } from "react";
import MapChart from "./components/MapChart";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { Select } from "./components/Select";

function App() {
  const [anchorId, setAnchorId] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [range, setRange] = useState(0);
  const [count, setCount] = useState("count");
  const [dates, setDates] = useState(["2020-05-11"]);

  return (
    <Container>
      <Slider
        range={range}
        setRange={setRange}
        setDates={setDates}
        dates={dates}
      />
      <Select
        setCount={setCount}
      />
      <MapChart
        setAnchorId={setAnchorId}
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        dates={dates}
        range={range}
        count={count}
      />
      <ReactTooltip
        anchorId={anchorId}
        isOpen={isOpen}
      />
    </Container>
  );
}

export default App;