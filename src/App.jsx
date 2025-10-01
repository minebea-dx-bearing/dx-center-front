import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Home";
import NatHome from "./pages/nat/NatHome";
import NatAssyMbrRealtime from "./pages/nat/assy/NatAssyMbrRealtime";
import NmbAssyAndRealtime from "./pages/nmb/assy/NmbAssyAndRealtime";
import NatAssyCombineRealtime from "./pages/nat/assy/NatAssyCombineRealtime";
import NmbAssyArpRealtime from "./pages/nmb/assy/NmbAssyArpRealtime";
import NmbAssyAgrRealtime from "./pages/nmb/assy/NmbAssyAgrRealtime";
import NmbAssyAsrRealtime from "./pages/nmb/assy/NmbAssyAsrRealtime";
import NmbAssyAssRealtime from "./pages/nmb/assy/NmbAssyAssRealtime";
import NmbAssyAluRealtime from "./pages/nmb/assy/NmbAssyAluRealtime";
import NmbAssyApsRealtime from "./pages/nmb/assy/NmbAssyApsRealtime";
import NmbAssyAslRealtime from "./pages/nmb/assy/NmbAssyAslRealtime";
import NmbAssyAvsRealtime from "./pages/nmb/assy/NmbAssyAvsRealtime";
import NatAssyHome from "./pages/nat/assy/NatAssyHome";
import NmbHome from "./pages/nmb/NmbHome";
import NmbAssyHome from "./pages/nmb/assy/NmbAssyHome";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/nat" element={<NatHome />} />
        <Route path="/nat/assy" element={<NatAssyHome />} />
        <Route path="/nat/assy/combine-realtime" element={<NatAssyCombineRealtime />} />
        <Route path="/nat/assy/mbr-realtime" element={<NatAssyMbrRealtime />} />

        <Route path="/nmb" element={<NmbHome />} />
        <Route path="/nmb/assy" element={<NmbAssyHome />} />
        <Route path="/nmb/assy/agr-realtime" element={<NmbAssyAgrRealtime />} />
        <Route path="/nmb/assy/alu-realtime" element={<NmbAssyAluRealtime />} />
        <Route path="/nmb/assy/and-realtime" element={<NmbAssyAndRealtime />} />
        <Route path="/nmb/assy/aps-realtime" element={<NmbAssyApsRealtime />} />
        <Route path="/nmb/assy/arp-realtime" element={<NmbAssyArpRealtime />} />
        <Route path="/nmb/assy/asl-realtime" element={<NmbAssyAslRealtime />} />
        <Route path="/nmb/assy/asr-realtime" element={<NmbAssyAsrRealtime />} />
        <Route path="/nmb/assy/ass-realtime" element={<NmbAssyAssRealtime />} />
        <Route path="/nmb/assy/avs-realtime" element={<NmbAssyAvsRealtime />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
