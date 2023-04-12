import React from "react";
import img1 from "../assets/img.png";
// import useAuth from "../hooks/useAuth"

export default function Home() {
// 	const t=useAuth();
		
	
// 	const handle=()=>{
		
// 		console.log(t)
// 	}
	
  return (
    <>
  
      <div className="flex flex-col h-full mt-20">
        <img class="" src={img1} alt="" />
        <h1 className="md:tracking-widest  text-center font-title text-2xl md:text-6xl font-bold">
          Sandhani is a blood bank organization
        </h1>
       
      </div>
      
    </>
  );
}
