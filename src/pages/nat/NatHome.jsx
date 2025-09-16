import CardTitle from "../../components/common/CardTitle";

export default function NatHome() {
  return (
    <div className="min-h-screen flex justify-center grid gap-4 bg-gradient-to-br from-teal-200 via-white to-gray-200">
      <div className="text-center mt-8 px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-800 drop-shadow-md">DX NAT</h1>
        <p className="text-lg md:text-xl mt-3 text-slate-500">Digital Transformation</p>
      </div>
      <div>
        <div className="text-center">Section</div>
        <hr className="my-4" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-8 md:gap-10 mb-10">
          <CardTitle title={"Cold Forming"} disabled path={"/nat/coldforming"} />
          <CardTitle title={"Turning"} path={"/nat/turning"} />
          <CardTitle title={"1st Grinding"} path={"/nat/1stgrinding"} />
          <CardTitle title={"2nd Grinding"} path={"/nat/2ndgrinding"} />
          <CardTitle title={"ASSY"} path={"/nat/assy"} />
        </div>
      </div>
    </div>
  );
}
