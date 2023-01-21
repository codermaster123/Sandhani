import React ,{useState,useEffect}from "react";


export default function Input({Icon,...props}) {
   return (
       <div
            className="flex flex-row bg-white 
        border items-center rounded-md border-red-700 md:w-[520px] h-8 md:h-10"
          >
             <Icon className="m-2 text-red-500" />
           
            <input
              className="bg-white  outline-none rounded-md"
              {...props}
            />
          </div>
          
     )
  
}