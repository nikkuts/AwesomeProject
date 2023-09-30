import 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'; 
import { store, persistor } from "./redux/store";
import Main from "./Components/Main";

export default function App() {
  const [fontsLoaded] = useFonts({
    'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Main/>
      </PersistGate>
    </Provider>
  );
};