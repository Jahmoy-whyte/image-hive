import { useRef, useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
  Pressable,
  Easing,
  PanResponder,
  useWindowDimensions,
} from "react-native";

const TestAnimations = () => {
  const tY = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  const { height } = useWindowDimensions();
  useEffect(() => {}, []);
  const resetSqure = () => {
    tY.setValue(10);
  };
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,

    onPanResponderMove: (event, gestureState) => {
      //    console.log(event.nativeEvent.locationY + " == " + gestureState.vy);
      const yDragDistance = Math.abs(gestureState.dy); //get the gestureState dy
      if (yDragDistance < 10) return;
      console.log(event.nativeEvent.locationY);

      tY.setValue(event.nativeEvent.locationY);
      // console.log(tY);
    },
  });

  return <JustResponer />;
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "green",
        padding: 5,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Animated.View
        {...panResponder.panHandlers}
        style={{
          height: height / 2,
          width: "100%",
          backgroundColor: "gray",
          position: "absolute",
          top: tY,
          left: tY,
          //  transform: [{ translateY: tY }],
        }}
      ></Animated.View>
      <Pressable
        onPress={resetSqure}
        style={{ position: "absolute", bottom: 6 }}
      >
        <Text>reset</Text>
      </Pressable>
    </View>
  );
};

const Test1 = () => {
  const [tx, setTx] = useState(new Animated.Value(-10));
  const test1 = () => {
    tx.setValue(0);

    Animated.spring(tx, {
      toValue: 100,
      bounciness: 400,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };
  return (
    <>
      <Animated.View
        style={{
          height: 150,
          width: 150,
          backgroundColor: "red",
          //opacity: fadeAnim,
          transform: [{ translateX: tx }],
        }}
      ></Animated.View>
      <Pressable onPress={test1}>
        <Text>press me</Text>
      </Pressable>
    </>
  );
};

const JustResponer = () => {
  const tY = useRef(new Animated.ValueXY()).current;
  return (
    <View
      onStartShouldSetResponder={() => true}
      onResponderMove={(event) => {
        tY.setValue({
          y: event.nativeEvent.pageY,
          x: event.nativeEvent.pageX,
        });
        // console.log(event);
        // console.log(event.nativeEvent.locationY);
      }}
      onResponderRelease={() => console.log("enwdwdd")}
      onResponderEnd={(event) => {
        console.log("end");
      }}
      style={{
        flex: 1,
        backgroundColor: "green",
        padding: 5,
      }}
    >
      <Animated.View
        id={"hi"}
        style={{
          height: 150,
          width: 150,
          position: "absolute",
          backgroundColor: "red",
          top: Animated.subtract(tY.y, 75),
          left: Animated.subtract(tY.x, 75),
        }}
      ></Animated.View>
    </View>
  );
};

export default TestAnimations;
