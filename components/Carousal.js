import { StyleSheet, Text, View, FlatList, Animated } from "react-native";
import { SliderBox } from "react-native-image-slider-box";
import React, { useState, useRef } from "react";
import slides from "../slides";
import CarousalItem from "./CarousalItem";
import Indicator from "./Indicator";
import NextButton from "./NextButton";
import { useNavigation } from "@react-navigation/native";
import { NativeStackView } from "@react-navigation/native-stack";

const Carousal = () => {
  const navigation = useNavigation();
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideRef = useRef(null);
  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const scrollTo = () => {
    if (currentIndex < slides.length - 1) {
      slideRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      navigation.navigate("Home");
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
      }}
    >
      <View style={{ flex: 3 }}>
        <FlatList
          ref={slideRef}
          data={slides}
          renderItem={({ item }) => <CarousalItem item={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={(item) => item.id}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            {
              useNativeDriver: false,
            }
          )}
          scrollEventThrottle={32}
          viewabilityConfig={viewConfig}
          onViewableItemsChanged={viewableItemsChanged}
        />
      </View>
      <Indicator data={slides} scrollX={scrollX} />
      <NextButton
        scrollTo={scrollTo}
        percentage={(currentIndex + 1) * (100 / slides.length)}
      />
    </View>
  );
};

export default Carousal;

const styles = StyleSheet.create({});
