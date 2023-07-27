import {useState, useEffect} from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from "react-native";

const DefaultScreenPosts = ({route, navigation}) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);

  return (
    <>
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item, indx) => indx.toString()}
        renderItem={({item}) => (
          <View style={styles.photoView}>
            <Image 
              source={{uri: item.photo}} 
              style={{ width: '100%', height: 240, borderRadius: 8,}} 
            />
            <Text style={styles.photoName}>
              {item.name}
            </Text>
            <View style={styles.details}>
              <View style={styles.messageElem}>
                <TouchableOpacity onPress={() => navigation.navigate('Comment')}>
                <Image
                  source={require('../../assets/message-circle.png')}
                  style={{ width: 24, height: 24 }}
                />
                </TouchableOpacity>
                <Text style={styles.messageCount}>
                  0
                </Text>
              </View>
              <View style={styles.mapElem}>
                <TouchableOpacity onPress={() => navigation.navigate('Map', 
                  {
                  name: item.name, 
                  locality: item.locality, 
                  latitude: item.latitude, 
                  longitude: item.longitude
                  }
                  )}
                >
                  <Image
                    source={require('../../assets/map-pin.png')}
                    style={{ width: 24, height: 24 }}
                  />
                </TouchableOpacity>
                <Text style={styles.mapTitle}>
                  {item.locality}
                </Text>
              </View>
            </View>
          </View>
        )}
      />
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    width: '100%',
    paddingHorizontal: 16,
    backgroundColor: '#ffffff',
  },
  photoView: {
    marginTop: 32,
    overflow: 'hidden', 
  },
  photoName: {
    marginTop: 8,
    fontFamily: 'Roboto-Regular',
    color: '#212121',
    fontSize: 16,
    lineHeight: 19,
  },
  details: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  messageElem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  messageCount: {
    fontFamily: 'Roboto-Regular',
    color: '#BDBDBD',
    fontSize: 16,
    lineHeight: 19,
  },
  mapElem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mapTitle: {
    fontFamily: 'Roboto-Regular',
    color: '#212121',
    fontSize: 16,
    lineHeight: 19,
    textDecorationLine: 'underline',
  }
});

export default DefaultScreenPosts;