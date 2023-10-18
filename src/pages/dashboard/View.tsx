import ChartOne from "./components/ChartOne";
import ChartThree from "./components/ChartThree";
import ChartTwo from "./components/ChartTwo";
import MapOne from "./components/MapOne";
import TableOne from "./components/TableOne";
import ChatCard from "./components/ChatCard";

const View = () => {
  return (
    <>
    <div className="mt-5 h-[calc(100vh-200px)] overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-500">
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
        <ChartThree />
        <MapOne />
        <div className="col-span-12 xl:col-span-8">
          <TableOne />
        </div>
        <ChatCard />
      </div>
    </div>
    </>
  );
};

export default View;
