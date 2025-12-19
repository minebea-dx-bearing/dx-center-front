import CardTitle from "../../components/common/CardTitle";
import PageBreadcrumb from "../../components/common/PageBreadcrumb";

export default function NatHome() {
  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="text-center mt-8 px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-800 drop-shadow-md">DX NAT</h1>
        <p className="text-lg md:text-xl mt-3 text-slate-500">Digital Transformation</p>
        <br />
        <PageBreadcrumb pageTitle="NAT" />
      </div>
      <div className="flex-grow">
        <div className="text-center">Section</div>
        <hr className="my-4" />
        <div className="flex flex-wrap justify-center gap-8">
          {/* <CardTitle title={"TURNING"} path={"/nat/tn"} /> */}
          <CardTitle title={"TURNING"} path={"/nat_new/tn-realtime_new"} />
          <CardTitle title={"GRINDING"} path={"/nat/gd"} />
          <CardTitle title={"ASSEMBLY"} path={"/nat/assy"} />
        </div>
      </div>
    </div>
  );
}
