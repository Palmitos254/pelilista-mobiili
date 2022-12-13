import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, FlatList, Alert, Pressable, Image } from 'react-native';
import { useState, useEffect } from 'react';
import { firebase } from '../config';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {

  const [games, setGames] = useState([]);
  const gameRef = firebase.firestore().collection('games');
  const navigation = useNavigation();

  // fetch / read firebase
  useEffect(() => {
    gameRef
    .orderBy('title', 'asc')
    .onSnapshot(
      querySnapshot => {
        const games = []
        querySnapshot.forEach((doc) => {
          const {image} = doc.data()
          const {title} = doc.data()
          const {description} = doc.data()
          const {rating} = doc.data()
          const {genre} = doc.data()
          games.push({
            id: doc.id,
            image,
            title,
            description,
            rating,
            genre,
          })
        })
        setGames(games)
      }
    )
  }, []);

  // delete
  const deleteGame = (games) => {
    gameRef
      .doc(games.id)
      .delete()
      .then(() => {
        Alert.alert("Deleted successfully!")
      })
      .catch(error => {
        Alert.alert(error);
      })
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={games}
        numColumns={1}
        renderItem={({item}) => (
            <Pressable onPress={() => navigation.navigate("EditGameData", {item})}>
              <View style={styles.gamesinlist}>
                <View>
                  <Text>
                    {item.image && <Image source={{uri: item.image}} style={{width:120, height:120}} />}
                  </Text>
                </View>
                <View style={styles.gamelistright}>
                  <Text style={{color: 'red', fontSize: 20}}>
                    {item.title[0].toUpperCase() + item.title.slice(1)}
                  </Text>
                  <Text style={{color: 'blue'}}>
                    {item.description[0].toUpperCase() + item.description.slice(1)}
                  </Text>
                  <Text>
                    {"Genres: " + item.genre[0].toUpperCase() + item.genre.slice(1)}
                  </Text>
                  <View style={styles.gamesinlist}>
                    <Text>
                      {"Rating: " + item.rating[0].toUpperCase() + item.rating.slice(1)}
                    </Text>
                    <Text>    </Text>
                    <FontAwesome
                      name='trash-o'
                      color='red'
                      onPress={() => deleteGame(item)}
                      style={{fontSize: 22}}
                    />
                  </View>
                </View>
              </View>
            </Pressable>
        )}
      />
      <View style={styles.button}>
        <Button onPress={() => navigation.navigate("AddNewGame")} title='Add' />
      </View>
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  button: {
    backgroundColor: '#fff',
    paddingLeft: 120,
    paddingRight: 120,
    paddingBottom: 10,
    justifyContent: 'center',
  },
  gamesinlist: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  gamelistright: {
    paddingTop: 40,
    padding: 10,
    paddingRight: 100,
  }
});