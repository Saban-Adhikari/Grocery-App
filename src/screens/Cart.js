import { React, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import CartItem from "./CartItem";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import MenuBar from "../constants/MenuBar";

function Cart({ route }) {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);

  const incrementHandler = (
    id,
    productName,
    productPrice,
    productImage,
    availableStock,
    quantity
  ) => {
    const newQuantity = quantity + 1;
    if (availableStock <= quantity)
      return Toast.show({
        type: "error",
        text1: "Maximum value reached",
        text2: `${productName} has already reached maximum stock`,
      });
    dispatch({
      type: "addToCart",
      payload: {
        product: id,
        productName,
        productPrice,
        productImage,
        availableStock,
        quantity: newQuantity,
      },
    });
  };

  const decrementHandler = (
    id,
    productName,
    productPrice,
    productImage,
    availableStock,
    quantity
  ) => {
    const newQuantity = quantity - 1;
    if (1 >= quantity)
      return dispatch({
        type: "removeFromCart",
        payload: id,
      });
    dispatch({
      type: "addToCart",
      payload: {
        product: id,
        productName,
        productPrice,
        productImage,
        availableStock,
        quantity: newQuantity,
      },
    });
  };
  return (
    <>
      <View style={{ padding: 35, backgroundColor: "#fff", flex: 1 }}>
        <SafeAreaView>
          <View
            style={{
              paddingVertical: 20,
              flex: 1,
              backgroundColor: "#fff",
            }}
          >
            <Text
              style={{
                fontSize: 20,
              }}
            >
              Cart
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 35,
              //borderWidth: 1,
              height: "85%",
            }}
          >
            <View
              style={{
                // borderWidth: 1,
                width: "100%",
                flexDirection: "column-reverse",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: "#000",
                  width: "100%",
                  height: 50,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 20,
                }}
                onPress={
                  cartItems.length > 0
                    ? () => navigation.navigate("Confirm Order")
                    : null
                }
              >
                <Icon
                  name="shopping-cart"
                  size={20}
                  color="white"
                  style={{ position: "absolute", left: 20, top: 15 }}
                />

                <Text style={{ color: "white" }}>Checkout</Text>
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "stretch",
                  justifyContent: "space-between",
                  paddingHorizontal: 20,
                  marginBottom: 20,
                }}
              >
                <Text>
                  {cartItems.length}{" "}
                  {cartItems.length > 1 ? "products" : "product"}{" "}
                </Text>
                <Text>{"                                    "}</Text>
                <Text>
                  Rs{" "}
                  {cartItems.reduce(
                    (prev, curr) => prev + curr.quantity * curr.productPrice,
                    0
                  )}
                </Text>
              </View>
              <ScrollView showsVerticalScrollIndicator={false}>
                {cartItems.length > 0 ? (
                  // Map through the items in the cart
                  cartItems.map((i, index) => (
                    <CartItem
                      key={i.product}
                      id={i.product}
                      productName={i.productName}
                      availableStock={i.availableStock}
                      productPrice={i.productPrice}
                      productImage={i.productImage}
                      index={index}
                      quantity={i.quantity}
                      incrementHandler={incrementHandler}
                      decrementHandler={decrementHandler}
                    />
                  ))
                ) : (
                  <Text>No items in the cart!</Text>
                )}
              </ScrollView>
            </View>
          </View>
        </SafeAreaView>
      </View>
      <View
        style={{
          backgroundColor: "white",
        }}
      >
        <MenuBar />
      </View>
    </>
  );
}

export default Cart;
