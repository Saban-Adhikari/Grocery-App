import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import khaltiLogo from "../assets/khalti-logo.webp";
import KhaltiPayment from "./khaltiPayment";

function Payment({ route }) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.label}>
        <Text>Will arrive in about 2 days*</Text>
      </View>
      <Text
        style={{
          marginLeft: 20,
          fontWeight: "bold",
          fontSize: 20,
        }}
      >
        Pay with Khalti
      </Text>
      <View style={styles.khaltiIcon}>
        <Image
          source={khaltiLogo}
          style={{
            width: 100,
            height: 100,
            resizeMode: "contain",
          }}
        />
      </View>
      <View>
        <TouchableOpacity
          style={{
            alignItems: "center",
            margin: 20,
            borderRadius: 10,
            borderWidth: 1,
            backgroundColor: "purple",
          }}
          onPress={() => {
            navigation.navigate("Khalti", { route });
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: "white",
              padding: 20,
            }}
          >
            Pay with khalti
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  textInput: {
    margin: 20,
  },
  textInputs: {
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
  label: {
    margin: 20,
    flexDirection: "row-reverse",
  },
  khaltiIcon: {
    margin: "30%",
    alignItems: "center",
  },
});

export default Payment;
