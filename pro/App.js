import { StyleSheet } from "react-native";
import StackNavigation from "./navigation/StackNavigation";
import { ModalPortal } from "react-native-modals";
import { StatusBar } from "expo-status-bar";
import { UserContext } from "./UserContext";
import axios from "axios";

axios.defaults.baseURL='http://192.168.0.131:3000/'

export default function App() {
  return (
    <>
      <UserContext>
        <StatusBar style="light"/>
        <StackNavigation />
        <ModalPortal />
      </UserContext>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
