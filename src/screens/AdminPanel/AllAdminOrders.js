import React from "react";
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  ScrollView,
  Image,
} from "react-native";
import OrderItem from "../OrderItem";
import { useGetOrders, useMessageAndErrorExtra } from "../../../utils/hooks";
import { useIsFocused } from "@react-navigation/native";
import noOrdersImage from "../../assets/no-orders-atm.webp";
import { useDispatch } from "react-redux";
import { processOrder } from "../../../redux/actions/extraAction";
import { useNavigation } from "@react-navigation/native";

function AllAdminOrders({ route }) {
  const dispatch = useDispatch();

  const navigation = useNavigation();

  const iFocused = useIsFocused();

  const { loadingState, orders } = useGetOrders(useIsFocused, true);

  const loadingStateProcess = useMessageAndErrorExtra("Admin Panel");

  const updateHandler = (id) => {
    dispatch(processOrder(id));
    navigation.navigate("Admin Panel");
  };

  return (
    <View style={styles.container}>
      <View style={{ maxHeight: "90%", marginTop: "5%" }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {orders.length > 0 ? (
            orders.map((item, index) => (
              <OrderItem
                key={item._id + index}
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
                admin={true}
                updateHandler={updateHandler}
                loadingState={loadingStateProcess}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});

export default AllAdminOrders;
