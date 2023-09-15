import { Alert } from 'react-native';
import { 
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	updateProfile
} from 'firebase/auth';
import { auth } from '../../firebase/config';
import { authSlice } from './authReducer';

export const registerDB = ({ email, password, login }) => async (
  dispatch, getState
  ) => {
    try {
      const {user} = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(user, {
        displayName: login,
      })
      
      dispatch(authSlice.actions.updateProfileUser({
        userId: user.uid,
        displayName: user.displayName,
        email: user.email,
      }))
    } catch (error) {
      Alert.alert('Помилка', 'Пошта або пароль невалідні.');
      throw error;
    }
  };

export const loginDB = ({ email, password }) => async (
  dispatch, getState
  ) => {
    try {
      const {user} = await signInWithEmailAndPassword(auth, email, password);
      return user;
    } catch (error) {
      Alert.alert('Помилка', 'Пошта або пароль невалідні.');
      throw error;
    }
  };

  export const authStateChange = () => async (
    dispatch, getState
    ) => {
        await onAuthStateChanged(auth, (user) => {
          if (user) {
            dispatch(authSlice.actions.updateProfileUser({
              userId: user.uid,
              displayName: user.displayName,
              email: user.email,
            }))
            dispatch(authSlice.actions.authStateChangeUser({
              isAuth: true,
            }))
          }
        }) 
    };
  
export const authSignOut = () => async (
  dispatch, getState
  ) => {
    await auth.signOut();
    dispatch(authSlice.actions.authSignOutUser())
  };