import CardTitle from "../../../components/common/CardTitle";
import PageBreadcrumb from "../../../components/common/PageBreadcrumb";

export default function NatGdHome() {
  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="text-center mt-8 px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-800 drop-shadow-md">DX NAT GRINDING</h1>
        <p className="text-lg md:text-xl mt-3 text-slate-500">Digital Transformation</p>
        <br />
        <PageBreadcrumb pageTitle="NAT : GRINDING" />
      </div>
      <div className="flex-grow">
        <div className="text-center">Section</div>
        <hr className="my-4" />
        <div className="flex flex-wrap justify-center gap-8">
          <CardTitle disabled title={"IN COMBINE"} path={"/nat/gd/2ndincombine-realtime"} />
          <CardTitle title={"IN BORE"} path={"/nat/gd/2ndinbore-realtime"} />
          <CardTitle title={"IN RACE"} path={"/nat/gd/2ndinrace-realtime"} />
          <CardTitle title={"IN S/F"} path={"/nat/gd/2ndinsuper-realtime"} />
          <CardTitle disabled title={"OUT COMBINE"} path={"/nat/gd/2ndoutcombine-realtime"} />
          <CardTitle title={"OUT RACE"} path={"/nat/gd/2ndoutrace-realtime"} />
          <CardTitle title={"OUT S/F"} path={"/nat/gd/2ndoutsuper-realtime"} />
        </div>
      </div>
    </div>
  );
}
