import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { ScrollToTop } from "./components/common/ScrollToTop";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
