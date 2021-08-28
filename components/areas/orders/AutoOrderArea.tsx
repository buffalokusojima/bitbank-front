import React from "react";
import { View, Text, StyleSheet } from "react-native";

import BaseOrderArea from "./BaseOrderArea";

import { AutoOrderForm } from "../../forms/OrderForm";

import Alert from "../../alerts/Alert";

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    fontWeight: "700",
  },
});

const SpecialOrderArea: React.FC = () => {
  const [alertMessage, setAlertMessage] = React.useState("");
  const [selectedOrder, setSelectedOrder] = React.useState("");

  return (
    <>
      <Alert content={alertMessage} />
      <BaseOrderArea>
        <Text style={styles.heading}>Auto Order</Text>
        <View
          style={{
            flexDirection: "row",
            height: 250,
            padding: 10,
          }}
        >
          <AutoOrderForm setAlert={setAlertMessage}/>
        </View>
      </BaseOrderArea>
    </>
  );
};

export default SpecialOrderArea;
