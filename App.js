import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./pages/HomeScreen";
import AddNewGame from "./pages/AddNewGame";
import EditGameData from "./pages/EditGameData";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="AddNewGame" component={AddNewGame} />
        <Stack.Screen name="EditGameData" component={EditGameData} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}