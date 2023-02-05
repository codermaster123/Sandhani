import React, {useEffect, useState} from 'react';
import {
  Alert,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {
  useQuery,
  useMutation,
  useQueryClient,
  
} from '@tanstack/react-query';
import fetcher from "../utilis/fetcher"
import URL from "../URL";

//import {BASE_URL, API_KEY} from '@env';

const App = () => {
  const [sandhaniData, setSandhaniData] = useState([{label:"A+",value:"A+"}]);
  const [stateData, setStateData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [country, setCountry] = useState(null);
  const [state, setState] = useState(null);
  const [city, setCity] = useState(null);
  const [countryName, setCountryName] = useState(null);
  const [stateName, setStateName] = useState(null);
  const [cityName, setCityName] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  useEffect(() => {
    // var config = {
    //   method: 'get',
    //   url: `${BASE_URL}/countries`,
    //   headers: {
    //     'X-CSCAPI-KEY': API_KEY,
    //   },
    // };

    // axios(config)
    //   .then(response => {
    //     console.log(JSON.stringify(response.data));
    //     var count = Object.keys(response.data).length;
    //     let countryArray = [];
    //     for (var i = 0; i < count; i++) {
    //       countryArray.push({
    //         value: response.data[i].iso2,
    //         label: response.data[i].name,
    //       });
    //     }
    //     setCountryData(countryArray);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
      
  }, []);
  const  {data,isLoading}=useQuery(["getQuery"],()=>fetcher(URL+"/getAllSandhani"),{
      
      refetchOnWindowFocus: false,
      enabled:true,
      onSuccess(data){
        for(items in data){
          
          let obj={
            label:data[items].address,
            value:data[items].address
          }
          setStateData((prev)=>[...prev,obj])
        }
        
      }
      
      
    })
    
  const handleState = countryCode => {
    // var config = {
    //   method: 'get',
    //   url: `${BASE_URL}/countries/${countryCode}/states`,
    //   headers: {
    //     'X-CSCAPI-KEY': API_KEY,
    //   },
    // };

    // axios(config)
    //   .then(function (response) {
    //     console.log(JSON.stringify(response.data));
    //     var count = Object.keys(response.data).length;
    //     let stateArray = [];
    //     for (var i = 0; i < count; i++) {
    //       stateArray.push({
    //         value: response.data[i].iso2,
    //         label: response.data[i].name,
    //       });
    //     }
    //     setStateData(stateArray);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
      
  };

  const handleCity = (countryCode, stateCode) => {
    // var config = {
    //   method: 'get',
    //   url: `${BASE_URL}/countries/${countryCode}/states/${stateCode}/cities`,
    //   headers: {
    //     'X-CSCAPI-KEY': API_KEY,
    //   },
    // };

    // axios(config)
    //   .then(function (response) {
    //     console.log(JSON.stringify(response.data));
    //     var count = Object.keys(response.data).length;
    //     let cityArray = [];
    //     for (var i = 0; i < count; i++) {
    //       cityArray.push({
    //         value: response.data[i].id,
    //         label: response.data[i].name,
    //       });
    //     }
    //     setCityData(cityArray);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
      
  };
  

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View className="bg-white shadow-xl shadow-red-700" style={{ padding: 20, borderRadius: 15}}>
        <Dropdown
          style={[styles.dropdown, isFocus && {borderColor: 'red'}]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={sandhaniData}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select blood' : '...'}
          searchPlaceholder="Search..."
          value={country}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setCountry(item.value);
            handleState(item.value);
            setCountryName(item.label);
            setIsFocus(false);
          }}
        />
        <Dropdown
          style={[styles.dropdown, isFocus && {borderColor: 'red'}]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={stateData}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select area' : '...'}
          searchPlaceholder="Search..."
          value={state}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setState(item.value);
            handleCity(country, item.value);
            setStateName(item.label);
            setIsFocus(false);
          }}
        />
        
        <TouchableOpacity
        className="bg-red-700"
          style={{
            
            padding: 20,
            borderRadius: 15,
            alignItems: 'center',
          }}
          onPress={() =>
            Alert.alert(
              `You have selected\nCountry: ${countryName}\nState: ${stateName}\nCity: ${cityName}`,
            )
          }>
          <Text
            style={{
              color: '#fff',
              textTransform: 'uppercase',
              fontWeight: '600',
            }}>
            Search
          </Text>
        </TouchableOpacity>
      </View>
    </View>
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
