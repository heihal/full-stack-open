import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import Constants from 'expo-constants';




export default class AddNoottiScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      note: ''
    };
  }

  addNote = () => {

    const { note } = this.state;
    this.props.route.params.addNewNote(note)
    this.props.navigation.goBack()
  }



  render() {
    return (
      <View style={styles.container}>
        <TextInput style={styles.textin}

          placeholder="Write a note here"
          onChangeText={(text) => this.setState({ note: text })}
        />
        <TouchableOpacity onPress={this.addNote }>
          <Text style={styles.button} >Submit</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,

  },
  textin: {
    flex: 1,
    marginTop: 14,
    fontSize: 32,
    alignItems: "center",
    justifyContent: 'center',
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