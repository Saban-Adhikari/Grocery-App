import { React, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import Products from "./Products";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../redux/actions/productAction";
import { useSetCategories } from "../../utils/hooks";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import MenuBar from "../constants/MenuBar";

function Home() {
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [activeSearch, setActiveSearch] = useState(false);
  const [searchedText, setSearchedText] = useState("");

  const navigate = useNavigation();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const { products } = useSelector((state) => state.product);

  const { error, message, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const filteredProducts = products.filter((product) => {
    return (
      product.productName.toLowerCase().includes(searchedText.toLowerCase()) &&
      (category === "" || product.category === category)
    );
  });

  const categoryButtonHandler = (id) => {
    if (category === id) {
      // Clear the category if the user clicks on a selected category button again
      setCategory("");
    } else {
      // Otherwise, set the selected category
      setCategory(id);
    }
  };

  const addToCartHandler = (
    id,
    productName,
    productPrice,
    productImage,
    availableStock
  ) => {
    if (availableStock === 0)
      return Toast.show({
        type: "error",
        text1: "Out of stock",
        text2: "This product is out of stock",
        visibilityTime: 4000,
      });
    dispatch({
      type: "addToCart",
      payload: {
        product: id,
        productName,
        productPrice,
        productImage,
        availableStock,
        quantity: 1,
      },
    });
    Toast.show({
      type: "success",
      text1: "Added to cart!",
      text2: "This product has been added to your cart",
      visibilityTime: 4000,
    });
  };

  useSetCategories(setCategories, isFocused);

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      dispatch(getAllProducts(searchedText, category));
    }, 400);

    return () => {
      clearTimeout(timeOutId);
    };
  }, [dispatch, searchedText, category, isFocused]);

  console.log(category);
  return (
    <>
      <ScrollView style={styles.container}>
        <SafeAreaView>
          <View style={styles.searchContainer}>
            <Icon
              name="search"
              size={20}
              color="grey"
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Search groceries"
              value={searchedText}
              onChangeText={(text) => setSearchedText(text)}
              onFocus={() => setActiveSearch(true)}
              onBlur={() => setActiveSearch(false)}
            />
            {activeSearch && (
              <View style={styles.searchResults}>
                {filteredProducts.map((product) => (
                  <TouchableOpacity
                    key={product._id}
                    onPress={() => {
                      setSearchedText(product.name);
                      setActiveSearch(false);
                    }}
                  >
                    <Text style={styles.searchResultItemText}>
                      {product.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
          <View style={styles.categoryContainer}>
            <Text style={styles.label}>Categories {">"}</Text>
            <View style={{ flexDirection: "row", height: 80 }}>
              <ScrollView
                horizontal={true}
                contentContainerStyle={{
                  alignItems: "center",
                }}
                showsHorizontalScrollIndicator={false}
              >
                {categories.map((item, index) => (
                  <TouchableOpacity
                    key={item._id}
                    style={{
                      borderWidth: 1,
                      height: 70,
                      width: 80,
                      margin: 8,
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor:
                        category === item._id ? "beige" : "white",
                      borderRadius: 10,
                    }}
                    onPress={() => categoryButtonHandler(item._id)}
                  >
                    <Text style={{ fontSize: 15 }}>{item.category}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
          <Text
            style={{
              fontSize: 20,
              margin: "2%",
              fontWeight: "bold",
            }}
          >
            Products {">"}
          </Text>
          {filteredProducts.length === 0 && (
            <Text style={{ fontSize: 18, textAlign: "center", marginTop: 20 }}>
              No products found with the selected category/searched text
            </Text>
          )}
          <View style={styles.productContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {products.map((item, index) => (
                <Products
                  availableStock={item.availableStock}
                  productName={item.productName}
                  productPrice={item.productPrice}
                  productImage={item.productImage[0]?.url}
                  addToCartHandler={addToCartHandler}
                  id={item._id}
                  key={item._id}
                  i={index}
                  navigate={navigate}
                />
              ))}
            </ScrollView>
          </View>
        </SafeAreaView>
      </ScrollView>
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
    backgroundColor: "white",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#f2f2f2",
    margin: "5%",
    borderRadius: 15,
    padding: 10,
    width: "80%",
    height: 60,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
  },
  sortContainer: {
    position: "absolute",
    left: "110%",
  },
  categoryContainer: {
    marginTop: "3%",
    minheight: "50%",
  },
  productContainer: {
    flex: 1,
    //borderWidth: 1,
    marginTop: "1%",
    minHeight: "100%",
  },
  label: {
    fontSize: 20,
    marginLeft: "2%",
    fontWeight: "bold",
    marginBottom: "2%",
  },
  searchResults: {
    backgroundColor: "#fff",
  },
  searchResultItemText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Home;
