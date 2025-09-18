import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Home";
import NatHome from "./pages/nat/NatHome";
import NatAssyMbrRealtime from "./pages/nat/NatAssyMbrRealtime";
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
        <Route path="/nat/turning" element={<NatTn />} />
        <Route path="/nat/1stgrinding" element={<Nat1stGd />} />
        <Route path="/nat/2ndgrinding" element={<Nat2ndGd />} />
        <Route path="/nat/assymbrrealtime" element={<NatAssyMbrRealtime />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
