import {Text,View,ScrollView,TouchableOpacity,Image} from "react-native";
import {useState} from "react"
import URL from "../URL";
import fetcher from "../utilis/fetcher"
import {
  useQuery,
  useMutation,
  useQueryClient,
  
} from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function Select() {
  const [allSandhani,setAllSandhani]=useState(null);
  const [isSelect,setSelect]=useState(false);
  const [selected,setSelected]=useState(null);
  
  const  {data,isLoading}=useQuery(["getAll"],()=>fetcher(URL+"/getAllSandhani"),{
      
      refetchOnWindowFocus: false,
      enabled:true,
      
      onSuccess(data){
        console.log(data);
        
        setAllSandhani((prev)=>{
          return data;
          
        })
        
      }
      
    })
    const mutation = useMutation((param)=>fetcher("http://localhost:3000/userUpdate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body:JSON.stringify(param),
  }), {
    enabled:true,
    onSuccess(data) {
      console.log(data)
    }
    


  })
  
    
    const handleTap=async(id)=>{
      setSelect((prev)=>!prev)
      if(isSelect){
      setSelected((prev)=>{ return id});
      const token=await AsyncStorage.getItem("userToken");
      const data={token:token,id:id}
      console.log(data)
      await mutation.mutate(data);
      
      }else{
        setSelected((prev)=>null);
      }
      
    }
    return(
      <View className="flex-1">
            <ScrollView contentContainerStyle={{
          flexGrow: 1
        }}
        keyboardShouldPersistTaps='handled'
        
      >
      {allSandhani&& allSandhani.map((sandhani)=>{
           return (
             <TouchableOpacity key={sandhani._id} activeOpacity={0.7} className="flex flex-row items-center justify-between bg-white  rounded-lg m-2 shadow-lg">
              <View className="flex-row">
              <View>
               <Image  className="w-10 m-2 h-10 border-2 border-red-300 rounded-full " source={{uri:sandhani.imageUrl}}/>
              
               </View>
               <View className="flex-col  m-2">
                  <Text className="text-lg font-bold" >{sandhani?.name}</Text>
                  <Text>{sandhani?.address}</Text>
               </View>
                </View>
               <TouchableOpacity onPress={()=>{handleTap(sandhani?._id)}} className={`${isSelect?"bg-green-500":"bg-red-700"} p-2 px-4 mr-2 rounded-full`} activeOpacity={0.5}>
                   <Text className="text-white">select</Text>
               </TouchableOpacity>
               
               
             </TouchableOpacity>
           )
      })}
      
      </ScrollView>
            
            
      </View>
      
      
      )
}