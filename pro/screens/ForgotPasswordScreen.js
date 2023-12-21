import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Pressable
} from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";

const ForgotPasswordScreen = () => {
  const [Email, setEmail] = useState("");


  const handleSubmit = async ()=>{
    try{
        await axios.get("/forgotPassword",{Email})
    }catch(error){
        Alert.alert("no email found")
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <View style={styles.logo}>
        <Image
          source={require("../assets/logo.jpg")}
          style={{ width: 50, height: 50, borderRadius: 30 }}
        />
        <Text style={styles.logoName}>Mushroom</Text>
      </View>

      <KeyboardAvoidingView>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.h1}>Forgot Password</Text>
        </View>

        <View style={{ marginTop: 60 }}>
          <View style={styles.input}>
            <MaterialIcons
              style={{ marginLeft: 10 }}
              name="email"
              size={24}
              color="grey"
            />
            <TextInput
              style={styles.inputBox}
              value={Email}
              onChangeText={(text) => setEmail(text)}
              placeholder="Email"
            />
          </View>
        </View>

        <View style={{ marginTop: 50 }} />


        <Pressable style={styles.button} onPress={handleSubmit}>
            <Text style={{ color: "white", fontSize: 20 }}>Submit</Text>
          </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#333",
  },
  logo: {
    marginTop: 100,
    flexDirection: "row",
  },
  logoName: {
    fontSize: 40,
    fontFamily: "sans-serif",
    fontWeight: "900",
    color: "white",
    marginLeft: 10,
  },
  h1: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 30,
    color: "white",
    marginLeft: 20,
  },
  input: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#D8D8D8",
    paddingVertical: 5,
    borderRadius: 10,
  },
  inputBox: {
    color: "gray",
    marginVertical: 10,
    width: 300,
  },
  button: {
    width: 200,
    backgroundColor: "#dcae58",
    borderRadius: 10,
    marginLeft: "auto",
    marginRight: "auto",
    padding: 15,
    alignItems: "center",
  },
});
