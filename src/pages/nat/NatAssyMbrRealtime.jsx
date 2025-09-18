import PageBreadcrumb from "../../components/common/PageBreadcrumb";
import CardProd from "../../components/common/CardProd";
import CardMC from "../../components/common/CardMC";

export default function NatAssyMbrRealtime() {
  return (
    <div>
      <PageBreadcrumb pageTitle="ASSY : Realtime" />
      <div className="flex justify-center m-2">
        <CardProd title={"MBR"} target={1100000} actual={1000000} avgCT={1.11} avgOpn={90.00} />
      </div>

      <div className="m-2">
        <CardMC
          mc_no="MC-01"
          part_no="6004ZZ"
          target={200000}
          actual={190000}
          target_ct={3.0}
          actual_ct={2.8}
          yield_per={99.99}
          opn={90}
          status={"RUNNING"}
        />
      </div>
    </div>
  );
}
