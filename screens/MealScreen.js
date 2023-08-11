import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SimpleLineIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import React from "react";

const fetchData = async (input) => {
  const response = await axios.post(
    "https://api.openai.com/v1/completions",
    {
      prompt: `Complete this sentence: "${input}"`,
      model: model,
      max_tokens: 50,
      n: 1,
      stop: ".",
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
    }
  );

  return response.data.choices[0].text;
};

const MealScreen = () => {
  const navigation = useNavigation();

  return (
    <>
      <SafeAreaView
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 10,
          backgroundColor: "#adf7cd",
        }}
      >
        <View>
          <Image
            source={require("../assets/phool.png")}
            style={{ width: 50, height: 55, marginLeft: 5 }}
          />
        </View>
        <Text style={{ fontSize: 25, fontWeight: "bold", color: "#4acdcd" }}>
          Meal Suggestions
        </Text>
        <Pressable
          onPress={() => navigation.navigate("Profile")}
          style={{ marginRight: 5 }}
        >
          <Image
            style={{ width: 40, height: 40, borderRadius: 20 }}
            source={{
              uri: "https://lh3.google.com/u/0/ogw/AGvuzYYgaacrw17YS1gPAV5d67jEPZd_QT7OCc1DqtUr=s32-c-mo",
            }}
          ></Image>
        </Pressable>
      </SafeAreaView>

      <View style={{ backgroundColor: "#e1f5ea" }}>
        <View
          style={{
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            Suggested Meals based on your current inventory
          </Text>
        </View>
        <ScrollView
          style={{
            margin: 10,
            backgroundColor: "white",
            height: "70%",
            padding: 2,
            borderWidth: 2,
            borderColor: "grey",
          }}
        >
          <Text>Suggestions</Text>
        </ScrollView>
      </View>

      <View
        style={{
          margin: 5,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Pressable
          style={{
            backgroundColor: "#0fa6a6",
            borderColor: "white",
            borderWidth: 2,
            padding: 15,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
            flex: 1,
          }}
          onPress={() => navigation.goBack()}
        >
          <SimpleLineIcons name="basket" size={24} color="white" />
        </Pressable>

        <Pressable
          style={{
            backgroundColor: "#0fa6a6",
            borderColor: "white",
            borderWidth: 2,
            padding: 15,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
            flex: 1,
          }}
        >
          <MaterialCommunityIcons
            name="silverware-fork-knife"
            size={24}
            color="white"
          />
        </Pressable>
      </View>
    </>
  );
};

export default MealScreen;

const styles = StyleSheet.create({});
