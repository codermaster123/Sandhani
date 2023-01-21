export default async function fetcher(...arg) {
	
	const res=await fetch(...arg);
	const data=await res.json();
	
	return data;
	
}