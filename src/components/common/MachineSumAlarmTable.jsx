import React from "react";
import { Table } from "antd";

export default function MachineSumAlarmTable({ data }) {
  
  const { Column, ColumnGroup } = Table;
  return (
    <div className="w-full h-[100px] rounded-2xl">
      <h2 className="text-lg text-center font-semibold mb-2 text-gray-700">
        Data table summary Alarm
      </h2>
      <div className="flex justify-center w-full">
        <div className="w-[90%] max-w-6xl">
          <Table dataSource={data} pagination={false} size="small">
            <Column title="#" dataIndex="no" key="no" />
            <Column
              title="Color"
              dataIndex="color"
              key="color"
              render={(color) => (
                <div
                  style={{
                    width: 25,
                    height: 25,
                    borderRadius: "50%",
                    backgroundColor: color,
                    padding: 0,
                    margin: 0,
                    // margin: "0 auto",
                    border: "1px solid #000",
                  }}
                />
              )}
              
            />
            <Column title="Alarm Name" dataIndex="alarm" key="alarm" />
            <ColumnGroup title="Duration Time">
              <Column title="Time" dataIndex="time" key="time" />
              <Column title="Count" dataIndex="count" key="count" />
            </ColumnGroup>
          </Table>
        </div>
      </div>
    </div>
  );
}
