import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Home";
import NatHome from "./pages/nat/NatHome";
import NatAssy from "./pages/nat/NatAssy";
import NatTn from "./pages/nat/NatTn";
import Nat1stGd from "./pages/nat/Nat1stGd";
import Nat2ndGd from "./pages/nat/Nat2ndGd";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/nat" element={<NatHome />} />
        <Route path="turning" element={<NatTn />} />
        <Route path="1stgrinding" element={<Nat1stGd />} />
        <Route path="2ndgrinding" element={<Nat2ndGd />} />
        <Route path="assy" element={<NatAssy />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
