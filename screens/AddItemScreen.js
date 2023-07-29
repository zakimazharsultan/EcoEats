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
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import React, { useState } from "react";
import { DateTimePicker } from "@react-native-community/datetimepicker";

const AddItemScreen = () => {
  const categories = [
    { label: "Solid", value: "s" },
    { label: "Liquid", value: "l" },
    { label: "Weight", value: "w" },
  ];

  const [value, setValue] = useState(null);
  const [name, setName] = useState("");
  const [addDate, setAddDate] = useState(new Date());
  const [expTime, setExpTime] = useState(new Date());
  const [calories, setCalories] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
  };

  const onChange = ({ type }, selectedDate) => {
    if (type == "set") {
      const currentDate = selectedDate;
      setDate(currentDate);
    } else {
      toggleDatePicker();
    }
  };

  const clear = () => {
    setName("");
    setExpTime("");
    setCalories("");
    setPrice("");
    setCategory("");
  };

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

          {showPicker && (
            <DateTimePicker
              mode="date"
              display="spinner"
              value={addDate}
              onChange={onChange}
            />
          )}

          {!showPicker && (
            <Pressable onPress={toggleDatePicker}>
              <TextInput
                placeholder="Added Date"
                value={addDate}
                onChangeText={setAddDate}
                placeholderTextColor={"#1e546b"}
                editable={false}
                style={{
                  fontSize: addDate ? 18 : 18,
                  borderBottomWidth: 1,
                  borderBottomColor: "gray",
                  marginLeft: 13,
                  marginVertical: 10,
                  width: 300,
                }}
              />
            </Pressable>
          )}
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
            placeholder="Expiry Time"
            value={expTime}
            onChangeText={(text) => setExpTime(text)}
            placeholderTextColor={"#1e546b"}
            style={{
              fontSize: expTime ? 18 : 18,
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
            placeholder="Calories"
            value={calories}
            onChangeText={(text) => setCalories(text)}
            placeholderTextColor={"#1e546b"}
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
            placeholder="Price"
            value={price}
            onChangeText={(text) => setPrice(text)}
            placeholderTextColor={"#1e546b"}
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
              backgroundColor: "#318CE7",
              padding: 15,
              borderRadius: 7,
              marginTop: 40,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <Text style={{ fontSize: 18, textAlign: "center", color: "white" }}>
              Add
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

export default AddItemScreen;

const styles = StyleSheet.create({});
