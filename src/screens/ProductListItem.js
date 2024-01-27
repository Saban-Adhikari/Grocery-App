import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import TheModal from "./TheModal";

function ProductListItem({
  deleteProduct,
  i,
  id,
  price,
  inStock,
  name,
  category,
  image,
}) {
  const navigation = useNavigation();

  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <TouchableOpacity
        onLongPress={() => setOpenModal((prev) => !prev)}
        onPress={() => navigation.navigate("Product Details", { id })}
      >
        <View style={styles.container}>
          <Image
            source={{
              uri: image,
            }}
            style={{
              width: 40,
              height: 40,
              resizeMode: "contain",
            }}
          />
          <Text
            style={{
              color: "black",
              width: 60,
            }}
            numberOfLines={1}
          >
            Rs.
            {price}
          </Text>
          <Text
            style={{
              color: "black",
              maxWidth: 120,
            }}
            numberOfLines={1}
          >
            {name}
          </Text>
          <Text
            style={{
              color: "black",
              width: 70,
            }}
            numberOfLines={1}
          >
            {category}
          </Text>
          <Text
            style={{
              color: "black",
              width: 40,
            }}
            numberOfLines={1}
          >
            {inStock}
          </Text>
        </View>
      </TouchableOpacity>

      {openModal && (
        <TheModal
          id={id}
          deleteProduct={deleteProduct}
          setOpenModal={setOpenModal}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 70,
    alignItems: "center",
    padding: 10,
    borderRadius: 10,

    marginVertical: 10,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

export default ProductListItem;
