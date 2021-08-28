import React from "react";
import { View, Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  alertArea: {
    height: 40,
    backgroundColor: "#ff8c00",
    justifyContent: "center",
    flexDirection: "row",
  },
  alertText: {
    fontSize: 20,
    marginTop: 10,
    fontWeight: "700",
  },
});

interface alertProps {
  content: string;
}

const Alert: React.FC<alertProps> = (props: alertProps) => {
  return props?.content ? (
    <View style={styles.alertArea}>
      <Text style={styles.alertText}>{props.content ?? null}</Text>
    </View>
  ) : (
    <></>
  );
};

export default Alert;
