import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  ActivityIndicator,
} from "react-native";
import { isIphone6SOrSE } from "../AddCategory";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import SelectComponent from "../SelectComponent";
import Icon from "react-native-vector-icons/AntDesign";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  useSetCategories,
  useMessageAndErrorExtra,
} from "../../../utils/hooks";
import { useDispatch } from "react-redux";
import mime from "mime";
import { newProduct } from "../../../redux/actions/extraAction";
import { Toast } from "react-native-toast-message/lib/src/Toast";

function NewProduct({ route }) {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [isVisible, setIsVisible] = useState(false);

  const [productImage, setProductImage] = useState("");
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [availableStock, setAvailableStock] = useState("");
  const [category, setCategory] = useState("Select a category");
  const [categoryID, setCategoryID] = useState(undefined);
  const [categories, setCategories] = useState([]);

  useSetCategories(setCategories, isFocused);

  const loadingState = useMessageAndErrorExtra("Admin Panel");

  const condition =
    !productName ||
    !productDescription ||
    !productPrice ||
    !availableStock ||
    !productImage;

  const submitHandler = () => {
    const myForm = new FormData();

    myForm.append("productName", productName);
    myForm.append("productDescription", productDescription);
    myForm.append("productPrice", productPrice);
    myForm.append("availableStock", availableStock);
    myForm.append("file", {
      uri: productImage,
      type: mime.getType(productImage),
      name: productImage.split("/").pop(),
    });
    if (categoryID) myForm.append("category", categoryID);

    dispatch(newProduct(myForm));
  };

  //const loadingState = useMessageAndErrorExtra(dispatch);

  useEffect(() => {
    if (route.params?.image) setProductImage(route.params.image);
  }, [route.params]);
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
                <View
                  style={{
                    width: 80,
                    height: 80,
                    alignSelf: "center",
                    marginBottom: 40,
                  }}
                >
                  <Image
                    style={{
                      width: 100,
                      height: 100,
                      alignSelf: "center",
                      marginBottom: 10,
                      marginRight: 10,
                      borderWidth: 1,
                      borderColor: "white",
                    }}
                    source={{
                      uri: productImage ? productImage : null,
                    }}
                  />
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("Camera", { newProduct: true })
                    }
                  >
                    <Icon
                      name="camera"
                      size={20}
                      color="white"
                      style={{
                        position: "relative",
                        left: 25,
                        top: -20,
                        backgroundColor: "transparent",
                        width: 20,
                      }}
                    />
                  </TouchableOpacity>
                </View>

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
                  onChangeText={setProductPrice}
                  keyboardType="numeric"
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
                    padding: 15,
                    width: "98%",
                    justifyContent: "center",
                    borderRadius: 5,
                    marginLeft: 4,
                  }}
                  onPress={() => setIsVisible(true)}
                >
                  {category}
                </Text>
                {loadingState ? (
                  <ActivityIndicator
                    size="large"
                    color="white"
                    style={{ marginTop: 20 }}
                  />
                ) : (
                  <TouchableOpacity
                    style={{
                      backgroundColor: "red",
                      margin: 20,
                      padding: 20,
                      borderRadius: 10,
                      alignItems: "center",
                    }}
                    onPress={submitHandler}
                    loadingState={loadingState}
                    disabled={condition}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontWeight: "bold",
                      }}
                    >
                      Add
                    </Text>
                  </TouchableOpacity>
                )}
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

export default NewProduct;
