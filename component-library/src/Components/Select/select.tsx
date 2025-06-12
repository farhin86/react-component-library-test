import { KeyboardEvent, useRef, useState } from "react";
import "./select.css";

const selectOptions = [
  "Canada",
  "Uganda",
  "India",
  "Greece",
  "Italy",
  "Paris",
  "Iceland",
  "Ireland",
  "Japan",
  "Norway",
  "Netherlands",
  "Nepal",
  "Swistzerland",
];
export const Select = () => {
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [currentFocusedOptionIndex, setCurrentFocusedOptionIndex] = useState(0);
  //   const searchedCharRef = useRef("");
  //   const searchedOptions = useRef<number[] | undefined>([]);
  //   const searchedOptionsIndex = useRef(0);
  const listRef = useRef<HTMLDivElement>(null);
  //   let searchedOptionsIndex = 0;
  //   let searchedChar = "";
  //   let searchedOptions: number[] | undefined = [];

  function handleSelectOption(selectedOptionIndex: number) {
    setSelectedIndex(selectedOptionIndex);
    setCurrentFocusedOptionIndex(selectedOptionIndex);
    // setIsSelectOpen(false);
  }

  function handleFocusOption(e: KeyboardEvent<HTMLLIElement>) {
    console.log("KEYDOWN", e.key);
    if (e.key === "ArrowDown") {
      setCurrentFocusedOptionIndex((selectedIndex) => selectedIndex + 1);
    } else if (e.key === "ArrowUp") {
      setCurrentFocusedOptionIndex((selectedIndex) => selectedIndex - 1);
    } else if (e.key === "Enter") {
      setSelectedIndex(currentFocusedOptionIndex);
    }
  }

  function handleSelect(e: KeyboardEvent<HTMLDivElement>) {
    const key = e.key;
    const matchingOptionsIndex: number[] = [];
    selectOptions.forEach((option, index) => {
      if (option.toLowerCase().startsWith(key)) {
        matchingOptionsIndex.push(index);
      }
    });

    const matchingAfterCurrnetSelection = matchingOptionsIndex.filter(
      (index) => currentFocusedOptionIndex < index
    );

    const newSelectedIndex =
      matchingAfterCurrnetSelection[0] || matchingOptionsIndex[0];
    if (newSelectedIndex) {
      setCurrentFocusedOptionIndex(newSelectedIndex);
      const offsetTop =
        listRef.current?.children[newSelectedIndex].offsetTop - 200;
      // console.log({
      //   offsetTop,
      //   el: listRef.current?.children[newSelectedIndex].innerHTML,
      // });
      setTimeout(() => {
        listRef?.current?.scrollTo({ top: offsetTop });
      }, 100);
    }
    return;
  }
  return (
    <div className="select-wrapper">
      <div
        className="select-input-wrapper"
        onClick={() => setIsSelectOpen(!isSelectOpen)}
        onKeyDown={(e) => handleSelect(e)}
        tabIndex={0}
      >
        <div className="select-input">{selectOptions[selectedIndex]}</div>
        <div className={isSelectOpen ? "arrow" : "rotate arrow"}>^</div>
      </div>
      {isSelectOpen && (
        <div className="select-option-wrapper" ref={listRef}>
          {selectOptions.map((option, index) => {
            const isSelectedOption = selectedIndex === index;
            const isFocusedOption = currentFocusedOptionIndex === index;
            return (
              <li
                onKeyDown={(e) => handleFocusOption(e)}
                className={
                  isSelectedOption
                    ? "select-option selected"
                    : isFocusedOption
                    ? "select-option focused"
                    : "select-option"
                }
                onClick={() => handleSelectOption(index)}
                key={option}
                tabIndex={1}
              >
                {option}
              </li>
            );
          })}
        </div>
      )}
    </div>
  );
};
