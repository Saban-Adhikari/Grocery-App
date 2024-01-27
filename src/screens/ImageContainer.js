import React from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

function ImageContainer({ src, id, deleteHandler }) {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: src,
        }}
        style={{
          width: "100%",
          height: "80%",
          resizeMode: "contain",
        }}
      />
      <TouchableOpacity onPress={() => deleteHandler(id)}>
        <Icon name="delete" size={30} color="red" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    elevation: 10,

    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.26,
    shadowRadius: 6,

    margin: 10,
    padding: 10,
    alignItems: "center",
    borderRadius: 10,
    height: 200,
  },
});

export default ImageContainer;
