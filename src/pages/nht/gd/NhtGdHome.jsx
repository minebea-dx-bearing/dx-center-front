import CardTitle from "../../../components/common/CardTitle";
import PageBreadcrumb from "../../../components/common/PageBreadcrumb";


export default function NhtGdHome() {
  return (
    <div className="min-h-screen justify-center grid gap-4 bg-gradient-to-br from-teal-200 via-white to-gray-200">
      <div className="text-center mt-8 px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-800 drop-shadow-md">DX NHT GRINDING</h1>
        <p className="text-lg md:text-xl mt-3 text-slate-500">Digital Transformation</p>
        <br />
        <PageBreadcrumb pageTitle="NHT : GRINDING" />
      </div>
      <div>
        <div className="text-center">Section</div>
        <hr className="my-4" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-8 md:gap-10 mb-10">
          <CardTitle disabled title={"SIDELAP"} path={"/nht/gd/sl-realtime"} />
          <CardTitle disabled title={"OD"} path={"/nht/gd/od-realtime"} />
          <CardTitle disabled title={"IN COMBINE"} path={"/nht/gd/incombine-realtime"} />
          <CardTitle disabled title={"IN BORE"} path={"/nht/gd/inbore-realtime"} />
          <CardTitle disabled title={"IN RACE"} path={"/nht/gd/inrace-realtime"} />
          <CardTitle disabled title={"IN S/F"} path={"/nht/gd/insf-realtime"} />
          <CardTitle disabled title={"OUT COMBINE"} path={"/nht/gd/outcombine-realtime"} />
          <CardTitle disabled title={"OUT RACE"} path={"/nht/gd/outrace-realtime"} />
          <CardTitle disabled title={"OUT S/F"} path={"/nht/gd/outsf-realtime"} />
        </div>
      </div>
    </div>
  );
}
