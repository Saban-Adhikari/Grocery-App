import { React, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  SafeAreaView,
  Button,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { resetPassword } from "../../redux/actions/extraAction";

function ResetPassword() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [otp, setOTP] = useState("");
  const [password, setPassword] = useState("");

  const changePassword = async () => {
    try {
      await dispatch(resetPassword(otp, password));
      alert("Password changed successfully");
      navigation.navigate("Login");
    } catch (error) {
      console.log("Error changing password: ", error);
      alert("There was an error changing your password. Please try again.");
    }
  };

  return (
    <>
      <View style={styles.container}>
        <SafeAreaView>
          <View style={styles.cardContainer}>
            <TextInput
              style={styles.textInputs}
              placeholder="OTP"
              keyboardType="number-pad"
              onChangeText={(value) => {
                setOTP(value);
              }}
            />
            <TextInput
              style={styles.textInputs}
              placeholder="New Password"
              secureTextEntry="true"
              onChangeText={(value) => {
                setPassword(value);
              }}
            />
            <TouchableOpacity
              style={styles.button}
              disabled={otp == "" || password == ""}
              onPress={changePassword}
            >
              <Text style={{ color: "white", padding: 10 }}>
                Change Password
              </Text>
            </TouchableOpacity>
            <View style={styles.footerContainer}>
              <Button
                title="Back to login"
                onPress={() => {
                  navigation.navigate("Login");
                }}
              />
            </View>
          </View>
        </SafeAreaView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headingContainer: {
    alignItems: "center",
    marginTop: "5%",
  },
  headingText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "green",
  },
  cardContainer: {
    marginTop: "5%",
    minHeight: "80%",
    alignItems: "center",
    justifyContent: "center",
  },
  textInputs: {
    borderWidth: 1,
    marginTop: "10%",
    width: "80%",
    padding: "5%",
    borderColor: "black",
    borderRadius: 10,
    backgroundColor: "white",
  },
  button: {
    borderWidth: 10,
    marginTop: "10%",
    borderRadius: 10,
    backgroundColor: "black",
  },
  footerContainer: {
    marginTop: 30,
  },
});

export default ResetPassword;
