import React from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  ActivityIndicator,
  Image,
} from "react-native";
import noOrdersImage from "../assets/no-orders-atm.webp";
import OrderItem from "./OrderItem";
import { useGetOrders } from "../../utils/hooks";
import { useIsFocused } from "@react-navigation/native";
import MenuBar from "../constants/MenuBar";

function Orders() {
  const isFocused = useIsFocused();
  const { loadingState, orders } = useGetOrders(isFocused);

  return (
    <>
      <View style={styles.container}>
        <SafeAreaView>
          <View style={styles.labelContainer}>
            <Text style={styles.label}>My Orders</Text>
          </View>
          {loadingState ? (
            <ActivityIndicator size="large" color="black" />
          ) : (
            <View
              style={{
                maxHeight: "90%",
                marginTop: "5%",
              }}
            >
              <ScrollView showsVerticalScrollIndicator={false}>
                {orders.length > 0 ? (
                  orders.map((item, index) => (
                    <OrderItem
                      key={item._id}
                      id={item._id}
                      i={index}
                      price={item.subTotal}
                      orderStatus={item.orderStatus}
                      paymentOption={item.paymentOption}
                      placedOn={item.placedOn.split("T")[0]}
                      location={item.deliveryInformation.location}
                      orderName={item.orderInfo
                        .map((order) => order.orderName)
                        .join(", ")}
                    />
                  ))
                ) : (
                  <View
                    style={{
                      marginTop: "20%",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      source={noOrdersImage}
                      style={{ width: "100%", height: 400 }}
                    />
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: "bold",
                        color: "#ccc",
                      }}
                    >
                      No orders at the moment!
                    </Text>
                  </View>
                )}
              </ScrollView>
            </View>
          )}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  labelContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    alignItems: "center",
  },
  label: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Orders;
