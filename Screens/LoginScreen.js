import React, { useState } from 'react';
import {TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard, SafeAreaView, View, StyleSheet, Image, ImageBackground, TextInput, Text, TouchableOpacity} from 'react-native';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onLogin = () => {

  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView 
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ImageBackground style={styles.image}
          source={require("../assets/bg.png")}
        >
          <SafeAreaView style={{...styles.form, height: !isFocused ? 489 : 248}}>  
            <Text style={styles.title}>Увійти</Text>
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
              {!isFocused && 
              <>
                <TouchableOpacity style={styles.btn} activeOpacity={0.8} onPress={onLogin}>
                  <Text style={styles.btnTitle}>Увійти</Text>
                </TouchableOpacity>
                <TouchableOpacity >
                  <Text style={styles.question}>Немає акаунту? Зареєструватися</Text>
                </TouchableOpacity>
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
    paddingTop: 32,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 0,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
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
  question: {
    marginTop: 16,
    textAlign: 'center',
    fontFamily: 'Roboto-Regular',
    color: '#1B4371',
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

export default LoginScreen;