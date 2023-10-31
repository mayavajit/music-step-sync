import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Pedometer } from "expo-sensors";

export function Steps() {
  const [currentStepCount, setCurrentStepCount] = useState(0);
  const subscribe = async () => {
    return Pedometer.watchStepCount((result) => {
      setCurrentStepCount(result.steps);
    });
  };
  useEffect(() => {
    const subscription = subscribe();
    return () => subscription && subscription.remove();
  }, []);
  return (
    <View style={styles.container}>
      <Text>Walk! And watch this go up: {currentStepCount}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
