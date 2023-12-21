import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Modal,
  TextInput,
  Button,
  Image,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { scale, verticalScale } from "react-native-size-matters";

const ComplaintsScreen = () => {
  {
    /*Complaints*/
  }
  const [executive, setExecutive] = useState(false);
  const [late, setLate] = useState(false);
  const [partial, setPartial] = useState(false);
  const [packet, setPacket] = useState(false);

  {
    /* Collecting complaints */
  }
  const [email, setEmail] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [issueDetails, setIssueDetails] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [displayDate, setDisplayDate] = useState(false);
  const [issue, setIssue] = useState("");

  {
    /* For image pick */
  }
  useEffect(() => {
    getPermissionsAsync();
  }, []);

  const getPermissionsAsync = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Sorry, we need file permissions to make this work!");
    }
  };

  const captureImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result);
    }
  };

  const uploadImage = async () => {
    try {
      if (selectedImage) {
        const formData = new FormData();
        formData.append("image", {
          uri: selectedImage.assets[0].uri,
          name: "image.jpg",
          type: "image/jpg",
        });

        formData.append("email", email);
        formData.append("issueDate", issueDate);
        formData.append("issueDetails", issueDetails);
        console.log(issue);
        formData.append("issue", issue);

        const response = await axios.post(
          "/complaints",
          formData,{
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        if (response.status === 200) {
          Alert.alert("Success");
        } else {
          Alert.alert("Error");
        }
      } else {
        Alert.alert("Error", "Please select an image first.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      Alert.alert("Error");
    }
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
    <>
      <ScrollView>
        <View style={{ backgroundColor: "#5B9BD5", padding: scale(20),paddingTop:scale(30) }}>
          <Text style={{ fontSize: scale(25), color: "#fff" }}>Complaints</Text>
        </View>
        <Pressable
          onPress={() => setExecutive(!executive)}
          style={{
            flex: 1,
            flexDirection: "row",
            padding: scale(30),
            justifyContent: "space-between",
            marginRight: scale(30),
          }}
        >
          <Text style={{ fontSize: scale(16) }}>Delivery Executive</Text>
        </Pressable>
        <Text
          style={{
            height: scale(1),
            borderColor: "#D0D0D0",
            borderWidth: scale(1),
            marginTop: scale(1),
          }}
        />

        <Pressable
          onPress={() => setLate(!late)}
          style={{
            flex: 1,
            flexDirection: "row",
            padding: scale(30),
            justifyContent: "space-between",
            marginRight: scale(30),
          }}
        >
          <Text style={{ fontSize: scale(16) }}>Late Delivery</Text>
        </Pressable>
        <Text
          style={{
            height: scale(1),
            borderColor: "#D0D0D0",
            borderWidth: scale(1),
            marginTop: scale(1),
          }}
        />

        <Pressable
          onPress={() => setPartial(!partial)}
          style={{
            flex: 1,
            flexDirection: "row",
            padding: scale(30),
            justifyContent: "space-between",
            marginRight: scale(30),
          }}
        >
          <Text style={{ fontSize: scale(16) }}>Partial or Non Delivery</Text>
        </Pressable>
        <Text
          style={{
            height: scale(1),
            borderColor: "#D0D0D0",
            borderWidth: scale(1),
            marginTop: scale(1),
          }}
        />

        <Pressable
          onPress={() => setPacket(!packet)}
          style={{
            flex: 1,
            flexDirection: "row",
            padding: scale(30),
            justifyContent: "space-between",
            marginRight: scale(30),
          }}
        >
          <Text style={{ fontSize: scale(16) }}>Packet Leakage</Text>
        </Pressable>
        <Text
          style={{
            height: scale(1),
            borderColor: "#D0D0D0",
            borderWidth: scale(1),
            marginTop: scale(1),
          }}
        />
      </ScrollView>

      {/* Modals begins Here */}

      {/*Delivery Executive */}
      <Modal
        visible={executive}
        onRequestClose={() => setExecutive(!executive)}
        animationType="slide"
      >
        <View style={{ backgroundColor: "#5B9BD5", padding: scale(20),paddingTop:scale(30)  }}>
          <Text style={{ fontSize: scale(25), color: "#fff" }}>
            Delivery Executive
          </Text>
        </View>
        <View style={{ marginTop: scale(20) }}>
          <Text style={{ fontSize: scale(16), marginLeft: scale(20) }}>Email:</Text>
          <TextInput
            style={{
              padding: scale(10),
              borderColor: "#D0D0D0",
              borderWidth: scale(1),
              marginTop: scale(10),
              borderRadius: scale(5),
              marginHorizontal: scale(20),
              marginBottom:scale(20)
            }}
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholder="Enter your email"
          />

          <Text style={{ fontSize: scale(16), marginLeft: scale(20) }}>Issue Date:</Text>
          <TouchableOpacity
            style={{
              padding: scale(10),
              borderColor: "#D0D0D0",
              borderWidth: scale(1),
              marginTop: scale(10),
              borderRadius: scale(5),
              marginHorizontal: scale(20),
              marginBottom:scale(20)
            }}
            onPress={() => {
              showDatePicker();
              setDisplayDate(!displayDate);
            }}
          >
            <Text style={{ fontSize: scale(12) }}>
              {displayDate ? (
                <Text>{issueDate}</Text>
              ) : (
                <Text style={{fontSize:scale(12),color:"grey"}}>Select date</Text>
              )}
            </Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleDateConfirm}
            onCancel={hideDatePicker}
            
          />

          <Text style={{ fontSize: scale(16), marginLeft: scale(20) }}>Issue Details:</Text>
          <TextInput
            style={{
              padding: scale(10),
              borderColor: "#D0D0D0",
              borderWidth: scale(1),
              marginTop: scale(10),
              borderRadius: scale(5),
              marginHorizontal: scale(20),
              marginBottom:scale(20)
            }}
            value={issueDetails}
            onChangeText={(text) => {
              setIssueDetails(text);
              setIssue("Delivery Executive");
            }}
            placeholder="Enter issue details"
            multiline
            numberOfLines={5}
          />
          {selectedImage && (
            <Image
              source={{ uri: selectedImage.assets[0].uri }}
              style={{
                width: scale(100),
                height: scale(100),
                marginLeft: scale(150),
                marginBottom: scale(20),
              }}
            />
          )}
          <Pressable
            onPress={captureImage}
            style={{
              marginHorizontal: scale(20),
              backgroundColor: "#BDD7EE",
              borderColor: "#D0D0D0",
              borderWidth: scale(1),
              padding: scale(19),
              borderRadius: scale(10),
              justifyContent: "center",
              alignItems: "center",
              marginBottom: scale(20),
            }}
          >
            <Text style={{ fontWeight: "bold" }}>Select Image</Text>
          </Pressable>

          <Pressable
            onPress={uploadImage}
            style={{
              marginHorizontal: scale(20),
              backgroundColor: "#BDD7EE",
              borderColor: "#D0D0D0",
              borderWidth: scale(1),
              padding: scale(19),
              borderRadius: scale(10),
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontWeight: "bold" }}>submit</Text>
          </Pressable>
        </View>
      </Modal>

      {/* Late Delivery */}
      <Modal
        visible={late}
        onRequestClose={() => setLate(!late)}
        animationType="slide"
      >
        <View style={{ backgroundColor: "#5B9BD5", padding: scale(20),paddingTop:scale(30)}}>
          <Text style={{ fontSize: scale(25), color: "#fff" }}>Late Delivery</Text>
        </View>
        <View style={{ marginTop: scale(20) }}>
          <Text style={{ fontSize: scale(16), marginLeft: scale(20) }}>Email:</Text>
          <TextInput
            style={{
              padding: scale(10),
              borderColor: "#D0D0D0",
              borderWidth: scale(1),
              marginTop: scale(10),
              borderRadius: scale(5),
              marginHorizontal: scale(20),
              marginBottom:scale(20)
            }}
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholder="Enter your email"
          />

          <Text style={{ fontSize: scale(16), marginLeft: scale(20) }}>Issue Date:</Text>
          <TouchableOpacity
            style={{
              padding: scale(10),
              borderColor: "#D0D0D0",
              borderWidth: scale(1),
              marginTop: scale(10),
              borderRadius: scale(5),
              marginHorizontal: scale(20),
              marginBottom:scale(20)
            }}
            onPress={() => {
              showDatePicker();
              setDisplayDate(!displayDate);
            }}
          >
            <Text style={{ fontSize: scale(12) }}>
              {displayDate ? (
                <Text>{issueDate}</Text>
              ) : (
                <Text style={{fontSize:scale(12),color:"grey"}}>Select date</Text>
              )}
            </Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleDateConfirm}
            onCancel={hideDatePicker}
          />

          <Text style={{ fontSize: scale(16), marginLeft: scale(20) }}>Issue Details:</Text>
          <TextInput
            style={{
              padding: scale(10),
              borderColor: "#D0D0D0",
              borderWidth: scale(1),
              marginTop: scale(10),
              borderRadius: scale(5),
              marginHorizontal: scale(20),
              marginBottom:scale(20)
            }}
            value={issueDetails}
            onChangeText={(text) => {
              setIssueDetails(text);
              setIssue("Late Delivery");
            }}
            placeholder="Enter issue details"
            multiline
            numberOfLines={5}
          />
          {selectedImage && (
            <Image
              source={{ uri: selectedImage.assets[0].uri }}
              style={{
                width: scale(100),
                height: scale(100),
                marginLeft: scale(150),
                marginBottom: scale(20),
              }}
            />
          )}
          <Pressable
            onPress={captureImage}
            style={{
                marginHorizontal: scale(20),
                backgroundColor: "#BDD7EE",
                borderColor: "#D0D0D0",
                borderWidth: scale(1),
                padding: scale(19),
                borderRadius: scale(10),
                justifyContent: "center",
                alignItems: "center",
                marginBottom: scale(20),
            }}
          >
            <Text style={{ fontWeight: "bold" }}>Select Image</Text>
          </Pressable>

          <Pressable
            onPress={uploadImage}
            style={{
              marginHorizontal: scale(20),
              backgroundColor: "#BDD7EE",
              borderColor: "#D0D0D0",
              borderWidth: scale(1),
              padding: scale(19),
              borderRadius: scale(10),
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontWeight: "bold" }}>submit</Text>
          </Pressable>
        </View>
      </Modal>

      {/* Non Delivery */}

      <Modal
        visible={partial}
        onRequestClose={() => setPartial(!partial)}
        animationType="slide"
      >
        <View style={{ backgroundColor: "#5B9BD5", padding: scale(20),paddingTop:scale(30)}}>
          <Text style={{ fontSize: scale(25), color: "#fff" }}>Non Delivery</Text>
        </View>
        <View style={{ marginTop: scale(20) }}>
          <Text style={{ fontSize: scale(16), marginLeft: scale(20) }}>Email:</Text>
          <TextInput
            style={{
              padding: scale(10),
              borderColor: "#D0D0D0",
              borderWidth: scale(1),
              marginTop: scale(10),
              borderRadius: scale(5),
              marginHorizontal: scale(20),
              marginBottom:scale(20)
            }}
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholder="Enter your email"
          />

          <Text style={{ fontSize: scale(16), marginLeft: scale(20) }}>Issue Date:</Text>
          <TouchableOpacity
            style={{
              padding: scale(10),
              borderColor: "#D0D0D0",
              borderWidth: scale(1),
              marginTop: scale(10),
              borderRadius: scale(5),
              marginHorizontal: scale(20),
              marginBottom:scale(20)
            }}
            onPress={() => {
              showDatePicker();
              setDisplayDate(!displayDate);
            }}
          >
            <Text style={{ fontSize: scale(12) }}>
              {displayDate ? (
                <Text>{issueDate}</Text>
              ) : (
                <Text style={{fontSize:scale(12),color:"grey"}}>Select date</Text>
              )}
            </Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleDateConfirm}
            onCancel={hideDatePicker}
          />

          <Text style={{ fontSize: scale(16), marginLeft: scale(20) }}>Issue Details:</Text>
          <TextInput
            style={{
              padding: scale(10),
              borderColor: "#D0D0D0",
              borderWidth: scale(1),
              marginTop: scale(10),
              borderRadius: scale(5),
              marginHorizontal: scale(20),
              marginBottom:scale(20)
            }}
            value={issueDetails}
            onChangeText={(text) => {
              setIssueDetails(text);
              setIssue("Non Delivery");
            }}
            placeholder="Enter issue details"
            multiline
            numberOfLines={4}
          />
          {selectedImage && (
            <Image
              source={{ uri: selectedImage.assets[0].uri }}
              style={{
                width: scale(100),
                height: scale(100),
                marginLeft: scale(150),
                marginBottom: scale(20),
              }}
            />
          )}
          <Pressable
            onPress={captureImage}
            style={{
                marginHorizontal: scale(20),
                backgroundColor: "#BDD7EE",
                borderColor: "#D0D0D0",
                borderWidth: scale(1),
                padding: scale(19),
                borderRadius: scale(10),
                justifyContent: "center",
                alignItems: "center",
                marginBottom: scale(20),
            }}
          >
            <Text style={{ fontWeight: "bold" }}>Select Image</Text>
          </Pressable>

          <Pressable
            onPress={uploadImage}
            style={{
              marginHorizontal: scale(20),
              backgroundColor: "#BDD7EE",
              borderColor: "#D0D0D0",
              borderWidth: scale(1),
              padding: scale(19),
              borderRadius: scale(10),
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontWeight: "bold" }}>submit</Text>
          </Pressable>
        </View>
      </Modal>

      {/* Packet Leakage */}

      <Modal
        visible={packet}
        onRequestClose={() => setPacket(!packet)}
        animationType="slide"
      >
        <View style={{ backgroundColor: "#5B9BD5", padding: scale(20),paddingTop:scale(30)}}>
          <Text style={{ fontSize: scale(25), color: "#fff" }}>Packet Leakage</Text>
        </View>
        <View style={{ marginTop: scale(20) }}>
          <Text style={{ fontSize: scale(16), marginLeft: scale(20) }}>Email:</Text>
          <TextInput
            style={{
              padding: scale(10),
              borderColor: "#D0D0D0",
              borderWidth: scale(1),
              marginTop: scale(10),
              borderRadius: scale(5),
              marginHorizontal: scale(20),
              marginBottom:scale(20)
            }}
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholder="Enter your email"
          />

          <Text style={{ fontSize: scale(16), marginLeft: scale(20) }}>Issue Date:</Text>
          <TouchableOpacity
            style={{
              padding: scale(10),
              borderColor: "#D0D0D0",
              borderWidth: scale(1),
              marginTop: scale(10),
              borderRadius: scale(5),
              marginHorizontal: scale(20),
              marginBottom:scale(20)
            }}
            onPress={() => {
              showDatePicker();
              setDisplayDate(!displayDate);
            }}
          >
            <Text style={{ fontSize: scale(12) }}>
              {displayDate ? (
                <Text>{issueDate}</Text>
              ) : (
                <Text style={{fontSize:scale(12),color:"grey"}}>Select date</Text>
              )}
            </Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleDateConfirm}
            onCancel={hideDatePicker}
          />

          <Text style={{ fontSize: scale(16), marginLeft: scale(20) }}>Issue Details:</Text>
          <TextInput
            style={{
              padding: scale(10),
              borderColor: "#D0D0D0",
              borderWidth: scale(1),
              marginTop: scale(10),
              borderRadius: scale(5),
              marginHorizontal: scale(20),
              marginBottom:scale(20)
            }}
            value={issueDetails}
            onChangeText={(text) => {
              setIssueDetails(text);
              setIssue("Packet Leakage");
            }}
            placeholder="Enter issue details"
            multiline
            numberOfLines={4}
          />
          {selectedImage && (
            <Image
              source={{ uri: selectedImage.assets[0].uri }}
              style={{
                width: scale(100),
                height: scale(100),
                marginLeft: scale(150),
                marginBottom: scale(20),
              }}
            />
          )}
          <Pressable
            onPress={captureImage}
            style={{
                marginHorizontal: scale(20),
                backgroundColor: "#BDD7EE",
                borderColor: "#D0D0D0",
                borderWidth: scale(1),
                padding: scale(19),
                borderRadius: scale(10),
                justifyContent: "center",
                alignItems: "center",
                marginBottom: scale(20),
            }}
          >
            <Text style={{ fontWeight: "bold" }}>Select Image</Text>
          </Pressable>

          <Pressable
            onPress={uploadImage}
            style={{
              marginHorizontal: scale(20),
              backgroundColor: "#BDD7EE",
              borderColor: "#D0D0D0",
              borderWidth: scale(1),
              padding: scale(19),
              borderRadius: scale(10),
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontWeight: "bold" }}>submit</Text>
          </Pressable>
        </View>
      </Modal>
    </>
  );
};

export default ComplaintsScreen;

const styles = StyleSheet.create({});
