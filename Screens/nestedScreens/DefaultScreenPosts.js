import {useState, useEffect} from "react";
import { useSelector } from "react-redux";
import { db } from "../../firebase/config";
import { collection, doc, getDocs, onSnapshot } from 'firebase/firestore'; 
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from "react-native";

const DefaultScreenPosts = ({route, navigation}) => {
  const [posts, setPosts] = useState([]);
  const {email, displayName} = useSelector((state) => state.auth);

  const getCountComments = async (postId) => {
    const ref = doc(db, 'posts', postId);
    const snapshot = await getDocs(collection(ref, 'comments'));
    return snapshot.size;
  };

  const listenToPosts = () => {
    const postsCollection = collection(db, 'posts');
  
    onSnapshot(postsCollection, async (snapshot) => {
      const updatedPosts = await Promise.all(
        snapshot.docs.map(async (doc) => ({
          ...doc.data(),
          id: doc.id,
          count: await getCountComments(doc.id),
        }))
      );
      setPosts(updatedPosts);
    });
  };

  useEffect(() => {
    listenToPosts();
  }, []);

  return (
    <>
    <View style={styles.container}>
      <View style={styles.user}>
        <Image style={styles.avatar} 
          source={require('../../assets/middleAvatar.png')}
        />
        <View>
          <Text style={styles.userName}>{displayName}</Text>
          <Text style={styles.userEmail}>{email}</Text>
        </View>
      </View>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => (
          <View style={styles.photoView}>
            <Image 
              source={{uri: item.processedPhoto}} 
              style={{ width: '100%', height: 240, borderRadius: 8,}} 
            />
            <Text style={styles.photoName}>
              {item.name}
            </Text>
            <View style={styles.details}>
              <View style={styles.messageElem}>
                <TouchableOpacity onPress={() => navigation.navigate('Comment', 
                  {
                  postId: item.id,
                  processedPhoto: item.processedPhoto,
                  }
                  )}
                >
                <Image
                  source={require('../../assets/message-circle.png')}
                  style={{ width: 24, height: 24 }}
                />
                </TouchableOpacity>
                <Text style={styles.messageCount}>
                  {item.count}
                </Text>
              </View>
              <View style={styles.mapElem}>
                <TouchableOpacity onPress={() => navigation.navigate('Map', 
                  {
                  name: item.name, 
                  locality: item.locality, 
                  latitude: item.latitude, 
                  longitude: item.longitude,
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
    paddingBottom: 115,
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