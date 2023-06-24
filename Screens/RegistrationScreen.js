import React, { useState } from 'react';
import {SafeAreaView, View, StyleSheet, TextInput, Text, TouchableOpacity, Button} from 'react-native';

const RegistrationScreen = () => {
  const [login, setLogin] = useState('');
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

  const onRegister = () => {

  };

  return (
    <SafeAreaView style={styles.container}>
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
        <TouchableOpacity style={styles.btn} activeOpacity={0.8} onPress={onRegister} >
          <Text style={styles.btnTitle}>Зареєструватися</Text>
        </TouchableOpacity>
        <TouchableOpacity >
          <Text style={styles.quationText}>
            {!isFocused && 'Вже є акаунт? Увійти'}
          </Text>
        </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 549,
    backgroundColor: '#FFFFFF',
    borderWidth: 0,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  title: {
    marginTop: 92,
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
    marginLeft: 16,
    marginRight: 16,
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
    top: -33,
    right: 32,
    fontFamily: 'Roboto-Regular',
    color: '#1B4371',
    fontSize: 16,
    lineHeight: 19,
  },
  btn:{
    height: 50,
    marginTop: 43,
    marginLeft: 16,
    marginRight: 16,
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
  }
});

export default RegistrationScreen;