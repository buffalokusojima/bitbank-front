import React from "react";
import { View, Text, StyleSheet } from "react-native";

import BaseOrderArea from "./BaseOrderArea";
import { LimitOrderForm, MarketOrderForm } from "../../forms/OrderForm";

import Alert from "../../alerts/Alert";

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    fontWeight: "700",
  },
});

const NormalOrderArea: React.FC = () => {

  const [alertMessage, setAlertMessage] = React.useState("");

  return (
    <>
      {/* <Alert content={alertMessage} /> */}
      <BaseOrderArea>
        <Text style={styles.heading}>Normarl Order</Text>
        <View
          style={{
            flexDirection: "row",
            height: 250,
            padding: 5,
          }}
        >
          <LimitOrderForm setAlert={setAlertMessage}/>
          <MarketOrderForm setAlert={setAlertMessage}/>
        </View>
      </BaseOrderArea>
    </>
  );
};

export default NormalOrderArea;
