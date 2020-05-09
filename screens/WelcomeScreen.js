import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity,TextInput, Alert,KeyboardAvoidingView,ScrollView,Modern, Modal } from 'react-native';
import SantaAnimation from '../components/SantaClaus.js';
import db from '../config';
import firebase from 'firebase';

export default class WelcomeScreen extends Component {
  constructor(){
    super()
    this.state={
      emailId : '',
      password: '',
      isModalVisible:'false',
      firstName:'',
      lastName:'',
      address:'',
      contact:'',
      confirmPassword:''


    }
  }

  userLogin = (emailId, password)=>{
    firebase.auth().signInWithEmailAndPassword(emailId, password)
    .then(()=>{
     this.props.navigation.navigate('Donate')
    })
    .catch((error)=> {
      var errorCode = error.code;
      var errorMessage = error.message;
      return Alert.alert(errorMessage)
    })
  }

  userSignUp =(username,password,confirmPassword) =>{
    if(password!==confirmPassword){
      return Alert.alert("password does not match")
    }
    else{
    firebase.auth().createUserWithEmailAndPassword(username, password)
    .then((response)=>{
      return Alert.alert("User Added Successfully")
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      return Alert.alert(errorMessage)
    });
    db.collection('user').add({
      first_name=this.state.firstName,
      last_name:this.state.lastName,
      contact:this.state.contact,
      email_id:this.state.emailId,
      address:this.state.address
    })
  }
}
showModel=()=>{
  return(
    <Modal animationType="fade" transparent={true} visible={this.state.isModalVisible}>
      <View style={styles.ModalContainer}>
        <ScrollView style={{width:'100%'}}>
<KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
<Text style={styles.modalTitle}>
registration

</Text>
<TextInput
style={styles.formTextInput}
placeholder={"first name"}
maxLength={8}
onChangeText={(text)=>{
  this.setState({
    firstName:text

  })
}}
>
</TextInput>
<TextInput
style={styles.formTextInput}
placeholder={"last name"}
maxLength={8}
onChangeText={(text)=>{
  this.setState({
    lastName:text
    
  })
}}
>
</TextInput>
<TextInput
style={styles.formTextInput}
placeholder={"contact"}
maxLength={10}
keyboardType={'numeric'}
onChangeText={(text)=>{
  this.setState({
    contact:text
    
  })
}}
>
</TextInput>
<TextInput
style={styles.formTextInput}
placeholder={"address"}
multiline={true}
onChangeText={(text)=>{
  this.setState({
    address:text
    
  })
}}
>
</TextInput>
<TextInput
style={styles.formTextInput}
placeholder={"email address"}
keyboardType={'email-address'}
onChangeText={(text)=>{
  this.setState({
    emailId:text
    
  })
}}
>
</TextInput>
<TextInput
style={styles.formTextInput}
placeholder={"password"}
secureTextEntry={true}
onChangeText={(text)=>{
  this.setState({
    password:text
    
  })
}}
>
</TextInput>
<TextInput
style={styles.formTextInput}
placeholder={"confirm password"}
secureTextEntry={true}
onChangeText={(text)=>{
  this.setState({
   confirmpassword:text
    
  })
}}
>
</TextInput>
<View style={styles.modalBackButton}> 
  <TouchableOpacity style={styles.registerButton} onPress={()=>this.userSignUp(this.state.emailId,this.state.password,this.state.confirmpassword)}>
  <Text style={styles.registerButtonText}>register</Text>
  </TouchableOpacity>
</View>
<View style={styles.modalBackButton}> 
  <TouchableOpacity style={styles.cancelButton} onPress={()=>this.setState({"isModalVisible":false})}>
  <Text style={styles.registerButtonText}>cancel</Text>
  </TouchableOpacity>
</View>
</KeyboardAvoidingView>

        </ScrollView>

      </View>
    </Modal>
  )
}

  render(){
    return(
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          {this.showModel()}
         
          <Text style={styles.title}>Book Santa</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TextInput
          style={styles.loginBox}
          placeholder="example@booksanta.com"
          placeholderTextColor = "#ffff"
          keyboardType ='email-address'
          onChangeText={(text)=>{
            this.setState({
              emailId: text
            })
          }}
        />

        <TextInput
          style={styles.loginBox}
          secureTextEntry = {true}
          placeholder="password"
          placeholderTextColor = "#ffff"
          onChangeText={(text)=>{
            this.setState({
              password: text
            })
          }}
        />
          <TouchableOpacity
            style={[styles.button,{marginBottom:20, marginTop:20}]}
            onPress = {()=>{this.userLogin(this.state.emailId, this.state.password)}}
            >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={()=>{this.userSignUp(this.state.emailId, this.state.password)}}
            >
            <Text style={styles.buttonText}>SignUp</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#F8BE85'
  },
  profileContainer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  title :{
    fontSize:65,
    fontWeight:'300',
    paddingBottom:30,
    color : '#ff3d00'
  },
  loginBox:{
    width: 300,
    height: 40,
    borderBottomWidth: 1.5,
    borderColor : '#ff8a65',
    fontSize: 20,
    margin:10,
    paddingLeft:10
  },
  button:{
    width:300,
    height:50,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:25,
    backgroundColor:"#ff9800",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8,
    },
    shadowOpacity: 0.30,
    shadowRadius: 10.32,
    elevation: 16,
  },
  buttonText:{
    color:'#ffff',
    fontWeight:'200',
    fontSize:20
  },
  buttonContainer:{
    flex:1,
    alignItems:'center'
  }
})
