import React from "react";
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";

function SelectComponent({
  isVisible,
  setIsVisible,
  setCategory,
  setCategoryID,
  categories = [],
}) {
  const selectCategoryHandler = (item) => {
    setCategory(item.category);
    setCategoryID(item._id);
    setIsVisible(false);
  };
  return (
    isVisible && (
      <View>
        <SafeAreaView>
          <View style={styles.container}>
            <TouchableOpacity onPress={() => setIsVisible(false)}>
              <Icon
                name="x"
                size={30}
                color="black"
                style={{
                  alignSelf: "flex-end",
                  backgroundColor: "red",
                }}
              />
            </TouchableOpacity>
            <Text style={styles.headeline}>Select a category</Text>
            <ScrollView>
              {categories.map((i) => (
                <Text
                  key={i._id}
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    textTransform: "capitalize",
                    marginVertical: 10,
                  }}
                  onPress={() => selectCategoryHandler(i)}
                >
                  {i.category}
                </Text>
              ))}
            </ScrollView>
          </View>
        </SafeAreaView>
      </View>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: "100%",
  },
  headeline: {
    textAlign: "center",
    marginVertical: 10,
    backgroundColor: "black",
    borderRadius: 5,
    color: "white",
    padding: 15,
  },
});

export default SelectComponent;
