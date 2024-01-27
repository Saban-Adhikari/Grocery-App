import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import ConfirmOrderItem from "./ConfirmOrderItem";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Feather";
import { useSelector } from "react-redux";

function ConfirmOrder({ route }) {
  const navigation = useNavigation();

  const { cartItems } = useSelector((state) => state.cart);

  const [itemsPrice] = useState(
    cartItems.reduce(
      (prev, curr) => prev + curr.quantity * curr.productPrice,
      0
    )
  );
  const [shippingPrice] = useState(itemsPrice > 100 ? 0 : 50);
  const [totalPrice] = useState(itemsPrice + shippingPrice);

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            paddingVertical: 20,
            marginTop: "10%",
            maxHeight: "50%",
          }}
        >
          <ScrollView>
            {cartItems.map((i) => (
              <ConfirmOrderItem
                key={i.product}
                image={i.productImage}
                name={i.productName}
                price={i.productPrice}
                quantity={i.quantity}
              />
            ))}
          </ScrollView>
        </View>
        <View
          style={{
            padding: "5%",
            minHeight: 250,
            marginTop: "5%",
          }}
        >
          <MoneyFormat title="Subtotal" value={itemsPrice} />
          <MoneyFormat title="shippingPrice" value={shippingPrice} />
          <MoneyFormat title="totalPrice" value={totalPrice} />
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginTop: "auto",
            }}
          >
            <TouchableOpacity
              style={{
                borderWidth: 1,
                padding: 20,
                width: "100%",
                borderRadius: 20,
                backgroundColor: "black",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() =>
                navigation.navigate("Payment", {
                  itemsPrice,
                  shippingPrice,
                  totalPrice,
                })
              }
            >
              <Icon name="arrow-right" size={20} color="white" />

              <Text style={{ color: "white" }}>Payment</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const MoneyFormat = ({ title, value }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        flex: 1,
      }}
    >
      <Text>{title}</Text>
      <Text>Rs.{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default ConfirmOrder;
