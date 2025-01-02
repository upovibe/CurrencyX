import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface Option {
  value: string;
  label: string;
}

type AutoSelectProps = {
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
};

const AutoSelect: React.FC<AutoSelectProps> = ({
  options,
  placeholder,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options);

  useEffect(() => {
    const filteredOptions = options.filter((option) =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredOptions(filteredOptions);
  }, [searchTerm, options]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (e.target.value.trim() !== "") {
      setIsOpen(true);
    }
  };

  const handleOptionClick = (option: Option) => {
    onChange?.(option.value);
    setSearchTerm(option.label); // Update the input field with the selected option
    setIsOpen(false);
  };

  const handleChevronClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (!(e.target as HTMLElement).closest(".autoselect-wrapper")) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const handleInputClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className="relative autoselect-wrapper" onClick={handleInputClick}>
      <div className="flex items-center bg-[#37373f]">
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onClick={handleChevronClick}
          placeholder={placeholder}
          className="w-full pl-4 py-2 pr-8 text-sm focus:outline-none border-none cursor-pointer text-gray-200 bg-[#37373f]"
        />
        <ChevronDown
          onClick={handleChevronClick}
          className="cursor-pointer h-full text-gray-200 pr-2"
        />
      </div>
      {isOpen && filteredOptions.length > 0 && (
        <ul
          className="absolute z-10 w-full py-2 px-2 mt-[2px] max-h-44 overflow-y-auto bg-[#37373f] border border-gray-300 rounded shadow-md"
        >
          {filteredOptions.map((option) => (
            <li
              key={option.value}
              onClick={() => handleOptionClick(option)}
              className="px-2 py-1 text-sm text-gray-200 hover:bg-gray-500 rounded cursor-pointer"
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutoSelect;
