import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";

function ConfirmOrderItem({ price, quantity, image, name }) {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: image,
        }}
        style={styles.image}
      />
      <Text>{name}</Text>
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <Text>{quantity}</Text>
        <Text>
          {"  "}x{"  "}
        </Text>
        <Text>Rs. {price}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 10,
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },
});

export default ConfirmOrderItem;
