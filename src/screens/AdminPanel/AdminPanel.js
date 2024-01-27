import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import ProductListItem from "../ProductListItem";
import {
  useAdminProducts,
  useMessageAndErrorExtra,
} from "../../../utils/hooks";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../../../redux/actions/extraAction";
import { getAdminProducts } from "../../../redux/actions/productAction";

function AdminPanel({ route }) {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const { loadingState, products, availableStock, notInStock } =
    useAdminProducts(dispatch, isFocused);

  const navigation = useNavigation();

  const loadingStateProcess = useMessageAndErrorExtra("Account");

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <>
          {loadingState ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <>
              <View
                style={{
                  backgroundColor: "red",
                  borderRadius: 20,
                  alignItems: "center",
                }}
              ></View>

              <View>
                <View
                  style={{
                    flexDirection: "row",
                    margin: 10,
                    justifyContent: "space-between",
                  }}
                >
                  <TouchableOpacity
                    style={{
                      backgroundColor: "black",
                      borderWidth: 1,
                      padding: 10,
                      borderRadius: 20,
                      justifyContent: "center",
                      alignItems: "center",
                      height: 100,
                    }}
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate("Add Products")}
                  >
                    <Icon name="plus" size={20} color="white" />
                    <Text
                      style={{
                        color: "white",
                      }}
                    >
                      Add products
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      backgroundColor: "black",
                      borderWidth: 1,
                      padding: 10,
                      borderRadius: 20,
                      justifyContent: "center",
                      alignItems: "center",
                      height: 100,
                    }}
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate("Add Category")}
                  >
                    <Icon
                      name="plus"
                      size={20}
                      color="white"
                      style={{ marginBottom: 5 }}
                    />
                    <Text
                      style={{
                        color: "white",
                      }}
                    >
                      Add Category
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      backgroundColor: "black",
                      borderWidth: 1,
                      padding: 10,
                      borderRadius: 20,
                      justifyContent: "center",
                      alignItems: "center",
                      height: 100,
                    }}
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate("Manage Orders")}
                  >
                    <Icon
                      name="edit"
                      size={20}
                      color="white"
                      style={{ marginBottom: 5 }}
                    />
                    <Text
                      style={{
                        color: "white",
                      }}
                    >
                      Manage Orders
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <ProductListingLayout />
              <ScrollView showsVerticalScrollIndicator={false}>
                {loadingStateProcess ? (
                  <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                  <View style={{ minHeight: 850 }}>
                    {products.map((item, index) => (
                      <ProductListItem
                        deleteProduct={deleteProductHandler}
                        key={item._id}
                        id={item._id}
                        i={index}
                        price={item.productPrice}
                        inStock={item.availableStock}
                        name={item.productName}
                        category={item.category?.category}
                        image={
                          item.productImage &&
                          item.productImage[0] &&
                          item.productImage[0].url
                        }
                        loadingState={loadingStateProcess}
                      />
                    ))}
                  </View>
                )}
              </ScrollView>
            </>
          )}
        </>
      </SafeAreaView>
    </View>
  );
}

const ProductListingLayout = () => {
  return (
    <View
      style={{
        backgroundColor: "black",
        flexDirection: "row",
        justifyContent: "space-between",
        height: 50,
        alignItems: "center",
        borderRadius: 5,
        padding: 10,
      }}
    >
      <Text style={styles.textLabel}>Image</Text>
      <Text style={styles.textLabel}>Price</Text>
      <Text style={{ ...styles.textLabel, width: null, maxWidth: 120 }}>
        Name
      </Text>
      <Text style={styles.textLabel}>Category</Text>
      <Text style={styles.textLabel}>InStock</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  textLabel: {
    color: "white",
    fontWeight: "bold",
  },
});

export default AdminPanel;
