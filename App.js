import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "./screens/Home.js"
import starsDetails from "D:/nitish/coding/-PRO-C137-Project-Boilerplate/screens/Star.js"

export default function App (){
  return <AppContainer/>
}

const AppStackNavigator = createStackNavigator(
  {
    Home : {
      screen : HomeScreen,
      navigationOptions:{headerShown : false}
    },
    Details : {
       screen : starsDetails
    }
  },
  {initialRouteName : "Home"}
)

const AppContainer = createAppContainer(AppStackNavigator)



















