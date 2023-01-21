import {useState} from "react"

import BloodDetails from "./Bloods"
import AddBlood from "./AddBlood"

export default function ToggleBar(props) {
    const [toggle,setToggle]=useState();
    
    const changeToggle=(index)=>{
       setToggle((prev)=>{
          return index;
       })
   }

   return(
        <div className="w-full">
        
        <div className="flex justify-around p-2 w-full">
     
         <div className={` w-1/2 text-center p-2 border-r border-red-500 ${toggle==1?"border-b-2 border-red-500 bg-red-300 text-white":""}`}><button   onClick={()=>changeToggle(1)}>current</button></div>
         <div className={` w-1/2 text-center p-2 border-r border-red-500 ${toggle==2?"border-b-2 border-red-500 bg-red-300 text-white":""}`}><button onClick={()=>changeToggle(2)}>add</button></div>
        
       </div>
      <div>
    
      {toggle==1 && <BloodDetails id={props.id} bloods={props.bloods}/>}
      {toggle==2 && <AddBlood id={props.id}/>}
      </div>
      
     </div>
     )
  
}