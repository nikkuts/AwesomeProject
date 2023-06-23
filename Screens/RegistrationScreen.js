import React from 'react';
import {SafeAreaView, StyleSheet, TextInput, Text} from 'react-native';

const RegistrationScreen = () => {
  const [login, onChangeLogin] = React.useState('');
  const [email, onChangeEmail] = React.useState('');
  const [password, onChangePassword] = React.useState('');

  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Реєстрація</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeLogin}
          value={login}
          placeholder="Логін"
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangeEmail}
          value={email}
          placeholder="Адреса електронної пошти"
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangePassword}
          value={password}
          placeholder="Пароль"
          keyboardType="numeric"
        />
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
    justifyContent: 'center',
    borderWidth: 0,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
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
    color: '#BDBDBD',
    fontSize: 16,
    lineHeight: 19,
  },
  title: {
    marginTop: 92,
    marginBottom: 16,
    textAlign: 'center',
    fontFamily: 'Roboto-Medium',
    color: '#212121',
    fontSize: 30,
    // fontWeight: 500,
    lineHeight: 35,
  },
});

export default RegistrationScreen;