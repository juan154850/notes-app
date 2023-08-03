import React from "react";

const CategoryList = ({ categories }) => {
  return (
    <div className="Container">
      <h3>Category:</h3>
      <select>
        <option value="All" key="All">
          All
        </option>
        {categories.map((category) => {
          return (
            <option value={category.title} key={category.id}>
              {category.title}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export { CategoryList };
