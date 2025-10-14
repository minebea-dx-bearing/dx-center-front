import CardTitle from "../../../components/common/CardTitle";
import PageBreadcrumb from "../../../components/common/PageBreadcrumb";

export default function NatTnHome() {
  return (
    <div className="min-h-screen justify-center grid gap-4 bg-gradient-to-br from-teal-200 via-white to-gray-200">
      <div className="text-center mt-8 px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-800 drop-shadow-md">DX NAT TURNING</h1>
        <p className="text-lg md:text-xl mt-3 text-slate-500">Digital Transformation</p>
        <br />
        <PageBreadcrumb pageTitle="NAT : TURNING" />
      </div>
      <div>
        <div className="text-center">Section</div>
        <hr className="my-4" />
        <div className="flex flex-wrap justify-center gap-8">
          <CardTitle title={"TURNING"} path={"/nat/tn/tn-realtime"} />
        </div>
      </div>
    </div>
  );
}
