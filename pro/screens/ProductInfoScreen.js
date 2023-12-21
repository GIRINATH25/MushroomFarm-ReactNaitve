import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
  Dimensions,
  Pressable,
  Modal,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useNavigation } from "@react-navigation/native";
import { SelectList } from "react-native-dropdown-select-list";
import { scale, verticalScale } from "react-native-size-matters";

const ProductInfoScreen = () => {
  const route = useRoute();
  const { item } = route.params;
  const navigation = useNavigation();
  const windowWidth = Dimensions.get("window").width;
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [displayDate, setDisplayDate] = useState(false);
  const [issueDate, setIssueDate] = useState("");
  const [quantity, setQuantity] = useState();
  const [schedule, setSchedule] = useState("Sunday");

  console.log(schedule);
  const state = [
    { key: "Sunday", value: "Sunday" },
    { key: "Monday", value: "Monday" },
    { key: "Tuesday", value: "Tuesday" },
    { key: "Wednesday", value: "Wednesday" },
    { key: "Thursday", value: "Thursday" },
    { key: "Friday", value: "Friday" },
    { key: "Saturday", value: "Saturday" },
  ];

  const buyPlanned = {
    name: item.mushroomName,
    image: item.image,
    email: item.email,
    price: item.price,
    quantity: item.volume,
    schedule: schedule,
  };

  const buyUnplanned = {
    name: item.mushroomName,
    image: item.image,
    email: item.email,
    price: ((item.price / item.volume) * quantity).toFixed(2),
    quantity: quantity,
    schedule: "unscheduled",
    date: issueDate,
  };

  const handlePlanned = () => {
    navigation.navigate("payment", { item: buyPlanned });
  };

  const handleUnplanned = () => {
    navigation.navigate("payment", { item: buyUnplanned });
  };

  {
    /* For Date picking */
  }
  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleDateConfirm = (date) => {
    setIssueDate(date.toISOString().split("T")[0]);
    hideDatePicker();
  };

  return (
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#333",
        }}
      >
        <ImageBackground
          style={{
            width: windowWidth,
            height: scale(300),
            marginTop: scale(25),
            resizeMode: "cover",
          }}
          source={{ uri: item.image }}
        ></ImageBackground>
      </View>
      <View style={{ marginHorizontal: scale(10) }}>
        <View style={{ padding: scale(10) }}>
          <Text style={{ fontSize: scale(25), fontWeight: "500" }}>
            {item.mushroomName}
          </Text>
          <Text style={{ fontSize: scale(16), fontWeight: "600", marginTop: scale(6) }}>
            ₹ {item.price} per {item.volume} kg
          </Text>
        </View>
        
        <Text style={{ height: scale(1), borderColor: "#D0D0D0", borderWidth: scale(1) }} />

        <View style={{ padding: scale(10) }}>
          <Text style={{ fontSize: scale(18), fontWeight: 600, marginVertical: scale(20) }}>
            Planned quantity
          </Text>
          <Text style={{ fontSize: scale(16) }}>
            Planned Quantity :{" "}
            <Text style={{ color: "black" }}>{item.volume} kg</Text>
          </Text>
          <Text style={{ fontSize: scale(16) }}>
            Price                       : <Text style={{ color: "black" }}>₹ {item.price}</Text>
          </Text>
          <Text style={{ fontSize: scale(16) }}>
            Delivery Time       :{" "}
            <Text style={{ color: "black" }}>{item.deliveryTime}</Text>
          </Text>
          <View style={{flex:1, flexDirection:"row",marginTop:scale(10)}}>
            <Text style={{ fontSize: scale(18) ,marginTop:scale(7)}}>Schedule           :</Text>
            <SelectList 
                        data={state} 
                        setSelected={setSchedule} 
                        boxStyles={{height:scale(45),marginLeft:scale(10),width:scale(150)}} 
                        dropdownStyles={{backgroundColor:"#CEDDEA",width:scale(150),position:"absolute",top:-60,left:10}} 
                        maxHeight={scale(100)} search={false} disabledItemStyles={true}/>
          </View>
          <Pressable
            onPress={handlePlanned}
            style={{
              backgroundColor: "#5B9BD5",
              padding: scale(10),
              borderRadius: scale(20),
              justifyContent: "center",
              alignItems: "center",
              marginHorizontal: scale(10),
              marginTop:scale(30),
              marginVertical: scale(10),
            }}
          >
            <View>
              <Text style={{ color: "#fff" }}>Buy planned quantity</Text>
            </View>
          </Pressable>
        </View>
        <Text style={{ height: scale(1), borderColor: "#D0D0D0", borderWidth: scale(1) }} />

        <View style={{ padding: scale(10) }}>
          <Text style={{ fontSize: scale(18), fontWeight: 600, marginVertical: scale(15) }}>
            Unplanned quantity
          </Text>

          <Text style={{ fontSize: scale(16) }}>Issue Date:</Text>
          <TouchableOpacity
            style={{
              padding: scale(10),
              borderColor: "#D0D0D0",
              borderWidth: scale(1),
              marginTop: scale(10),
              borderRadius: scale(5),
            }}
            onPress={() => {
              showDatePicker();
              setDisplayDate(!displayDate);
            }}
          >
            <Text style={{ fontSize: scale(16) }}>
              {displayDate ? (
                <Text>{issueDate}</Text>
              ) : (
                <Text>Select date</Text>
              )}
            </Text>
          </TouchableOpacity>
          <DateTimePickerModal
            pickerComponentStyleIOS={{backgroundColor:"blue"}}
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleDateConfirm}
            onCancel={hideDatePicker}
          />
          <Text style={{ fontSize: scale(16), marginTop: scale(15) }}>
            Unplanned quantity in kg:
          </Text>
          <TextInput
            style={{
              padding: scale(10),
              borderColor: "#D0D0D0",
              borderWidth: scale(1),
              marginTop: scale(10),
              borderRadius: scale(5),
            }}
            onChangeText={(text) => setQuantity(text)}
            placeholder="Ex : 2 "
          />
          <Pressable
            onPress={handleUnplanned}
            style={{
              backgroundColor: "#5B9BD5",
              padding: scale(10),
              borderRadius: scale(20),
              justifyContent: "center",
              alignItems: "center",
              marginHorizontal: scale(10),
              marginVertical: scale(10),
              marginTop: scale(40),
            }}
          >
            <View>
              <Text style={{ color: "#fff" }}>Buy unplanned quantity</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProductInfoScreen;

const styles = StyleSheet.create({});
