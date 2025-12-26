export default function MachineProductionTable({ Arrdata }) {
  return (
    <div>
      <div className="flex flex-row flex-nowrap">
        <table className="border-collapse border border-gray-400 w-full">
          <thead className="bg-gray-200 font-semibold">
            <tr>
              <th className="border border-gray-300 px-6 py-6" rowSpan={2}>
                Shift
              </th>
              <th className="border border-gray-300" colSpan={5}>
                Production (Total)
              </th>
              <th className="border border-gray-300" colSpan={2}>
                Quality
              </th>
            </tr>
            <tr>
              <th className="border border-gray-300 px-6">Target Prod.</th>
              <th className="border border-gray-300 px-6">Actual Prod.</th>
              <th className="border border-gray-300 px-6">Diff</th>
              <th className="border border-gray-300 px-6">%Achieved</th>
              <th className="border border-gray-300 px-6">%Utillization</th>
              <th className="border border-gray-300 px-6">NG</th>
              <th className="border border-gray-300 px-6">Yield</th>
            </tr>
          </thead>
          <tbody>
            {Arrdata?.M && Arrdata.M.length > 0 ? (
              Arrdata.M.map((item, i) => (
                <tr>
                  <th className="border border-gray-300 py-1 bg-gray-100">M</th>
                  <td className="border border-gray-300 text-center">{(item.target_prod || 0 ).toLocaleString()}</td>
                  <td className="border border-gray-300 text-center">{(item.prod_total || 0 ).toLocaleString()}</td>
                  <td className="border border-gray-300 text-center" style={{ color: item.target_prod - item.prod_total < 0 ? 'red' : 'black' }}>
                    {Math.round((item.target_prod - item.prod_total) || 0 ).toLocaleString()}
                  </td>
                  <td className="border border-gray-300 text-center">{item.ach ?? 0}</td>
                  <td className="border border-gray-300 text-center" style={{ color: item.utl < item.target_utl ? "red" : "black" }}>{item.utl}</td>
                  <td className="border border-gray-300 text-center">{(item.prod_ng || 0 ).toLocaleString()}</td>
                  <td className="border border-gray-300 text-center" style={{ color: item.yield < item.target_yield ? "red" : "black" }}>{item.yield}</td>
                </tr>
              ))
            ) : (
              <tr>
                <th className="border border-gray-300 py-1 bg-gray-100">M</th>
                <td className="border border-gray-300 text-center">0</td>
                <td className="border border-gray-300 text-center">0</td>
                <td className="border border-gray-300 text-center">0</td>
                <td className="border border-gray-300 text-center">0</td>
                <td className="border border-gray-300 text-center">0</td>
                <td className="border border-gray-300 text-center">0</td>
                <td className="border border-gray-300 text-center">0</td>
              </tr>
            )}
            {Arrdata?.N && Arrdata.N.length > 0 ? (
              Arrdata.N.map((item, i) => (
                <tr>
                  <th className="border border-gray-300 py-1 bg-gray-100">N</th>
                  <td className="border border-gray-300 text-center">{(item.target_prod || 0 ).toLocaleString()}</td>
                  <td className="border border-gray-300 text-center">{(item.prod_total || 0 ).toLocaleString()}</td>
                  <td className="border border-gray-300 text-center" style={{ color: item.target_prod - item.prod_total < 0 ? 'red' : 'black' }}>
                    {Math.round((item.target_prod - item.prod_total) || 0 ).toLocaleString()}
                  </td>
                  <td className="border border-gray-300 text-center">{item.ach}</td>
                  <td className="border border-gray-300 text-center" style={{ color: item.utl < item.target_utl ? "red" : "black" }}>{item.utl}</td>
                  <td className="border border-gray-300 text-center">{(item.prod_ng || 0 ).toLocaleString()}</td>
                  <td className="border border-gray-300 text-center" style={{ color: item.yield < item.target_yield ? "red" : "black" }}>{item.yield}</td>
                </tr>
              ))
            ) : (
              <tr>
                <th className="border border-gray-300 py-1 bg-gray-100">N</th>
                <td className="border border-gray-300 text-center">0</td>
                <td className="border border-gray-300 text-center">0</td>
                <td className="border border-gray-300 text-center">0</td>
                <td className="border border-gray-300 text-center">0</td>
                <td className="border border-gray-300 text-center">0</td>
                <td className="border border-gray-300 text-center">0</td>
                <td className="border border-gray-300 text-center">0</td>
              </tr>
            )}
            {Arrdata?.All && Arrdata.All.length > 0 ? (
              Arrdata.All.map((item, i) => (
                <tr className="font-semibold bg-gray-50">
                  <th className="border border-gray-300 py-1 bg-gray-100">
                    Total
                  </th>
                  <td className="border border-gray-300 text-center">{(item.target_prod || 0 ).toLocaleString()}</td>
                  <td className="border border-gray-300 text-center">{(item.prod_total || 0 ).toLocaleString()}</td>
                  <td className="border border-gray-300 text-center" style={{ color: item.target_prod - item.prod_total < 0 ? 'red' : 'black' }}>
                    {Math.round((item.target_prod - item.prod_total) || 0 ).toLocaleString()}
                  </td>
                  <td className="border border-gray-300 text-center">{item.ach}</td>
                  <td className="border border-gray-300 text-center" style={{ color: item.utl < item.target_utl ? "red" : "black" }}>{item.utl}</td>
                  <td className="border border-gray-300 text-center">{(item.prod_ng || 0 ).toLocaleString()}</td>
                  <td className="border border-gray-300 text-center" style={{ color: item.yield < item.target_yield ? "red" : "black" }}>{item.yield}</td>
                </tr>
              ))
            ) : (
              <tr className="font-semibold bg-gray-50">
                <th className="border border-gray-300 py-1 bg-gray-100">
                  Total
                </th>
                <td className="border border-gray-300 text-center">0</td>
                <td className="border border-gray-300 text-center">0</td>
                <td className="border border-gray-300 text-center">0</td>
                <td className="border border-gray-300 text-center">0</td>
                <td className="border border-gray-300 text-center">0</td>
                <td className="border border-gray-300 text-center">0</td>
                <td className="border border-gray-300 text-center">0</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
