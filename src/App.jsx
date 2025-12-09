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
import NatLayout from "./pages/nat/NatLayout";
import NatAssyAnalysisMachine from "./pages/nat/assy/NatAssyAnalysisMachine";
import NatAssyGssmRealtime from "./pages/nat/assy/NatAssyGssmRealtime";
import NatAssyArpRealtime from "./pages/nat/assy/NatAssyArpRealtime";
import NatAssyFimRealtime from "./pages/nat/assy/NatAssyFimRealtime";
import NatAssyAntRealtime from "./pages/nat/assy/NatAssyAntRealtime";
import NatAssyAvsRealtime from "./pages/nat/assy/NatAssyAvsRealtime";
import NatAssyAluRealtime from "./pages/nat/assy/NatAssyAluRealtime";
import NatAssyCombineRealtimeOee from "./pages/nat/assy/NatAssyCombineRealtimeOee";
import Test from "./pages/test";
import NatTnRealtimeOee from "./pages/nat/tn/NatTnRealtimeOee";
import NatTnDaily from "./pages/nat/tn/NatTnDaily";
import NatAssyMbrDaily from "./pages/nat/assy/NatAssyMbrDaily";
import NatAssyArpDaily from "./pages/nat/assy/NatAssyArpDaily";
import NatAssyGssmDaily from "./pages/nat/assy/NatAssyGssmDaily";
import NatAssyFimDaily from "./pages/nat/assy/NatAssyFimDaily";
import NatTnProdDash from "./pages/nat/tn/NatTnProdDash";
import PelmecHome from "./pages/pelmec/PelmecHome";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/test" element={<Test />} />

        <Route path="/nat" element={<NatLayout />}>
          <Route index element={<NatHome />} />
          <Route path="tn" element={<NatTnHome />} />
          <Route path="tn/tn-realtime" element={<NatTnRealtime />} />
          <Route path="tn/tn-realtime-oee" element={<NatTnRealtimeOee />} />
          <Route path="tn/tn-daily" element={<NatTnDaily />} />
          <Route path="tn/tn-summary-prod" element={<NatTnSummary />} />
          <Route path="tn/tn-prod-dash" element={<NatTnProdDash />} />

          <Route path="gd" element={<NatGdHome />} />
          <Route path="gd/2ndinbore-realtime" element={<Nat2ndInBoreRealtime />} />
          <Route path="gd/2ndinrace-realtime" element={<Nat2ndInRaceRealtime />} />
          <Route path="gd/2ndinsuper-realtime" element={<Nat2ndInSuperRealtime />} />
          <Route path="gd/2ndoutrace-realtime" element={<Nat2ndOutRaceRealtime />} />
          <Route path="gd/2ndoutsuper-realtime" element={<Nat2ndOutSuperRealtime />} />

          <Route path="assy" element={<NatAssyHome />} />
          <Route path="assy/combine-realtime" element={<NatAssyCombineRealtime />} />
          <Route path="assy/combine-realtime-oee" element={<NatAssyCombineRealtimeOee />} />
          <Route path="assy/mbr-realtime" element={<NatAssyMbrRealtime />} />
          <Route path="assy/analysis-mc" element={<NatAssyAnalysisMachine defaultMC={"mbr01"} defaultDate={"2025-11-01"}/>} />
          <Route path="assy/mbr-daily" element={<NatAssyMbrDaily />} />
          <Route path="assy/arp-realtime" element={<NatAssyArpRealtime />} />
          <Route path="assy/arp-daily" element={<NatAssyArpDaily />} />
          <Route path="assy/gssm-realtime" element={<NatAssyGssmRealtime />} />
          <Route path="assy/gssm-daily" element={<NatAssyGssmDaily />} />
          <Route path="assy/fim-realtime" element={<NatAssyFimRealtime />} />
          <Route path="assy/fim-daily" element={<NatAssyFimDaily />} />
          <Route path="assy/ant-realtime" element={<NatAssyAntRealtime />} />
          <Route path="assy/avs-realtime" element={<NatAssyAvsRealtime />} />
          <Route path="assy/alu-realtime" element={<NatAssyAluRealtime />} />
        </Route>

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

        <Route path="/pelmec" element={<PelmecHome />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
