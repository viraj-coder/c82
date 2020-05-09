import React,{Component} from 'react';
import { StyleSheet, Text, View,TextInput,StyleSheet,TouchableOpacity,KeyboardAvoidingView,Alert } from 'react-native';
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader';
export default class BookRequestScreen extends Component{
    constructor(){
        super();
        this.state={
            userId:firebase.auth().currentUser.email,
            bookName:"",
            reasonToRequest:""
        }
    }
createUniqueId(){
    return Math.random().toString(36).substring(7);

}
addRequest=(bookName,reasonToRequest)=>{
    var userId=this.state.userId
    var randomRequestId=this.createUniqueId()
        db.collection('requested_books').add({
            "user_id":userId,
            "book_name":bookName,
            "reason_to_request":reasonToRequest,
            "request_id":randomRequestId,
        })
      this.setState({
          bookName:'',
          reasonToRequest:'',

          
      })  
      return Alert.alert("book requested successfully")
    
}
    render(){
        return(
            <View style={{flex:1}}>
<MyHeader title="request book"/>
<KeyBoardAvoidingView style={style.keyBoardStyle}>
    <TextInput style={style.formTextInput} placeholder={"enter book name"}>
        onChangeText={(text)=>{
        this.setState({
            BookName:text
        })}}
        value={this.state.bookName}>
    </TextInput>
    <TextInput style={style.formTextInput} placeholder={"reason"}>
    onChangeText={(text)=>{
    this.setState({
    description:text
    })}}
    value={this.state.description}>
</TextInput>
<TouchableOpacity style={StyleSheet.button} onPress={()=>{}}>
   
<Text> request </Text>
</TouchableOpacity>
</KeyBoardAvoidingView>
  
            </View>
        );
    }
}