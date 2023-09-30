import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { authSignOut } from "../redux/auth/authOperations";
import { db } from "../firebase/config";
import { collection, doc, getDocs, onSnapshot } from 'firebase/firestore';
import {View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground, FlatList } from 'react-native';

const ProfileScreen = () => {
  const [posts, setPosts] = useState([]);
  const [isAvatar, setIsAvatar] = useState(false);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {userId, displayName} = useSelector(state => state.auth);

  const getCountComments = async (postId) => {
    const ref = doc(db, 'posts', postId);
    const snapshot = await getDocs(collection(ref, 'comments'));
    return snapshot.size;
  };

  const getUserPosts = () => {
    const postsCollection = collection(db, 'posts');
  
    onSnapshot(postsCollection, async (snapshot) => {
      const updatedPosts = await Promise.all(
        snapshot.docs.map(async (doc) => ({
          ...doc.data(),
          id: doc.id,
          count: await getCountComments(doc.id),
        }))
      );
      const userPosts = updatedPosts.filter(doc => doc.userId === userId);
      setPosts(userPosts);
    });
  };

  const signOut = () => {
    dispatch(authSignOut());
  };

  const LogoutButton = () => (
    <TouchableOpacity onPress={signOut}
    >
      <Image
      source={require('../assets/logout.png')}
      style={{ width: 24, height: 24 }}
      />
    </TouchableOpacity>
  );

  const onLoadAvatar = () => {
    setIsAvatar(true);
  };

  const onDeleteAvatar = () => {
    setIsAvatar(false);
  };

  useEffect(() => {
    getUserPosts();
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.image}
          source={require("../assets/bg.png")}
      >
          <View style={styles.profile}>  
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
              source={require('../assets/bigAvatar.png')} 
              >
                <TouchableOpacity style={styles.btnAvatar} onPress={onDeleteAvatar}>
                  <Image 
                  source={require('../assets/delete.png')}
                  />
                </TouchableOpacity>
              </ImageBackground>
            }
            <View style={styles.btnLogout}> 
              {LogoutButton()}
            </View>
            <Text style={styles.title}>
              {displayName}
            </Text>
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
                          source={require('../assets/message-orange.png')}
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
                            source={require('../assets/map-pin.png')}
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
      </ImageBackground>
    </View>
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
  profile: {
    flexGrow: 1,
    position: 'absolute',
    top: 147,
    bottom: 0,
    width: '100%',
    paddingTop: 92,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
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
    left: 107,
    top: 78,
    width: 25,
    height: 25,
  },
  btnLogout: {
    position: 'absolute',
    left: '96%',
    top: 20,
  },
  title: {
    marginBottom: 32,
    textAlign: 'center',
    fontFamily: 'Roboto-Medium',
    color: '#212121',
    fontSize: 30,
    lineHeight: 35,
  },
  photoView: {
    marginBottom: 32,
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
    color: '#212121',
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

export default ProfileScreen;