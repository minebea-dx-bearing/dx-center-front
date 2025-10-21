import CardTitle from "../../../components/common/CardTitle";
import PageBreadcrumb from "../../../components/common/PageBreadcrumb";

export default function NatAssyHome() {
  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="text-center mt-8 px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-800 drop-shadow-md">DX NAT ASSEMBLY</h1>
        <p className="text-lg md:text-xl mt-3 text-slate-500">Digital Transformation</p>
        <br />
        <PageBreadcrumb pageTitle="NAT : ASSEMBLY" />
      </div>
      <div className="flex-grow">
        <div className="text-center">Section</div>
        <hr className="my-4" />
        <div className="flex flex-wrap justify-center gap-8">
          <CardTitle title={"COMBINE"} path={"/nat/assy/combine-realtime"} />
          <CardTitle title={"MBR"} path={"/nat/assy/mbr-realtime"} />
          <CardTitle title={"ARP"} path={"/nat/assy/arp-realtime"} />
          <CardTitle title={"GSSM"} path={"/nat/assy/gssm-realtime"} />
          <CardTitle title={"FIM"} path={"/nat/assy/fim-realtime"} />
          <CardTitle title={"ANT"} path={"/nat/assy/ant-realtime"} />
          <CardTitle disabled title={"AOD"} path={"/nat/assy/aod-realtime"} />
          <CardTitle title={"AVS"} path={"/nat/assy/avs-realtime"} />
          <CardTitle title={"ALU"} path={"/nat/assy/alu-realtime"} />
        </div>
      </div>
    </div>
  );
}
