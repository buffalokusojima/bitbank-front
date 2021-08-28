import React from "react";
import { View, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  form: {
    marginTop: 5,
  }
});

const BaseOrderArea: React.FC = ({children}) => {
  return (
    <View style={styles.form}>
      {children}
    </View>
  );
};

export default BaseOrderArea;
