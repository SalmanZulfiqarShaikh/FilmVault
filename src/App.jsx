import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Details from "./pages/Details";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/movie/:id" element={<Details />} />
        <Route path="/tv/:id" element={<Details />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
