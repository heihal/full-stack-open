import React, { Component } from 'react'
import { StyleSheet, Text, SafeAreaView, TouchableOpacity, FlatList, AsyncStorage,Alert } from 'react-native';
import Note from './Note'
import Constants from 'expo-constants';

const DEF_NOTE =
{
  id: '1',
  content: 'Note Testi',
}




export class Main extends Component {
  state = {
    notes: {}
  }


  componentDidMount = () => { this.init() }

  init = async () => {
    //AsyncStorage.clear()
    try{
    await AsyncStorage.getItem('notes').then((value) => {
      if (value == null) {
        const newNotes = [DEF_NOTE];
        this.setState({ notes: newNotes }, () => {
          AsyncStorage.setItem('notes', JSON.stringify(this.state.notes));
          value = AsyncStorage.getItem('notes')
        })
      }
      this.setState({
        notes: JSON.parse(value)
      })

    })}
    catch(error){
      alert("Something went wrong :(")
      console.log(error);
    }
  };


  saveValue = news => {
    // const newNotes = [this.state.notes, news];
    const a = this.state.notes
    a.push(news)
    this.setState({ notes: a }, () => {
      AsyncStorage.setItem('notes', JSON.stringify(this.state.notes));

    });
  };

  addNote = noteText => {
    const text = noteText
    if (text !== '') {
     
      if(this.state.notes.some(x=>x.content === text) ){
        
        console.log(this.state.notes.find(n => n.content === text));
        console.log('alerttia pukkaa');
        alert('alerttia pukkaa')
  


      }

      const ID = Math.floor(Math.random() * Math.floor(100)).toString()
      const noteObj = {
        id: ID,
        content: text,
      }
      this.saveValue(noteObj)

    }
  }
  

  onPressAddButton = () => {
    this.props.navigation.navigate('AddNote', { 'addNewNote': this.addNote })
  }

  showAlert=()=>{
    Alert.alert('Warning','Duplicate note?')
  }


  render() {
   
    const data = this.state.notes
    return (

      <SafeAreaView style={styles.container} >
        <FlatList
          data={data}
          extraData={this.state.notes}

          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Note content={item.content} />)}
        />
        <TouchableOpacity onPress={this.onPressAddButton}  >
          <Text style={styles.button} >Press here to add a new note!</Text>
        </TouchableOpacity>
      </SafeAreaView>


    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  flist: {
    marginTop: 14,
    alignSelf: "stretch",
  },
  button: {
    fontSize: 32,
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor: "#DDDDDD",
    padding: 25
  }
})
export default Main

