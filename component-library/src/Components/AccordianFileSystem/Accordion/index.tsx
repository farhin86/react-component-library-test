import "./index.css";
import accordianData from "./data";
import AccordianItems from "../AccordianItems";

export interface accordianDataType {
  id: number;
  label: string;
  link?: string;
  children?: accordianDataType[];
}

export default function Accordion() {
  return (
    <div className="acc-wrapper">
      {accordianData &&
        accordianData.map((row: accordianDataType) => {
          return (
            <div key={row.id}>
              <AccordianItems items={row} />
            </div>
          );
        })}
    </div>
  );
}
