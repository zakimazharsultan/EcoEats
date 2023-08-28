import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  KeyboardAvoidingView,
  ScrollView,
  FlatList,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { addDoc, collection, serverTimestamp, doc, updateDoc } from "firebase/firestore";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Ionicons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
// import { SimpleLineIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { auth } from "../firebase";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import Toast from "react-native-simple-toast";
import { Octicons } from "@expo/vector-icons";
import { db } from "../firebase";
import foodSuggestions from "../utils/foodSuggestions";
import QuantityComponent from "../components/QuantityComponent";

const AddItemScreen = ({ route }) => {
  const user = auth.currentUser;
  const [isEditing, setIsEditing] = useState(false);
  const navigation = useNavigation();
  const categories = [
    { label: "Fruits", value: " pcs" },
    { label: "Liquid", value: " ltr" },
    { label: "Vegetables", value: " kg" },
    { label: "Meat", value: " kg" },
    { label: "Others (ltr)", value: " ltr" },
    { label: "Others (Kg)", value: " kg" },
    { label: "Others (Solid)", value: " pcs" },
  ];
  const newDate = new Date();
  const expiryDate = newDate.setDate(newDate.getDate() + 1);
  const [value, setValue] = useState(null);
  const [name, setName] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [expTime, setExpTime] = useState(new Date(expiryDate));
  const [calories, setCalories] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const [image, setImage] = useState(
    "https://cdn.icon-icons.com/icons2/3277/PNG/512/salad_bowl_food_vegetables_vegan_healthy_food_icon_208011.png"
  );
  const [quantity, setQuantity] = useState("");
  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
  };

  const onChange = ({ type }, selectedDate) => {
    // console.log('on Change:', selectedDate, 'type:', type);
    if (type == "set") {
      const currentDate = selectedDate;
      setExpTime(currentDate);
      setShowPicker(false);
    }
  };

  const clear = () => {
    setName("");
    setExpTime(new Date(expiryDate));
    setCalories("");
    setPrice("");
    setQuantity("");
    setCategory("");
  };

  const handleInputChange = (text) => {
    setName(text);
    const filteredSuggestions = foodSuggestions.filter((suggestion) =>
      suggestion.name.toLowerCase().includes(text.toLowerCase())
    );

    // const limitedSuggestions = filteredSuggestions.slice(0, 6);

    setSuggestions(filteredSuggestions);
  };

  const handleSuggestionPress = (suggestion) => {
    console.log("suggestion:", suggestion);
    setName(suggestion.name);
    setCalories(suggestion.calories);
    setPrice(suggestion.price);
    setCategory(suggestion.category);
    setImage(suggestion.image);
    setSuggestions([]);
  };

  const saveFoodItem = async () => {
    const newFoodItem = {
      name: name,
      expiry: expTime,
      calories: parseFloat(calories) * parseFloat(quantity),
      price: price,
      category: category,
      image: image,
      quantity: parseFloat(quantity),
      added: serverTimestamp(),
    };
    console.log(newFoodItem);
    if (isEditing) {
      const foodItemId = route.params.foodItem?.id;
      if (foodItemId) {
        const foodItemRef = doc(db, "users", user?.email, "foodItems", foodItemId);
        const updatedItem = await updateDoc(foodItemRef, newFoodItem);
        console.log("food item edited");
        Toast.show("Food item edited successfully");
        navigation.navigate("Home");
      }

    } else {

      const foodItems = await addDoc(
        collection(db, "users", user?.email, "foodItems"),
        newFoodItem
      );
      console.log("food item added", foodItems.id);
      Toast.show("Food item added successfully");
      navigation.navigate("Home");
    }
  };

  useEffect(() => {
    if (route.params?.foodItem) {
      const foodItem = route.params.foodItem;
      const expiryTimestamp = foodItem.expiry.seconds * 1000;
      const expiryDate = new Date(expiryTimestamp);
      console.log('edit: ', foodItem)
      console.log('e: ', expiryDate)
      setIsEditing(true);
      setName(foodItem.name);
      setExpTime(expiryDate);
      setCalories(foodItem.calories.toString());
      setPrice(foodItem.price);
      setCategory(foodItem.category);
      setImage(foodItem.image);
      setQuantity(foodItem.quantity);
      setSuggestions([]);

      // Fetch data from Firebase using the provided ID and populate the form fields
    }
  }, []);

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
          {isEditing ? "Edit" : "Add"} Food Item
        </Text>
        <Pressable
          onPress={() => navigation.navigate("Profile")}
          style={{
            marginRight: 5,
            width: 34,
            height: 34,
            backgroundColor: "grey",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 20,
          }}
        >
          <Feather name="user" size={20} color="white" />
        </Pressable>
      </SafeAreaView>

      <ScrollView>
        <KeyboardAvoidingView>
          <View
            style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}
          >
            <FontAwesome5
              style={{ marginLeft: "2%" }}
              name="user"
              size={24}
              color={"#4acdcd"}
            />
            {
              isEditing ?
                <Text
                  style={{
                    fontSize: name ? 18 : 18,
                    color: "gray",
                    borderBottomWidth: 1,
                    borderBottomColor: "gray",
                    marginLeft: 13,
                    marginVertical: 10,
                    width: 300,
                  }}
                >
                  {name}
                </Text> : <TextInput
                  placeholder="Food Item Name"
                  value={name}
                  onChangeText={handleInputChange}
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
            }

          </View>
          {!isEditing && suggestions.length > 0 && (
            <View
              style={{
                width: "82%",
                justifyContent: "center",
                alignContent: "center",
                marginLeft: "12%",
              }}
            >
              {suggestions.map((suggestion) => (
                <Pressable
                  key={suggestion.name}
                  onPress={() => handleSuggestionPress(suggestion)}
                  style={{
                    padding: 15,
                    flex: 1,
                    borderColor: "black",
                    borderWidth: 0.7,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                    {suggestion.name}
                  </Text>
                </Pressable>
              ))}
            </View>
          )}
          <View
            style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}
          >
            <AntDesign
              style={{ marginLeft: "2%" }}
              name="calendar"
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
            ) : (
              <Pressable onPress={toggleDatePicker}>
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
              </Pressable>
            )}
          </View>
          <View
            style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}
          >
            <AntDesign
              style={{ marginLeft: "2%" }}
              name="copyright"
              size={24}
              color={"#4acdcd"}
            />
            <TextInput
              placeholder="Calories (per unit)"
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
            <Ionicons
              style={{ marginLeft: "2%" }}
              name="pricetag"
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
            <Dropdown
              style={{
                margin: 16,
                height: 50,
                width: 150,
                borderBottomColor: "gray",
                borderBottomWidth: 0.5,
              }}
              placeholderStyle={{ fontSize: 14 }}
              selectedTextStyle={{ fontSize: 16 }}
              inputSearchStyle={{ height: 40, fontSize: 16 }}
              iconStyle={{ width: 20, height: 20 }}
              data={categories}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Select Category"
              value={category}
              onChange={(item) => {
                setCategory(item.value);
                // console.log(item.value)
                if (item.value == " pcs") {
                  setQuantity(1);
                  console.log(item.value);
                } else {
                  setQuantity("");
                }
              }}
              renderLeftIcon={() => (
                <Feather
                  name="type"
                  size={24}
                  color={"#4acdcd"}
                  style={{ marginRight: 5 }}
                />
              )}
            />
            {category?.length > 1 && (
              <>
                {category === " pcs" ? (
                  <QuantityComponent
                    itemQuantity={quantity}
                    itemCategory={category}
                    addFoodItemQuantity={() => {
                      setQuantity((q) => q + 1);
                    }}
                    minusFoodItemQuantity={() => {
                      if (quantity > 1) setQuantity((q) => q - 1);
                    }}
                  />
                ) : (
                  <>
                    <TextInput
                      placeholder="0.0"
                      value={quantity ? quantity.toString() : ""}
                      onChangeText={(text) => setQuantity(text)}
                      placeholderTextColor={"#1e546b"}
                      keyboardType="numeric"
                      style={{
                        fontSize: 18,
                        marginLeft: 13,
                        marginVertical: 10,
                        width: 60,
                      }}
                    />
                    <Text
                      style={{
                        marginLeft: 2,
                        fontSize: 18,
                        textAlign: "center",
                        color: "black",
                      }}
                    >
                      {category}
                    </Text>
                  </>
                )}
              </>
            )}
          </View>

          <View style={{ flexDirection: "row" }}>
            <Pressable
              onPress={clear}
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
              <Text
                style={{ fontSize: 18, textAlign: "center", color: "white" }}
              >
                Clear
              </Text>
            </Pressable>

            <Pressable
              style={{
                width: 150,
                backgroundColor:
                  name === "" ||
                    calories === "" ||
                    price === "" ||
                    category === "" ||
                    !(expTime instanceof Date)
                    ? "red"
                    : "green",
                padding: 15,
                borderRadius: 7,
                marginTop: 40,
                marginLeft: "auto",
                marginRight: "auto",
              }}
              disabled={
                name === "" ||
                calories === "" ||
                price === "" ||
                category === "" ||
                quantity === "" ||
                parseFloat(quantity) <= 0
              }
              onPress={saveFoodItem}
            >
              <Text
                style={{ fontSize: 18, textAlign: "center", color: "white" }}
              >
                {isEditing ? "Save" : "Add"}
              </Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
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
          onPress={() => navigation.navigate("Meal")}
        >
          <FontAwesome5 name="robot" size={23} color="white" />
        </Pressable>
      </View>
    </>
  );
};

export default AddItemScreen;

const styles = StyleSheet.create({});
