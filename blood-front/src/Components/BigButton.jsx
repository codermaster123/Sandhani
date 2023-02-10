import React from "react" 

export default function BigButton({name,...props}) {
  return (
    
    <button type="submit" className="md:w-[520px] h-10 w-[320px]  bg-red-500 rounded-md text-white ring-2 ring-red-300 ring-offset-2 hover:ring-red-700" {...props}>{name}</button>
    
    )
}