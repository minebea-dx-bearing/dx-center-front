import PageBreadcrumb from "../../../components/common/PageBreadcrumb";
import CardProd from "../../../components/common/CardProd";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import moment from "moment/moment";
import { BASE_URL } from "../../../constance/constance";

const refreshTime = 60;

export default function NatAssyCombineRealtime() {
  const [loading, setLoading] = useState(false);
  const [fetchTime, setFetchTime] = useState();
  const [countdown, setCountdown] = useState(refreshTime);

  const isFirstLoad = useRef(true);

  const [realtime_data, setRealtimeData] = useState([]);
  const [summaryData, setSummaryData] = useState({ sum_target: 0, sum_daily_ok: 0, avg_cycle_t: 0, avg_opn: 0 });

  const fetchData = async () => {
    if (isFirstLoad.current) {
      setLoading(true);
    }
    try {
      const response1 = await axios.get(`${BASE_URL}/nat/assy/mbr_realtime/get_data_realtime`, {
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
          Expires: "0",
        },
      });
      setFetchTime(moment().format("DD-MMM HH:mm"));
      setRealtimeData(response1.data.data.data);
      setSummaryData(response1.data.data.resultSummary);
    } catch (error) {
      if (isFirstLoad.current) {
        setLoading(false);
        isFirstLoad.current = false;
      }
      Swal.fire({
        title: error.message,
        icon: "warning",
        timer: 4000,
        timerProgressBar: true,
      });
    }
  };

  // useEffect(() => {
  //   fetchData();

  //   const timer = setInterval(() => {
  //     setCountdown((prevCountdown) => {
  //       if (prevCountdown <= 1) {
  //         fetchData();
  //         return refreshTime;
  //       }
  //       return prevCountdown - 1;
  //     });
  //   }, 1000);

  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, []);

  // สร้าง Component ย่อยๆ เพื่อให้โค้ดอ่านง่ายขึ้น
  const OrangeBox = ({ children, className = "" }) => (
    <div className={`bg-orange-500 text-white font-semibold rounded-lg shadow text-center p-2 ${className}`}>{children}</div>
  );

  const BlueBox = ({ children, className = "" }) => (
    <div className={`bg-blue-500 text-white font-semibold rounded-lg shadow text-center p-4 ${className}`}>{children}</div>
  );

  return (
    <div>
      <PageBreadcrumb pageTitle="ASSY : Combine Realtime" />
      <div className="flex flex-row-reverse">
        <div>
          Update : {fetchTime} <span style={{ color: "red" }}>(Refresh in {countdown}s)</span>
        </div>
      </div>

      {/* <div className="p-8 bg-gray-100">
        <div className="grid grid-cols-9 grid-rows-4 items-center gap-x-4 gap-y-2">
          <OrangeBox className="col-start-1 row-start-1">
            <div>LINE 1</div>
            <div>Prod Q'ty</div>
          </OrangeBox>
          <OrangeBox className="col-start-2 col-span-2 row-start-1">
            <div>LINE 1</div>
            <div>OEE</div>
          </OrangeBox>
          <OrangeBox className="col-start-4 row-start-1">
            <div>LINE 1</div>
            <div>STATUS</div>
          </OrangeBox>

          <BlueBox className="col-start-1 row-start-2">MBR01</BlueBox>
          <BlueBox className="col-start-2 row-start-2">ARP01</BlueBox>
          <BlueBox className="col-start-3 row-start-2">GSSM01</BlueBox>
          <BlueBox className="col-start-4 row-start-2">FIM01</BlueBox>
          <BlueBox className="col-start-6 row-start-2">AOD01</BlueBox>
          <BlueBox className="col-start-7 row-start-2">AVS01</BlueBox>
          <BlueBox className="col-start-8 row-start-2">ALU01</BlueBox>

          <OrangeBox className="col-start-1 row-start-3">
            <div>LINE 2</div>
            <div>Prod Q'ty</div>
          </OrangeBox>
          <OrangeBox className="col-start-2 col-span-2 row-start-3">
            <div>LINE 2</div>
            <div>OEE</div>
          </OrangeBox>
          <OrangeBox className="col-start-4 row-start-3">
            <div>LINE 2</div>
            <div>STATUS</div>
          </OrangeBox>

          <BlueBox className="col-start-1 row-start-4">MBR02</BlueBox>
          <BlueBox className="col-start-2 row-start-4">ARP02</BlueBox>
          <BlueBox className="col-start-3 row-start-4">GSSM02</BlueBox>
          <BlueBox className="col-start-4 row-start-4">FIM02</BlueBox>
          <BlueBox className="col-start-6 row-start-4">AOD02</BlueBox>
          <BlueBox className="col-start-7 row-start-4">AVS02</BlueBox>
          <BlueBox className="col-start-8 row-start-4">ALU02</BlueBox>

          <BlueBox className="col-start-5 row-start-2 row-span-3 h-full flex items-center justify-center">ANT01</BlueBox>
        </div>
      </div> */}

      <div className="p-8 bg-gray-100">
        <div className="grid grid-cols-9 grid-rows-4 items-center gap-x-4 gap-y-2">
          <OrangeBox className="col-start-1 row-start-1">
            <div>LINE 1</div>
            <div>Prod Q'ty</div>
          </OrangeBox>
          <OrangeBox className="col-start-2 col-span-2 row-start-1">
            <div>LINE 1</div>
            <div>OEE</div>
          </OrangeBox>
          <OrangeBox className="col-start-4 row-start-1">
            <div>LINE 1</div>
            <div>STATUS</div>
          </OrangeBox>

          <BlueBox className="col-start-1 row-start-2">MBR01</BlueBox>
          <BlueBox className="col-start-2 row-start-2">ARP01</BlueBox>
          <BlueBox className="col-start-3 row-start-2">GSSM01</BlueBox>
          <BlueBox className="col-start-4 row-start-2">FIM01</BlueBox>
          <BlueBox className="col-start-6 row-start-2">AOD01</BlueBox>
          <BlueBox className="col-start-7 row-start-2">AVS01</BlueBox>
          <BlueBox className="col-start-8 row-start-2">ALU01</BlueBox>

          <OrangeBox className="col-start-1 row-start-3">
            <div>LINE 2</div>
            <div>Prod Q'ty</div>
          </OrangeBox>
          <OrangeBox className="col-start-2 col-span-2 row-start-3">
            <div>LINE 2</div>
            <div>OEE</div>
          </OrangeBox>
          <OrangeBox className="col-start-4 row-start-3">
            <div>LINE 2</div>
            <div>STATUS</div>
          </OrangeBox>

          <BlueBox className="col-start-1 row-start-4">MBR02</BlueBox>
          <BlueBox className="col-start-2 row-start-4">ARP02</BlueBox>
          <BlueBox className="col-start-3 row-start-4">GSSM02</BlueBox>
          <BlueBox className="col-start-4 row-start-4">FIM02</BlueBox>
          <BlueBox className="col-start-6 row-start-4">AOD02</BlueBox>
          <BlueBox className="col-start-7 row-start-4">AVS02</BlueBox>
          <BlueBox className="col-start-8 row-start-4">ALU02</BlueBox>

          <BlueBox className="col-start-5 row-start-2 row-span-3 h-full flex items-center justify-center">ANT01</BlueBox>
        </div>
      </div>

      <div className="p-4 flex justify-center">
        <div className="grid grid-cols-[auto_auto_auto] text-center">
          <div className="flex justify-end">
            <div className="flex items-center">
              <div
                className="w-65 rounded-2xl border border-gray-200 bg-white shadow-md transition-transform duration-500 ease-in-out transform 
             hover:scale-105 hover:shadow-[0_10px_25px_rgba(0,0,0,0.1)] w-10hover:border-gray-200 cursor-pointer overflow-hidden"
              >
                <div className="text-center font-semibold border-b border-gray-200 py-1 bg-blue-300">MBR01</div>
                <div className="text-center text-sm border-b border-gray-200 py-1">{"TEST"}</div>
                <div className="grid grid-cols-[70px_1fr_1fr] border-b border-gray-200">
                  <div className="py-1 px-2 border-r border-gray-200 text-sm whitespace-nowrap overflow-hidden text-ellipsis">Process</div>
                  <div className="py-1 px-2 whitespace-nowrap overflow-hidden text-center text-ellipsis text-sm">GAUGE</div>
                  <div className="py-1 px-2 whitespace-nowrap overflow-hidden text-center text-ellipsis text-sm border-l border-gray-200">BALL</div>
                </div>
                <div className="grid grid-cols-[70px_1fr_1fr] border-b border-gray-200">
                  <div className="py-1 px-2 border-r border-gray-200 text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                    <div>Prod.</div>
                    <div>Actual</div>
                  </div>
                  <div className="py-1 px-2 whitespace-nowrap overflow-hidden text-ellipsis text-base">
                    <div>10,000</div>
                    <div className="text-base text-green-600">(+2,000)</div>
                  </div>
                  <div className="py-1 px-2 whitespace-nowrap overflow-hidden text-ellipsis text-base border-l border-gray-200">
                    <div>10,000</div>
                    <div className="text-base text-green-600">(+2,000)</div>
                  </div>
                </div>
                <div className="grid grid-cols-[70px_1fr_1fr] border-b border-gray-200">
                  <div className="py-1 px-2 border-r border-gray-200 text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                    <div>C/T</div>
                    <div>Actual</div>
                  </div>
                  <div className="py-1 px-2 whitespace-nowrap overflow-hidden text-ellipsis text-base">
                    1.50 s <div className="text-base text-green-600">(-0.10)</div>
                  </div>
                  <div className="py-1 px-2 whitespace-nowrap overflow-hidden text-ellipsis text-base border-l border-gray-200">
                    1.50 s <div className="text-base text-green-600">(-0.10)</div>
                  </div>
                </div>
                <div className="grid grid-cols-[70px_1fr_1fr] border-b border-gray-200">
                  <div className="py-1 px-2 border-r border-gray-200 text-sm whitespace-nowrap overflow-hidden text-ellipsis">Yield</div>
                  <div className="py-1 px-2 flex items-center">
                    <div className="relative w-full h-5 bg-gray-200 rounded-full overflow-hidden">
                      <div className="absolute left-0 top-0 h-full bg-green-400 rounded-full" style={{ width: `${99.1}%` }}></div>
                      <div className="absolute inset-0 flex items-center justify-center text-base font-bold text-gray-700">99.1%</div>
                    </div>
                  </div>
                  <div className="py-1 px-2 flex items-center border-l border-gray-200">
                    <div className="relative w-full h-5 bg-gray-200 rounded-full overflow-hidden">
                      <div className="absolute left-0 top-0 h-full bg-green-400 rounded-full" style={{ width: `${99.1}%` }}></div>
                      <div className="absolute inset-0 flex items-center justify-center text-base font-bold text-gray-700">99.1%</div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-[70px_1fr_1fr]">
                  <div className="py-1 px-2 border-r border-gray-200 text-sm whitespace-nowrap overflow-hidden text-ellipsis">Status</div>
                  <div
                    className={`py-1 px-2 font-bold text-center text-sm whitespace-nowrap overflow-hidden text-ellipsis bg-green-200 text-green-700`}
                  >
                    RUNNING
                  </div>
                  <div
                    className={`py-1 px-2 font-bold text-center text-sm whitespace-nowrap overflow-hidden text-ellipsis bg-green-200 text-green-700 border-l border-gray-200`}
                  >
                    RUNNING
                  </div>
                </div>
              </div>
              <div className="w-8 h-[10px] animated-flow"></div>
            </div>
            <div className="flex items-center">
              <div
                className="w-42 rounded-2xl border border-gray-200 bg-white shadow-md transition-transform duration-500 ease-in-out transform 
             hover:scale-105 hover:shadow-[0_10px_25px_rgba(0,0,0,0.1)] w-10hover:border-gray-200 cursor-pointer overflow-hidden"
              >
                <div className="text-center font-semibold border-b border-gray-200 py-1 bg-blue-300">ARP01</div>
                <div className="text-center text-sm border-b border-gray-200 py-1">{"TEST"}</div>
                <div className="grid grid-cols-[70px_1fr] border-b border-gray-200">
                  <div className="py-1 px-2 border-r border-gray-200 text-sm whitespace-nowrap overflow-hidden text-ellipsis">Process</div>
                  <div className="py-1 px-2 whitespace-nowrap overflow-hidden text-center text-ellipsis text-sm">ARP</div>
                </div>
                <div className="grid grid-cols-[70px_1fr] border-b border-gray-200">
                  <div className="py-1 px-2 border-r border-gray-200 text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                    <div>Prod.</div>
                    <div>Actual</div>
                  </div>
                  <div className="py-1 px-2 whitespace-nowrap overflow-hidden text-ellipsis text-base">
                    <div>10,000</div>
                    <div className="text-base text-green-600">(+2,000)</div>
                  </div>
                </div>
                <div className="grid grid-cols-[70px_1fr] border-b border-gray-200">
                  <div className="py-1 px-2 border-r border-gray-200 text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                    <div>C/T</div>
                    <div>Actual</div>
                  </div>
                  <div className="py-1 px-2 whitespace-nowrap overflow-hidden text-ellipsis text-base">
                    <div>1.50 s</div>
                    <div className="text-base text-green-600">(-0.10)</div>
                  </div>
                </div>
                <div className="grid grid-cols-[70px_1fr] border-b border-gray-200">
                  <div className="py-1 px-2 border-r border-gray-200 text-sm whitespace-nowrap overflow-hidden text-ellipsis">Yield</div>
                  <div className="py-1 px-2 flex items-center">
                    <div className="relative w-full h-5 bg-gray-200 rounded-full overflow-hidden">
                      <div className="absolute left-0 top-0 h-full bg-green-400 rounded-full" style={{ width: `${99.1}%` }}></div>
                      <div className="absolute inset-0 flex items-center justify-center text-base font-bold text-gray-700">99.1%</div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-[70px_1fr]">
                  <div className="py-1 px-2 border-r border-gray-200 text-sm whitespace-nowrap overflow-hidden text-ellipsis">Status</div>
                  <div
                    className={`py-1 px-2 font-bold text-center text-sm whitespace-nowrap overflow-hidden text-ellipsis bg-green-200 text-green-700`}
                  >
                    RUNNING
                  </div>
                </div>
              </div>
              <div className="w-8 h-[10px] animated-flow"></div>
            </div>

            <div className="flex items-center">
              <div
                className="w-65 rounded-2xl border border-gray-200 bg-white shadow-md transition-transform duration-500 ease-in-out transform 
             hover:scale-105 hover:shadow-[0_10px_25px_rgba(0,0,0,0.1)] w-10hover:border-gray-200 cursor-pointer overflow-hidden"
              >
                <div className="text-center font-semibold border-b border-gray-200 py-1 bg-blue-300">GSSM01</div>
                <div className="text-center text-sm border-b border-gray-200 py-1">{"TEST"}</div>
                <div className="grid grid-cols-[70px_1fr_1fr] border-b border-gray-200">
                  <div className="py-1 px-2 border-r border-gray-200 text-sm whitespace-nowrap overflow-hidden text-ellipsis">Process</div>
                  <div className="py-1 px-2 whitespace-nowrap overflow-hidden text-center text-ellipsis text-sm">GREASE</div>
                  <div className="py-1 px-2 whitespace-nowrap overflow-hidden text-center text-ellipsis text-sm border-l border-gray-200">SHIELD</div>
                </div>
                <div className="grid grid-cols-[70px_1fr_1fr] border-b border-gray-200">
                  <div className="py-1 px-2 border-r border-gray-200 text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                    <div>Prod.</div>
                    <div>Actual</div>
                  </div>
                  <div className="py-1 px-2 whitespace-nowrap overflow-hidden text-ellipsis text-base">
                    <div>10,000</div>
                    <div className="text-base text-green-600">(+2,000)</div>
                  </div>
                  <div className="py-1 px-2 whitespace-nowrap overflow-hidden text-ellipsis text-base border-l border-gray-200">
                    <div>10,000</div>
                    <div className="text-base text-green-600">(+2,000)</div>
                  </div>
                </div>
                <div className="grid grid-cols-[70px_1fr_1fr] border-b border-gray-200">
                  <div className="py-1 px-2 border-r border-gray-200 text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                    <div>C/T</div>
                    <div>Actual</div>
                  </div>
                  <div className="py-1 px-2 whitespace-nowrap overflow-hidden text-ellipsis text-base">
                    1.50 s <div className="text-base text-green-600">(-0.10)</div>
                  </div>
                  <div className="py-1 px-2 whitespace-nowrap overflow-hidden text-ellipsis text-base border-l border-gray-200">
                    1.50 s <div className="text-base text-green-600">(-0.10)</div>
                  </div>
                </div>
                <div className="grid grid-cols-[70px_1fr_1fr] border-b border-gray-200">
                  <div className="py-1 px-2 border-r border-gray-200 text-sm whitespace-nowrap overflow-hidden text-ellipsis">Yield</div>
                  <div className="py-1 px-2 flex items-center">
                    <div className="relative w-full h-5 bg-gray-200 rounded-full overflow-hidden">
                      <div className="absolute left-0 top-0 h-full bg-green-400 rounded-full" style={{ width: `${99.1}%` }}></div>
                      <div className="absolute inset-0 flex items-center justify-center text-base font-bold text-gray-700">99.1%</div>
                    </div>
                  </div>
                  <div className="py-1 px-2 flex items-center border-l border-gray-200">
                    <div className="relative w-full h-5 bg-gray-200 rounded-full overflow-hidden">
                      <div className="absolute left-0 top-0 h-full bg-green-400 rounded-full" style={{ width: `${99.1}%` }}></div>
                      <div className="absolute inset-0 flex items-center justify-center text-base font-bold text-gray-700">99.1%</div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-[70px_1fr_1fr]">
                  <div className="py-1 px-2 border-r border-gray-200 text-sm whitespace-nowrap overflow-hidden text-ellipsis">Status</div>
                  <div
                    className={`py-1 px-2 font-bold text-center text-sm whitespace-nowrap overflow-hidden text-ellipsis bg-green-200 text-green-700`}
                  >
                    RUNNING
                  </div>
                  <div
                    className={`py-1 px-2 font-bold text-center text-sm whitespace-nowrap overflow-hidden text-ellipsis bg-green-200 text-green-700 border-l border-gray-200`}
                  >
                    RUNNING
                  </div>
                </div>
              </div>
              <div className="w-8 h-[10px] animated-flow"></div>
            </div>

            <div className="flex items-center">
              <div
                className="w-42 rounded-2xl border border-gray-200 bg-white shadow-md transition-transform duration-500 ease-in-out transform 
             hover:scale-105 hover:shadow-[0_10px_25px_rgba(0,0,0,0.1)] w-10hover:border-gray-200 cursor-pointer overflow-hidden"
              >
                <div className="text-center font-semibold border-b border-gray-200 py-1 bg-blue-300">FIM01</div>
                <div className="text-center text-sm border-b border-gray-200 py-1">{"TEST"}</div>
                <div className="grid grid-cols-[70px_1fr] border-b border-gray-200">
                  <div className="py-1 px-2 border-r border-gray-200 text-sm whitespace-nowrap overflow-hidden text-ellipsis">Process</div>
                  <div className="py-1 px-2 whitespace-nowrap overflow-hidden text-center text-ellipsis text-sm">FIM</div>
                </div>
                <div className="grid grid-cols-[70px_1fr] border-b border-gray-200">
                  <div className="py-1 px-2 border-r border-gray-200 text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                    <div>Prod.</div>
                    <div>Actual</div>
                  </div>
                  <div className="py-1 px-2 whitespace-nowrap overflow-hidden text-ellipsis text-base">
                    <div>10,000</div>
                    <div className="text-base text-green-600">(+2,000)</div>
                  </div>
                </div>
                <div className="grid grid-cols-[70px_1fr] border-b border-gray-200">
                  <div className="py-1 px-2 border-r border-gray-200 text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                    <div>C/T</div>
                    <div>Actual</div>
                  </div>
                  <div className="py-1 px-2 whitespace-nowrap overflow-hidden text-ellipsis text-base">
                    <div>1.50 s</div>
                    <div className="text-base text-green-600">(-0.10)</div>
                  </div>
                </div>
                <div className="grid grid-cols-[70px_1fr] border-b border-gray-200">
                  <div className="py-1 px-2 border-r border-gray-200 text-sm whitespace-nowrap overflow-hidden text-ellipsis">Yield</div>
                  <div className="py-1 px-2 flex items-center">
                    <div className="relative w-full h-5 bg-gray-200 rounded-full overflow-hidden">
                      <div className="absolute left-0 top-0 h-full bg-green-400 rounded-full" style={{ width: `${99.1}%` }}></div>
                      <div className="absolute inset-0 flex items-center justify-center text-base font-bold text-gray-700">99.1%</div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-[70px_1fr]">
                  <div className="py-1 px-2 border-r border-gray-200 text-sm whitespace-nowrap overflow-hidden text-ellipsis">Status</div>
                  <div
                    className={`py-1 px-2 font-bold text-center text-sm whitespace-nowrap overflow-hidden text-ellipsis bg-green-200 text-green-700`}
                  >
                    RUNNING
                  </div>
                </div>
              </div>
              <div className="w-8 h-[10px] animated-flow"></div>
            </div>
          </div>
          <div className="flex justify-start">
            <div className="flex items-center">
              <div className="w-8 h-[10px] animated-flow"></div>
              <div
                className="w-42 rounded-2xl border border-gray-200 bg-white shadow-md transition-transform duration-500 ease-in-out transform 
             hover:scale-105 hover:shadow-[0_10px_25px_rgba(0,0,0,0.1)] w-10hover:border-gray-200 cursor-pointer overflow-hidden"
              >
                <div className="text-center font-semibold border-b border-gray-200 py-1 bg-blue-300">AOD01</div>
                <div className="text-center text-sm border-b border-gray-200 py-1">{"TEST"}</div>
                <div className="grid grid-cols-[70px_1fr] border-b border-gray-200">
                  <div className="py-1 px-2 border-r border-gray-200 text-sm whitespace-nowrap overflow-hidden text-ellipsis">Process</div>
                  <div className="py-1 px-2 whitespace-nowrap overflow-hidden text-center text-ellipsis text-sm">AOD</div>
                </div>
                <div className="grid grid-cols-[70px_1fr] border-b border-gray-200">
                  <div className="py-1 px-2 border-r border-gray-200 text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                    <div>Prod.</div>
                    <div>Actual</div>
                  </div>
                  <div className="py-1 px-2 whitespace-nowrap overflow-hidden text-ellipsis text-base">
                    <div>10,000</div>
                    <div className="text-base text-green-600">(+2,000)</div>
                  </div>
                </div>
                <div className="grid grid-cols-[70px_1fr] border-b border-gray-200">
                  <div className="py-1 px-2 border-r border-gray-200 text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                    <div>C/T</div>
                    <div>Actual</div>
                  </div>
                  <div className="py-1 px-2 whitespace-nowrap overflow-hidden text-ellipsis text-base">
                    <div>1.50 s</div>
                    <div className="text-base text-green-600">(-0.10)</div>
                  </div>
                </div>
                <div className="grid grid-cols-[70px_1fr] border-b border-gray-200">
                  <div className="py-1 px-2 border-r border-gray-200 text-sm whitespace-nowrap overflow-hidden text-ellipsis">Yield</div>
                  <div className="py-1 px-2 flex items-center">
                    <div className="relative w-full h-5 bg-gray-200 rounded-full overflow-hidden">
                      <div className="absolute left-0 top-0 h-full bg-green-400 rounded-full" style={{ width: `${99.1}%` }}></div>
                      <div className="absolute inset-0 flex items-center justify-center text-base font-bold text-gray-700">99.1%</div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-[70px_1fr]">
                  <div className="py-1 px-2 border-r border-gray-200 text-sm whitespace-nowrap overflow-hidden text-ellipsis">Status</div>
                  <div
                    className={`py-1 px-2 font-bold text-center text-sm whitespace-nowrap overflow-hidden text-ellipsis bg-green-200 text-green-700`}
                  >
                    RUNNING
                  </div>
                </div>
              </div>
              <div className="w-8 h-[10px] animated-flow"></div>
            </div>

            <div className="flex items-center">
              <div
                className="w-42 rounded-2xl border border-gray-200 bg-white shadow-md transition-transform duration-500 ease-in-out transform 
             hover:scale-105 hover:shadow-[0_10px_25px_rgba(0,0,0,0.1)] w-10hover:border-gray-200 cursor-pointer overflow-hidden"
              >
                <div className="text-center font-semibold border-b border-gray-200 py-1 bg-blue-300">AVS01</div>
                <div className="text-center text-sm border-b border-gray-200 py-1">{"TEST"}</div>
                <div className="grid grid-cols-[70px_1fr] border-b border-gray-200">
                  <div className="py-1 px-2 border-r border-gray-200 text-sm whitespace-nowrap overflow-hidden text-ellipsis">Process</div>
                  <div className="py-1 px-2 whitespace-nowrap overflow-hidden text-center text-ellipsis text-sm">AVS</div>
                </div>
                <div className="grid grid-cols-[70px_1fr] border-b border-gray-200">
                  <div className="py-1 px-2 border-r border-gray-200 text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                    <div>Prod.</div>
                    <div>Actual</div>
                  </div>
                  <div className="py-1 px-2 whitespace-nowrap overflow-hidden text-ellipsis text-base">
                    <div>10,000</div>
                    <div className="text-base text-green-600">(+2,000)</div>
                  </div>
                </div>
                <div className="grid grid-cols-[70px_1fr] border-b border-gray-200">
                  <div className="py-1 px-2 border-r border-gray-200 text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                    <div>C/T</div>
                    <div>Actual</div>
                  </div>
                  <div className="py-1 px-2 whitespace-nowrap overflow-hidden text-ellipsis text-base">
                    <div>1.50 s</div>
                    <div className="text-base text-green-600">(-0.10)</div>
                  </div>
                </div>
                <div className="grid grid-cols-[70px_1fr] border-b border-gray-200">
                  <div className="py-1 px-2 border-r border-gray-200 text-sm whitespace-nowrap overflow-hidden text-ellipsis">Yield</div>
                  <div className="py-1 px-2 flex items-center">
                    <div className="relative w-full h-5 bg-gray-200 rounded-full overflow-hidden">
                      <div className="absolute left-0 top-0 h-full bg-green-400 rounded-full" style={{ width: `${99.1}%` }}></div>
                      <div className="absolute inset-0 flex items-center justify-center text-base font-bold text-gray-700">99.1%</div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-[70px_1fr]">
                  <div className="py-1 px-2 border-r border-gray-200 text-sm whitespace-nowrap overflow-hidden text-ellipsis">Status</div>
                  <div
                    className={`py-1 px-2 font-bold text-center text-sm whitespace-nowrap overflow-hidden text-ellipsis bg-green-200 text-green-700`}
                  >
                    RUNNING
                  </div>
                </div>
              </div>
              <div className="w-8 h-[10px] animated-flow"></div>
            </div>

            <div className="flex items-center">
              <div
                className="w-42 rounded-2xl border border-gray-200 bg-white shadow-md transition-transform duration-500 ease-in-out transform 
             hover:scale-105 hover:shadow-[0_10px_25px_rgba(0,0,0,0.1)] w-10hover:border-gray-200 cursor-pointer overflow-hidden"
              >
                <div className="text-center font-semibold border-b border-gray-200 py-1 bg-blue-300">ALU01</div>
                <div className="text-center text-sm border-b border-gray-200 py-1">{"TEST"}</div>
                <div className="grid grid-cols-[70px_1fr] border-b border-gray-200">
                  <div className="py-1 px-2 border-r border-gray-200 text-sm whitespace-nowrap overflow-hidden text-ellipsis">Process</div>
                  <div className="py-1 px-2 whitespace-nowrap overflow-hidden text-center text-ellipsis text-sm">ALU</div>
                </div>
                <div className="grid grid-cols-[70px_1fr] border-b border-gray-200">
                  <div className="py-1 px-2 border-r border-gray-200 text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                    <div>Prod.</div>
                    <div>Actual</div>
                  </div>
                  <div className="py-1 px-2 whitespace-nowrap overflow-hidden text-ellipsis text-base">
                    <div>10,000</div>
                    <div className="text-base text-green-600">(+2,000)</div>
                  </div>
                </div>
                <div className="grid grid-cols-[70px_1fr] border-b border-gray-200">
                  <div className="py-1 px-2 border-r border-gray-200 text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                    <div>C/T</div>
                    <div>Actual</div>
                  </div>
                  <div className="py-1 px-2 whitespace-nowrap overflow-hidden text-ellipsis text-base">
                    <div>1.50 s</div>
                    <div className="text-base text-green-600">(-0.10)</div>
                  </div>
                </div>
                <div className="grid grid-cols-[70px_1fr] border-b border-gray-200">
                  <div className="py-1 px-2 border-r border-gray-200 text-sm whitespace-nowrap overflow-hidden text-ellipsis">Yield</div>
                  <div className="py-1 px-2 flex items-center">
                    <div className="relative w-full h-5 bg-gray-200 rounded-full overflow-hidden">
                      <div className="absolute left-0 top-0 h-full bg-green-400 rounded-full" style={{ width: `${99.1}%` }}></div>
                      <div className="absolute inset-0 flex items-center justify-center text-base font-bold text-gray-700">99.1%</div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-[70px_1fr]">
                  <div className="py-1 px-2 border-r border-gray-200 text-sm whitespace-nowrap overflow-hidden text-ellipsis">Status</div>
                  <div
                    className={`py-1 px-2 font-bold text-center text-sm whitespace-nowrap overflow-hidden text-ellipsis bg-green-200 text-green-700`}
                  >
                    RUNNING
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="flex items-center mt-50">
              <div
                className="w-65 rounded-2xl border border-gray-200 bg-white shadow-md transition-transform duration-500 ease-in-out transform 
             hover:scale-105 hover:shadow-[0_10px_25px_rgba(0,0,0,0.1)] w-10hover:border-gray-200 cursor-pointer overflow-hidden"
              >
                <div className="text-center font-semibold border-b border-gray-200 py-1 bg-blue-300">MBR02</div>
                <div className="text-center text-sm border-b border-gray-200 py-1">{"TEST"}</div>
                <div className="grid grid-cols-[70px_1fr_1fr] border-b border-gray-200">
                  <div className="py-1 px-2 border-r border-gray-200 text-sm whitespace-nowrap overflow-hidden text-ellipsis">Process</div>
                  <div className="py-1 px-2 whitespace-nowrap overflow-hidden text-center text-ellipsis text-sm">GAUGE</div>
                  <div className="py-1 px-2 whitespace-nowrap overflow-hidden text-center text-ellipsis text-sm border-l border-gray-200">BALL</div>
                </div>
                <div className="grid grid-cols-[70px_1fr_1fr] border-b border-gray-200">
                  <div className="py-1 px-2 border-r border-gray-200 text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                    <div>Prod.</div>
                    <div>Actual</div>
                  </div>
                  <div className="py-1 px-2 whitespace-nowrap overflow-hidden text-ellipsis text-base">
                    <div>10,000</div>
                    <div className="text-base text-green-600">(+2,000)</div>
                  </div>
                  <div className="py-1 px-2 whitespace-nowrap overflow-hidden text-ellipsis text-base border-l border-gray-200">
                    <div>10,000</div>
                    <div className="text-base text-green-600">(+2,000)</div>
                  </div>
                </div>
                <div className="grid grid-cols-[70px_1fr_1fr] border-b border-gray-200">
                  <div className="py-1 px-2 border-r border-gray-200 text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                    <div>C/T</div>
                    <div>Actual</div>
                  </div>
                  <div className="py-1 px-2 whitespace-nowrap overflow-hidden text-ellipsis text-base">
                    1.50 s <div className="text-base text-green-600">(-0.10)</div>
                  </div>
                  <div className="py-1 px-2 whitespace-nowrap overflow-hidden text-ellipsis text-base border-l border-gray-200">
                    1.50 s <div className="text-base text-green-600">(-0.10)</div>
                  </div>
                </div>
                <div className="grid grid-cols-[70px_1fr_1fr] border-b border-gray-200">
                  <div className="py-1 px-2 border-r border-gray-200 text-sm whitespace-nowrap overflow-hidden text-ellipsis">Yield</div>
                  <div className="py-1 px-2 flex items-center">
                    <div className="relative w-full h-5 bg-gray-200 rounded-full overflow-hidden">
                      <div className="absolute left-0 top-0 h-full bg-green-400 rounded-full" style={{ width: `${99.1}%` }}></div>
                      <div className="absolute inset-0 flex items-center justify-center text-base font-bold text-gray-700">99.1%</div>
                    </div>
                  </div>
                  <div className="py-1 px-2 flex items-center border-l border-gray-200">
                    <div className="relative w-full h-5 bg-gray-200 rounded-full overflow-hidden">
                      <div className="absolute left-0 top-0 h-full bg-green-400 rounded-full" style={{ width: `${99.1}%` }}></div>
                      <div className="absolute inset-0 flex items-center justify-center text-base font-bold text-gray-700">99.1%</div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-[70px_1fr_1fr]">
                  <div className="py-1 px-2 border-r border-gray-200 text-sm whitespace-nowrap overflow-hidden text-ellipsis">Status</div>
                  <div
                    className={`py-1 px-2 font-bold text-center text-sm whitespace-nowrap overflow-hidden text-ellipsis bg-green-200 text-green-700`}
                  >
                    RUNNING
                  </div>
                  <div
                    className={`py-1 px-2 font-bold text-center text-sm whitespace-nowrap overflow-hidden text-ellipsis bg-green-200 text-green-700 border-l border-gray-200`}
                  >
                    RUNNING
                  </div>
                </div>
              </div>
              <div className="w-8 h-[10px] animated-flow"></div>
            </div>

            <div className="flex items-center mt-50">
              <div
                className="w-42 rounded-2xl border border-gray-200 bg-white shadow-md transition-transform duration-500 ease-in-out transform 
             hover:scale-105 hover:shadow-[0_10px_25px_rgba(0,0,0,0.1)] w-10hover:border-gray-200 cursor-pointer overflow-hidden"
              >
                <div className="text-center font-semibold border-b border-gray-200 py-1 bg-blue-300">ARP02</div>
                <div className="text-center text-sm border-b border-gray-200 py-1">{"TEST"}</div>
                <div className="grid grid-cols-[70px_1fr] border-b border-gray-200">
                  <div className="py-1 px-2 border-r border-gray-200 text-sm whitespace-nowrap overflow-hidden text-ellipsis">Process</div>
                  <div className="py-1 px-2 whitespace-nowrap overflow-hidden text-center text-ellipsis text-sm">ARP</div>
                </div>
                <div className="grid grid-cols-[70px_1fr] border-b border-gray-200">
                  <div className="py-1 px-2 border-r border-gray-200 text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                    <div>Prod.</div>
                    <div>Actual</div>
                  </div>
                  <div className="py-1 px-2 whitespace-nowrap overflow-hidden text-ellipsis text-base">
                    <div>10,000</div>
                    <div className="text-base text-green-600">(+2,000)</div>
                  </div>
                </div>
                <div className="grid grid-cols-[70px_1fr] border-b border-gray-200">
                  <div className="py-1 px-2 border-r border-gray-200 text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                    <div>C/T</div>
                    <div>Actual</div>
                  </div>
                  <div className="py-1 px-2 whitespace-nowrap overflow-hidden text-ellipsis text-base">
                    <div>1.50 s</div>
                    <div className="text-base text-green-600">(-0.10)</div>
                  </div>
                </div>
                <div className="grid grid-cols-[70px_1fr] border-b border-gray-200">
                  <div className="py-1 px-2 border-r border-gray-200 text-sm whitespace-nowrap overflow-hidden text-ellipsis">Yield</div>
                  <div className="py-1 px-2 flex items-center">
                    <div className="relative w-full h-5 bg-gray-200 rounded-full overflow-hidden">
                      <div className="absolute left-0 top-0 h-full bg-green-400 rounded-full" style={{ width: `${99.1}%` }}></div>
                      <div className="absolute inset-0 flex items-center justify-center text-base font-bold text-gray-700">99.1%</div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-[70px_1fr]">
                  <div className="py-1 px-2 border-r border-gray-200 text-sm whitespace-nowrap overflow-hidden text-ellipsis">Status</div>
                  <div
                    className={`py-1 px-2 font-bold text-center text-sm whitespace-nowrap overflow-hidden text-ellipsis bg-green-200 text-green-700`}
                  >
                    RUNNING
                  </div>
                </div>
              </div>
              <div className="w-8 h-[10px] animated-flow"></div>
            </div>

            <div className="flex items-center mt-50">
              <div
                className="w-65 rounded-2xl border border-gray-200 bg-white shadow-md transition-transform duration-500 ease-in-out transform 
             hover:scale-105 hover:shadow-[0_10px_25px_rgba(0,0,0,0.1)] w-10hover:border-gray-200 cursor-pointer overflow-hidden"
              >
                <div className="text-center font-semibold border-b border-gray-200 py-1 bg-blue-300">GSSM02</div>
                <div className="text-center text-sm border-b border-gray-200 py-1">{"TEST"}</div>
                <div className="grid grid-cols-[70px_1fr_1fr] border-b border-gray-200">
                  <div className="py-1 px-2 border-r border-gray-200 text-sm whitespace-nowrap overflow-hidden text-ellipsis">Process</div>
                  <div className="py-1 px-2 whitespace-nowrap overflow-hidden text-center text-ellipsis text-sm">GREASE</div>
                  <div className="py-1 px-2 whitespace-nowrap overflow-hidden text-center text-ellipsis text-sm border-l border-gray-200">SHIELD</div>
                </div>
                <div className="grid grid-cols-[70px_1fr_1fr] border-b border-gray-200">
                  <div className="py-1 px-2 border-r border-gray-200 text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                    <div>Prod.</div>
                    <div>Actual</div>
                  </div>
                  <div className="py-1 px-2 whitespace-nowrap overflow-hidden text-ellipsis text-base">
                    <div>10,000</div>
                    <div className="text-base text-green-600">(+2,000)</div>
                  </div>
                  <div className="py-1 px-2 whitespace-nowrap overflow-hidden text-ellipsis text-base border-l border-gray-200">
                    <div>10,000</div>
                    <div className="text-base text-green-600">(+2,000)</div>
                  </div>
                </div>
                <div className="grid grid-cols-[70px_1fr_1fr] border-b border-gray-200">
                  <div className="py-1 px-2 border-r border-gray-200 text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                    <div>C/T</div>
                    <div>Actual</div>
                  </div>
                  <div className="py-1 px-2 whitespace-nowrap overflow-hidden text-ellipsis text-base">
                    1.50 s <div className="text-base text-green-600">(-0.10)</div>
                  </div>
                  <div className="py-1 px-2 whitespace-nowrap overflow-hidden text-ellipsis text-base border-l border-gray-200">
                    1.50 s <div className="text-base text-green-600">(-0.10)</div>
                  </div>
                </div>
                <div className="grid grid-cols-[70px_1fr_1fr] border-b border-gray-200">
                  <div className="py-1 px-2 border-r border-gray-200 text-sm whitespace-nowrap overflow-hidden text-ellipsis">Yield</div>
                  <div className="py-1 px-2 flex items-center">
                    <div className="relative w-full h-5 bg-gray-200 rounded-full overflow-hidden">
                      <div className="absolute left-0 top-0 h-full bg-green-400 rounded-full" style={{ width: `${99.1}%` }}></div>
                      <div className="absolute inset-0 flex items-center justify-center text-base font-bold text-gray-700">99.1%</div>
                    </div>
                  </div>
                  <div className="py-1 px-2 flex items-center border-l border-gray-200">
                    <div className="relative w-full h-5 bg-gray-200 rounded-full overflow-hidden">
                      <div className="absolute left-0 top-0 h-full bg-green-400 rounded-full" style={{ width: `${99.1}%` }}></div>
                      <div className="absolute inset-0 flex items-center justify-center text-base font-bold text-gray-700">99.1%</div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-[70px_1fr_1fr]">
                  <div className="py-1 px-2 border-r border-gray-200 text-sm whitespace-nowrap overflow-hidden text-ellipsis">Status</div>
                  <div
                    className={`py-1 px-2 font-bold text-center text-sm whitespace-nowrap overflow-hidden text-ellipsis bg-green-200 text-green-700`}
                  >
                    RUNNING
                  </div>
                  <div
                    className={`py-1 px-2 font-bold text-center text-sm whitespace-nowrap overflow-hidden text-ellipsis bg-green-200 text-green-700 border-l border-gray-200`}
                  >
                    RUNNING
                  </div>
                </div>
              </div>
              <div className="w-8 h-[10px] animated-flow"></div>
            </div>

            <div className="flex items-center mt-50">
              <div
                className="w-42 rounded-2xl border border-gray-200 bg-white shadow-md transition-transform duration-500 ease-in-out transform 
             hover:scale-105 hover:shadow-[0_10px_25px_rgba(0,0,0,0.1)] w-10hover:border-gray-200 cursor-pointer overflow-hidden"
              >
                <div className="text-center font-semibold border-b border-gray-200 py-1 bg-blue-300">FIM02</div>
                <div className="text-center text-sm border-b border-gray-200 py-1">{"TEST"}</div>
                <div className="grid grid-cols-[70px_1fr] border-b border-gray-200">
                  <div className="py-1 px-2 border-r border-gray-200 text-sm whitespace-nowrap overflow-hidden text-ellipsis">Process</div>
                  <div className="py-1 px-2 whitespace-nowrap overflow-hidden text-center text-ellipsis text-sm">FIM</div>
                </div>
                <div className="grid grid-cols-[70px_1fr] border-b border-gray-200">
                  <div className="py-1 px-2 border-r border-gray-200 text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                    <div>Prod.</div>
                    <div>Actual</div>
                  </div>
                  <div className="py-1 px-2 whitespace-nowrap overflow-hidden text-ellipsis text-base">
                    <div>10,000</div>
                    <div className="text-base text-green-600">(+2,000)</div>
                  </div>
                </div>
                <div className="grid grid-cols-[70px_1fr] border-b border-gray-200">
                  <div className="py-1 px-2 border-r border-gray-200 text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                    <div>C/T</div>
                    <div>Actual</div>
                  </div>
                  <div className="py-1 px-2 whitespace-nowrap overflow-hidden text-ellipsis text-base">
                    <div>1.50 s</div>
                    <div className="text-base text-green-600">(-0.10)</div>
                  </div>
                </div>
                <div className="grid grid-cols-[70px_1fr] border-b border-gray-200">
                  <div className="py-1 px-2 border-r border-gray-200 text-sm whitespace-nowrap overflow-hidden text-ellipsis">Yield</div>
                  <div className="py-1 px-2 flex items-center">
                    <div className="relative w-full h-5 bg-gray-200 rounded-full overflow-hidden">
                      <div className="absolute left-0 top-0 h-full bg-green-400 rounded-full" style={{ width: `${99.1}%` }}></div>
                      <div className="absolute inset-0 flex items-center justify-center text-base font-bold text-gray-700">99.1%</div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-[70px_1fr]">
                  <div className="py-1 px-2 border-r border-gray-200 text-sm whitespace-nowrap overflow-hidden text-ellipsis">Status</div>
                  <div
                    className={`py-1 px-2 font-bold text-center text-sm whitespace-nowrap overflow-hidden text-ellipsis bg-green-200 text-green-700`}
                  >
                    RUNNING
                  </div>
                </div>
              </div>
              <div className="w-8 h-[10px] animated-flow"></div>
            </div>
          </div>
          <div className="flex justify-start">
            <div className="flex items-center mt-50">
              <div className="flex items-center">
                <div className="w-8 h-[10px] animated-flow"></div>
                <div
                  className="w-42 rounded-2xl border border-gray-200 bg-white shadow-md transition-transform duration-500 ease-in-out transform 
             hover:scale-105 hover:shadow-[0_10px_25px_rgba(0,0,0,0.1)] w-10hover:border-gray-200 cursor-pointer overflow-hidden"
                >
                  <div className="text-center font-semibold border-b border-gray-200 py-1 bg-blue-300">AOD02</div>
                  <div className="text-center text-sm border-b border-gray-200 py-1">{"TEST"}</div>
                  <div className="grid grid-cols-[70px_1fr] border-b border-gray-200">
                    <div className="py-1 px-2 border-r border-gray-200 text-sm whitespace-nowrap overflow-hidden text-ellipsis">Process</div>
                    <div className="py-1 px-2 whitespace-nowrap overflow-hidden text-center text-ellipsis text-sm">AOD</div>
                  </div>
                  <div className="grid grid-cols-[70px_1fr] border-b border-gray-200">
                    <div className="py-1 px-2 border-r border-gray-200 text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                      <div>Prod.</div>
                      <div>Actual</div>
                    </div>
                    <div className="py-1 px-2 whitespace-nowrap overflow-hidden text-ellipsis text-base">
                      <div>10,000</div>
                      <div className="text-base text-green-600">(+2,000)</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-[70px_1fr] border-b border-gray-200">
                    <div className="py-1 px-2 border-r border-gray-200 text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                      <div>C/T</div>
                      <div>Actual</div>
                    </div>
                    <div className="py-1 px-2 whitespace-nowrap overflow-hidden text-ellipsis text-base">
                      <div>1.50 s</div>
                      <div className="text-base text-green-600">(-0.10)</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-[70px_1fr] border-b border-gray-200">
                    <div className="py-1 px-2 border-r border-gray-200 text-sm whitespace-nowrap overflow-hidden text-ellipsis">Yield</div>
                    <div className="py-1 px-2 flex items-center">
                      <div className="relative w-full h-5 bg-gray-200 rounded-full overflow-hidden">
                        <div className="absolute left-0 top-0 h-full bg-green-400 rounded-full" style={{ width: `${99.1}%` }}></div>
                        <div className="absolute inset-0 flex items-center justify-center text-base font-bold text-gray-700">99.1%</div>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-[70px_1fr]">
                    <div className="py-1 px-2 border-r border-gray-200 text-sm whitespace-nowrap overflow-hidden text-ellipsis">Status</div>
                    <div
                      className={`py-1 px-2 font-bold text-center text-sm whitespace-nowrap overflow-hidden text-ellipsis bg-green-200 text-green-700`}
                    >
                      RUNNING
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-8 h-[10px] animated-flow"></div>
            </div>

            <div className="flex items-center mt-50">
              <div
                className="w-42 rounded-2xl border border-gray-200 bg-white shadow-md transition-transform duration-500 ease-in-out transform 
             hover:scale-105 hover:shadow-[0_10px_25px_rgba(0,0,0,0.1)] w-10hover:border-gray-200 cursor-pointer overflow-hidden"
              >
                <div className="text-center font-semibold border-b border-gray-200 py-1 bg-blue-300">AVS02</div>
                <div className="text-center text-sm border-b border-gray-200 py-1">{"TEST"}</div>
                <div className="grid grid-cols-[70px_1fr] border-b border-gray-200">
                  <div className="py-1 px-2 border-r border-gray-200 text-sm whitespace-nowrap overflow-hidden text-ellipsis">Process</div>
                  <div className="py-1 px-2 whitespace-nowrap overflow-hidden text-center text-ellipsis text-sm">AVS</div>
                </div>
                <div className="grid grid-cols-[70px_1fr] border-b border-gray-200">
                  <div className="py-1 px-2 border-r border-gray-200 text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                    <div>Prod.</div>
                    <div>Actual</div>
                  </div>
                  <div className="py-1 px-2 whitespace-nowrap overflow-hidden text-ellipsis text-base">
                    <div>10,000</div>
                    <div className="text-base text-green-600">(+2,000)</div>
                  </div>
                </div>
                <div className="grid grid-cols-[70px_1fr] border-b border-gray-200">
                  <div className="py-1 px-2 border-r border-gray-200 text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                    <div>C/T</div>
                    <div>Actual</div>
                  </div>
                  <div className="py-1 px-2 whitespace-nowrap overflow-hidden text-ellipsis text-base">
                    <div>1.50 s</div>
                    <div className="text-base text-green-600">(-0.10)</div>
                  </div>
                </div>
                <div className="grid grid-cols-[70px_1fr] border-b border-gray-200">
                  <div className="py-1 px-2 border-r border-gray-200 text-sm whitespace-nowrap overflow-hidden text-ellipsis">Yield</div>
                  <div className="py-1 px-2 flex items-center">
                    <div className="relative w-full h-5 bg-gray-200 rounded-full overflow-hidden">
                      <div className="absolute left-0 top-0 h-full bg-green-400 rounded-full" style={{ width: `${99.1}%` }}></div>
                      <div className="absolute inset-0 flex items-center justify-center text-base font-bold text-gray-700">99.1%</div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-[70px_1fr]">
                  <div className="py-1 px-2 border-r border-gray-200 text-sm whitespace-nowrap overflow-hidden text-ellipsis">Status</div>
                  <div
                    className={`py-1 px-2 font-bold text-center text-sm whitespace-nowrap overflow-hidden text-ellipsis bg-green-200 text-green-700`}
                  >
                    RUNNING
                  </div>
                </div>
              </div>
              <div className="w-8 h-[10px] animated-flow"></div>
            </div>

            <div className="flex items-center mt-50">
              <div
                className="w-42 rounded-2xl border border-gray-200 bg-white shadow-md transition-transform duration-500 ease-in-out transform 
             hover:scale-105 hover:shadow-[0_10px_25px_rgba(0,0,0,0.1)] w-10hover:border-gray-200 cursor-pointer overflow-hidden"
              >
                <div className="text-center font-semibold border-b border-gray-200 py-1 bg-blue-300">ALU02</div>
                <div className="text-center text-sm border-b border-gray-200 py-1">{"TEST"}</div>
                <div className="grid grid-cols-[70px_1fr] border-b border-gray-200">
                  <div className="py-1 px-2 border-r border-gray-200 text-sm whitespace-nowrap overflow-hidden text-ellipsis">Process</div>
                  <div className="py-1 px-2 whitespace-nowrap overflow-hidden text-center text-ellipsis text-sm">ALU</div>
                </div>
                <div className="grid grid-cols-[70px_1fr] border-b border-gray-200">
                  <div className="py-1 px-2 border-r border-gray-200 text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                    <div>Prod.</div>
                    <div>Actual</div>
                  </div>
                  <div className="py-1 px-2 whitespace-nowrap overflow-hidden text-ellipsis text-base">
                    <div>10,000</div>
                    <div className="text-base text-green-600">(+2,000)</div>
                  </div>
                </div>
                <div className="grid grid-cols-[70px_1fr] border-b border-gray-200">
                  <div className="py-1 px-2 border-r border-gray-200 text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                    <div>C/T</div>
                    <div>Actual</div>
                  </div>
                  <div className="py-1 px-2 whitespace-nowrap overflow-hidden text-ellipsis text-base">
                    <div>1.50 s</div>
                    <div className="text-base text-green-600">(-0.10)</div>
                  </div>
                </div>
                <div className="grid grid-cols-[70px_1fr] border-b border-gray-200">
                  <div className="py-1 px-2 border-r border-gray-200 text-sm whitespace-nowrap overflow-hidden text-ellipsis">Yield</div>
                  <div className="py-1 px-2 flex items-center">
                    <div className="relative w-full h-5 bg-gray-200 rounded-full overflow-hidden">
                      <div className="absolute left-0 top-0 h-full bg-green-400 rounded-full" style={{ width: `${99.1}%` }}></div>
                      <div className="absolute inset-0 flex items-center justify-center text-base font-bold text-gray-700">99.1%</div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-[70px_1fr]">
                  <div className="py-1 px-2 border-r border-gray-200 text-sm whitespace-nowrap overflow-hidden text-ellipsis">Status</div>
                  <div
                    className={`py-1 px-2 font-bold text-center text-sm whitespace-nowrap overflow-hidden text-ellipsis bg-green-200 text-green-700`}
                  >
                    RUNNING
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-start-2 row-start-1 row-span-3 flex items-center">
            <div className="flex items-stretch">
              <div className="flex flex-col items-center">
                <div
                  className="w-40 rounded-2xl border border-gray-200 bg-white shadow-md transition-transform duration-500 ease-in-out transform 
             hover:scale-105 hover:shadow-[0_10px_25px_rgba(0,0,0,0.1)] w-10hover:border-gray-200 cursor-pointer overflow-hidden"
                >
                  <div className="text-center font-semibold border-b border-gray-200 py-1 bg-blue-300">ANT01 (REAR)</div>
                  <div className="text-center text-sm border-b border-gray-200 py-1">{"TEST"}</div>
                  <div className="grid grid-cols-[70px_1fr] border-b border-gray-200">
                    <div className="py-1 px-2 border-r border-gray-200 text-sm whitespace-nowrap overflow-hidden text-ellipsis">Process</div>
                    <div className="py-1 px-2 whitespace-nowrap overflow-hidden text-center text-ellipsis text-sm">ANT</div>
                  </div>
                  <div className="grid grid-cols-[70px_1fr] border-b border-gray-200">
                    <div className="py-1 px-2 border-r border-gray-200 text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                      <div>Prod.</div>
                      <div>Actual</div>
                    </div>
                    <div className="py-1 px-2 whitespace-nowrap overflow-hidden text-ellipsis text-base">
                      <div>10,000</div>
                      <div className="text-base text-green-600">(+2,000)</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-[70px_1fr] border-b border-gray-200">
                    <div className="py-1 px-2 border-r border-gray-200 text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                      <div>C/T</div>
                      <div>Actual</div>
                    </div>
                    <div className="py-1 px-2 whitespace-nowrap overflow-hidden text-ellipsis text-base">
                      <div>1.50 s</div>
                      <div className="text-base text-green-600">(-0.10)</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-[70px_1fr] border-b border-gray-200">
                    <div className="py-1 px-2 border-r border-gray-200 text-sm whitespace-nowrap overflow-hidden text-ellipsis">Yield</div>
                    <div className="py-1 px-2 flex items-center">
                      <div className="relative w-full h-5 bg-gray-200 rounded-full overflow-hidden">
                        <div className="absolute left-0 top-0 h-full bg-green-400 rounded-full" style={{ width: `${99.1}%` }}></div>
                        <div className="absolute inset-0 flex items-center justify-center text-base font-bold text-gray-700">99.1%</div>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-[70px_1fr]">
                    <div className="py-1 px-2 border-r border-gray-200 text-sm whitespace-nowrap overflow-hidden text-ellipsis">Status</div>
                    <div
                      className={`py-1 px-2 font-bold text-center text-sm whitespace-nowrap overflow-hidden text-ellipsis bg-green-200 text-green-700`}
                    >
                      RUNNING
                    </div>
                  </div>
                </div>

                <div className="w-3 h-[200px] animated-flow"></div>

                <div
                  className="w-40 rounded-2xl border border-gray-200 bg-white shadow-md transition-transform duration-500 ease-in-out transform 
             hover:scale-105 hover:shadow-[0_10px_25px_rgba(0,0,0,0.1)] w-10hover:border-gray-200 cursor-pointer overflow-hidden"
                >
                  <div className="text-center font-semibold border-b border-gray-200 py-1 bg-blue-300">ANT01 (FRONT)</div>
                  <div className="text-center text-sm border-b border-gray-200 py-1">{"TEST"}</div>
                  <div className="grid grid-cols-[70px_1fr] border-b border-gray-200">
                    <div className="py-1 px-2 border-r border-gray-200 text-sm whitespace-nowrap overflow-hidden text-ellipsis">Process</div>
                    <div className="py-1 px-2 whitespace-nowrap overflow-hidden text-center text-ellipsis text-sm">ANT</div>
                  </div>
                  <div className="grid grid-cols-[70px_1fr] border-b border-gray-200">
                    <div className="py-1 px-2 border-r border-gray-200 text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                      <div>Prod.</div>
                      <div>Actual</div>
                    </div>
                    <div className="py-1 px-2 whitespace-nowrap overflow-hidden text-ellipsis text-base">
                      <div>10,000</div>
                      <div className="text-base text-green-600">(+2,000)</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-[70px_1fr] border-b border-gray-200">
                    <div className="py-1 px-2 border-r border-gray-200 text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                      <div>C/T</div>
                      <div>Actual</div>
                    </div>
                    <div className="py-1 px-2 whitespace-nowrap overflow-hidden text-ellipsis text-base">
                      <div>1.50 s</div>
                      <div className="text-base text-green-600">(-0.10)</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-[70px_1fr] border-b border-gray-200">
                    <div className="py-1 px-2 border-r border-gray-200 text-sm whitespace-nowrap overflow-hidden text-ellipsis">Yield</div>
                    <div className="py-1 px-2 flex items-center">
                      <div className="relative w-full h-5 bg-gray-200 rounded-full overflow-hidden">
                        <div className="absolute left-0 top-0 h-full bg-green-400 rounded-full" style={{ width: `${99.1}%` }}></div>
                        <div className="absolute inset-0 flex items-center justify-center text-base font-bold text-gray-700">99.1%</div>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-[70px_1fr]">
                    <div className="py-1 px-2 border-r border-gray-200 text-sm whitespace-nowrap overflow-hidden text-ellipsis">Status</div>
                    <div
                      className={`py-1 px-2 font-bold text-center text-sm whitespace-nowrap overflow-hidden text-ellipsis bg-green-200 text-green-700`}
                    >
                      RUNNING
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
