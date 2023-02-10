import {Text,View,ScrollView,TouchableOpacity,Image} from "react-native";
import {useState} from "react"
import URL from "../URL";
import fetcher from "../utilis/fetcher"
import List from "../Components/list";

import {
  useQuery,
  useMutation,
  useQueryClient,
  
} from '@tanstack/react-query';

export default function Select() {
  const [allSandhani,setAllSandhani]=useState(null);
  
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
    const mutation = useMutation((param)=>fetcher(URL+"/userUpdate", {
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
  
    
    const handleTap=async(data)=>{
      console.log("calling to slectS");
      await mutation.mutate(data);
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
           <List key={sandhani._id} sandhani={sandhani} onTap={handleTap}/>
           )
      })}
      
      </ScrollView>
            
            
      </View>
      
      
      )
}