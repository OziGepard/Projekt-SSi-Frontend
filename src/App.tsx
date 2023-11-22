import "./App.css";
import { LoginPanel } from "./components/LoginPanel/LoginPanel";
import { RegisterPanel } from "./components/RegisterPanel/RegisterPanel";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./components/HomePage/HomePage";
import { SetStateAction, createContext, useState } from "react";

export const AppContext = createContext({
  filter: "",
  setFilter: (value: string) => {},
});

function App() {
  const [filter, setFilter] = useState("");

  const updateFilter = (value: string) => {
    setFilter(value);
  };
  return (
    <AppContext.Provider value={{ filter, setFilter: updateFilter }}>
      <BrowserRouter>
        <main style={{ width: "100vw", height: "100vh", display: "flex" }}>
          <Routes>
            <Route path="/login" element={<LoginPanel />} />
            <Route path="/register" element={<RegisterPanel />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
        </main>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
