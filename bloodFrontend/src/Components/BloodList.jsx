import React from "react";
import fetcher from "../utilis/Fetcher"
import {useQuery} from "@tanstack/react-query";
import { useState,useEffect } from "react";
import AddBlood from "./AddBlood"
import UpdateBlood from "./UpdateBlood"
import DeleteBloods from "./DeleteBloods"
import URL from "../URL";

export default function  List(props) {
  const [bloods, setBloods] = useState();
  const [checked,setChecked]=useState(false);
  const [deleted,setDeleted]=useState([])
  const token=localStorage.getItem("token");
  
  const handleScroll=()=>{
    console.log("Scrolling")
  }
  useEffect(()=>{
      //window.addEventListener("scroll",handleScroll);
      
  },[])
  
  
  useEffect(()=>{
            
              if(deleted.length==0){
                
            
                setChecked((prev)=>false);
           
              }
              
  },[deleted])
  const {isLoading}=useQuery(["bloods"],()=>fetcher(`http://43.205.172.73/api/getblood/${props.id}`,{
      method:"GET",
      headers:{
        "Content-Type":"application/json",
        
      },
    }),{
      onSuccess:(data)=>{
        
        setBloods((prev)=>{
      return data.bloodData;
    })
    
    
    
    
      }
    })
    const handleCheck=(e,id)=>{
         if(e.target.checked){
             
             setDeleted((prev)=>{
              return ([...prev,id])
               
             });
            if(!checked){
               setChecked((prev)=>!prev)
            }
            
             
         }
         
         
         else{
              
              const upDate=deleted.filter((bid)=>bid!==id);
              
              setDeleted(upDate);
              
         
         }
         
         
        
            
    }
    const afterDelete=()=>{
      setChecked((prev)=>false);
      
    }
    
     
      return (
           <div className="overflow-x-auto w-full">
           {!checked &&<AddBlood id={props.id}/>}
           {checked && <DeleteBloods ids={deleted} afterDelete={afterDelete}/>}
  <table className="table w-full">
    
    <thead>
      <tr>
        <th>
          <label>
          </label>
        </th>
        
        <th>Name</th>
        <th>Amount</th>
        
        <th></th>
      </tr>
    </thead>
    <tbody>
      {bloods && bloods.map((blood)=>{
      return(
      <tr key={blood?._id}>
        <th >
          <label>
            <input type="checkbox"  className="checkbox md:ml-8" onChange={(e)=>handleCheck(e,blood?._id)} />
          </label>
        </th>
        <td>
          <div className="flex items-center space-x-3">
            
            <div>
              <div className="font-bold">{blood.groupName}</div>
              
            </div>
          </div>
        </td>
        <td>
          {blood.amount}
          <br/>
        </td>
        
        <th> 
          <UpdateBlood id={blood?._id}/>
        </th>
      </tr>
      
    
      )})}
           
    </tbody>
     
  </table>
</div>
        
        )
}