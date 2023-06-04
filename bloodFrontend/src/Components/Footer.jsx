import about from "../assets/about.jpg";
export default function Footer() {
     return (
      
        
<footer class="footer bg-red-600 text-white p-2">
 <div className="flex flex-row m-2 space-x-2">
   <img className="w-10 h-10 rounded-full " src={about} alt="" />
      
  <h1 className="font-bold text-xl">Sandhani</h1>
 </div>
</footer>

       
       )
}