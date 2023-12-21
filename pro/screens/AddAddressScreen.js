import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import { UserType } from "../UserContext";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { scale, verticalScale } from "react-native-size-matters";

const AddressScreen = () => {
  const route = useRoute();
  const { address } = route.params;
  const navigation = useNavigation();
  const [name, setName] = useState(address.name);
  const [mobileNo, setMobileNo] = useState(address.mobileNo.toString());
  const [houseNo, setHouseNo] = useState(address.houseNo.toString());
  const [street, setStreet] = useState(address.street);
  const [landmark, setLandmark] = useState(address.landmark);
  const [pincode, setPincode] = useState(address.pincode.toString());
  const [city, setCity] = useState(address.city);
  const [country, setCountry] = useState("India");
  const { userId, setUserId } = useContext(UserType);
  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem("authToken");
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
    };
    fetchUser();
  }, []);
  const handleAddAddress = () => {
    const address = {
      name,
      mobileNo,
      houseNo,
      street,
      landmark,
      city,
      pincode,
      country,
    };
    axios
      .post("/addresses", { userId, address })
      .then((response) => {
        Alert.alert("Success", "Addresses added successfully");
        setName("");
        setMobileNo("");
        setHouseNo("");
        setStreet("");
        setLandmark("");
        setPincode("");

        setTimeout(() => {
          navigation.goBack();
        }, 500);
      })
      .catch((error) => {
        Alert.alert("Error", "Failed to add address");
        console.log("error", error);
      });
  };
  return (
    <ScrollView>
      <View style={{ backgroundColor: "#5B9BD5", padding: scale(20),paddingTop:scale(30)  }}>
          <Text style={{ fontSize: scale(25), color: "#fff" }}>Add a new Address</Text>
        </View>

      <View style={{ padding: scale(10) }}>

        <TextInput
          value={country}
          onChangeText={(text) => setCountry(text)}
          placeholderTextColor={"black"}
          placeholder="India"
          style={{
            padding: scale(10),
            borderColor: "#D0D0D0",
            borderWidth: scale(1),
            marginTop: scale(10),
            borderRadius: scale(5),
          }}
        />

        <View style={{ marginVertical: scale(10) }}>
          <Text style={{ fontSize: scale(14), fontWeight: "bold" }}>Name</Text>

          <TextInput
            value={name}
            onChangeText={(text) => setName(text)}
            placeholderTextColor={"black"}
            style={{
              padding: scale(10),
              borderColor: "#D0D0D0",
              borderWidth: scale(1),
              marginTop: scale(10),
              borderRadius: scale(5),
            }}
            placeholder="enter your name"
          />
        </View>

        <View>
          <Text style={{ fontSize: scale(14), fontWeight: "bold" }}>
            Mobile numeber
          </Text>

          <TextInput
            value={mobileNo}
            onChangeText={(text) => setMobileNo(text)}
            placeholderTextColor={"black"}
            style={{
              padding: scale(10),
              borderColor: "#D0D0D0",
              borderWidth: scale(1),
              marginTop: scale(10),
              borderRadius: scale(5),
            }}
            placeholder="Mobile No"
          />
        </View>

        <View style={{ marginVertical: scale(10) }}>
          <Text style={{ fontSize: scale(14), fontWeight: "bold" }}>
            Flat,House No,Building,Company
          </Text>

          <TextInput
            value={houseNo}
            onChangeText={(text) => setHouseNo(text)}
            placeholderTextColor={"black"}
            style={{
              padding: scale(10),
              borderColor: "#D0D0D0",
              borderWidth: scale(1),
              marginTop: scale(10),
              borderRadius: scale(5),
            }}
            placeholder=""
          />
        </View>

        <View>
          <Text style={{ fontSize: scale(14), fontWeight: "bold" }}>
            Area, Street, sector, village
          </Text>
          <TextInput
            value={street}
            onChangeText={(text) => setStreet(text)}
            placeholderTextColor={"black"}
            style={{
              padding: scale(10),
              borderColor: "#D0D0D0",
              borderWidth: scale(1),
              marginTop: scale(10),
              borderRadius: scale(5),
            }}
            placeholder=""
          />
        </View>

        <View style={{ marginVertical: scale(10) }}>
          <Text style={{ fontSize: scale(14), fontWeight: "bold" }}>Landmark</Text>
          <TextInput
            value={landmark}
            onChangeText={(text) => setLandmark(text)}
            placeholderTextColor={"black"}
            style={{
              padding: scale(10),
              borderColor: "#D0D0D0",
              borderWidth: scale(1),
              marginTop: scale(10),
              borderRadius: scale(5),
            }}
            placeholder="Eg near appollo hospital"
          />
        </View>

        <View style={{ marginVertical: scale(10) }}>
          <Text style={{ fontSize: scale(14), fontWeight: "bold" }}>City</Text>
          <TextInput
            value={city}
            onChangeText={(text) => setCity(text)}
            placeholderTextColor={"black"}
            style={{
              padding: scale(10),
              borderColor: "#D0D0D0",
              borderWidth: scale(1),
              marginTop: scale(10),
              borderRadius: scale(5),
            }}
            placeholder=""
          />
        </View>

        <View>
          <Text style={{ fontSize: scale(14), fontWeight: "bold" }}>Pincode</Text>
            
          <TextInput
            value={pincode}
            onChangeText={(text) => setPincode(text)}
            placeholderTextColor={"black"}
            style={{
              padding: scale(10),
              borderColor: "#D0D0D0",
              borderWidth: scale(1),
              marginTop: scale(10),
              borderRadius: scale(5),
            }}
            placeholder="Enter Pincode"
          />
        </View>

        <Pressable
          onPress={handleAddAddress}
          style={{
            backgroundColor: "#BDD7EE",
            padding: scale(19),
            borderRadius: scale(6),
            justifyContent: "center",
            alignItems: "center",
            marginTop: scale(20),
            marginBottom:scale(20)
          }}
        >
          <Text style={{ fontWeight: "bold" }}>Add Address</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default AddressScreen;

const styles = StyleSheet.create({});
