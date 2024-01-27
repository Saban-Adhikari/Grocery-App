import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { isIphone6SOrSE } from "../AddCategory";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import SelectComponent from "../SelectComponent";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  useMessageAndErrorExtra,
  useSetCategories,
} from "../../../utils/hooks";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "../../../redux/actions/productAction";
import { updateProduct } from "../../../redux/actions/extraAction";

function UpdateProduct({ route }) {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [isVisible, setIsVisible] = useState(false);

  const { product, loadingState } = useSelector((state) => state.product);

  const [id] = useState(route.params.id);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [availableStock, setAvailableStock] = useState("");
  const [category, setCategory] = useState("choose a category");
  const [categoryID, setCategoryID] = useState("");
  const [categories, setCategories] = useState([]);

  useSetCategories(setCategories, isFocused);

  const submitHandler = () => {
    dispatch(
      updateProduct(
        id,
        productName,
        productDescription,
        productPrice,
        availableStock,
        categoryID
      )
    );
    alert("Product Updated!");
    navigation.navigate("Home");
  };

  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id, isFocused]);

  useEffect(() => {
    if (product) {
      setProductDescription(product.productDescription);
    }
  }, [product]);

  return (
    <>
      <KeyboardAwareScrollView>
        <View style={styles.container}>
          <View
            style={{
              maxHeight: 600,
              marginTop: isIphone6SOrSE ? 10 : 100,
              alignItems: "center",
            }}
          >
            <ScrollView
              style={{
                padding: 20,
                elevation: 10,
                borderRadius: 10,
                width: "90%",
                backgroundColor: "black",
              }}
            >
              <View
                style={{
                  justifyContent: "center",
                  height: 650,
                }}
              >
                <TouchableOpacity
                  style={{
                    alignItems: "center",
                    marginBottom: 20,

                    width: "35%",
                    marginLeft: "30%",
                  }}
                  activeOpacity={0.8}
                  onPress={() =>
                    navigation.navigate("Product Pictures", {
                      id,
                      images: product.productImage,
                    })
                  }
                >
                  <Text
                    style={{
                      color: "white",
                    }}
                  >
                    Manage Image
                  </Text>
                </TouchableOpacity>
                <TextInput
                  placeholder="Name"
                  value={productName}
                  onChangeText={setProductName}
                  style={{
                    borderColor: "black",
                    borderWidth: 1,
                    padding: 10,
                    backgroundColor: "white",

                    margin: 5,
                  }}
                />
                <TextInput
                  placeholder="Description"
                  value={productDescription}
                  onChangeText={setProductDescription}
                  style={{
                    borderColor: "black",
                    borderWidth: 1,
                    padding: 20,
                    backgroundColor: "white",

                    margin: 5,
                  }}
                />
                <TextInput
                  placeholder="Price"
                  value={productPrice}
                  keyboardType="numeric"
                  onChangeText={setProductPrice}
                  style={{
                    borderColor: "black",
                    borderWidth: 1,
                    padding: 10,
                    backgroundColor: "white",

                    margin: 5,
                  }}
                />
                <TextInput
                  placeholder="Stock"
                  value={availableStock}
                  onChangeText={setAvailableStock}
                  keyboardType="numeric"
                  style={{
                    borderColor: "black",
                    borderWidth: 1,
                    padding: 10,
                    backgroundColor: "white",

                    margin: 5,
                  }}
                />

                <Text
                  style={{
                    color: "black",
                    height: 50,
                    backgroundColor: "white",
                    marginVertical: 10,
                    textAlign: "center",
                    padding: 10,
                    width: "98%",
                    justifyContent: "center",
                    borderRadius: 5,
                    marginLeft: 4,
                  }}
                  onPress={() => setIsVisible(true)}
                >
                  {category}
                </Text>

                <TouchableOpacity
                  style={{
                    backgroundColor: "red",
                    margin: 20,
                    padding: 20,
                    borderRadius: 10,
                    alignItems: "center",
                  }}
                  onPress={submitHandler}
                >
                  <Text
                    style={{
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    Update
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </KeyboardAwareScrollView>
      <SelectComponent
        categories={categories}
        setCategoryID={setCategoryID}
        setCategory={setCategory}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default UpdateProduct;
