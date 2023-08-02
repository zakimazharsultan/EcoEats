import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { auth } from "../firebase";
import { useNavigation } from "@react-navigation/native";
import Toast from 'react-native-toast-message';
import { db } from "../firebase";

const AddItemScreen = () => {
  const user = auth.currentUser;
  const navigation = useNavigation();
  const categories = [
    { label: "Solid", value: "s" },
    { label: "Liquid", value: "l" },
    { label: "Dry", value: "w" },
  ];
  const newDate = new Date();
  const expiryDate = newDate.setDate(newDate.getDate() + 1);
  const [value, setValue] = useState(null);
  const [name, setName] = useState("");
  const [expTime, setExpTime] = useState(new Date(expiryDate));
  const [calories, setCalories] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const [image, setImage] = useState("https://cdn.icon-icons.com/icons2/3277/PNG/512/salad_bowl_food_vegetables_vegan_healthy_food_icon_208011.png");
  const [quantity, setQuantity] = useState(1);
  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
  };

  const onChange = ({ type }, selectedDate) => {
    // console.log('on Change:', selectedDate, 'type:', type);
    if (type == "set") {
      const currentDate = selectedDate;
      setExpTime(currentDate);
      setShowPicker(false)
    }

  };

  const clear = () => {
    setName("");
    setExpTime(expiryDate);
    setCalories("");
    setPrice("");
    setCategory("");
  };

  const saveFoodItem = async () => {
    console.log('saving food item')
    const newFoodItem = {
      name: name,
      expiry: expTime,
      calories: calories,
      price: price,
      category: value,
      image: image,
      quantity: quantity,
      added: serverTimestamp(),
    };
    console.log(newFoodItem);
    const foodItems = await addDoc(collection(db, 'users', user?.email, 'foodItems'), newFoodItem)
    console.log('food item added', foodItems.id)
    Toast.show({
      type: 'success',
      position: 'top',
      text1: 'Success',
      text2: 'Food item added successfully',
    })
  }

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
          Add Food Item
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

      <KeyboardAvoidingView>
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}
        >
          <MaterialCommunityIcons
            name="email-outline"
            size={24}
            color={"#4acdcd"}
          />
          <TextInput
            placeholder="Name"
            value={name}
            onChangeText={(text) => setName(text)}
            placeholderTextColor={"#1e546b"}
            style={{
              fontSize: name ? 18 : 18,
              borderBottomWidth: 1,
              borderBottomColor: "gray",
              marginLeft: 13,
              marginVertical: 10,
              width: 300,
            }}
          />
        </View>
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}
        >
          <MaterialCommunityIcons
            name="email-outline"
            size={24}
            color={"#4acdcd"}
          />

          {showPicker ? (
            <>
              <TextInput
                placeholder="Expiry"
                value={expTime.toDateString()}
                onChangeText={setExpTime}
                placeholderTextColor={"#1e546b"}
                editable={false}
                style={{
                  color: "#1e546b",
                  fontSize: expTime ? 18 : 18,
                  borderBottomWidth: 1,
                  borderBottomColor: "gray",
                  marginLeft: 13,
                  marginVertical: 10,
                  width: 300,
                }}
              />
              <DateTimePicker
                mode="date"
                display="spinner"
                value={expTime}
                onChange={onChange}
                minimumDate={new Date()}

              />
            </>
          ) :
            <Pressable onPress={(toggleDatePicker)}>
              <TextInput
                placeholder="Expiry"
                value={expTime.toDateString()}
                onChangeText={setExpTime}
                placeholderTextColor={"#1e546b"}
                editable={false}
                style={{
                  color: "#1e546b",
                  fontSize: expTime ? 18 : 18,
                  borderBottomWidth: 1,
                  borderBottomColor: "gray",
                  marginLeft: 13,
                  marginVertical: 10,
                  width: 300,
                }}
              />
            </Pressable>}

        </View>
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}
        >
          <MaterialCommunityIcons
            name="email-outline"
            size={24}
            color={"#4acdcd"}
          />
          <TextInput
            placeholder="Calories (kCal)"
            value={calories}
            onChangeText={(text) => setCalories(text)}
            placeholderTextColor={"#1e546b"}
            keyboardType="numeric"
            style={{
              fontSize: calories ? 18 : 18,
              borderBottomWidth: 1,
              borderBottomColor: "gray",
              marginLeft: 13,
              marginVertical: 10,
              width: 300,
            }}
          />
        </View>
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}
        >
          <MaterialCommunityIcons
            name="email-outline"
            size={24}
            color={"#4acdcd"}
          />
          <TextInput
            placeholder="Price £"
            value={price}
            onChangeText={(text) => setPrice(text)}
            placeholderTextColor={"#1e546b"}
            keyboardType="numeric"
            style={{
              fontSize: price ? 18 : 18,
              borderBottomWidth: 1,
              borderBottomColor: "gray",
              marginLeft: 13,
              marginVertical: 10,
              width: 300,
            }}
          />
        </View>
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}
        >
          {/* <MaterialCommunityIcons
            name="email-outline"
            size={24}
            color={"#4acdcd"}
          />
          <TextInput
            placeholder="Category"
            value={category}
            onChangeText={(text) => setCategory(text)}
            placeholderTextColor={"#1e546b"}
            style={{
              fontSize: category ? 18 : 18,
              borderBottomWidth: 1,
              borderBottomColor: "gray",
              marginLeft: 13,
              marginVertical: 10,
              width: 300,
            }}
          /> */}
          <Dropdown
            style={{
              margin: 16,
              height: 50,
              width: 150,
              borderBottomColor: "gray",
              borderBottomWidth: 0.5,
            }}
            placeholderStyle={{ fontSize: 16 }}
            selectedTextStyle={{ fontSize: 16 }}
            inputSearchStyle={{ height: 40, fontSize: 16 }}
            iconStyle={{ width: 20, height: 20 }}
            data={categories}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Select item"
            value={value}
            onChange={(item) => {
              setValue(item.value);
            }}
            renderLeftIcon={() => (
              <AntDesign
                style={{ marginRight: 5 }}
                color="black"
                name="Safety"
                size={20}
              />
            )}
          />
        </View>

        <View style={{ flexDirection: "row" }}>
          <Pressable
            onPress={clear}
            style={{
              width: 100,
              backgroundColor: "#318CE7",
              padding: 15,
              borderRadius: 7,
              marginTop: 40,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <Text style={{ fontSize: 18, textAlign: "center", color: "white" }}>
              Clear
            </Text>
          </Pressable>

          <Pressable
            style={{
              width: 150,
              backgroundColor: (name === "" || expTime === "" || calories === "" || price === "" || category === "") ? "grey" : "#318CE7",
              padding: 15,
              borderRadius: 7,
              marginTop: 40,
              marginLeft: "auto",
              marginRight: "auto",
            }}
            // disabled={name === "" || expTime === "" || calories === "" || price === "" || category === ""}
            onPress={saveFoodItem}
          >
            <Text style={{ fontSize: 18, textAlign: "center", color: "white" }}>
              Add
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView >
    </>
  );
};

export default AddItemScreen;

const styles = StyleSheet.create({});
