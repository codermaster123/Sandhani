import React, {useEffect, useState} from 'react';
import {
  Alert,
  StatusBar,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {
  useQuery,
  useMutation,
  useQueryClient,
  
} from '@tanstack/react-query';
import fetcher from "../utilis/fetcher"
import URL from "../URL";
import LoadingIndicator from "../Components/LoadingIndicator"

const App = ({navigation}) => {
  
  
  const [blood, setBlood] = useState(null);
  const [district, setDistrict] = useState(null);
  const [upazila, setUpazila] = useState(null);
  const [data,setData]=useState(null);
  const [isFocus, setIsFocus] = useState(false);

   const {mutate,isLoading} = useMutation((param)=>fetcher(`${URL}/searchByUser`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(param),
  }), {
    onSuccess(data) {
      console.log(data)
        navigation.navigate("Details",{sandhani:data.sandhani,reg:data.reg,groupName:blood});
  
    },
  })
  
  const handleSubmit=async()=>{
    const data={blood,district,upazila};
    await mutate(data);
    
    
    
  }
  const handleClick=(s)=>{
      console.log("a")
    
  }
  if(isLoading){
      return <LoadingIndicator/>
  }
  
  return (
    <>
    
  <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View className="bg-white shadow shadow-red-700" style={{ padding: 20, borderRadius: 15}}>
        <Dropdown
          style={[styles.dropdown, isFocus && {borderColor: 'red'}]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={[{label:"A+",value:"A+"},{label:"B+",value:"B+"}]}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select blood' : '...'}
          searchPlaceholder="Search..."
          value={blood}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setBlood(item.value);
            setIsFocus(false);
            
          }}
        />
        <Dropdown
          style={[styles.dropdown, isFocus && {borderColor: 'red'}]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={[{label:"sirajganj",value:"sirajganj"}]}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select District' : '...'}
          searchPlaceholder="Search..."
          value={district}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setDistrict(item.value);
            
            setIsFocus(false);
          }}
        />
        <Dropdown
          style={[styles.dropdown, isFocus && {borderColor: 'red'}]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={[{label:"Kazipur",value:"kazipur"}]}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select Upazila' : '...'}
          searchPlaceholder="Search..."
          value={upazila}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setUpazila(item.value);
            
            setIsFocus(false);
          }}
        />
        
        
        
        <TouchableHighlight
        underlayColor="#EF4444"
        className="bg-red-700 "
          style={{
            
            padding: 12,
            
            borderRadius: 25,
            
            alignItems: 'center',
          }}
          onPress={handleSubmit}>
          <Text
            className="font-bold"
            style={{
              fontSize: 18,
    color: '#FFFFFF',
            }}>
            Search
          </Text>
        </TouchableHighlight>
      </View>
    </View>
  
  
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    justifyContent: 'center',
    alignContent: 'center',
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 10,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
