import { Container } from "./App.styles";
import { Slider } from "./components/Slider";
import { useState } from "react";
import MapChart from "./components/MapChart";
import { Tooltip as ReactTooltip } from "react-tooltip";

function App() {
  const [anchorId, setAnchorId] = useState("");
  const [content, setContent] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Container>
      <Slider />
      <MapChart
        setAnchorId={setAnchorId}
        setTooltipContent={setContent}
        setIsOpen={setIsOpen}
        isOpen={isOpen}
      />
      <ReactTooltip
        anchorId={anchorId}
        content={content}
        isOpen={isOpen}
      />
    </Container>
  );
}

export default App;