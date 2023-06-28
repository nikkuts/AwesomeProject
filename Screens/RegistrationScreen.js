import React, { useState, useEffect } from 'react';
import {TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard, SafeAreaView, View, StyleSheet, Image, ImageBackground, TextInput, Text, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const RegistrationScreen = () => {
  const navigation = useNavigation();
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isAvatar, setIsAvatar] = useState(false);
  const [isKeyboard, setIsKeyboard] = useState(false);

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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onLoadAvatar = () => {
    setIsAvatar(true);
  };

  const onDeleteAvatar = () => {
    setIsAvatar(false);
  };

  const onRegister = () => {
    const state = {
      login: login,
      email: email,
      password: password,
    };
    console.log(state);
    setLogin('');
    setEmail('');
    setPassword('');
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

  return (
    <TouchableWithoutFeedback onPress={KeyboardHide}>
      <KeyboardAvoidingView 
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ImageBackground style={styles.image}
          source={require("../assets/bg.png")}
        >
          <SafeAreaView style={styles.form}>  
            {!isAvatar ?
              <View style={{...styles.avatar, backgroundColor: '#F6F6F6'}}>
                <TouchableOpacity style={styles.btnAvatar} onPress={onLoadAvatar}>
                  <Image 
                  source={require('../assets/add.png')}
                  />
                </TouchableOpacity>
              </View>
              :
              <ImageBackground style={styles.avatar} 
              source={require('../assets/rectangle.png')} 
              >
                <TouchableOpacity style={styles.btnAvatar} onPress={onDeleteAvatar}>
                  <Image 
                  source={require('../assets/delete.png')}
                  />
                </TouchableOpacity>
              </ImageBackground>
            }
            <Text style={styles.title}>Реєстрація</Text>
              <TextInput
                style={[styles.input, isFocused && styles.inputFocused]}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChangeText={setLogin}
                value={login}
                placeholder="Логін"
                placeholderTextColor='#BDBDBD'
              />
              <TextInput
                style={[styles.input, isFocused && styles.inputFocused]}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChangeText={setEmail}
                value={email}
                placeholder="Адреса електронної пошти"
                placeholderTextColor='#BDBDBD'
              />
              <TextInput
                style={[styles.input, isFocused && styles.inputFocused]}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChangeText={setPassword}
                value={password}
                placeholder="Пароль"
                placeholderTextColor='#BDBDBD'
                secureTextEntry={!showPassword}
                keyboardType="numeric"
              />
              <TouchableOpacity onPress={togglePasswordVisibility}>
                <Text style={styles.toggleText}>
                  {!showPassword ? 'Показати' : 'Приховати'}
                </Text>
              </TouchableOpacity>
              {!isKeyboard && 
              <>
                <TouchableOpacity style={styles.btn} activeOpacity={0.8} onPress={onRegister}>
                  <Text style={styles.btnTitle}>Зареєструватися</Text>
                </TouchableOpacity>
                <View style={styles.changeScreen}>
                  <View>
                    <Text style={styles.question}>
                      Вже є акаунт? 
                    </Text>
                  </View>
                  <TouchableOpacity >
                    <Text onPress={() => navigation.navigate("Login")}
                      style={{...styles.question, textDecorationLine: 'underline'} }>
                      Увійти
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.indicator}></View>
              </> 
              }
          </SafeAreaView>
        </ImageBackground>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    width: '100%',
    resizeMode: "cover",
    justifyContent: 'center',
  },
  form: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 549,
    paddingTop: 92,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 0,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  avatar: {
    position: "absolute",
    top: -60,
    left: '50%',
    transform: [{ translateX: -50 }],
    width: 120,
    height: 120,
    borderRadius: 16,
  },
  btnAvatar: {
    position: 'absolute',
    left: 107,
    top: 78,
    width: 25,
    height: 25,
  },
  title: {
    marginBottom: 16,
    textAlign: 'center',
    fontFamily: 'Roboto-Medium',
    color: '#212121',
    fontSize: 30,
    lineHeight: 35,
  },
  input: {
    height: 50,
    marginTop: 16,
    paddingLeft: 16,
    backgroundColor: '#F6F6F6',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#E8E8E8',
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 19,
  },
  inputFocused: {
    borderColor: '#FF6C00',
    backgroundColor: '#FFFFFF',
    color: '#212121',
  },
  toggleText: {
    position: "absolute",
    top: -34,
    right: 16,
    fontFamily: 'Roboto-Regular',
    color: '#1B4371',
    fontSize: 16,
    lineHeight: 19,
  },
  btn:{
    height: 50,
    marginTop: 43,
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
  changeScreen: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
    gap: 4,
    marginTop: 16,
  },
  question: {
    fontFamily: 'Roboto-Regular',
    color: '#1B4371',
    fontSize: 16,
    lineHeight: 19,
  },
  indicator: {
    position: 'absolute',
    left: '50%',
    transform: [{ translateX: -50 }],
    width: 134,
    height: 5,   
    bottom: 8,
    backgroundColor: '#212121',
  }
});

export default RegistrationScreen;