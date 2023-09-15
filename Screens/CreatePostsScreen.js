import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard, Text, View, ScrollView, TouchableOpacity, StyleSheet, Image, TextInput, SafeAreaView } from "react-native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import { useNavigation } from '@react-navigation/native';
import { db, storage } from "../firebase/config";
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage';
import { collection, addDoc } from "firebase/firestore";

const CreatePostsScreen = () => {
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [isFocused, setIsFocused] = useState(false);
  const [name, setName] = useState('');
  const [locality, setLocality] = useState('');
  const [latitude,setLatitude] = useState(null);
  const [longitude,setLongitude] = useState(null);
  const [isKeyboard, setIsKeyboard] = useState(false);

  const {userId, displayName} = useSelector((state) => state.auth);

  const KeyboardHide = () => {
    setIsKeyboard(false);
    Keyboard.dismiss();
  };
 
  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const onPublic = () => {
    if (photo) {
      uploadPostToServer();
      navigation.navigate('DefaultScreen');
      setName('');
      setLocality('');
      setLatitude(null);
      setLongitude(null);
      setPhoto(null);
    } 
  };

  const uploadPhotoToServer = async () => {
    try {   
      const response = await fetch(photo);
      const blob = await response.blob();

      const uniquePostId = Date.now().toString();
      const storageRef = ref(storage, `postImage/${uniquePostId}.jpg`);
      
      await uploadBytes(storageRef, blob);
      console.log('Uploaded a photo!');

      const processedPhoto = await getDownloadURL(storageRef);
      return processedPhoto;
    }
    catch (error) {
      console.error('Error uploading photo:', error);
    }
  };

  const uploadPostToServer = async () => {
    const processedPhoto = await uploadPhotoToServer();    
    try {
		  const docRef = await addDoc(collection(db, 'posts'), {
		    processedPhoto, 
        name, 
        locality, 
        latitude, 
        longitude, 
        userId, 
        displayName,
		  });
      console.log('Uploaded a post!');
		} 
    catch (error) {
		  console.error('Error adding post: ', error);
		}
  };

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setIsKeyboard(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setIsKeyboard(false);
    });
  
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <TouchableWithoutFeedback onPress={KeyboardHide}>
      <KeyboardAvoidingView 
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView>
          <View style={styles.cameraView}>
            <Camera
              style={styles.camera}
              ref={setCameraRef}
            >
              <View style={hasPermission === false 
                ? { ...styles.photoView, 
                  backgroundColor: '#F6F6F6',
                  borderWidth: 1,
                  borderColor: '#E8E8E8', }
                : styles.photoView
              }
              >
                {
                  photo && 
                  <Image 
                    source={{uri: photo}} 
                    style={{ width: '100%', height: '100%',}} 
                  />
                }
                <TouchableOpacity
                  style={ photo 
                    ? {...styles.button,
                      backgroundColor: 'rgba(255, 255, 255, 0.3)',}
                    : styles.button
                  }
                  onPress={async () => {
                    if (cameraRef) {
                      const { uri } = await cameraRef.takePictureAsync();
                      const location = await Location.getCurrentPositionAsync();
                      setLatitude(location.coords.latitude);
                      setLongitude(location.coords.longitude);
                      await MediaLibrary.createAssetAsync(uri);
                      setPhoto(uri);
                    }
                  }}
                >
                  <Image
                    source={ photo 
                      ? require('../assets/camera_alt-white.png') 
                      : require('../assets/camera_alt-black.png')
                    }
                    style={{ width: 24, height: 24 }}
                  />
                </TouchableOpacity>
              </View>
            </Camera>
          </View>
          <Text style={styles.toggleText}>
             {photo ? 'Редагувати фото' : 'Завантажте фото'} 
          </Text>
          <SafeAreaView style={styles.form}>  
                  <TextInput
                    style={[styles.input, styles.inputContainer, isFocused && styles.inputFocused]}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChangeText={setName}
                    value={name}
                    placeholder="Назва..."
                    placeholderTextColor='#BDBDBD'
                  />
                  <View style={styles.inputContainer}>
                    <Image
                      source={require('../assets/map-pin.png')}
                      style={{ width: 24, height: 24 }}
                    />
                    <TextInput
                      style={[styles.input, isFocused && styles.inputFocused]}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      onChangeText={setLocality}
                      value={locality}
                      placeholder="Місцевість..."
                      placeholderTextColor='#BDBDBD'
                    />
                  </View>
                  <TouchableOpacity style={ photo
                    ? styles.btn
                    : {...styles.btn, backgroundColor: '#F6F6F6'}
                  } 
                  activeOpacity={0.8} onPress={onPublic}>
                    <Text style={ photo
                    ? styles.btnTitle
                    : {...styles.btnTitle, color: '#BDBDBD'}
                    } 
                    >Опублікувати</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => {
                    setName('');
                    setLocality('');
                    setPhoto(null);
                  }}
                  style={styles.btnTrash}
                  >
                  <Image
                    source={require('../assets/trash.png')}
                    style={{ width: 24, height: 24 }}
                  />
                  </TouchableOpacity>
                {!isKeyboard && 
                  <View style={styles.indicator}>
                    <Image 
                      source={require('../assets/indicator.png')}
                    />
                  </View>
                }
          </SafeAreaView> 
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: { 
    flexGrow: 1,
    width: '100%',
    paddingHorizontal: 16,
    backgroundColor: '#ffffff',
   },
   cameraView: {
    height: 240,
    marginTop: 32,
    borderRadius: 8,
    overflow: 'hidden', 
  },
  camera: { 
    flex: 1,
  },
  photoView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  button: { 
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: '#FFFFFF',
   },
  toggleText: {
    marginTop: 8,
    fontFamily: 'Roboto-Regular',
    color: '#BDBDBD',
    fontSize: 16,
    lineHeight: 19,
  },
  form: {
    width: '100%',
    paddingTop: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    height: 50,
    borderBottomWidth: 1,
    borderColor: '#E8E8E8',
  },
  input: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 19,
  },
  inputFocused: {
    color: '#212121',
  },
  btn:{
    height: 50,
    marginTop: 32,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF6C00',
    borderRadius: 100,
  },
  btnTitle: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 19,
    color: '#FFFFFF',
  },
  btnTrash: {
    alignItems: 'center', 
    justifyContent: 'center', 
    marginTop: 120,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 70, 
    height: 40, 
    backgroundColor: '#F6F6F6', 
    borderRadius: 20 
  },
  indicator: {
    display: "flex",
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
    height: 34,   
    paddingBottom: 8,
  }
});

export default CreatePostsScreen;