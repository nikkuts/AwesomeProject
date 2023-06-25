import React, { useState } from 'react';
import {SafeAreaView, View, StyleSheet, Image, ImageBackground, TextInput, Text, TouchableOpacity} from 'react-native';

const RegistrationScreen = () => {
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isAvatar, setIsAvatar] = useState(false);

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

  };

  return (
    <SafeAreaView style={styles.formRegister}>
      
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
        <TouchableOpacity style={styles.btn} activeOpacity={0.8} onPress={onRegister}>
          <Text style={styles.btnTitle}>Зареєструватися</Text>
        </TouchableOpacity>
        <TouchableOpacity >
          <Text style={styles.quationText}>
            {!isFocused && 'Вже є акаунт? Увійти'}
          </Text>
        </TouchableOpacity>
          {!isFocused && <View style={styles.indicator}></View>}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  formRegister: {
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
    left: 108,
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
  quationText: {
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
    bottom: 8,
    left: '50%',
    transform: [{ translateX: -50 }],
    width: 134,
    height: 5,
    backgroundColor: '#212121',
  }
});

export default RegistrationScreen;