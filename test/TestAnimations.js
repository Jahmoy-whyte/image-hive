import { useRef, useEffect, useState } from "react";
import {
  View,
  TouchableOpacisheetY,
  Text,
  styleSheet,
  Animated,
  Pressable,
  Easing,
  PanResponder,
  useWindowDimensions,
  StatusBar,
} from "react-native";

const TestAnimations = () => {
  const dimensions = useWindowDimensions();
  const BOTTOM_SHEET_INITAL_VALUE = 0;
  const BOTTOM_SHEET_HEIGHT = dimensions.height / 1.1;
  const MAX_Y_STOPING_POINT = dimensions.height - BOTTOM_SHEET_HEIGHT;
  const sheetY = useRef(new Animated.Value(BOTTOM_SHEET_INITAL_VALUE)).current;
  const endPostion = useRef(BOTTOM_SHEET_INITAL_VALUE);

  useEffect(() => {}, []);
  const resetSqure = () => {
    sheetY.setValue(0);
    sheetY.extractOffset();
  };
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,

    onPanResponderStart: (event) => {
      sheetY.setOffset(endPostion.current);
    },
    onPanResponderMove: (_, { dy }) => {
      //      if (endPostion.current + dy <= MAX_Y_STOPING_POINT) return;

      console.log(sheetY);
      sheetY.setValue(dy);
    },

    onPanResponderEnd: (_, { dy }) => {
      if (endPostion.current + dy <= MAX_Y_STOPING_POINT) {
        endPostion.current = MAX_Y_STOPING_POINT;
      } else {
        endPostion.current += dy;
      }

      return;

      Animated.spring(sheetY, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    },
  });

  return (
    <>
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
            height: BOTTOM_SHEET_HEIGHT,
            width: "100%",
            backgroundColor: "gray",
            position: "absolute",

            // top: translateY.interpolate({
            //   inputRange: [0, dimensions.height - StatusBar.currentHeight],
            //   outputRange: [0, dimensions.height + StatusBar.currentHeight - 5],

            // }),

            transform: [
              //  { translateY: Animated.subtract(translateY, BOTTOM_SHEET_HEIGHT / 2) },
              {
                translateY: sheetY.interpolate({
                  inputRange: [MAX_Y_STOPING_POINT, dimensions.height],
                  outputRange: [MAX_Y_STOPING_POINT, dimensions.height],
                  extrapolate: "clamp",
                }),
              },
            ],
          }}
        ></Animated.View>
        <Pressable
          onPress={resetSqure}
          style={{ position: "absolute", bottom: 6 }}
        >
          <Text>reset</Text>
        </Pressable>
      </View>
    </>
  );
};

const Test1 = () => {
  const [tx, setTx] = useState(new Animated.Value(0));
  const test1 = () => {
    tx.setValue(0);

    Animated.spring(tx, {
      toValue: 100,
      bounciness: 400,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      //  tx.extractOffset();
      console.log(tx);
    });
  };
  return (
    <>
      <Animated.View
        style={{
          height: 150,
          width: 150,
          backgroundColor: "red",
          opacisheetY: tx.interpolate({
            inputRange: [0, 100],
            outputRange: [0, 1],
            extrapolate: "clamp",
          }),
          transform: [{ translateX: tx }],
        }}
      ></Animated.View>
      <Pressable onPress={test1}>
        <Text>press me1</Text>
      </Pressable>
    </>
  );
};

const JustResponer = () => {
  const sheetY = useRef(new Animated.ValueXY()).current;
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "green",
        padding: 5,
      }}
    >
      <Animated.View
        onStartShouldSetResponder={() => true}
        onResponderMove={(event) => {
          sheetY.setValue({
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
        id={"hi"}
        style={{
          height: 150,
          width: 150,
          position: "absolute",
          backgroundColor: "red",
          top: Animated.subtract(sheetY.y, 75),
          left: Animated.subtract(sheetY.x, 75),
        }}
      ></Animated.View>
    </View>
  );
};

export default TestAnimations;
