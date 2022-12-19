import { memo } from "react";
import { Container } from "./styles.js";
import {
  ComposableMap,
  Geographies,
  Geography,
  Graticule,
  Sphere,
} from "react-simple-maps";
import api from './../../api/cases';
import { useState, useEffect } from "react";

const MapChart = (props) => {
  const [cases, setCases] = useState([]);
  const [content, setTooltipContent] = useState("");

  useEffect(() => {
    const getCases = async () => {
      const responseCases = await api.get(`cases/${props.dates[props.range]}/${props.count}`);
      setCases(responseCases.data);
    }
    getCases();
  }, [props]);

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
                data-tooltip-html={content}
                onMouseEnter={() => {
                  props.setAnchorId(geo.id);
                  if (cases.length !== 0)
                  {
                    const casesFilter = cases.filter(element => geo.properties.name.indexOf(element.location) > -1);
                    const casesMap = casesFilter.map(function(item, index)
                    {
                      return `${item.variant}: ${item.numSequences}`;
                    }).join("<br />");

                    if (casesMap.length !== 0) {
                      setTooltipContent(`
                        <strong>${geo.properties.name}:</strong>
                        <div class="content-tooltip">${casesMap}</div>
                      `);
                    } else {
                      setTooltipContent("Nenhum dado deste país para a data selecionada");
                    }
                    if (!props.isOpen) {
                      props.setIsOpen(true);
                    }
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