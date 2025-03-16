import TotalUserPieChart from "./total-user-piechart";
import LineBarAreaComposedChart from "./Linebar-chart";
import ServiceSalesChart from "./ServiceSalesChart";
export default function Overview() {
  return (
    <>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="p-4 bg-black shadow-md rounded-lg text-center">
          <h3 className="text-lg font-semibold text-white">Total Users</h3>
          <p className="text-3xl font-bold  text-white">2323</p>
        </div>{" "}
        <div className="p-4 bg-black shadow-md rounded-lg text-center">
          <h3 className="text-lg font-semibold text-white">Total services</h3>
          <p className="text-3xl font-bold  text-white">2323</p>
        </div>
        <div className="p-4 bg-black shadow-md rounded-lg text-center ">
          <h3 className="text-lg font-semibold text-white">Total income</h3>
          <p className="text-3xl font-bold  text-white ">2323</p>
        </div>{" "}
      </div>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        {/* TotalUserPieChart chiếm 1/3 */}
        <div className="col-span-1">
          <TotalUserPieChart />
        </div>

        {/* ServiceSalesChart chiếm 2/3 */}
        <div className="col-span-2">
          <ServiceSalesChart />
        
        </div>
      </div>

      <div>
        <LineBarAreaComposedChart />
      </div>
    </>
  );
}
