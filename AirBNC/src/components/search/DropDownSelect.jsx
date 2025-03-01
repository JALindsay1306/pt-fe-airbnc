import { useState, useEffect } from "react";


export default function DropDownSelect ({parameter,parameterLabel,options,setOutput,preSelected}) {
    const [selectedOption, setSelectedOption] = useState(preSelected);
    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => setIsOpen(!isOpen);
  const handleRadioChange = (option,parameter) => {
        setSelectedOption((previous)=>({...previous,[parameter]:option}));
        setIsOpen(false);
        setOutput((previousParams)=>({...previousParams, [parameter]:option}))
      };
    return (
        <div className="dropdown-select">
        <label htmlFor={parameter}>{parameterLabel}: </label>
            <div id={parameter} className={`dropdown ${isOpen ? "open" : ""}`}>
            <button type= "button" onClick={toggleDropdown} className="dropdown-button">
            {selectedOption[parameter]}
          </button>
          <div className="dropdown-content">
            {options.map((option) => (
              <label key={option}>
                <input
                  type="radio"
                  name="dropdown-option"
                  value={option}
                  checked={selectedOption[parameter] === option}
                  onChange={() => handleRadioChange(option, parameter)}
                />
                {option}
              </label>
            ))}
          </div>
        </div>
        </div>
    )
}