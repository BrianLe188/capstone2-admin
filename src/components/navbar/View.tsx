import { logoDTU } from "@/assets";

const View = ()=> {
    return (
        <div className="py-1.5 bg-gray-300 w-full ">
            <div className="h-[58px] flex place-content-around items-center border-solid border-y-2 border-slate-200 p-5 bg-slate-100 shadow-sm">
                <div className="flex items-center text-white gap-2 text-sm w-full">
                    <img className="float-left w-24" src={logoDTU} />
                </div>               
            </div>
        </div>
    );
}; 

export default View;