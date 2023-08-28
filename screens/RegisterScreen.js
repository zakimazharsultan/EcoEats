import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAvoidingView, Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import Toast from "react-native-simple-toast";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const navigation = useNavigation();

  const register = () => {
    if (email === "" || password === "" || phone === "") {
      return Alert.alert("Please fill all the fields");
    }
    createUserWithEmailAndPassword(auth, email, password).then(
      (userCredential) => {
        console.log("user credential", userCredential);
        const user = userCredential._tokenResponse.email;
        const myUserUid = auth.currentUser.uid;

        setDoc(doc(db, "users", `${myUserUid}`), {
          email: user,
          phone: phone,
        });
        navigation.navigate("Intro");
      }
    ).catch((error) => {
      // Handle the error here
      Toast.show("Error: ", error);
    });;
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        padding: 10,
      }}
    >
      <KeyboardAvoidingView>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 30,
          }}
        >
          <Image
            source={require("../assets/logo.png")}
            style={{ width: 160, height: 120 }}
          />
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <Text style={{ fontSize: 20, color: "#4acdcd", fontWeight: "bold" }}>
            Register
          </Text>
          <Text
            style={{
              fontSize: 18,
              marginTop: 6,
              fontWeight: "500",
              color: "#4acdcd",
            }}
          >
            Create a new Account
          </Text>
        </View>

        <View style={{ marginTop: 40 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialCommunityIcons
              name="email-outline"
              size={24}
              color={"#4acdcd"}
            />
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholderTextColor={"#1e546b"}
              style={{
                fontSize: email ? 18 : 18,
                borderBottomWidth: 1,
                borderBottomColor: "gray",
                marginLeft: 13,
                marginVertical: 10,
                width: 300,
              }}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <Ionicons name="key-outline" size={24} color={"#4acdcd"} />
            <TextInput
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
              placeholder="Password"
              placeholderTextColor={"#1e546b"}
              style={{
                fontSize: password ? 18 : 18,
                borderBottomWidth: 1,
                borderBottomColor: "gray",
                marginLeft: 13,
                width: 300,
                marginVertical: 20,
              }}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <Feather name="phone" size={24} color="#4acdcd" />
            <TextInput
              value={phone}
              onChangeText={(text) => setPhone(text)}
              placeholder="Phone No"
              placeholderTextColor={"#1e546b"}
              keyboardType="numeric"
              style={{
                fontSize: phone ? 18 : 18,
                borderBottomWidth: 1,
                borderBottomColor: "gray",
                marginLeft: 13,
                width: 300,
                marginVertical: 20,
              }}
            />
          </View>

          <Pressable
            onPress={register}
            style={{
              width: 200,
              backgroundColor: "#318CE7",
              padding: 15,
              borderRadius: 7,
              marginTop: 40,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <Text style={{ fontSize: 18, textAlign: "center", color: "white" }}>
              Register
            </Text>
          </Pressable>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 20,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 17,
                color: "black",
                fontWeight: "500",
              }}
            >
              Already have an account?
            </Text>
            <Pressable onPress={() => navigation.goBack()}>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 17,
                  color: "blue",
                  fontWeight: "500",
                  marginLeft: 5,
                }}
              >
                Sign In
              </Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
