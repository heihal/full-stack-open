import React from 'react'

import { StyleSheet, Text, TouchableOpacity } from 'react-native';



export default AddButton = ({ actionOnPress }) => (
  <TouchableOpacity onPress={actionOnPress}>
    <Text style={styles.button} >Press here to add a new note!</Text>
  </TouchableOpacity>

)
const styles = StyleSheet.create({
  button: {
    fontSize: 32,
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor: "#DDDDDD",
    padding: 25
  }
})
