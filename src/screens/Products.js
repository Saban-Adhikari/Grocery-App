import React from "react";
import { View, StyleSheet, Image, Text, Button } from "react-native";

function Products({
  availableStock,
  productName,
  productPrice,
  productImage,
  id,
  addToCartHandler,
  i,
  navigate,
}) {
  return (
    <>
      <View
        style={{
          flex: 1,
          justifyContent: "space-between",
        }}
      >
        <View style={styles.productContainer}>
          <Image source={{ uri: productImage }} style={styles.productImage} />
          <View style={styles.productDetails}>
            <View>
              <Text style={styles.productName}>{productName}</Text>
              <Text style={styles.productPrice}>Rs. {productPrice}</Text>
              <Text style={styles.productStock}>
                {availableStock > 0 ? "In Stock" : "Out of Stock"}
              </Text>
              <Button
                title="Add to Cart"
                onPress={() =>
                  addToCartHandler(
                    id,
                    productName,
                    productPrice,
                    productImage,
                    availableStock
                  )
                }
              />
              <Button
                title="View Details"
                onPress={() => navigate.navigate("Product Details", { id })}
              />
            </View>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  productContainer: {
    flexDirection: "row",
    margin: 10,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 5,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  productDetails: {
    marginLeft: 10,
    flexDirection: "row",
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  productPrice: {
    fontSize: 16,
    color: "#777",
  },
  productStock: {
    fontSize: 14,
    color: "#777",
  },
});

export default Products;
