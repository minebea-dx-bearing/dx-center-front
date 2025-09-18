import PageBreadcrumb from "../../components/common/PageBreadcrumb";
import CardProd from "../../components/common/CardProd";
import CardMC from "../../components/common/CardMC";

export default function NatAssyMbrRealtime() {
  return (
    <div>
      <PageBreadcrumb pageTitle="ASSY : Realtime" />
      {/* <CardProd title="MBR" target="1,000,000" actual="1,000,000" avgCT="1.11" avgOpn="90.00" /> */}

      <CardMC mc_no="MC-01" part_no="6004ZZ" process={"ASSY"} target={200000} actual={190000} target_ct={3.00} actual_ct={2.80} yield_per={99.99} opn={70} status={"RUNNING"} />

      {/* <CardMC mc_no="MC-01" part_no="6004ZZ" process={["ASSY1", "ASSY2"]} target={[200000, 210000]} actual={[190000, 180000]} target_ct={[3.00, 2.9]} actual_ct={[2.80, 2.9]} yield_per={[99.99, 90.00]} opn={[70, 60]} status={["RUNNING", "RUNNING"]} /> */}
    </div>
  );
}
