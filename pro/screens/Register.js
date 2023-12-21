import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import {
  MaterialIcons,
  FontAwesome5,
  FontAwesome,
  Ionicons,
} from "@expo/vector-icons";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { scale, verticalScale } from "react-native-size-matters";

const Register = () => {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();
  const setToast = (msg) => {
    ToastAndroid.showWithGravity(
      msg,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  };

  const handleRegister = () => {
    if (Password.length >= 8) {
      if (
        Password === confirmPassword &&
        Email.includes("@") &&
        Email.includes(".com")
      ) {
        axios
          .post("/register", { Name, Email, Password })
          .then((res) => {
            console.log(res);
            setToast("Registered successfully");
            navigation.navigate("Login");
            setName("");
            setEmail("");
            setPassword("");
          })
          .catch((e) => {
            setToast("Registration failed");
            console.log("Registration failed", e.response);
          });
      } else {
        setToast("Check the details!!!");
      }
    } else {
      setToast("Password must be at least 8 characters");
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <View style={styles.logo}>
        <Image
          source={require("../assets/logo.jpg")}
          style={styles.logoImage}
        />
        <Text style={styles.logoName}>Mushroom</Text>
      </View>

      <KeyboardAvoidingView>
        <View style={styles.contentContainer}>
          <Text style={styles.h1}>Sign up</Text>

          <View style={styles.input}>
            <FontAwesome name="user" size={24} color="grey" />
            <TextInput
              style={styles.inputBox}
              value={Name}
              onChangeText={(text) => setName(text)}
              placeholder="Username"
            />
          </View>

          <View style={styles.input}>
            <MaterialIcons name="email" size={24} color="grey" />
            <TextInput
              style={styles.inputBox}
              value={Email}
              onChangeText={(text) => setEmail(text)}
              placeholder="Email"
            />
          </View>

          <View>
            <View style={styles.input}>
              <FontAwesome5 name="lock" size={24} color="grey" />
              <TextInput
                style={styles.inputBox}
                value={Password}
                onChangeText={(pass) => setPassword(pass)}
                placeholder="Password"
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={toggleShowPassword}>
                <Ionicons
                  name={showPassword ? "eye" : "eye-off"}
                  size={24}
                  color="grey"
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.input}>
            <FontAwesome5 name="lock" size={24} color="grey" />
            <TextInput
              style={styles.inputBox}
              value={confirmPassword}
              onChangeText={(pass) => setConfirmPassword(pass)}
              placeholder="Confirm Password"
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={toggleShowPassword}>
              <Ionicons
                name={showPassword ? "eye" : "eye-off"}
                size={24}
                color="grey"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.buttonContainer}>
            <Pressable style={styles.button} onPress={handleRegister}>
              <Text style={styles.buttonText}>Sign up</Text>
            </Pressable>
          </View>

          <Pressable
            style={styles.signInLink}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.signInText}>
              Already have an account? Sign in
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#BDD7EE",
  },
  logo: {
    marginTop: scale(100),
    flexDirection: "row",
  },
  logoImage: {
    width: "15%",
    height: "100%",
    borderRadius: 30,
  },
  logoName: {
    fontSize: scale(35),
    fontFamily: "sans-serif",
    fontWeight: "900",
    marginLeft: scale(5),
  },
  h1: {
    fontSize: scale(25),
    fontWeight: "bold",
    marginTop: scale(7),
    marginBottom: scale(15),
  },
  contentContainer: {
    alignItems: "center",
    marginTop: scale(20),
  },
  input: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#FFF",
    paddingVertical: verticalScale(5),
    borderRadius: scale(10),
    width: scale(300),
    paddingLeft: scale(10),
    marginTop: scale(20),
  },
  inputBox: {
    color: "gray",
    marginVertical: verticalScale(5),
    width: scale(220),
    height: verticalScale(30),
  },
  buttonContainer: {
    marginTop: scale(20),
  },
  button: {
    width: scale(100),
    backgroundColor: "#5B9BD5",
    borderRadius: 10,
    padding: scale(15),
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: scale(18),
  },
  signInLink: {
    marginTop: scale(20),
  },
  signInText: {
    textAlign: "center",
    color: "grey",
    fontSize: scale(14),
  },
});

export default Register;
