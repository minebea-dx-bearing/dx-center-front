import { useEffect } from "react";
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
import NhbTnAnalysisMachine from "./pages/nhb/tn/NhbTnAnalysisMachine";
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
import PelmecMmsAssy from "./pages/pelmec/assy/PelmecMmsAssy";
import PelmecMmsTurning from "./pages/pelmec/tn/PelmecMmsTurning";
import PelmecMms1stRough from "./pages/pelmec/gd/PelmecMms1stRough";
import PelmecMms2ndOuter from "./pages/pelmec/gd/PelmecMms2ndOuter";
import PelmecMms2ndInner from "./pages/pelmec/gd/PelmecMms2ndInner";
import PelmecMmsColdForming from "./pages/pelmec/tn/PelmecMmsColdForming";
import NmbMmsTurning from "./pages/nmb/tn/NmbMmsTurning";

import NewHome from "./pages/NewHome";
import Footer from "./components/layouts/Footer";
import SidebarLayout from "./pages/SidebarLayout";
// NAT
import NatHomeNew from "./pages/natNew/NatHomeNew";
import NatTnRt from "./pages/natNew/tn/NatTnRt";
import NatTnHistory from "./pages/natNew/tn/NatTnHistory";
import NatSLRt from "./pages/natNew/gd1/NatSLRt";
import NatIRBoreRt from "./pages/natNew/gd2/ir/NatIRBoreRt";
import NatIRRwRt from "./pages/natNew/gd2/ir/NatIRRwRt";
import NatORRwRt from "./pages/natNew/gd2/or/NatORRwRt";
import NatMbrRt from "./pages/natNew/assy/NatMbrRt";
import NatAssyUnMatchData from "./pages/nat/assy/NatAssyUnMatchData";

// NHT
import NhtHomeNew from "./pages/nhtNew/NhtHomeNew";
// NMB
import NmbHomeNew from "./pages/nmbNew/NmbHomeNew";
// PELMEC
import PelmecHomeNew from "./pages/pelmecNew/PelmecHomeNew";
// NHB
import NhbHomeNew from "./pages/nhbNew/NhbHomeNew";
import NhbTnRt from "./pages/nhbNew/tn/NhbTnRt";
import NhbIRBoreRt from "./pages/nhbNew/gd2/NhbIRBoreRt";
// MCB
import McbHomeNew from "./pages/mcbNew/McbHomeNew";
import McbAssyAnalysisMachine from "./pages/mcb/assy/McbAssyAnalysisMachine";
// Page Not Found
import NotFound from "./components/common/NotFound";

import NhbGdHome from "./pages/nhb/gd2/NhbGdHome";
import NhbGd2IRBore from "./pages/nhb/gd2/NhbGd2IRBore";



