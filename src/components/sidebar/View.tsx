import { Link } from "react-router-dom";

const View = ({
  data,
}: {
  className?: string;
  data?: {
    key: string;
    name: string;
    position: string;
    // eslint-disable-next-line
    values: { id: string; name: string; path: string; icon?: any; angle_down?: any; angle_up?: any;
      // eslint-disable-next-line
      children?: {id: string; name: string; path: string; iconChildren?: any; angle_down_Children?: any; angle_up_Children?: any;}[];
    }[];
  };
}) => {
  return (
    <div className="h-screen w-64">
      <div className="h-4/5 w-64 rounded-xl bg-stone-50 mt-3 mb-2 overflow-y-scroll ml-5 scrollbar-thin scrollbar-thumb-gray-500">     
        {data &&
          data.values.map((item) => (                       
            <div key={item.id}>            
              <Link to={item.path}>                            
                <div className="flex items-center py-3 px-5 hover:text-cyan-600 hover:rounded-xl cursor-pointer">
                  <div className="w-5">
                    <img src={item.icon} className="w-5 "/>
                  </div>              
                  <p className="mx-2 font-bold text-base leading-6 w-10 ">{item.name}</p> 
                  <div className="w-5">
                    <img src={item.angle_down} className="w-3 float-right" 
                    onClick={() =>{
                      
                    }}/>
                  </div>                
                </div> 
                <div>
                  {item.children && item.children.map((item1) => (
                    <div key={item1.id} className="desplegable pl-6 hover:bg-zinc-100 hover:rounded-xl">
                      <Link to={item1.path} className="block p-2 flex items-center">
                        <div className="flex items-center cursor-pointer">
                          <div className="">
                            <img src={item1.iconChildren} className=""/>
                          </div>              
                          <p className="mx-2 font-bold text-base leading-6 w-10 ">{item1.name}</p>                
                        </div> 
                      </Link>      
                    </div>
                  ))}
                </div>
              </Link>              
            </div>            
          ))}
      </div>
    </div>
  );
};

export default View;
