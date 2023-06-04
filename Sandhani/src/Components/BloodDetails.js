import React, {useState,useEffect,useContext} from "react"
import {BackHandler,View,Text,ScrollView,TouchableOpacity,Modal} from "react-native"
import fetcher from "../utilis/fetcher"
import Icon from 'react-native-vector-icons/AntDesign';
import URL from "../URL";
import {
  useQuery,
  useMutation,
  useQueryClient,
  
} from '@tanstack/react-query';
import DonarModal from "./DonarModal"
import { useNavigation } from '@react-navigation/native';
import {AuthContext} from "../../Context";

const BloodDetails=({sId,sref,scrollPosition})=> {
  console.log("blood details")
  const {getBlood}=useContext(AuthContext)
  const [bloods,setBloods]=useState(null)
  const [isVisible,setVisible]=useState(false)
  const [lastPress, setLastPress] = useState(scrollPosition);
  const [page,setPage]=useState(false);
  const {isLoading}=useQuery(["bloods"],()=>fetcher(`${URL}/getblood/${sId}`,{
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
  
    
  // const handlePress=()=>{
  //   setVisible((prev)=>true)
  // }
  
  
  const changeVisible=(b)=>{
    
    getBlood(b)
    setPage((prev)=>!prev);
    
    sref.current.scrollTo({x:scrollPosition,y:0,animated: true})
    
    //setShow((prev)=>!prev)
  }
  const navigation = useNavigation();


  //   useEffect(() => {
  //   const backHandler = BackHandler.addEventListener(
  //     'hardwareBackPress',
  //     () => {
        
  //       if(page){
          
  //           navigation.goBack(null);
  //           return true
  //       }else{
            
  //           setPage((prev)=>!prev);
  //           sref.current.scrollTo({x:0,y:0,animated: true})
    
  //           return true;
            
  //       }
  //       // Do nothing when the back button is pressed
        
  //     // if (sref.current?.contentOffset.X > 0) {
  //       // console.log(sref.current.contentOffset)
        
  //       // if(sref.current.contentOffset.x>0){
  //       //   // If currently on the second screen, scroll back to the first screen
  //       //   sref.current?.scrollTo({ x: 0, y: 0, animated: true });
  //       //   return true;
  //       // } else {
  //       //   // Otherwise, navigate back to the previous screen
  //       //   navigation.goBack(null);
        
  //       //   return true;
  //       // }
  //     // return true;
        
  //     }
  //   );

  //   return () => backHandler.remove();
  // }, []);
  
            //<DonarModal groupName={blood.groupName} sId={sId} isVisible={isVisible} onChange={changeVisible}/>
   
   return (
    <View className="flex-1">
        <ScrollView
         scrollEventThrottle={16}
      
        className="m-2  rounded-md"
        >
       
        <View  className="my-[2px] bg-white  rounded-md">
               <View className="flex-row p-2 w-ful m-2 border border-red-500">
               <View className="w-1/2"><Text className="text-center">Group</Text></View>
               <View className="w-1/2"><Text className="text-center">Amount</Text></View>
               </View>
            </View>
        
            
         {bloods && bloods.map((blood)=>{
           
           return (
           <TouchableOpacity onPress={()=>changeVisible(blood)} key={blood._id} activeOpacity={0.5} className="bg-white my-[2px] rounded-md">
   
            <View  className="flex-row w-ful border border-red-500 p-2 m-2  
            ">
               <View className="w-1/2"><Text className="text-center">{blood.groupName}</Text></View>
               <View className="w-1/2"><Text className="text-center">{blood.amount}</Text></View>
               
            </View>
      
            </TouchableOpacity>
           
           )
           
           
         })}
        
        
     </ScrollView>
     </View>
)
}

export default React.memo(BloodDetails);