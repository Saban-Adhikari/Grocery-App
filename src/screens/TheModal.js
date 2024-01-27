import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, Button } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";

function TheModal({ id, deleteProduct, setOpenModal }) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setOpenModal(false)}>
        <Icon
          name="closecircleo"
          size={20}
          color="red"
          style={{
            position: "absolute",
            right: -50,
            top: 10,
            backgroundColor: "white",
            borderRadius: 10,
          }}
        />
      </TouchableOpacity>
      <Text
        style={styles.textLabel}
        onPress={() => navigation.navigate("Update Product", { id })}
      >
        Edit
      </Text>
      <Button title="Delete" onPress={() => deleteProduct(id)} color={"red"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 200,
    alignSelf: "center",
    justifyContent: "center",
    zIndex: 100,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  textLabel: {
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
    backgroundColor: "black",
    padding: "2%",
    borderRadius: 10,
  },
});

export default TheModal;
