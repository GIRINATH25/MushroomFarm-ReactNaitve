import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  Alert,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { useRoute } from "@react-navigation/native";
import { UserType } from "../UserContext";
import axios from "axios";
import jwt_decode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RNUpiPayment from "react-native-upi-payment";
import { scale, verticalScale } from "react-native-size-matters";

const PaymentScreen = () => {
  const route = useRoute();
  const { item } = route.params;
  const { userId, setUserId } = useContext(UserType);
  const [addresses, setAddresses] = useState([]);

  console.log(item);
  console.log(addresses);
  console.log(userId);

  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem("authToken");
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
    };
    fetchUser();
    const fetchAddresses = async () => {
      try {
        const res = await axios.get(`/addresses/${userId}`);
        const { addresses, user } = res.data;
        setAddresses(addresses);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchAddresses();
  }, [userId]);

  
  successCallback = async (data) => {
    try {
      const product = {
        mushroomName: item.name,
        image: item.image,
        quantity: item.quantity,
        price: item.price,
        txnId: data.txnId,
        schedule: item.schedule,
        Date: item.date,
        email: item.email,
      };
      const storeOrder = await axios.post("/orders", {
        userId,
        addresses,
        product,
      });
      if (storeOrder.status === 200) {
        Alert.alert("Success");
      } else {
        Alert.alert("Error");
      }
    } catch (error) {
      console.log("Error in storing order", error);
    }
    
  };
  failureCallback = async (data) => {
    Alert.alert("Order not placed");
  };

  return (
    <>
      <ScrollView>
        <View style={{ backgroundColor: "#5B9BD5", padding: scale(30) }}>
          <Text style={{ fontSize: scale(25), color: "#fff" }}>Payment</Text>
        </View>

        <View style={{ marginHorizontal: scale(10) }}>
          <View
            style={{
              backgroundColor: "white",
              marginVertical: scale(10),
              borderBottomColor: "#F0F0F0",
              borderWidth: scale(2),
              borderLeftWidth: 0,
              borderTopWidth: 0,
              borderRightWidth: 0,
            }}
          >
            <Pressable
              style={{
                marginVertical: 10,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View>
                <Image
                  style={{ width: scale(130), height: scale(130),marginLeft:scale(20), resizeMode: "cover",borderRadius:scale(10) }}
                  source={{ uri: item.image }}
                />
              </View>

              <View>
                <Text numberOfLines={3} style={{ width: scale(150), marginTop: scale(10) }}>
                  {item.name}
                </Text>
                <Text numberOfLines={3} style={{ width: scale(150), marginTop: scale(10) }}>
                  {item.quantity} Kg
                </Text>
                <Text numberOfLines={3} style={{ width: scale(150), marginTop: scale(10) }}>
                  {item.schedule}
                </Text>
                <Text
                  style={{ fontSize: scale(18), fontWeight: "bold", marginTop: scale(6) }}
                >
                  ₹{item.price}
                </Text>
              </View>
            </Pressable>
          </View>
        </View>

        <Pressable
          onPress={() => {
            if (addresses.name==="name") {
              Alert.alert("please add your address in profile page");
            } else {
              RNUpiPayment.initializePayment(
                {
                  vpa: "im.201022523762@indus", // or can be john@ybl or mobileNo@upi
                  payeeName: "Mahendran",
                  amount: item.price,
                  transactionRef: "aasf-332-aoei-fn",
                },
                this.successCallback.bind(this),
                this.failureCallback.bind(this)
              );
            }
          }}
          style={{
            backgroundColor: "#5B9BD5",
            padding: scale(10),
            borderRadius: scale(20),
            justifyContent: "center",
            alignItems: "center",
            marginHorizontal: scale(10),
            marginVertical: scale(10),
            marginTop: scale(50),
          }}
        >
          <View>
            <Text style={{color: "#fff"}}>Pay</Text>
          </View>
        </Pressable>
      </ScrollView>
    </>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({});
