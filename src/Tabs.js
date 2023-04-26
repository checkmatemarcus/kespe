import React, { useState } from 'react';

const Tabs = ({ children }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div>
      <div className="flex justify-center">
        <nav className="flex -mb-px space-x-8" aria-label="Tabs">
          {children.map((child, index) => (
            <button
              key={index}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm  ${
                activeTab === index
                  ? 'border-blue-500 text-gray-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => handleClick(index)}
            >
              {child.props.label}
            </button>
          ))}
        </nav>
      </div>
      <div className="mt-8">{children[activeTab]}</div>
    </div>
  );
};

export default Tabs;