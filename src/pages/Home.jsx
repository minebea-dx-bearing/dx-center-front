import CardTitle from "../components/common/CardTitle";

export default function Home() {
  return (
    <div className="min-h-screen justify-center grid gap-4 bg-gradient-to-br from-teal-200 via-white to-gray-200">
      <div className="text-center mb-12 mt-8 px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-800 drop-shadow-md">DX Bearing</h1>
        <p className="text-lg md:text-xl mt-3 text-slate-500">Digital Transformation</p>
      </div>
      <div>
        <div className="text-center">Factory</div>
        <hr className="my-4" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-8 md:gap-10 mb-10">
          <CardTitle title={"NAT"} path={"/nat_new"} />
          <CardTitle title={"NHT"} path={"/nht"} />
          <CardTitle title={"NMB"} path={"/nmb"} />
          <CardTitle title={"PELMEC"} path={"/pelmec"} />
          <CardTitle title={"NHB"} path={"/nhb_new"} />
          <CardTitle disabled title={"MCB"} path={"/mcb"} />
        </div>
      </div>
      <div>
        <div className="text-center">Application Center</div>
        <hr className="my-4" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-8 md:gap-10 mb-10">
          <CardTitle disabled title={"Stock ball"} path={"/ball"} />
          <CardTitle disabled title={"Stock Retainer"} path={"/retainer"} />
          <CardTitle title={"DX Job Request"} path={"/user_login"} />
        </div>
      </div>
      <p className="absolute text-sm text-center text-gray-500 -translate-x-1/2 bottom-6 left-1/2 dark:text-gray-400">
        &copy; 2025 : DX bearing team
      </p>
    </div>
  );
}
