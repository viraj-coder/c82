import React,{Component} from 'react';
import {ListItem} from 'react-native-elements';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import MyHeader from '../components/MyHeader';
import firebase from 'firebase';
import db from '../config'
export default class BookDonateScreen extends Component{
    constructor(){
        super();
        this.state={
            requestedBooksList:[]

        }
        this.requestRef=null
    }
    getRequestedBooksList=()=>{
        this.requestRef=db.collection("requested_books")
        .onSnapshot((snapshot)=>{
            var requestedBooksList=snapshot.docs.map(document=>document.data());
            this.setState({
                requestedBooksList:requestedBooksList
            })
        })
    }
componentDidMount(){
    this.getRequestedBooksList();

}
componentWillUnmount(){
    this.requestRef();

}
keyExtractor=(item,index)=>index.toString()
renderItem=({item,i})=>{
    return(
        <ListItem
        key={i}
        title={item,book_name}
        subTitle={item,reason_to_request}
        titleStyle={{colour:'black',fontWeight:'bold'}}
        rightElement={
            <TouchableOpacity>
                <Text>
                    View
                </Text>
            </TouchableOpacity>
        }
        bottomDivider
        />
        )
}

    render(){
        return(
            <View>
                <MyHeader title="donate books"/>
                <View>
                    {this.state.requestedBooksList.length===0
                    ?(
                        <View>
                            <Text>
                                listOfallRequestedBooks
                            </Text>
                            </View>
                    )
                :(
                    <FlatList
                    keyExtractor={this.keyExtractor}
                    data={this.state.requestedBooksList}
                    renderItem={this.renderItem}
                    />
                )
                }
                </View>
                <Text>
                    BookDonateScrren
                </Text>
            </View>
        );
    }
}
