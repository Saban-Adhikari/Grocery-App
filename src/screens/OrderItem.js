import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

function OrderItem({
  id,
  price,
  location,
  orderName,
  placedOn,
  orderStatus,
  paymentOption,
  subTotal,
  updateHandler,
  admin = false,
  i = 0,
}) {
  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: "white",
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        shadowOpacity: 0.26,
      }}
    >
      <Text style={styles.text}> Order-ID: {id} </Text>
      <TextLabel title={"PhoneNumber"} value={location} i={i} />
      <TextLabel title={"orderName: "} value={orderName} i={i} />
      <TextLabel title={"Order placed on"} value={placedOn} i={i} />
      <TextLabel title={"Price"} value={price} i={i} />
      <TextLabel title={"OrderStatus"} value={orderStatus} i={i} />
      <TextLabel title={"PaymentOption"} value={paymentOption} i={i} />

      {admin && (
        <TouchableOpacity
          style={{
            alignItems: "center",
            borderWidth: 1,
            marginTop: "5%",
            padding: 10,
            borderRadius: 10,
            backgroundColor: "black",
            flexDirection: "row",
            justifyContent: "center",
          }}
          onPress={() => updateHandler(id)}
        >
          <Icon
            name="checkcircleo"
            size={20}
            color="white"
            style={{ marginRight: 10 }}
          />
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
            }}
          >
            Process Order
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const TextLabel = ({ title, value, i }) => {
  return (
    <Text
      style={{
        marginVertical: 6,
        color: "black",
      }}
    >
      <Text style={{ fontWeight: "bold" }}>{title}: </Text>
      {title == "Price" ? "Rs." : ""}
      {value}
    </Text>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
    elevation: 5,
  },
  text: {
    color: "white",
    //backgroundColor: "black",
    fontSize: 15,
    fontWeight: "bold",
    marginHorizontal: -15,
    marginTop: -20,
    marginBottom: 10,
    paddingVertical: 10,
    backgroundColor: "black",
    paddingHorizontal: 20,
    borderWidth: 1,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    shadowOpacity: 0.26,
  },
});

export default OrderItem;
