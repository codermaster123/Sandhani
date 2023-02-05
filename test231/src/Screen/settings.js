import React, { useState } from 'react';
import { View, Button, Image, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const App = () => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      // allowsEditing: true,
      
      aspect: [4, 3],
    });
    
    // let result = await ImagePicker.launchImageLibraryAsync({
    //   allowsEditing: true,
    //   quality: 1,
    // });
    
    
    

    if (!result.canceled) {
      
      setImage(result.assets[0].uri);
    }
    
    
    
    
  };

  // const uploadImage = async (uri) => {
  //   setLoading(true);
  //   let formData = new FormData();
  //   formData.append('file', { uri: uri, name: 'image.jpg', type: 'image/jpg' });
  //   formData.append('upload_preset', 'your_upload_preset');

  //   let options = {
  //     method: 'POST',
  //     body: formData,
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'multipart/form-data',
  //     },
  //   };

  //   let response = await fetch('https://api.cloudinary.com/v1_1/your_cloud_name/image/upload', options);
  //   let responseJson = await response.json();
  //   setLoading(false);
  //   setResponse(responseJson);
  // };
  

  return (
    <View>
      <Button title="Pick an image" onPress={pickImage} />
      {image && (
        <View>
          <Image source={{ uri: image }} className="w-20 m-2 h-20 border-2 border-red-300 rounded-full " />
          <Button title="Upload image" onPress={(image) => uploadImage(image)} disabled={loading} />
        </View>
      )}
      
    </View>
  );
};

export default App;
