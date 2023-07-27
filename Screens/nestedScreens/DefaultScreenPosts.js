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
      <View style={styles.user}>
        <Image style={styles.avatar} 
          source={require('../../assets/rectangle2.png')}
        />
        <View>
          <Text style={styles.userName}>Name</Text>
          <Text style={styles.userEmail}>email</Text>
        </View>
      </View>
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
  user: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 32,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 16,
  },
  userName: {
    fontFamily: 'Roboto-Medium',
    color: '#212121',
    fontSize: 13,
    lineHeight: 16,
  },
  userEmail: {
    fontFamily: 'Roboto-Regular',
    color: '#212121',
    fontSize: 11,
    lineHeight: 13,
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