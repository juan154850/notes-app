import React, { useEffect, useState } from "react";

const CategoriesContext = React.createContext();

const CategoriesProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    try {
      const headersList = {
        Accept: "*/*",
      };

      const response = await fetch("http://localhost:3000/categories", {
        method: "GET",
        headers: headersList,
      });

      if (response.status === 200) {
        const data = await response.json();
        setCategories(data);
      } else {
        console.error("An error has occurred taking the categories.");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const createCategoryOnDB = async (title) => {
    try {
      const headersList = {
        Accept: "*/*",
        "Content-Type": "application/json",
      };

      const bodyContent = JSON.stringify({
        title,
      });

      const response = await fetch("http://localhost:3000/categories", {
        method: "POST",
        body: bodyContent,
        headers: headersList,
      });

      if (response.status === 201 || response.status === 204) {
        return getCategories();
      } else return console.error("the category could not be created. ");
    } catch (error) {
      console.error(error.message);
    }
  };

  const deleteCategoryOnDB = async (categoryId) => {
    try {
      let headersList = {
        Accept: "*/*",
      };

      let response = await fetch(`http://localhost:3000/categories/${categoryId}`, {
        method: "DELETE",
        headers: headersList,
      });

      if (response.status === 203) {
        return getCategories();
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const [selectedCategory, setSelectedCategory] = useState("All"); // New state for the selected category

  const onChangeFilteredCategory = (category) => {
    setSelectedCategory(category);
  };

  return (
    <CategoriesContext.Provider value={{ categories, createCategoryOnDB, selectedCategory, onChangeFilteredCategory, deleteCategoryOnDB }}>
      {children}
    </CategoriesContext.Provider>
  );
};

export { CategoriesContext, CategoriesProvider };
