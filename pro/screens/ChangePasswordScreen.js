import { StyleSheet, Text, View, TextInput,Pressable,Alert } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { UserType } from "../UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { scale, verticalScale } from "react-native-size-matters";

const ChangePasswordScreen = () => {
  const { userId, setUserId } = useContext(UserType);
  const navigation = useNavigation();
  const [Oldpassword,setOldPassword] = useState("");
  const [password,setPassword] = useState("");
  const [Conpassword,setConPassword] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem("authToken");
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
    };
    fetchUser();
  }, []);
  const handlePassowrd = () => {
    if(password===Conpassword){
      axios
      .post("/changePassword", { userId, Oldpassword ,password })
      .then((response) => {
        if(response.data.message=="wrong"){
          Alert.alert("wrong old password");
        }else{
          Alert.alert("Success", "Password changed successfully");
        }
        setPassword("");

        setTimeout(() => {
          navigation.goBack();
        }, 500);
      })
      .catch((error) => {
        Alert.alert("Error", "Failed to change password");
        console.log("error", error);
      });
    }else{
      Alert.alert("Check password and confirm password")
    }
  };
  return (
    <>
      <View style={{ backgroundColor: "#5B9BD5", padding: scale(20),paddingTop:scale(30)  }}>
        <Text style={{ fontSize: scale(25), color: "#fff" }}>Change Password</Text>
      </View>
      <View>
        <View style={{marginHorizontal:scale(20),marginTop:scale(30)}}>
          <Text style={{ fontSize: scale(15), fontWeight: "bold" }}>Old password</Text>

          <TextInput
          onChangeText={(text)=>setOldPassword(text)}
            placeholderTextColor={"black"}
            style={{
              padding: scale(10),
              borderColor: "#D0D0D0",
              borderWidth: scale(1),
              marginTop: scale(10),
              borderRadius: scale(5),
            }}
          />
        </View>
        <View style={{marginHorizontal:scale(20)}}>
          <Text style={{ fontSize: scale(15), fontWeight: "bold",marginTop:scale(10) }}>New password</Text>

          <TextInput
          onChangeText={(text)=>setPassword(text)}
            placeholderTextColor={"black"}
            style={{
              padding: scale(10),
              borderColor: "#D0D0D0",
              borderWidth: scale(1),
              marginTop: scale(10),
              borderRadius: scale(5),
            }}
          />
        </View>
        <View style={{marginHorizontal:scale(20)}}>
          <Text style={{ fontSize: scale(15), fontWeight: "bold",marginTop:scale(10) }}>
            Confirm password
          </Text>

          <TextInput
          onChangeText={(text)=>setConPassword(text)}
            placeholderTextColor={"black"}
            style={{
              padding: scale(10),
              borderColor: "#D0D0D0",
              borderWidth: scale(1),
              marginTop: scale(10),
              borderRadius: scale(5),
            }}
          />
        </View>
        <Pressable
        onPress={handlePassowrd}
          style={{
            backgroundColor: "#BDD7EE",
            padding: scale(19),
            borderRadius: scale(6),
            justifyContent: "center",
            alignItems: "center",
            marginTop: scale(20),
            marginHorizontal:scale(20)
          }}
        >
          <Text style={{ fontWeight: "bold" }}>Change password</Text>
        </Pressable>
      </View>
    </>
  );
};

export default ChangePasswordScreen;

const styles = StyleSheet.create({});
