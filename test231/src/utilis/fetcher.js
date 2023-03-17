export default async function fetcher(...arg) {
	
	
	  const res=await fetch(...arg);
	if (!res.ok) {

      throw new Error(`HTTP error! status: ${res.status}`);
    }
	const data=await res.json();
	  return data;
	
	  
	
}