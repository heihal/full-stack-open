import React from 'react';


import {
  View,
  Text,
  StyleSheet,
  Dimensions
} from 'react-native'






const Note=({ content })=> {

  return (

    <View style={styles.item}>
      <Text  style={styles.title}>{content}</Text>
    </View>
  
  );
}
const styles = StyleSheet.create({
  

  item: {
    flex:1,
    marginTop: 14,
    alignSelf: "stretch",
    flexDirection: 'row',
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 16,
    
    
  },
});
export default Note