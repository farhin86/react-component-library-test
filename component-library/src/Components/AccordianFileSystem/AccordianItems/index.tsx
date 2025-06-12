import { useState } from "react";
import "./index.css";
import { accordianDataType } from "../Accordion";

interface ItemAccordian {
  items: accordianDataType;
}
export default function AccordianItems({ items }: ItemAccordian) {
  const [showItems, setShowItems] = useState(false);

  function handleShowInnerItems() {
    setShowItems(!showItems);
  }

  return (
    <div className="wrapper">
      <div className="row-content">
        <div
          className={showItems ? "arrow" : "arrow down"}
          onClick={() => handleShowInnerItems()}
        >
          ^
        </div>
        <h4
          className="acc-label"
          onClick={() => window.open(items.link, "_blank")}
        >
          {items.label}
        </h4>
      </div>
      <div className="row-children">
        {showItems &&
          items.children &&
          items.children.map((row: accordianDataType) => {
            return (
              <div key={row.id}>
                <AccordianItems items={row} />
              </div>
            );
          })}
      </div>
    </div>
  );
}
