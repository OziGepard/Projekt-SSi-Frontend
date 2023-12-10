import "./App.css";
import { LoginPanel } from "./components/LoginPanel/LoginPanel";
import { RegisterPanel } from "./components/RegisterPanel/RegisterPanel";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./components/HomePage/HomePage";
import { AdminPanel } from "./components/AdminPanel/AdminPanel";
import { SetStateAction, createContext, useState } from "react";

export const AppContext = createContext({
  userFilter: "",
  moviesFilter: "",
  setUserFilter: (value: string) => {},
  setMoviesFilter: (value: string) => {},
});

function App() {
  const [userFilter, setUserFilter] = useState("");
  const [moviesFilter, setMoviesFilter] = useState("");

  const updateUserFilter = (value: string) => {
     setUserFilter(value)
  };

  const updateMoviesFilter = (value: string) => {
    setMoviesFilter(value)
 };

  return (
    <AppContext.Provider value={{ userFilter,moviesFilter, setUserFilter: updateUserFilter, setMoviesFilter: updateMoviesFilter }}>
      <BrowserRouter>
        <main style={{ width: "100vw", height: "100vh", display: "flex" }}>
          <Routes>
            <Route path="/login" element={<LoginPanel />} />
            <Route path="/register" element={<RegisterPanel />} />
            <Route path="/admin_panel" element={<AdminPanel />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
        </main>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
