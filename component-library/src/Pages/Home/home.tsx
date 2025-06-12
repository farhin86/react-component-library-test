import "./home.css";
import { useState } from "react";
import { MultiSelect } from "../../Components/MultiSelect/multiselect";
import { Select } from "../../Components/Select/select";
import { Timer } from "../../Components/TimerSystem/Timer/timer";
import { TodoList } from "../../Components/Todo/TodoList/todoList";
import { Algorithm } from "../../Components/Algorithm/algorithm";
import {
  multiSelectOptions,
  preSelectedOptions,
} from "../../Constants/generic";
import Accordion from "../../Components/AccordianFileSystem/Accordion";
interface Tag {
  tagName: string;
  onClose: Function;
}
export const Tag = ({ tagName, onClose }: Tag) => {
  return (
    <div className="tag-wrapper">
      <div className="tag-name">{tagName}</div>
      <div className="tag-close" onClick={() => onClose()}>
        X
      </div>
    </div>
  );
};
export const Home = () => {
  const [selectedOptions, setSelectedOptions] =
    useState<string[]>(preSelectedOptions);

  function handleSelectedOptions(selectedOptions: string[]) {
    console.log(selectedOptions);
    setSelectedOptions(selectedOptions);
  }

  function handleRemoveOption(index: number) {
    const updatedSelectedOptions = [...selectedOptions];
    updatedSelectedOptions.splice(index, 1);
    setSelectedOptions(updatedSelectedOptions);
  }

  function handleTagRenderer(tagName: string, index: number) {
    return (
      <Tag
        key={tagName}
        tagName={tagName}
        onClose={() => {
          handleRemoveOption(index);
        }}
      />
    );
  }

  return (
    <div>
      <Accordion />
      {/* <Algorithm /> */}
      {/* <h4>Custom Multi Select</h4>
      <MultiSelect
        selectedOptions={selectedOptions}
        options={multiSelectOptions}
        onChange={(selectedOptions) => handleSelectedOptions(selectedOptions)}
        customClass={"short-multi-select"}
        tagRenderer={handleTagRenderer}
      />
      <h4>Custom Select Tag</h4>
      <Select /> */}
      {/* <Timer /> */}
      {/* <TodoList /> */}
    </div>
  );
};
