import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Alert,
  SafeAreaView,
  StatusBar,
  Platform,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import axios from "axios";
import { setStatusBarBackgroundColor } from "expo-status-bar";

export default class HomeScreen extends Component {
    constructor (props){
        super(props)
        this.state = {
            url : "https://5fae-45-117-242-234.au.ngrok.io",
            listData :[],
            imagePath: " "
        }
    }

    componentDidMount() {
        this.getStarData()
    }

    getStarData = () => {
        axios.get(this.state.url).then((Response) => {
            this.setState({
                listData : Response.data.data
            })
        }).catch((error) => {Alert.alert(error.message)})
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
            starDetails : starData
        })

    }
    
    setColor = (index) => {
        var color = ["#fbffd5", "#ffefff", "#ede5ff", "#eafff4"];
        var num = index % 4;
        return color[num];
    };
    
    
    renderItem = ({item , index}) => {
        this.setDetails(item);
        // console.log(this.state.imagePath)
        return(
            <TouchableOpacity
                style = {[
                    styles.listItem,
                    {BackgroundColor : this.setColor(index) , opacity : 0.7}
                ]}
                onPress = {() => this.props.navigation.navigate("Details" , {"star_name" : item.name})}
            >
                <Image 
                    source={this.state.imagePath}
                    style ={styles.cardImage}
                />
                
                <View style = {styles.nameCardPlanet}>
                    <Text style = {styles.title}>{item.name}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    keyExtractor = (item,index) => index.toString()

    render(){
       const {data} = this.state
       if(data != " "){
        console.log("data recieved")
        return(
            <View style = {styles.container}>
                <SafeAreaView 
                    style = {{
                        marginTop : 
                            Platform.OS === "android" ? StatusBar.currentHeight : 0,
                    }}
                />
                <ImageBackground 
                    source = {require("../assets/background.png")}
                    style = {{flex : 1 , paddingTop : 20}}
                >
                    <View style = {styles.upperContainer}>
                        <Text style = {styles.headerText}>STARS</Text>
                    </View>
                    <View style = {styles.lowerContainer}>
                        <FlatList
                            keyExtractor={this.keyExtractor}
                            data = {this.state.listData}
                            renderItem = {this.renderItem}
                            numColumns = {2}
                        
                        />
                    </View>
                </ImageBackground>
            </View>
        )
       }
       else{
        console.log("no data recieved")
        return(
            <ImageBackground 
                source = {require("../assets/bg_image.jpg")}
                style = {{flex : 1 , paddingTop : 20}}
            >
                <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
                    <Text style = {styles.headerText}>LOADING</Text>
                </View>
            </ImageBackground>
        )
       }

    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    upperContainer: {
        flex: 0.1,
        justifyContent: "center",
        alignItems: "center",
    },
    lowerContainer: {
        flex: 0.9,
    },
    headerText: {
        fontSize: 30,
        fontWeight: "bold",
        color: "white",
    },
    listItem: {
        flex: 1,
        height: 200,
        margin: 10,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        borderRadius: 10,
    },
    cardImage: {
        height: 100,
        width: 100,
        resizeMode: "contain",
    },
    nameCardPlanet: {
        height: 50,
        width: 150,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
    },
    });


























