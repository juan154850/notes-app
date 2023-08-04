import React, { useEffect, useState } from "react";

const CategoryList = ({ categories, onChangeFilteredCategory }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  categories = categories.map((category) => category.title);
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    onChangeFilteredCategory(event.target.value);
  };
  return (
    <div className="Container">
      <h3>Category:</h3>
      <select id="filter-categories-select" onChange={handleCategoryChange} value={selectedCategory}>
        <option value="All" key="default-option-categories-0" className={selectedCategory === "All" ? "selected" : ""}>
          All
        </option>
        {categories.map((category) => {
          return (
            <option value={category} key={`category-${category}`} className={selectedCategory === category ? "selected" : ""}>
              {category}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export { CategoryList };
