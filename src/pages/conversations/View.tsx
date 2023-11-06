import People from "./components/people";

const View = () => {
  return (
    <div className="grid grid-cols-12 h-full">
      <People className="col-span-3" />
      <div className="col-span-9">
        <div></div>
        <input
          type="text"
          className="border rounded-lg w-full relative top-[93%] p-2"
        />
      </div>
    </div>
  );
};

export default View;
