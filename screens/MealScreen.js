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
import { OPENAI_API_KEY } from "@env";
import React, { useEffect, useState, useCallback } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Configuration, OpenAIApi } from "openai";
import { useFocusEffect } from "@react-navigation/native";
import { getFoodItems } from "../utils/firebaseAPIcalls";
const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});

const openaiAPI = new OpenAIApi(configuration);

const fetchData = async (input) => {
  console.log(OPENAI_API_KEY);
  var meal = "no meal found";
  await openaiAPI
    .createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are going to provide eco-friendly Meal plans for a day based on the inventory provided. Do not suggest a meal based on any other food item which is not in the inventory.",
        },
        { role: "user", content: `inventory: ${input}` },
      ],
    })
    .then((res) => {
      // console.log(res.data.choices[0].message.content);
      meal = res.data.choices[0].message.content;
    })
    .catch((e) => {
      console.log(e);
    });

  return meal;
};

const MealScreen = () => {
  const navigation = useNavigation();
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [foodItems, setFoodItems] = useState([]);

  // useEffect(() => {
  //   const fetchRecipe = async () => {
  //     const items = await getFoodItems();
  //     var recipe = "";
  //     items.forEach((item) => {
  //       recipe += `${item.quantity} of ${item.name}, `;

  //     });
  //     setFoodItems(recipe);
  //     const meals = await fetchData(recipe);
  //     setMeals(meals);
  //     setLoading(false);
  //   };

  //   fetchRecipe();
  // }, [])

  useFocusEffect(
    React.useCallback(() => {
      const fetchRecipe = async () => {
        setLoading(true);
        const items = await getFoodItems();
        var recipe = "";
        items.forEach((item) => {
          recipe += `${item.quantity} of ${item.name}, `;
        });
        setFoodItems(recipe);
        const meals = await fetchData(recipe);
        setMeals(meals);
        setLoading(false);
      };

      fetchRecipe();

      return () => {
        // If you want to run any cleanup or another function when the screen goes out of focus
      };
    }, [])
  );
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
            height: "71%",
            padding: 2,
            borderWidth: 2,
            borderColor: "grey",
          }}
        >
          <Text>{loading ? "loading ..." : meals}</Text>
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
          <FontAwesome name="shopping-basket" size={24} color="white" />
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
          <FontAwesome5 name="robot" size={23} color="white" />
        </Pressable>
      </View>
    </>
  );
};

export default MealScreen;

const styles = StyleSheet.create({});
