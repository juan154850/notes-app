import { useState } from "react";
import { AppUI } from "./AppUi";
import { NoteProvider } from "../Components/NoteContext";
import { CategoriesProvider } from "../Components/CategoriesContext";

function App() {
  return (
    <NoteProvider>
      <CategoriesProvider>
        <AppUI />
      </CategoriesProvider>
    </NoteProvider>
  );
}

export default App;
