import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Image,
  ImageBackground,
} from "react-native";
import axios from "axios";
import { RFValue } from "react-native-responsive-fontsize";

export default class starsDetails extends Component{
    constructor(props){
        super(props)
        this.state = {
            details : [],
            url:`https://5fae-45-117-242-234.au.ngrok.io/planet?name=${this.props.navigation.getParam(
                "star_name")}`,
            imagePath : " "
        }
    }

    componentDidMount(){
        this.getDetails()
    }

    getDetails = () =>{
        axios.get(this.state.url)
        .then((response) => {this.setDetails(response.data.data)})
        .catch((error) => {Alert.alert(error.message)})

    }

    setDetails = (starData) => {
        const randomNumber = Math.floor(Math.random() * 4);
        let imagePath = ""

        switch (randomNumber) {
            case 0:
                imagePath = require('D:/nitish/coding/-PRO-C137-Project-Boilerplate/assets/star1.png');
                break;
            case 1:
                imagePath = require('D:/nitish/coding/-PRO-C137-Project-Boilerplate/assets/star2.png');
                break;
            case 2:
                imagePath = require('D:/nitish/coding/-PRO-C137-Project-Boilerplate/assets/star3.png');
                break;
            case 3:
                imagePath = require('D:/nitish/coding/-PRO-C137-Project-Boilerplate/assets/star4.png');
                break;
            default:
                imagePath = require('D:/nitish/coding/-PRO-C137-Project-Boilerplate/assets/star1.png');
                break;
        }

        this.setState({
            imagePath : imagePath,
            details : starData
        })

    }

    render(){
        const {imagePath ,details} = this.state
        
        
        if (details){
            return(
                <View style = {styles.container}>
                    <ImageBackground
                    source = {require("D:/nitish/coding/-PRO-C137-Project-Boilerplate/assets/background.png")}
                    style = {{flex : 1 , paddingTop : 20}}
                    >
                        <Image 
                        source={imagePath}
                        style={{
                          height: 250,
                          width: 250,
                          marginTop: 50,
                          alignSelf: "center",
                        }}
                        />

                        <View style={{marginTop:50}}>
                            <Text style={styles.starName}>{details.name}</Text>
                            <View style = {{alignSelf:"center"}}>
                                <Text style={styles.planetData}>{`Mass : ${details.mass}`}</Text>
                                                            
                                <Text style={styles.planetData}>{`gravity : ${Math.round(details.gravity)}`}</Text>

                                <Text style={styles.planetData}>{`radius : ${details.radius}`}</Text>

                                <Text style={styles.text}>{`distance from earth : ${details.distance}`}</Text>
                            </View>
                        </View>

                    </ImageBackground>
                </View>
            )
        }
        else {
            return null
        }
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    planetName: {
      fontSize: 45,
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: 40,
      width: "80%",
      alignSelf: "center",
      fontFamily:"monospace"
    },
    planetData: {
      fontSize: 15,
      color: "white",
      textAlign:"center",
      fontFamily:"monospace"
    },
    upperContainer: {
      flex: 0.2,
      justifyContent: "center",
      alignItems: "center",
    },
    starName: {
      fontSize: RFValue(40),
      fontWeight: "bold",
      textAlign: "center",
      color: "#fff",
    },
    middleContainer: {
      flex: 0.22,
      flexDirection: "row",
      justifyContent: "space-evenly",
      alignItems: "center",
    },
    text: {
      fontSize: RFValue(18),
      color: "#fff",
      fontWeight: "400",
      textAlign: "center",
    },
    lowerContainer: {
      flex: 0.15,
      justifyContent: "center",
      alignItems: "center",
    },
    image: { 
      width: RFValue(200), 
      height: RFValue(200),
      alignSelf:"center"
    },
  });
  
  