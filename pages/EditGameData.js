import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, Alert, Image } from 'react-native';
import { useState, useEffect } from 'react';
import { firebase } from '../config';
import { useNavigation } from '@react-navigation/native';
import { RadioButton, Checkbox } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';

export default function EditGameData({ route }) {

  const gameRef = firebase.firestore().collection('games');
  const [addGameTitle, setAddGameTitle] = useState(route.params.item.title);
  const [addGameDescription, setAddGameDescription] = useState(route.params.item.description);
  const [addGameImage, setAddGameImage] = useState(route.params.item.image);
  const [addGameRating, setAddGameRating] = useState(route.params.item.rating);
  const [galleryPermission, setGalleryPermission] = useState(null);
  // Genre Checkboxs
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);
  const [checked4, setChecked4] = useState(false);
  const [checked5, setChecked5] = useState(false);
  const [checked6, setChecked6] = useState(false);
  const [checked7, setChecked7] = useState(false);
  const [checked8, setChecked8] = useState(false);
  const [checked9, setChecked9] = useState(false);
  const [checklist, setChecklist] = useState([]);

  const navigation = useNavigation();

  // Gallery permission
  useEffect(() => {
    (async () => {
      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setGalleryPermission(galleryStatus.status === 'granted');
    })();
  }, []);

  // Image Picker
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if(!result.canceled) {
      setAddGameImage(result.assets[0].uri);
    }
    console.log(addGameImage)
  }

  // Update game data
  const updateGame = () => {
    if (addGameTitle && addGameTitle.length > 0 && addGameDescription.length > 0 && checklist.length > 0 && addGameImage != null) {
      gameRef
      .doc(route.params.item.id)
      .update({
        image: addGameImage,
        title: addGameTitle,
        description: addGameDescription,
        rating: addGameRating,
        genre: checklist.toString(),
      }).then(() => {
        navigation.navigate("HomeScreen");
      }).catch((error) => {
        Alert.alert(error)
      })
    } else {
      Alert.alert("Please select genres first!")
    }
  }

  // if no permission granted
  if (galleryPermission === false){
    return <Text>Persmission to use Gallery required!</Text>
  }

  return (
    <View style={styles.container}>
      <View>
        <Button title='Change Image' onPress={() => pickImage()} />
        <Text></Text>
        {addGameImage && <Image source={{uri: addGameImage}} style={{width:120, height:120}} />}
      </View>
      <Text></Text>
      <TextInput
        placeholder='Add Game Title             '
        onChangeText={(title) => setAddGameTitle(title)}
        value={addGameTitle}
      />
      <Text></Text>
      <TextInput
        placeholder='Add Game Description'
        onChangeText={(description) => setAddGameDescription(description)}
        value={addGameDescription}
      />
      <Text style={{color: 'red', fontSize: 18}}>Rating X/5</Text>
      <RadioButton.Group onValueChange={(rating) => setAddGameRating(rating)} value={addGameRating}>
        <View style={styles.row}>
          <RadioButton.Item label='1' value='1/5' />
          <RadioButton.Item label='2' value='2/5' />
          <RadioButton.Item label='3' value='3/5' />
          <RadioButton.Item label='4' value='4/5' />
          <RadioButton.Item label='5' value='5/5' />
        </View>
      </RadioButton.Group>
      <Text style={{color: 'red', fontSize: 18}}>Genres:</Text>
      <View style={styles.row}>
        <Checkbox.Item label='RPG' status={checked1 ? 'checked' : 'unchecked'} onPress={() => {setChecked1(!checked1), setChecklist([...checklist, " RPG"])}} />
        <Checkbox.Item label='Simulator' status={checked2 ? 'checked' : 'unchecked'} onPress={() => {setChecked2(!checked2), setChecklist([...checklist, " Simulator"])}} />
        <Checkbox.Item label='Puzzle' status={checked3 ? 'checked' : 'unchecked'} onPress={() => {setChecked3(!checked3), setChecklist([...checklist, " Puzzle"])}} />
      </View>
      <View style={styles.row}>
        <Checkbox.Item label='MMO' status={checked4 ? 'checked' : 'unchecked'} onPress={() => {setChecked4(!checked4), setChecklist([...checklist, " MMO"])}} />
        <Checkbox.Item label='Strategy' status={checked5 ? 'checked' : 'unchecked'} onPress={() => {setChecked5(!checked5), setChecklist([...checklist, " Strategy"])}} />
        <Checkbox.Item label='Action' status={checked6 ? 'checked' : 'unchecked'} onPress={() => {setChecked6(!checked6), setChecklist([...checklist, " Action"])}} />
      </View>
      <View style={styles.row}>
      <Checkbox.Item label='FPS' status={checked7 ? 'checked' : 'unchecked'} onPress={() => {setChecked7(!checked7), setChecklist([...checklist, " FPS"])}} />
        <Checkbox.Item label='Sandbox' status={checked8 ? 'checked' : 'unchecked'} onPress={() => {setChecked8(!checked8), setChecklist([...checklist, " Sandbox"])}} />
        <Checkbox.Item label='Adventure' status={checked9 ? 'checked' : 'unchecked'} onPress={() => {setChecked9(!checked9), setChecklist([...checklist, " Adventure"])}} />
      </View>
      <Text></Text>
      <Button onPress={updateGame} title='Update Game' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
  }
});