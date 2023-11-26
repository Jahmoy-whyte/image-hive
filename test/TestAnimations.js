import { useRef, useEffect, useState } from "react";
import {
  View,
  TouchableOpacisheetY,
  Text,
  styleSheet,
  Pressable,
  Easing,
  PanResponder,
  useWindowDimensions,
  StatusBar,
  Platform,
  Dimensions,
  Button,
  Animated,
  FlatList,
  Touchable,
  TouchableOpacity,
} from "react-native";

const TestAnimations = () => {
  const SCREEN_HEIGHT = Dimensions.get("window").height;
  const BOTTOM_SHEET_HEIGHT = SCREEN_HEIGHT / 1.5;
  const CLOSED_VALUE = BOTTOM_SHEET_HEIGHT - 10;
  const MAX_Y = 0;
  const VELOCITY_THRESHOLD = 2;
  const translateY = useRef(new Animated.Value(CLOSED_VALUE)).current;
  const previousY = useRef(CLOSED_VALUE);

  const scroll = useRef(0);
  const [isEnabled, setIsEnabled] = useState(false);
  const panResponder = PanResponder.create({
    // onStartShouldSetPanResponder: (_, { dy }) => {
    //   //console.log(dy);
    //   return true;
    // },
    // onStartShouldSetPanResponderCapture: () => true,
    onMoveShouldSetPanResponder: (_, { dy }) => {
      if (previousY.current == BOTTOM_SHEET_HEIGHT - 10) {
        setIsEnabled(true);
        return true;
      }
      const bool = dy <= 0 && scroll.current == 0;

      if (bool) {
        // if scroll up when is full extend
        setIsEnabled(true);
        console.log("wwwwwwwwwwwwwwww");
        return false;
      }
    },
    // onMoveShouldSetPanResponderCapture: () => true,
    onPanResponderTerminationRequest: (evt, gestureState) => false,
    onPanResponderStart: (_, { dy }) => {},
    onPanResponderMove: (_, { dy }) => {
      //console.log(previousY.current + dy);
      translateY.setValue(previousY.current + dy);
    },
    onPanResponderEnd: (_, { dy, vy }) => {
      const currentPosition = previousY.current + dy;
      const velocity = vy;
      const lessThanHalf = currentPosition < BOTTOM_SHEET_HEIGHT / 2;
      const graterThanHalf = currentPosition > BOTTOM_SHEET_HEIGHT / 2;

      if (currentPosition <= MAX_Y) {
        animateToPosition(MAX_Y);
        return;
      }

      if (lessThanHalf || (lessThanHalf && velocity > -VELOCITY_THRESHOLD)) {
        animateToPosition(MAX_Y);
        return;
      }

      if (graterThanHalf || (graterThanHalf && velocity > VELOCITY_THRESHOLD)) {
        animateToPosition(CLOSED_VALUE);
        return;
      }

      //previousY.current = currentPosition;
    },
  });

  const animateToPosition = (value) => {
    previousY.current = value;
    Animated.spring(translateY, {
      toValue: value,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={[{ backgroundColor: "green", flex: 1 }]}>
      <Animated.View
        style={[
          {
            position: "absolute",
            height: SCREEN_HEIGHT,
            width: "100%",
            backgroundColor: "pink",
            flex: 1,
            opacity: translateY.interpolate({
              inputRange: [MAX_Y, BOTTOM_SHEET_HEIGHT - 10],
              outputRange: [1, 0],
              extrapolate: "clamp",
            }),
          },
        ]}
      ></Animated.View>
      <View style={{ marginTop: 20 }}></View>
      <Button title="open" onPress={() => animateToPosition(MAX_Y)} />
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          {
            backgroundColor: "red",
            height: BOTTOM_SHEET_HEIGHT,
            width: "100%",
            position: "absolute",
            bottom: 0,
            transform: [
              {
                translateY: translateY.interpolate({
                  inputRange: [MAX_Y, BOTTOM_SHEET_HEIGHT - 20],
                  outputRange: [MAX_Y, BOTTOM_SHEET_HEIGHT - 20],
                  extrapolate: "clamp",
                }),
              },
            ],
          },
        ]}
      >
        <View style={{ height: 30, backgroundColor: "purple" }}></View>
        <Animated.FlatList
          scrollEnabled={isEnabled}
          onScroll={(e) => (scroll.current = e.nativeEvent.contentOffset.y)}
          data={[1, 2, 3, 4, 5, 6, 8, 9, 0]}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => alert("hi")}
                style={{ height: 100, backgroundColor: "yellow" }}
              >
                <Text>{item}</Text>
              </TouchableOpacity>
            );
          }}
        />
      </Animated.View>
    </View>
  );
};

const Test2 = () => {
  const [bool, setBool] = useState(false);
  const test = useSharedValue(1);

  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      top: test.value,
    };
  }, []);

  useEffect(() => {}, []);

  return (
    <View style={[{ backgroundColor: "green", flex: 1 }]}>
      <Animated.View
        style={[
          {
            backgroundColor: "red",
            height: 100,
            width: 100,
            position: "absolute",
            top: 30,
          },
          reanimatedStyle,
        ]}
      ></Animated.View>
      <View style={{ marginTop: "auto" }}></View>
      <Button
        title="start"
        onPress={() =>
          (test.value = withSequence(withTiming(50), withTiming(0)))
        }
      />
      <Button
        title="end"
        onPress={() => (test.value = withSpring(100, { duration: 5000 }))}
      />
    </View>
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
