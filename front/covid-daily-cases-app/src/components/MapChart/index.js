import { memo } from "react";
import { Container } from "./styles.js";
import {
  ComposableMap,
  Geographies,
  Geography,
  Graticule,
  Sphere,
} from "react-simple-maps";

const MapChart = (props) => {
  return (
    <Container>
      <ComposableMap>
        <Sphere stroke="#DDD" />
        <Graticule stroke="#DDD" />
        <Geographies
          geography={
            "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json"
          }
        >
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                id={geo.id}
                onMouseEnter={() => {
                  props.setAnchorId(geo.id);
                  props.setTooltipContent(`${geo.properties.name}`);
                  if (!props.isOpen) {
                    props.setIsOpen(true);
                  }
                }}
                style={{
                  default: {
                    fill: "#fff",
                    outline: "none",
                    stroke: "#777",
                    strokeWidth: "0.3",
                  },
                  hover: {
                    fill: "#0dcaf0",
                    outline: "none",
                  },
                  pressed: {
                    fill: "#444",
                    outline: "none",
                  },
                }}
              />
            ))
          }
        </Geographies>
      </ComposableMap>
    </Container>
  );
};

export default memo(MapChart);