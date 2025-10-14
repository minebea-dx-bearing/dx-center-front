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
import NhbTnTnRealtime from "./pages/nhb/tn/NhbtntnRealtime";
import NhbHome from "./pages/nhb/NhbHome";
import NhbTnHome from "./pages/nhb/tn/NhbTnHome";
import NhtHome from "./pages/nht/NhtHome";
import NhtGdHome from "./pages/nht/gd/NhtGdHome";
import NatTnHome from "./pages/nat/tn/NatTnHome";
import NatTnRealtime from "./pages/nat/tn/NatTnRealtime";
import Nat2ndInBoreRealtime from "./pages/nat/gd/Nat2ndInBoreRealtime";
import NatGdHome from "./pages/nat/gd/NatGdHome";
import Nat2ndInRaceRealtime from "./pages/nat/gd/Nat2ndInRaceRealtime";
import Nat2ndInSuperRealtime from "./pages/nat/gd/Nat2ndInSuperRealtime";
import Nat2ndOutSuperRealtime from "./pages/nat/gd/Nat2ndOutSuperRealtime";
import Nat2ndOutRaceRealtime from "./pages/nat/gd/Nat2ndOutRaceRealtime";
import NatTnSummary from "./pages/nat/tn/NatTnSummary";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/nat" element={<NatHome />} />
        <Route path="/nat/tn" element={<NatTnHome />} />
        <Route path="/nat/tn/tn-realtime" element={<NatTnRealtime />} />
        <Route path="/nat/tn/tn-summary" element={<NatTnSummary />} />

        <Route path="/nat/gd" element={<NatGdHome />} />
        <Route path="/nat/gd/2ndinbore-realtime" element={<Nat2ndInBoreRealtime />} />
        <Route path="/nat/gd/2ndinrace-realtime" element={<Nat2ndInRaceRealtime />} />
        <Route path="/nat/gd/2ndinsuper-realtime" element={<Nat2ndInSuperRealtime />} />
        <Route path="/nat/gd/2ndoutrace-realtime" element={<Nat2ndOutRaceRealtime />} />
        <Route path="/nat/gd/2ndoutsuper-realtime" element={<Nat2ndOutSuperRealtime />} />

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

        <Route path="/nhb" element={<NhbHome />} />
        <Route path="/nhb/tn" element={<NhbTnHome />} />
        <Route path="/nhb/tn/tn-realtime" element={<NhbTnTnRealtime />} />

        <Route path="/nht" element={<NhtHome />} />
        <Route path="/nht/gd" element={<NhtGdHome />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
