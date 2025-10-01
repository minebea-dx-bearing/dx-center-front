import CardTitle from "../../../components/common/CardTitle";
import PageBreadcrumb from "../../../components/common/PageBreadcrumb";

export default function NmbAssyHome() {
  return (
    <div className="min-h-screen justify-center grid gap-4 bg-gradient-to-br from-teal-200 via-white to-gray-200">
      <div className="text-center mt-8 px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-800 drop-shadow-md">DX NMB ASSEMBLY</h1>
        <p className="text-lg md:text-xl mt-3 text-slate-500">Digital Transformation</p>
        <br />
        <PageBreadcrumb pageTitle="NMB : ASSEMBLY" />
      </div>
      <div>
        <div className="text-center">Section</div>
        <hr className="my-4" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-8 md:gap-10 mb-10">
          <CardTitle disabled title={"AGL"} path={"/nmb/assy/agl-realtime"} />
          <CardTitle disabled title={"FFL"} path={"/nmb/assy/ffl-realtime"} />
          <CardTitle disabled title={"AMT"} path={"/nmb/assy/amt-realtime"} />
          <CardTitle title={"AGR"} path={"/nmb/assy/agr-realtime"} />
          <CardTitle title={"ALU"} path={"/nmb/assy/alu-realtime"} />
          <CardTitle title={"AND"} path={"/nmb/assy/and-realtime"} />
          <CardTitle title={"APS"} path={"/nmb/assy/aps-realtime"} />
          <CardTitle title={"ARP"} path={"/nmb/assy/arp-realtime"} />
          <CardTitle title={"ASL"} path={"/nmb/assy/asl-realtime"} />
          <CardTitle title={"ASR"} path={"/nmb/assy/asr-realtime"} />
          <CardTitle title={"ASS"} path={"/nmb/assy/ASS-realtime"} />
          <CardTitle title={"AVS"} path={"/nmb/assy/AVS-realtime"} />
        </div>
      </div>
    </div>
  );
}
