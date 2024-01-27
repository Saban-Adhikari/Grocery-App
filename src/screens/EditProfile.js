import { React, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/AntDesign";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../redux/actions/extraAction";
import { useMessageAndErrorExtra } from "../../utils/hooks";

function EditProfile() {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const loadingState = useMessageAndErrorExtra("Account");

  const inputs = [
    { placeholder: "E-mail" },
    { placeholder: "Full Name" },
    { placeholder: "Phone Number", keyboardType: "numeric" },
  ];

  const submitHandler = () => {
    dispatch(updateProfile(email, fullName, phoneNumber));
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <SafeAreaView>
          <Icon
            name="arrowleft"
            size={30}
            color="green"
            style={{ margin: "5%" }}
            onPress={() => navigation.navigate("Account")}
          />

          <Text style={{ fontSize: 20, fontWeight: "bold", margin: "5%" }}>
            Edit Profile
          </Text>
          <Text style={{ fontSize: 15, margin: "5%", marginBottom: "5%" }}>
            Please enter your details
          </Text>
          <View style={styles.textInput}>
            {inputs.map((input, index) => (
              <TextInput
                key={index}
                placeholder={input.placeholder}
                keyboardType={input.keyboardType || "default"}
                style={[
                  styles.input,
                  index === inputs.length - 1 ? styles.lastInput : null,
                ]}
                onChangeText={(value) => {
                  if (input.placeholder === "E-mail") {
                    setEmail(value);
                  } else if (input.placeholder === "Full Name") {
                    setFullName(value);
                  } else if (input.placeholder === "Phone Number") {
                    setPhoneNumber(value);
                  }
                }}
              />
            ))}
          </View>
          <TouchableOpacity
            style={styles.updateButton}
            disabled={email === "" || fullName === "" || phoneNumber === ""}
            onPress={submitHandler}
          >
            {loadingState ? (
              <ActivityIndicator size="small" color="black" />
            ) : (
              <Text style={styles.updateText}>Update</Text>
            )}
          </TouchableOpacity>
        </SafeAreaView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  textInput: {
    margin: 10,
    marginTop: "6%",
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    marginVertical: 10,
    padding: "2%",
  },
  lastInput: {
    marginBottom: 0,
  },
  updateButton: {
    alignItems: "center",
    justifyContent: "center",
    width: "20%",
    height: "8%",
    alignSelf: "center",
    margin: "8%",
    padding: "2%",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "white",
    shadowColor: "#228b22",
    backgroundColor: "white",
    shadowOpacity: 1,
  },
  updateText: {
    fontWeight: "bold",
    color: "green",
    fontFamily: "Arial",
  },
});

export default EditProfile;
