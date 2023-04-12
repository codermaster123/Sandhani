import React, { useState, useEffect,useContext } from 'react';
import {Dimensions,Image, FlatList, ActivityIndicator, View, Text } from 'react-native';
import { FlashList } from "@shopify/flash-list";

import {
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import {AuthContext} from "../../Context";

import fetcher from "../utilis/fetcher"
const SCREEN_WIDTH = Dimensions.get('window').width;

const InfiniteScrollList = () => {
  const {blood}=useContext(AuthContext)
  
  const [items, setItems] = useState([]);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [isLoading, setIsLoading] = useState(true);
  const [prevBlood,setPrevBlood]=useState(null)
  const loadMoreItems = async () => {
    
    const response = await fetch(`http://localhost:3000/getUsers?offset=${offset}&limit=${limit}`);
    const data=await response.json();
    
    setItems([...items, ...data]);
    
    setOffset(offset + limit);
    setIsLoading(false);
    
  };
   const  {data}=useQuery(["Users",isLoading,blood],()=>fetcher(`http://localhost:3000/getUsers?blood=${blood}&offset=${offset}&limit=${limit}`),{
      
      refetchOnWindowFocus: false,
      enabled:true,
      onSuccess(data){
          console.log(data)
          if(data.data!=0){
            
            if(data.data!=1&&data.data!=-1){
            
              setItems([...items, ...data]);
              setPrevBlood((prev)=>blood)
              setOffset(offset + limit);
              setIsLoading((prev)=>{return false});
          
            }
          if(data.data==-1){
              setOffset(0);
              
              setPrevBlood((prev)=>blood)
              
          }
          
          }
          else{
            setIsLoading((prev)=>{return "STOP"})
         
          }
        
      },
      onError(e){
         console.log(e)
         
      }
    })
    
  useEffect(() => {
      
      if(prevBlood!=blood){
        console.log("n"+blood)
        setItems([])
      }
    
  }, [blood]);
  useEffect(()=>{console.log(prevBlood)},[prevBlood])
  useEffect(()=>{console.log(isLoading)},[isLoading])
  
  const handleLoadMore = () => {
    if (!isLoading&&isLoading!="STOP") {
      setIsLoading((prev)=>{return true});
      //loadMoreItems();
    }
  };

  const renderItem = ({ item }) => (
    <View  className=" bg-white m-[4px] rounded-md  ">
    <View className="flex-row items-center">
    
     <Image  className="w-12 m-2 h-12  rounded-full " source={{uri:item?.img}}/>
              
      <Text className="font-semibold m-2 text-lg">{item?.name}</Text>
       <Text className="">{item?.bloodGroup}</Text>
      </View>
    </View>
  );

  const renderFooter = () => {
    if (!isLoading||isLoading=="STOP") return null;

    return (
      <View style={{ paddingVertical: 20 }}>
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  };

  return (
    <View style={{width:SCREEN_WIDTH}}>
    {items&&
    <FlashList
      data={items}
      renderItem={renderItem}
      keyExtractor={(item) => item._id}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.1}
      ListFooterComponent={renderFooter}
      estimatedItemSize={77}
    />
    }
    </View>
    
  );
};

export default InfiniteScrollList;
