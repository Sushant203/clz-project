import React, { useState } from "react";

const SearchFilter = () => {
  const [searchText, setSearchText] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const items = [
    "Apple",
    "Banana",
    "Cherry",
    "Durian",
    "Elderberry",
    "Fig",
    "Grape",
  ];

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchText(value);
    const suggestion = items.filter((item) =>
      item.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(suggestion);
  };

  const handleSearch = () => {
    const filtered = items.filter(
      (item) =>
        typeof item === "string" &&
        item.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center mb-4">
        <input
          type="text"
          className="w-full p-2 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Search..."
          value={searchText}
          onChange={handleInputChange}
          list="suggestions"
        />
        <datalist id="suggestions">
          {suggestions.map((item, index) => (
            <option key={index} value={item} />
          ))}
        </datalist>
        <button
          className="ml-4 px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      {searchText !== "" ? (
        filteredItems.length > 0 ? (
          <ul className="list-disc ml-8">
            {filteredItems.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        ) : (
          <p>No results found.</p>
        )
      ) : (
        <ul className="list-disc ml-8">
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchFilter;
