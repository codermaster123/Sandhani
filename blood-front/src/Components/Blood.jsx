import React,{useState} from "react"
import {AiFillEdit} from "react-icons/ai"



export default function Blood({name,amount}) {
    const [input,setInput]=useState({name:"",amount:""});
   const handleChange=(e)=>{

      setInput((prev)=>({...prev,[e.target.name]:e.target.value}));
      setAllData((prev)=>[...prev,input])
     
   }
   
    const [toggle,setToggle]=useState(false);
    const handleClick=()=>{
  	  setToggle((prev)=>{
  	     return !prev;
  	    
  	  })
  }
  const handleSubmit=(e)=>{
    e.preventDefault();
    
    
  }
  
  
    return(
      
      
	     		 <form onSubmit={handleSubmit}  className="flex flex-row justify-between items-center w-full border border-red-300">
	     		  { !toggle &&
	     		  <>
	     		  <div className="text-center border-r border-red-300 w-1/2">{name}</div>
	     		  <div className="text-center w-1/2">{amount}</div>
	     			<AiFillEdit className="text-4xl text-red-700 mr-8" onClick={handleClick} />
	     		  </>
	     		    
	     		  }
	     		
	     		  { toggle && 
	     		    <div className="w-full">
	     		      <input name="name" className="text-center outline-none border-r border-red-300 w-1/2" type="text" value={input.name}  onChange={handleChange}/>
	     		      <input name="amount" className="text-center outline-none border-r border-red-300 w-1/2" type="text" vlaue={input.amount} onChange={handleChange} />
	     		      </div>
	     		  
	     		  }
	     		 </form>
	     		 
      
      )
}
