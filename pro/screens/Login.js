import React, { useState, useEffect } from "react";
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
  Alert,
  Dimensions,
} from "react-native";
import { MaterialIcons, FontAwesome5, Ionicons } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { scale, verticalScale } from "react-native-size-matters";

const Login = () => {
  const { width, height } = Dimensions.get("window");

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");

        if (token) {
          navigation.replace("Main");
        }
      } catch (err) {
        console.log("error message", err);
      }
    };
    checkLoginStatus();
  }, []);

  const handleLogin = async () => {
    if (!Email || !Password) {
      Alert.alert("Login Error", "Please provide both email and password");
      return;
    }

    try {
      const response = await axios.post("/login", {
        Email,
        Password,
      });

      const token = response.data.token;
      await AsyncStorage.setItem("authToken", token);
      navigation.replace("Main");
    } catch (error) {
      Alert.alert("Login Error", "Invalid email or password!!");
      console.error(error);
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
          <Text style={styles.h1}>Login</Text>

          <View style={styles.input}>
            <MaterialIcons name="email" size={24} color="grey" />
            <TextInput
              style={styles.inputBox}
              value={Email}
              onChangeText={(text) => setEmail(text)}
              placeholder="Email"
            />
          </View>

          <View style={styles.passwordContainer}>
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
                  style={styles.eyeIcon}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <Pressable style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Login</Text>
            </Pressable>
          </View>

          <Pressable
            style={styles.signUpLink}
            onPress={() => navigation.navigate("Register")}
          >
            <Text style={styles.signUpText}>Don't have an account? Sign up</Text>
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
    marginTop: scale(150),
    flexDirection: "row",
  },
  logoImage: {
    width: scale(60),
    height: scale(60),
    borderRadius: scale(30),
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
    marginBottom:scale(25)
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
    paddingLeft: scale(10)
  },
  inputBox: {
    color: "gray",
    marginVertical: verticalScale(5),
    width: scale(220),
    height: verticalScale(30),
  },
  passwordContainer: {
    marginTop: scale(20),
  },
  eyeIcon: {
    left: scale(8),
  },
  buttonContainer: {
    marginTop: scale(25),
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
    fontSize: scale(16),
  },
  signUpLink: {
    marginTop: scale(20),
  },
  signUpText: {
    textAlign: "center",
    color: "grey",
    fontSize: scale(14),
  },
});

export default Login;
