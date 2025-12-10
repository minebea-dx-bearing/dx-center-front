import { useEffect, useState } from "react";
import { DatePicker, Flex, Select, Space, Table, Tag } from "antd";
import PageBreadcrumb from "../../../components/common/PageBreadcrumb";
import dayjs from "dayjs";
import axios from "axios";
import Swal from "sweetalert2";
import { TWN_URL } from "../../../constance/constance";

export default function NatAssyUnMatchData() {
  const [data, setData] = useState([]);
  const [date, setDate] = useState(dayjs);
  const [shift, setShift] = useState("");

  const GET_DATA_NG = async () => {
    try {
      let dataMC = await axios.post(
        `${TWN_URL}/nat/assy/mbr-table/table_production_mbr_unmatch`,
        { date: date.format("YYYY-MM-DD"), shift: shift }
      );

      if (dataMC.data.success === true) {
        setData(dataMC.data.data);
      } else {
        setData([]);
      }
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        Swal.fire({
          icon: "error",
          text: "Network Error",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          icon: "error",
          text: "เกิดข้อผิดพลากในการโหลดข้อมูล",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };
  // first
  useEffect(() => {
    GET_DATA_NG();
  }, []);

  const onChangeShift = (value) => {
    setShift(value);
    GET_DATA_NG();
  };
  const onChangeDate = (date, dateString) => {
    setDate(date);
    GET_DATA_NG();
  };

  const columns1 = [
    {
      title: "IR NG",
      dataIndex: "ir_ng",
      key: "ir_ng",
      render: (text, record) => {
        const irNGp = record.ir_ng_pos || 0;
        const irNGn = record.ir_nng_neg || 0;
        const sum = irNGp + irNGn;

        return <p style={{ margin: 0 }}>{sum}</p>;
      },
    },
  ];

  const columns = [
    {
      title: "MC NO",
      dataIndex: "mcno",
      rowSpan: 2,
    },
    {
      title: "Model",
      dataIndex: "model",
      rowSpan: 2,
    },
    {
      title: "Gauge",
      children: [
        {
          title: "A",
          dataIndex: "a_meas",
          render: (text, record) => {
            const val = text !== undefined && text !== null ? text : 0;
            return val.toLocaleString();
          },
        },
        {
          title: "B",
          dataIndex: "b_meas",
          render: (text, record) => {
            const val = text !== undefined && text !== null ? text : 0;
            return val.toLocaleString();
          },
        },
      ],
    },
    {
      title: "A Measure",
      dataIndex: "a_meas",
      rowSpan: 2,
      render: (text, render) => {
        const val = text !== undefined && text !== null ? text : 0;
        return val.toLocaleString();
      },
    },
    {
      title: "A OK",
      dataIndex: "a_ok",
      rowSpan: 2,
      render: (text, render) => {
        const val = text !== undefined && text !== null ? text : 0;
        return val.toLocaleString();
      },
    },
    {
      title: "A NG",
      children: [
        {
          title: "NG +",
          dataIndex: "a_ng_pos",
          render: (text, record) => {
            const val = text !== undefined && text !== null ? text : 0;
            return val.toLocaleString();
          },
        },
        {
          title: "NG -",
          dataIndex: "a_ng_neg",
          render: (text, record) => {
            const val = text !== undefined && text !== null ? text : 0;
            return val.toLocaleString();
          },
        },
        {
          title: "Unmatch",
          dataIndex: "a_unm",
          render: (text, record) => {
            const val = text !== undefined && text !== null ? text : 0;
            return val.toLocaleString();
          },
        },
      ],
    },
    {
      title: "B Measure",
      dataIndex: "b_meas",
      rowSpan: 2,
      render: (text, record) => {
        const val = text !== undefined && text !== null ? text : 0;
        return val.toLocaleString();
      },
    },
    {
      title: "B OK",
      dataIndex: "b_ok",
      rowSpan: 2,
      render: (text, record) => {
        const val = text !== undefined && text !== null ? text : 0;
        return val.toLocaleString();
      },
    },
    {
      title: "B NG",
      children: [
        {
          title: "NG +",
          dataIndex: "b_ng_pos",
          render: (text, record) => {
            const val = text !== undefined && text !== null ? text : 0;
            return val.toLocaleString();
          },
        },
        {
          title: "NG -",
          dataIndex: "b_ng_neg",
          render: (text, record) => {
            const val = text !== undefined && text !== null ? text : 0;
            return val.toLocaleString();
          },
        },
        {
          title: "Unmatch",
          dataIndex: "b_unm",
          render: (text, record) => {
            const val = text !== undefined && text !== null ? text : 0;
            return val.toLocaleString();
          },
        },
      ],
    },
    {
      title: "MATCH",
      dataIndex: "match",
      rowSpan: 2,
      render: (text, record) => {
        const val = text !== undefined && text !== null ? text : 0;
        return val.toLocaleString();
      },
    },
    {
      title: "BALL",
      children: [
        {
          title: "c1",
          dataIndex: "c1",
          render: (text, record) => {
            const val = text !== undefined && text !== null ? text : 0;
            return val.toLocaleString();
          },
        },
        {
          title: "c2",
          dataIndex: "c2",
          render: (text, record) => {
            const val = text !== undefined && text !== null ? text : 0;
            return val.toLocaleString();
          },
        },
        {
          title: "c3",
          dataIndex: "c3",
          render: (text, record) => {
            const val = text !== undefined && text !== null ? text : 0;
            return val.toLocaleString();
          },
        },
        {
          title: "c4",
          dataIndex: "c4",
          render: (text, record) => {
            const val = text !== undefined && text !== null ? text : 0;
            return val.toLocaleString();
          },
        },
        {
          title: "c5",
          dataIndex: "c5",
          render: (text, record) => {
            const val = text !== undefined && text !== null ? text : 0;
            return val.toLocaleString();
          },
        },
      ],
    },
  ];
  return (
    <div>
      <PageBreadcrumb pageTitle="ASSY : Data Unmatch" />
      <div className="flex flex-row justify-center gap-2 py-2">
        <div>Date : </div>
        <div>
          <DatePicker onChange={onChangeDate} />
        </div>
        <div className="">Shift :</div>
        <div>
          <Select
            placeholder="Select M/C No"
            showSearch
            optionFilterProp="label"
            value={shift?.toUpperCase()}
            onChange={onChangeShift}
            options={[
              { value: "ALL", label: "ALL" },
              { value: "M", label: "M" },
              { value: "N", label: "N" },
            ]}
            style={{ width: 120 }}
          />
        </div>
      </div>
      <div>
        <Table
          columns={columns}
          dataSource={data}
          bordered
          pagination={false}
        />
      </div>
    </div>
  );
}
