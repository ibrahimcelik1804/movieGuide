import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import Favorites from "./pages/Favorites";
import Header from "./components/Header";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detay/:id" element={<MovieDetails />} />
        <Route path="/favori" element={<Favorites />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
