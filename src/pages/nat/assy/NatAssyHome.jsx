import CardTitle from "../../../components/common/CardTitle";
import PageBreadcrumb from "../../../components/common/PageBreadcrumb";

export default function NatAssyHome() {
  return (
    <div className="min-h-screen justify-center grid gap-4 bg-gradient-to-br from-teal-200 via-white to-gray-200">
      <div className="text-center mt-8 px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-800 drop-shadow-md">DX NAT ASSEMBLY</h1>
        <p className="text-lg md:text-xl mt-3 text-slate-500">Digital Transformation</p>
        <br />
        <PageBreadcrumb pageTitle="NAT : ASSEMBLY" />
      </div>
      <div>
        <div className="text-center">Section</div>
        <hr className="my-4" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-8 md:gap-10 mb-10">
          <CardTitle disabled title={"COMBINE"} path={"/nat/assy/combine-realtime"} />
          <CardTitle title={"MBR"} path={"/nat/assy/mbr-realtime"} />
          <CardTitle disabled title={"ARP"} path={"/nat/assy/arp-realtime"} />
          <CardTitle disabled title={"GSSM"} path={"/nat/assy/gssm-realtime"} />
          <CardTitle disabled title={"FIM"} path={"/nat/assy/fim-realtime"} />
          <CardTitle disabled title={"ANT"} path={"/nat/assy/ant-realtime"} />
          <CardTitle disabled title={"AOD"} path={"/nat/assy/aod-realtime"} />
          <CardTitle disabled title={"AVS"} path={"/nat/assy/avs-realtime"} />
          <CardTitle disabled title={"ALU"} path={"/nat/assy/alu-realtime"} />
        </div>
      </div>
    </div>
  );
}
