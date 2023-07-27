import React from 'react';
import { View } from 'react-native';
import MapView, {Marker} from 'react-native-maps';

function MapScreen({route}) {
  const region = {
    latitude: route.params.latitude,
    longitude: route.params.longitude,
    latitudeDelta: 0.0922, // Zoom у горизонтальному напрямку
    longitudeDelta: 0.0421, // Zoom у вертикальному напрямку
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView style={{ flex: 1 }} region={region}>
      <Marker
          title={route.params.name}
          coordinate={{ latitude: route.params.latitude, longitude: route.params.longitude }}
          description={route.params.locality}
        />
      </MapView>
    </View>
  );
}

export default MapScreen;