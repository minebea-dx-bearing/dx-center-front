import { ThreeDots } from "react-loader-spinner";

export default function Loading() {
  return (
    <div className="flex justify-center">
    <div className="overlay text-center"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            //   backgroundColor: "rgba(0,0,0,0.2)",
              backgroundColor: "rgba(240, 240, 240, 0.2)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: "9999",
            }}>
          <img src="/icon/loading.gif" style={{ maxWidth: "5%" }} />
      {/* <ThreeDots
        visible={true}
        height="80"
        width="80"
        color="#6085ecff"
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
      /> */}
    </div>
    </div>
  );
}