function App() {
  // useEffect(() => {
  //   const scale = window.devicePixelRatio;
  //   document.body.style.zoom = (1 / scale).toString();
  //   // console.log(window.innerHeight)
  // }, []);
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
        <Route path="/nmb/tn/tn" element={<NmbMmsTurning />} />
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
        <Route path="/pelmec/tn/tn" element={<PelmecMmsTurning />} />
        <Route path="/pelmec/tn/coldforming" element={<PelmecMmsColdForming />} />
        <Route path="/pelmec/gd/1strough" element={<PelmecMms1stRough />} />
        <Route path="/pelmec/gd/2ndouter" element={<PelmecMms2ndOuter />} />
        <Route path="/pelmec/gd/2ndinner" element={<PelmecMms2ndInner />} />
        <Route path="/pelmec/assy/assy" element={<PelmecMmsAssy />} />
      </Routes>
    </BrowserRouter>
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<NewHome />} />

            <Route path="/test" element={<Test />} />

            <Route path="/nat" element={<NatLayout />}>
              <Route index element={<NatHome />} />
              <Route path="tn" element={<NatTnHome />} />
              <Route path="tn/tn-realtime" element={<NatTnRealtime />} />
              <Route path="tn/tn-realtime-oee" element={<NatTnRealtimeOee />} />
              <Route path="tn/tn-daily" element={<NatTnDaily />} />
              <Route path="tn/tn-summary-prod" element={<NatTnSummary />} />

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
              <Route path="assy/analysis-mc" element={<NatAssyAnalysisMachine/>} />
              <Route path="assy/analysis-mc" element={<NatAssyAnalysisMachine/>} />
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
              <Route path="assy/mbr-unmatch" element={<NatAssyUnMatchData />} />
              
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
            <Route path="/nhb/tn/analysis-mc" element={<NhbTnAnalysisMachine />} />
            <Route path="/nhb/gd" element={<NhbGdHome />} />
            <Route path="/nhb/gd/2ndinbore-realtime" element={<NhbGd2IRBore />} />

            <Route path="/nht" element={<NhtHome />} />
            <Route path="/nht/gd" element={<NhtGdHome />} />

            {/* NAT */}
            {/* <Route path="/nat_new" element={<DefaultHeader plant="nat" />}></Route> */}
            <Route path="/nat_new" element={< SidebarLayout plant={"nat"}/>}>
              <Route index element={<NatHomeNew/>}/>
              {/* TN */}
              <Route path="tn-realtime_new" element={<NatTnRt/>}/>
              <Route path="tn-history_new" element={<NatTnHistory/>}/>
              {/* 1st Gd */}
              <Route path="sl-realtime_new" element={<NatSLRt/>}/>
              {/* 2nd Gd IR */}
              <Route path="ir-bore-realtime_new" element={<NatIRBoreRt/>}/>
              <Route path="ir-rw-realtime_new" element={<NatIRRwRt/>}/>
              <Route path="ir-sf-realtime_new" element={<Nat2ndInSuperRealtime />} />
              {/* 2nd Gd OR */}
              <Route path="or-rw-realtime_new" element={<NatORRwRt/>}/>
              <Route path="or-sf-realtime_new" element={<Nat2ndOutSuperRealtime />} />
              {/* Assy */}
              <Route path="assy-combine-realtime_new" element={<NatAssyCombineRealtime />} />
              <Route path="assy-mbr-realtime_new" element={<NatMbrRt/>}/>
              <Route path="assy-arp-realtime_new" element={<NatAssyArpRealtime />} />
              <Route path="assy-gssm-realtime_new" element={<NatAssyGssmRealtime />} />
              <Route path="assy-fim-realtime_new" element={<NatAssyFimRealtime />} />
              <Route path="assy-ant-realtime_new" element={<NatAssyAntRealtime />} />
              <Route path="assy-avs-realtime_new" element={<NatAssyAvsRealtime />} />
              <Route path="assy-alu-realtime_new" element={<NatAssyAluRealtime />} />
              {/* Assy additional */}
              <Route path="assy-mbr-realtime_new/analysis-mc" element={<NatAssyAnalysisMachine/>} />
              <Route path="mbr-unmatch" element={<NatAssyUnMatchData />} />
              <Route path="mbr-daily" element={<NatAssyMbrDaily />} />
              <Route path="arp-daily" element={<NatAssyArpDaily />} />
              <Route path="gssm-daily" element={<NatAssyGssmDaily />} />
              <Route path="fim-daily" element={<NatAssyFimDaily />} />
            </Route>

            {/* NHT */}
            <Route path="/nht_new" element={< SidebarLayout plant={"nht"}/>}>
              <Route index element={<NhtHomeNew/>}/>
            </Route>

            {/* NMB */}
            <Route path="/nmb-t_new" element={< SidebarLayout plant={"nmb"}/>}>
              <Route index element={<NmbHomeNew/>}/>
            </Route>

            {/* PELMEC */}
            <Route path="/pelmec-t_new" element={< SidebarLayout plant={"pelmec"}/>}>
              <Route index element={<PelmecHomeNew/>}/>
            </Route>

            {/* NHB */}
            <Route path="/nhb_new" element={< SidebarLayout plant={"nhb"}/>}>
              <Route index element={<NhbHomeNew/>}/>
              <Route path="/nhb_new/tn-realtime_new" element={<NhbTnRt/>}/>
              <Route path="/nhb_new/ir-bore-realtime_new" element={<NhbIRBoreRt/>}/>
            </Route>

            {/* MCB */}
            <Route path="/mcb_new" element={< SidebarLayout plant={"mcb"}/>}>
              <Route index element={<McbHomeNew/>}/>
            </Route>

            <Route path="/mcb/assy/analysis-mc" element={<McbAssyAnalysisMachine />} />

            {/* page not found */}
            <Route path="*" exact={true} element={<NotFound/>} />
          </Routes>
        </BrowserRouter>
      </main>
      {/* <Footer/>  */}
    </div>

  );
}

export default App;