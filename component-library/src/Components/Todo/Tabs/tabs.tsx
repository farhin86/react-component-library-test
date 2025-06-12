import "./tabs.css";
interface TabsProps {
  list: string[];
  activeIndex: number;
  handleChageTab: (value: number) => void;
}

export const Tabs = ({ list, activeIndex, handleChageTab }: TabsProps) => {
  return (
    <div className="tabs-wrapper">
      {list.map((listItem, index) => {
        return (
          <div
            key={listItem}
            className="tab-list-wrapper"
            onClick={() => handleChageTab(index)}
          >
            <div className="tab-text">{listItem}</div>
            {activeIndex === index && <div className="tab-underline" />}
          </div>
        );
      })}
    </div>
  );
};
