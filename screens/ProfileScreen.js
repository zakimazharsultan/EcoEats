import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Pressable } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = () => {
  const user = auth.currentUser;
  const navigation = useNavigation();
  const signOutUser = () => {
    signOut(auth)
      .then(() => {
        navigation.replace("Login");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Pressable
        style={{
          marginVertical: 10,
          marginBottom: "30%",
          backgroundColor: "green",
          padding: 20,
          width: "100%",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 18,
            fontWeight: "600",
            borderRadius: 10,
          }}
        >
          Welcome {user.email}
        </Text>
      </Pressable>

      <Pressable
        onPress={signOutUser}
        style={{ backgroundColor: "red", padding: 25, borderRadius: 15 }}
      >
        <Text style={{ color: "white", fontSize: 16, fontWeight: "800" }}>
          Sign Out
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
