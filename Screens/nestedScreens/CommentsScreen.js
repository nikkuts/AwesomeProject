import {useState, useEffect} from "react";
import { useSelector } from "react-redux";
import { db } from "../../firebase/config";
import { collection, doc, addDoc, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { format, parse } from 'date-fns'; 
import { TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard, FlatList, Text, View, Image, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from "react-native";

const CommentsScreen = ({route}) => {
  const {postId, processedPhoto} = route.params;
  const [comment, setComment] = useState('');
  const [allComments, setAllComments] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const {userId, displayName} = useSelector(state => state.auth);

  const CustomButton = () => (
    <TouchableOpacity onPress={createComment}
      style={{
        alignItems: 'center', justifyContent: 'center', 
        width: 34, height: 34, backgroundColor: '#FF6C00', borderRadius: 17 
      }}
    >
      <Image
        source={require('../../assets/send.png')}
        style={{ width: 10, height: 14 }}
      />
    </TouchableOpacity>
);

  const KeyboardHide = () => {
    Keyboard.dismiss();
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const createComment = async () => {
    if (comment) {
      try {
        const timestampString = Date(serverTimestamp());
        const dateFormat = "EEE MMM dd yyyy HH:mm:ss 'GMT'";
        const timeZone = "+0300";
        const timestamp = parse(timestampString.replace(timeZone, ''), dateFormat, new Date());
        const formattedDate = format(timestamp, "dd MMMM yyyy | HH:mm");

        const ref = doc(db, 'posts', postId);
        await addDoc(collection(ref, 'comments'), {
          comment,
          userId,
          displayName,
          createdAt: formattedDate,
        });
        setComment('');
      } catch (e) {
        console.error('Error adding comment: ', e);
        throw e;
      } 
    }
  };

  const getAllComments = () => {
    const ref = doc(db, 'posts', postId);
    const commentsCollection = collection(ref, 'comments');
  
    onSnapshot(commentsCollection, (snapshot) => {
      const updatedComments = snapshot.docs.map((doc) => ({
         ...doc.data(), id: doc.id 
      }));
      setAllComments(updatedComments);
    });
  };

  useEffect(() => {
    getAllComments();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={KeyboardHide}>
      <KeyboardAvoidingView 
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={styles.container}
      >
          <ScrollView>
            <Image 
              source={{uri: processedPhoto}} 
              style={{ 
                width: '100%', 
                height: 240,
                marginTop: 32,
                marginBottom: 32,
                borderRadius: 8,
                overflow: 'hidden',
              }} 
            />
            <FlatList
              data={allComments}
              keyExtractor={(item) => item.id}
              renderItem={({item}) => item.userId === userId ?
              (
                <View style={styles.commentView}>
                  <View style={{...styles.commentField, borderTopRightRadius: 0}}>
                    <Text style={styles.commentText}>
                      {item.comment}
                    </Text>
                    <Text style={styles.commentData}>
                      {item.createdAt}
                    </Text>
                  </View>
                  <Image 
                    style={{
                      width: 28,
                      height: 28,
                    }} 
                    source={require('../../assets/smallAvatar.png')}
                  />
                </View>
              )
              : (
                <View style={styles.commentView}>
                  <Image 
                    style={{
                      width: 28,
                      height: 28,
                    }} 
                    source={require('../../assets/guest.png')}
                  />
                  <View style={{...styles.commentField, borderTopLeftRadius: 0}}>
                    <Text style={styles.commentText}>
                      {item.comment}
                    </Text>
                    <Text style={{...styles.commentData, textAlign: 'right'}}>
                      {item.createdAt}
                    </Text>
                  </View>
                </View>
              )}
            />
            <SafeAreaView style={styles.form}>
              <View style={[styles.inputContainer, isFocused && styles.inputFocused]}>
                <TextInput
                  style={styles.input}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  onChangeText={setComment}
                  value={comment}
                  placeholder="Коментувати..."
                  placeholderTextColor='#BDBDBD'
                />
                <CustomButton/>
              </View>
            </SafeAreaView>
          </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    width: '100%',
    paddingHorizontal: 16,
    backgroundColor: '#ffffff',
  },
  commentView: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24, 
  },
  commentField: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F6F6F6',
    borderRadius: 6,
  },
  commentText: {
    fontFamily: 'Roboto-Regular',
    color: '#212121',
    fontSize: 13,
    lineHeight: 18,
  },
  commentData: {
    fontFamily: 'Roboto-Regular',
    color: '#BDBDBD',
    fontSize: 10,
    lineHeight: 12,
  },
  form: {
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    paddingHorizontal: 16,
    backgroundColor: '#F6F6F6',
    borderWidth: 1,
    borderRadius: 100,
    borderColor: '#E8E8E8',
  },
  input: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 19,
  },
  inputFocused: {
    backgroundColor: '#E8E8E8',
    color: '#212121',
  },
});

export default CommentsScreen;