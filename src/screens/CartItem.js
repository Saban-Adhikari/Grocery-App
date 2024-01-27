import React from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Feather";

function CartItem({
  productName,
  availableStock,
  productPrice,
  productImage,
  index,
  quantity,
  id,
  incrementHandler,
  decrementHandler,
}) {
  return (
    <View style={styles.container}>
      <View
        style={{
          width: "30%",
          //   backgroundColor: "gray",
          borderRadius: 20,
          marginRight: "20%",
          //borderWidth: 1,
        }}
      >
        <Image
          source={{
            uri: productImage,
          }}
          style={{
            width: 100,
            height: "100%",
            resizeMode: "contain",
            borderRadius: 20,
            borderColor: "gray",
            backgroundColor: "gray",
          }}
        />
      </View>
      <View
        style={{
          width: "50%",
          paddingHorizontal: 25,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 16,
          }}
          numberOfLines={1}
        >
          {productName}
        </Text>
        <Text
          style={{
            fontSize: 15,
            fontWeight: "bold",
          }}
          numberOfLines={1}
        >
          Rs.{productPrice}
        </Text>
        <View
          style={{
            alignItems: "center",
            width: "20%",
            height: 80,
            justifyContent: "space-between",
            alignSelf: "center",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity>
              <Icon
                name="minus"
                size={20}
                color="white"
                style={{
                  backgroundColor: "black",
                  height: 20,
                  width: 20,
                  marginTop: 10,
                }}
                onPress={() =>
                  decrementHandler(
                    id,
                    productName,
                    productPrice,
                    productImage,
                    availableStock,
                    quantity
                  )
                }
              />
            </TouchableOpacity>
            <Text
              style={{
                height: 25,
                width: 25,
                marginLeft: 20,
                marginTop: 10,
              }}
            >
              {quantity}
            </Text>
            <TouchableOpacity>
              <Icon
                name="plus"
                size={20}
                color="white"
                style={{
                  backgroundColor: "black",
                  height: 20,
                  width: 20,
                  marginTop: 10,
                }}
                onPress={() =>
                  incrementHandler(
                    id,
                    productName,
                    productPrice,
                    productImage,
                    availableStock,
                    quantity
                  )
                }
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flexDirection: "row",
    height: 100,
    marginVertical: 20,
  },
});

export default CartItem;
