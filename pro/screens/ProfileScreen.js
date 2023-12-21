import { StyleSheet, Text, View, ScrollView, Pressable, RefreshControl } from "react-native";
import React, { useState, useEffect, useContext, useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import { UserType } from "../UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { scale, verticalScale } from "react-native-size-matters";

const ProfileScreen = () => {
  var fetched = "";
  const [user, setUser] = useState("");
  const [addresses, setAddresses] = useState([]);
  const { userId, setUserId } = useContext(UserType);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();


  useEffect(() => {
    fetchUser();
    fetchAddresses();
  }, [userId]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      fetchUser();
      fetchAddresses();
      setRefreshing(false);
    }, 2000);
  });

  const fetchUser = async () => {
    const token = await AsyncStorage.getItem("authToken");
    const decodedToken = jwt_decode(token);
    const userId = decodedToken.userId;
    fetched = userId; 
    setUserId(userId);
  };

  const fetchAddresses = async () => {
    try {
      console.log(userId);
      const res = await axios.get(
        `/addresses/${userId}`
      );
      const { addresses, user } = res.data;
      setUser(user);
      setAddresses(addresses);
    } catch (error) {
      console.log("error", error);
    }
  };
  

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("authToken");
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (err) {
      console.log("error", err);
    }
  };

  return (
    <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
      <View style={{ backgroundColor: "#5B9BD5", padding: scale(10), paddingTop:scale(20) ,flex:1, flexDirection:"row"}}>
        <Text style={{ fontSize: scale(30), color:"#fff", marginRight:scale(120), marginTop:scale(10)}}>Profile</Text>
        <Pressable
        onPress={handleLogout}
        style={{
          marginTop:scale(15),
          flex: 1,
          flexDirection: "row",
          justifyContent: "center",
          backgroundColor: "#BDD7EE",
          padding: scale(10),
          width: scale(30),
          borderRadius:scale(10)
        }}
      >
        <Text style={{ fontWeight: "bold" }}>Sign out</Text>
      </Pressable>
      </View>
      <View
        style={{
          marginTop: scale(30),
          flex: 1,
          flexDirection: "row",
          marginHorizontal: scale(10),
        }}
      >
        <Text style={{ fontSize: scale(18), fontWeight: 400 }}>User Name : </Text>
        <Text style={{ fontSize: scale(16), marginTop: scale(3), marginLeft: scale(10) }}>
          {user.name}
        </Text>
      </View>
      <View
        style={{
          marginTop: scale(10),
          flex: 1,
          flexDirection: "row",
          marginHorizontal: scale(10),
        }}
      >
        <Text style={{ fontSize: scale(18), fontWeight: 400 }}>Email          : </Text>
        <Text style={{ fontSize: scale(16), marginTop: scale(3), marginLeft: scale(10) }}>
          {user.email}
        </Text>
      </View>

      <Pressable
        onPress={() => navigation.navigate("password")}
        style={{
          marginTop:scale(30),
          marginHorizontal: scale(20),
          backgroundColor: "#BDD7EE",
          borderColor: "#D0D0D0",
          borderWidth: 1,
          padding: scale(19),
          borderRadius: scale(10),
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontWeight: "bold"}}>Change Password</Text>
      </Pressable>

      <View style={{ marginBottom: scale(8), marginTop: scale(10), marginHorizontal: scale(10) }}>
        <Text style={{ fontSize: scale(18), fontWeight: "500" }}>Details/Address</Text>
      </View>

      <ScrollView vertical showsVerticalScrollIndicator={false}>
        <View
          style={{
            marginTop: scale(10),
            flex: 1,
            flexDirection: "row",
            marginHorizontal: scale(10),
          }}
        >
          <Text style={{ fontSize: scale(18), fontWeight: 400 }}>Name         : </Text>
          <Text style={{ fontSize: scale(16), marginTop: scale(3), marginLeft: scale(10) }}>
            {addresses.name}
          </Text>
        </View>

        <View
          style={{
            marginTop: scale(10),
            flex: 1,
            flexDirection: "row",
            marginHorizontal: scale(10),
          }}
        >
          <Text style={{ fontSize: scale(18), fontWeight: 400 }}>MobileNo  : </Text>
          <Text style={{ fontSize: scale(16), marginTop: scale(3), marginLeft: scale(10) }}>
            {addresses.mobileNo}
          </Text>
        </View>

        <View
          style={{
            marginTop: scale(10),
            flex: 1,
            flexDirection: "row",
            marginHorizontal: scale(10),
          }}
        >
          <Text style={{ fontSize: scale(18), fontWeight: 400 }}>Address    : </Text>
          <Text
            style={{
              flex: 1,
              fontSize: scale(16),
              marginTop: scale(3),
              marginLeft: scale(10),
              flexWrap: "wrap",
            }}
          >
            {addresses.houseNo}
            {"\n"}
            {addresses.street}
            {"\n"}
            {addresses.landmark}
            {"\n"}
            {addresses.city}
            {"\n"}
            {addresses.country}
            {"\n"}
            {addresses.pincode}
          </Text>
        </View>

        <Pressable
          onPress={() => {
            navigation.navigate("Address", { address: addresses });
          }}
          style={{
            width: scale(300),
            height: verticalScale(55),
            borderColor: "#D0D0D0",
            marginTop: scale(10),
            borderWidth: 1,
            padding: scale(10),
            justifyContent: "center",
            alignContent: "center",
            marginLeft: scale(20),
            backgroundColor: "#BDD7EE",
            borderRadius:scale(10)
          }}
        >
          <Text style={{ textAlign: "center", fontWeight: "800"}}>
            Edit your Details/Address
          </Text>
        </Pressable>
      </ScrollView>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
