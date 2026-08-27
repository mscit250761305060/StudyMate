import React, { useState, useRef, useEffect } from 'react';
import './CustomSelect.css';

const CustomSelect = ({ options, value, onChange, placeholder = "Select an option", disabled = false, id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const selectedOption = options.find((opt) => String(opt.value) === String(value));

  const handleSelect = (optionValue) => {
    if (disabled) return;
    onChange({ target: { value: optionValue, id } });
    setIsOpen(false);
  };

  return (
    <div className={`custom-select-container ${disabled ? 'disabled' : ''}`} ref={selectRef}>
      <div 
        className={`custom-select-trigger ${isOpen ? 'open' : ''}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <span className="selected-label">
          {selectedOption ? (
            <>
              {selectedOption.label} {selectedOption.icon && <span className="item-icon">{selectedOption.icon}</span>}
            </>
          ) : (
            placeholder
          )}
        </span>
        <svg 
          className={`arrow-icon ${isOpen ? 'open' : ''}`} 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </div>

      {isOpen && !disabled && (
        <div className="custom-select-dropdown">
          <ul className="custom-select-list">
            {options.map((option) => (
              <li
                key={option.value}
                className={`custom-select-item ${String(value) === String(option.value) ? 'selected' : ''}`}
                onClick={() => handleSelect(option.value)}
              >
                <span className="item-label">
                  {option.label} {option.icon && <span className="item-icon">{option.icon}</span>}
                </span>
                {String(value) === String(option.value) && (
                  <svg 
                    className="check-icon" 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
