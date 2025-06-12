import { KeyboardEvent, useEffect, useRef, useState } from "react";
import "./multiselect.css";
import { Tag } from "../../Pages/Home/home";
// import "../../Pages/Home/home.css";

interface MultiSelectProps {
  selectedOptions: string[];
  options: string[];
  onChange: (option: string[]) => void;
  customClass: string;
  tagRenderer: (option: string, index: number) => JSX.Element;
}

export const MultiSelect = ({
  selectedOptions,
  options,
  onChange,
  customClass,
  tagRenderer,
}: MultiSelectProps) => {
  const [showOptions, setShowOptions] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [focusOptionIndex, setFocusOptionIndex] = useState(0);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const multiSelectRef = useRef(null);

  function handleRemoveOption(index: number) {
    const updatedSelectedOptions = [...selectedOptions];
    updatedSelectedOptions.splice(index, 1);
    onChange(updatedSelectedOptions);
  }

  function handleInputValue(val: string) {
    setInputVal(val);
    const currFilteredOptions = options.filter((option) => {
      if (option.toLowerCase().startsWith(val)) {
        return option;
      }
    });
    setFilteredOptions(currFilteredOptions);
    setFocusOptionIndex(0);
  }

  function handleSelectOption(val: string, index: number) {
    if (selectedOptions.indexOf(val) < 0) {
      let currSelectedOptions = [...selectedOptions, val];
      onChange(currSelectedOptions);
    }
    setFocusOptionIndex(index);
  }

  function handleFocusOption(e: KeyboardEvent<HTMLLIElement>) {
    if (e.key === "ArrowDown") {
      setFocusOptionIndex((selectedIndex) => selectedIndex + 1);
    } else if (e.key === "ArrowUp") {
      setFocusOptionIndex((selectedIndex) => selectedIndex - 1);
    } else if (e.key === "Enter") {
      handleSelectOption(filteredOptions[focusOptionIndex], focusOptionIndex);
    }
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        multiSelectRef.current &&
        !multiSelectRef.current.contains(event.target)
      ) {
        setShowOptions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [multiSelectRef]);

  return (
    <div
      className={`multi-select-wrapper ${customClass ? customClass : ""}`}
      ref={multiSelectRef}
    >
      <div className="multi-select-inner-wrapper" tabIndex={0}>
        {selectedOptions && selectedOptions.length > 0 && (
          <div className="select-tag-wrapper">
            {selectedOptions.map((option, index) => {
              return (
                <div key={index}>
                  {tagRenderer(option, index) || (
                    <Tag
                      key={option}
                      tagName={option}
                      onClose={() => {
                        handleRemoveOption(index);
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        )}
        <input
          className="input-multiselect"
          placeholder="Select multiple options"
          value={inputVal}
          onChange={(e) => handleInputValue(e.target.value)}
          onClick={() => setShowOptions(true)}
        />
        <div className="remove-open-section">
          <div className="remove-all" onClick={() => onChange([])}>
            {" "}
            X
          </div>
          <div
            className="multi-select-button"
            onClick={() => setShowOptions(!showOptions)}
          >
            ^
          </div>
        </div>
      </div>
      {showOptions && (
        <ul className="multi-select-options-wrapper">
          {filteredOptions.map((option, index) => {
            return (
              <li
                tabIndex={1}
                key={option}
                className={`multi-select-option ${
                  focusOptionIndex === index ? "focus" : ""
                }`}
                onClick={() => handleSelectOption(option, index)}
                onKeyDown={(e) => handleFocusOption(e)}
              >
                {option}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
