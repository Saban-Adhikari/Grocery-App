import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useMessageAndErrorExtra, useSetCategories } from "../../utils/hooks";
import { useIsFocused } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { addCategory, deleteCategory } from "../../redux/actions/extraAction";
import { useNavigation } from "@react-navigation/native";

const { height, width } = Dimensions.get("window");
export const isIphone6SOrSE =
  Platform.OS === "ios" && height === 667 && width === 375;

function AddCategory() {
  const navigation = useNavigation();
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);

  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  useSetCategories(setCategories, useIsFocused);

  const loadingState = useMessageAndErrorExtra("Admin Panel");

  const deleteHandler = (id) => {
    dispatch(deleteCategory(id));
  };

  const submitHandler = () => {
    dispatch(addCategory(category));
  };

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <SafeAreaView>
          <View>
            <ScrollView
              style={{
                marginTop: 100,
              }}
            >
              <View
                style={{
                  backgroundColor: "white",
                  padding: 20,
                  minHeight: 400,
                }}
              >
                {categories.map((i) => (
                  <CategoryContainer
                    name={i.category}
                    id={i._id}
                    key={i._id}
                    deleteHandler={deleteHandler}
                  />
                ))}
              </View>
            </ScrollView>

            <View style={styles.secondContainer}>
              <TextInput
                style={styles.input}
                placeholder="Add Category"
                placeholderTextColor="grey"
                value={category}
                onChangeText={setCategory}
              />
              {loadingState ? (
                <ActivityIndicator size="large" color="#0000ff" />
              ) : (
                <TouchableOpacity
                  style={{
                    borderColor: "white",
                    borderWidth: 1,
                    width: "20%",
                    backgroundColor: "red",
                    borderRadius: 10,
                    padding: 5,
                    marginLeft: "40%",
                    marginTop: 5,
                    alignItems: "center",
                  }}
                  disabled={!category}
                  onPress={submitHandler}
                >
                  <Text>Add</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </SafeAreaView>
      </View>
    </KeyboardAwareScrollView>
  );
}

const CategoryContainer = ({ name, id, deleteHandler }) => {
  return (
    <View style={styles.categoryContainer}>
      <Text style={styles.categoryContainerText}>{name}</Text>
      <TouchableOpacity onPress={() => deleteHandler(id)}>
        <Icon name="trash-2" size={20} color="red" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  categoryContainer: {
    backgroundColor: "white",
    elevation: 5,
    margin: 10,
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  categoryContainerText: {
    fontWeight: "bold",
    textTransform: "capitalize",
    letterSpacing: 1,
  },
  secondContainer: {
    padding: isIphone6SOrSE ? 20 : 30,
    elevation: 10,
    borderRadius: 10,
    backgroundColor: "black",
    marginTop: isIphone6SOrSE ? 0 : "40%",
  },
  input: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    color: "black",
  },
});

export default AddCategory;
