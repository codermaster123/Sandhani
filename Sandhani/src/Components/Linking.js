import React,{useCallback} from 'react';
import {Linking, TouchableHighlight, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // assuming you have installed react-native-vector-icons and imported the FontAwesome icons

const CustomButton = ({url,iconName, buttonText }) => {
  const onPress=useCallback(async()=>{
    await Linking.openURL(url);
    
  },[url])
  return (
    <TouchableHighlight
      underlayColor="#F8FAFC"
      onPress={onPress}
      style={styles.buttonContainer}
    >
      <>
        <Icon name={iconName} size={24} color="#333333" />
        <Text style={styles.buttonText}>{buttonText}</Text>
      </>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop:2
    
  },
  buttonText: {
    marginLeft: 10,
    fontSize: 18,
    color: '#333333',
  },
});

export default CustomButton;
