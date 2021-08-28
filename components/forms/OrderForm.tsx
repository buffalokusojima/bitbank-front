import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";

import { OrderBuyButton, OrderSellButton } from "../buttons/Button";

import { handleNumericInput } from "../../functions/utils";

import { submitOrder, submitSpecialOrder } from "../../utils/API/order";

import { useAuth } from "../../utils/AuthStateApp";

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    fontWeight: "500",
  },
  input: {
    width: 150,
    padding: 15,
    borderColor: "rgba(0, 0, 0, 0.2)",
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 5,
    marginLeft: 5,
    marginBottom: 20,
  },
});

interface OrderProps {
  setAlert: void;
}

export const LimitOrderForm: React.FC<OrderProps> = ({ setAlert }) => {
  const [price, setPrice] = React.useState("0");
  const [num, setNum] = React.useState("0");

  const { idToken } = useAuth();

  const handleAlert = (data: object) => {
    setAlert(data.message);
  };

  const submitBuyOrder = () => {
    if (!price || !num) return;

    const data = {
      coin_pair: "xrp_jpy",
      type: "limit",
      size: num,
      price: price,
      side: "buy",
    };

    submitOrder(handleAlert, data, idToken);
  };

  const submitSellOrder = () => {
    if (!price || !num) return;

    const data = {
      coin_pair: "xrp_jpy",
      type: "limit",
      size: num,
      price: price,
      side: "sell",
    };

    submitOrder(handleAlert, data, idToken);
  };

  return (
    <View
      style={{
        flexDirection: "row",
        height: 250,
        padding: 5,
      }}
    >
      <View>
        <Text style={styles.heading}>Limit Order</Text>
        <Text>price</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="1000000"
          value={price}
          onChangeText={(e) => {
            handleNumericInput(setPrice, e);
          }}
        />
        <Text>num</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="0.01"
          value={num}
          onChangeText={(e) => {
            handleNumericInput(setNum, e);
          }}
        />
        <View style={{ position: "absolute", bottom: 0, margin: "auto" }}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              margin: "auto",
            }}
          >
            <OrderBuyButton func={submitBuyOrder} />
            <OrderSellButton func={submitSellOrder} />
          </View>
        </View>
      </View>
    </View>
  );
};

export const MarketOrderForm: React.FC<OrderProps> = ({ setAlert }) => {
  const [num, setNum] = React.useState("0");

  const { idToken } = useAuth();

  const handleAlert = (data: object) => {
    setAlert(data.message);
  };

  const submitBuyOrder = () => {
    if (!num) return;

    const data = {
      coin_pair: "xrp_jpy",
      type: "market",
      size: num,
      side: "buy",
    };

    submitOrder(handleAlert, data, idToken);
  };

  const submitSellOrder = () => {
    if (!num) return;

    const data = {
      coin_pair: "xrp_jpy",
      type: "market",
      size: num,
      side: "sell",
    };

    submitOrder(handleAlert, data, idToken);
  };

  return (
    <View
      style={{
        flexDirection: "row",
        height: 250,
        padding: 5,
      }}
    >
      <View>
        <Text style={styles.heading}>Market Order</Text>
        <Text>num</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="0.01"
          value={num}
          onChangeText={(e) => {
            handleNumericInput(setNum, e);
          }}
        />

        <View style={{ position: "absolute", bottom: 0 }}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <OrderBuyButton func={submitBuyOrder} />
            <OrderSellButton func={submitSellOrder} />
          </View>
        </View>
      </View>
    </View>
  );
};

export const IFDBuyOrderForm: React.FC<OrderProps> = ({ setAlert }) => {
  const [stopBuyPrice, setStopBuyPrice] = React.useState("0");
  const [stopBuyNum, setStopBuyNum] = React.useState("0");
  const [stopSellPrice, setStopSellPrice] = React.useState("0");
  const [stopSellNum, setStopSellNum] = React.useState("0");

  const { idToken } = useAuth();

  const handleAlert = (data: object) => {
    setAlert(data.message);
  };

  const submitBuyOrder = () => {
    if (!stopBuyPrice || !stopBuyNum || !stopSellPrice || !stopSellNum) return;

    const parameters = [
      {
        type: "STOP",
        side: "buy",
        price: stopBuyPrice,
        size: stopBuyNum,
      },
      {
        type: "STOP",
        side: "sell",
        price: stopSellPrice,
        size: stopSellNum,
      },
    ];

    const data = {
      coin_pair: "xrp_jpy",
      parameters: parameters,
      order_method: "IFD",
    };

    submitOrder(handleAlert, data, idToken);
  };

  return (
    <View
      style={{
        flexDirection: "row",
        height: 450,
        padding: 5,
        justifyContent: "center",
      }}
    >
      <View>
        <Text style={styles.heading}>STOP BUY</Text>
        <Text>price</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="1000000"
          value={stopBuyPrice}
          onChangeText={(e) => {
            handleNumericInput(setStopBuyPrice, e);
          }}
        />
        <Text>num</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="0.01"
          value={stopBuyNum}
          onChangeText={(e) => {
            handleNumericInput(setStopBuyNum, e);
          }}
        />
        <Text style={styles.heading}>STOP SELL</Text>
        <Text>price</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="1000000"
          value={stopSellPrice}
          onChangeText={(e) => {
            handleNumericInput(setStopSellPrice, e);
          }}
        />
        <Text>num</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="0.01"
          value={stopSellNum}
          onChangeText={(e) => {
            handleNumericInput(setStopSellNum, e);
          }}
        />
        <View style={{ position: "absolute", bottom: 0, margin: "auto" }}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              margin: "auto",
            }}
          >
            <OrderBuyButton func={submitBuyOrder} />
          </View>
        </View>
      </View>
    </View>
  );
};

export const IFDSellOrderForm: React.FC<OrderProps> = ({ setAlert }) => {
  const [stopSellPrice, setStopSellPrice] = React.useState("0");
  const [stopSellNum, setStopSellNum] = React.useState("0");
  const [stopBuyPrice, setStopBuyPrice] = React.useState("0");
  const [stopBuyNum, setStopBuyNum] = React.useState("0");

  const { idToken } = useAuth();

  const handleAlert = (data: object) => {
    setAlert(data.message);
  };

  const submitBuyOrder = () => {
    if (!stopBuyPrice || !stopBuyNum || !stopSellPrice || !stopSellNum) return;

    const parameters = [
      {
        type: "STOP",
        side: "sell",
        price: stopSellPrice,
        size: stopSellNum,
      },
      {
        type: "STOP",
        side: "buy",
        price: stopBuyPrice,
        size: stopBuyNum,
      },
    ];

    const data = {
      coin_pair: "xrp_jpy",
      parameters: parameters,
      order_method: "IFD",
    };

    submitOrder(handleAlert, data, idToken);
  };

  return (
    <View
      style={{
        flexDirection: "row",
        height: 450,
        padding: 5,
        justifyContent: "center",
      }}
    >
      <View>
        <Text style={styles.heading}>STOP SELL</Text>
        <Text>price</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="1000000"
          value={stopSellPrice}
          onChangeText={(e) => {
            handleNumericInput(setStopSellPrice, e);
          }}
        />
        <Text>num</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="0.01"
          value={stopSellNum}
          onChangeText={(e) => {
            handleNumericInput(setStopSellNum, e);
          }}
        />
        <Text style={styles.heading}>STOP BUY</Text>
        <Text>price</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="1000000"
          value={stopBuyPrice}
          onChangeText={(e) => {
            handleNumericInput(setStopBuyPrice, e);
          }}
        />
        <Text>num</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="0.01"
          value={stopBuyNum}
          onChangeText={(e) => {
            handleNumericInput(setStopBuyNum, e);
          }}
        />
        <View style={{ position: "absolute", bottom: 0, margin: "auto" }}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              margin: "auto",
            }}
          >
            <OrderSellButton func={submitBuyOrder} />
          </View>
        </View>
      </View>
    </View>
  );
};

export const IFDOCOBuyOrderForm: React.FC<OrderProps> = ({ setAlert }) => {
  const [stopBuyPrice, setStopBuyPrice] = React.useState("0");
  const [stopBuyNum, setStopBuyNum] = React.useState("0");
  const [stopSellPrice, setStopSellPrice] = React.useState("0");
  const [stopSellNum, setStopSellNum] = React.useState("0");
  const [limitSellPrice, setLimitSellPrice] = React.useState("0");
  const [limitSellNum, setLimitSellNum] = React.useState("0");

  const { idToken } = useAuth();

  const handleAlert = (data: object) => {
    setAlert(data.message);
  };

  const submitBuyOrder = () => {
    if (
      !stopBuyPrice ||
      !stopBuyNum ||
      !stopSellPrice ||
      !stopSellNum ||
      !limitSellPrice ||
      !limitSellNum
    )
      return;

    const parameters = [
      {
        type: "STOP",
        side: "buy",
        price: stopBuyPrice,
        size: stopBuyNum,
      },
      {
        type: "STOP",
        side: "sell",
        price: stopSellPrice,
        size: stopSellNum,
      },
      {
        type: "limit",
        side: "sell",
        price: limitSellPrice,
        size: limitSellNum,
      },
    ];

    const data = {
      coin_pair: "xrp_jpy",
      parameters: parameters,
      order_method: "IFDOCO",
    };

    submitOrder(handleAlert, data, idToken);
  };

  return (
    <View
      style={{
        flexDirection: "row",
        height: 450,
        padding: 5,
        justifyContent: "center",
      }}
    >
      <View>
        <Text style={styles.heading}>STOP BUY</Text>
        <Text>price</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="1000000"
          value={stopBuyPrice}
          onChangeText={(e) => {
            handleNumericInput(setStopBuyPrice, e);
          }}
        />
        <Text>num</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="0.01"
          value={stopBuyNum}
          onChangeText={(e) => {
            handleNumericInput(setStopBuyNum, e);
          }}
        />
        <View style={{ flexDirection: "row" }}>
          <View>
            <Text style={styles.heading}>STOP SELL</Text>
            <View>
              <Text>price</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="1000000"
                value={stopSellPrice}
                onChangeText={(e) => {
                  handleNumericInput(setStopSellPrice, e);
                }}
              />
            </View>
            <View>
              <Text>num</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="0.01"
                value={stopSellNum}
                onChangeText={(e) => {
                  handleNumericInput(setStopSellNum, e);
                }}
              />
            </View>
          </View>
          <View>
            <Text style={styles.heading}>LIMIT SELL</Text>
            <View>
              <Text>price</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="1000000"
                value={limitSellPrice}
                onChangeText={(e) => {
                  handleNumericInput(setLimitSellPrice, e);
                }}
              />
            </View>
            <View>
              <Text>num</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="0.01"
                value={limitSellNum}
                onChangeText={(e) => {
                  handleNumericInput(setLimitSellNum, e);
                }}
              />
            </View>
          </View>
        </View>
        <View style={{ position: "absolute", bottom: 0, margin: "auto" }}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              margin: "auto",
            }}
          >
            <OrderBuyButton func={submitBuyOrder} />
          </View>
        </View>
      </View>
    </View>
  );
};

export const IFDOCOSellOrderForm: React.FC<OrderProps> = ({ setAlert }) => {
  const [stopSellPrice, setStopSellPrice] = React.useState("0");
  const [stopSellNum, setStopSellNum] = React.useState("0");
  const [stopBuyPrice, setStopBuyPrice] = React.useState("0");
  const [stopBuyNum, setStopBuyNum] = React.useState("0");
  const [limitBuyPrice, setLimitBuyPrice] = React.useState("0");
  const [limitBuyNum, setLimitBuyNum] = React.useState("0");

  const { idToken } = useAuth();

  const handleAlert = (data: object) => {
    setAlert(data.message);
  };

  const submitSellOrder = () => {
    if (
      !stopBuyPrice ||
      !stopBuyNum ||
      !stopSellPrice ||
      !stopSellNum ||
      !limitBuyPrice ||
      !limitBuyNum
    )
      return;

    const parameters = [
      {
        type: "STOP",
        side: "sell",
        price: stopSellPrice,
        size: stopSellNum,
      },
      {
        type: "STOP",
        side: "buy",
        price: stopBuyPrice,
        size: stopBuyNum,
      },
      {
        type: "limit",
        side: "buy",
        price: limitBuyPrice,
        size: limitBuyNum,
      },
    ];

    const data = {
      coin_pair: "xrp_jpy",
      parameters: parameters,
      order_method: "IFDOCO",
    };

    submitOrder(handleAlert, data, idToken);
  };

  return (
    <View
      style={{
        flexDirection: "row",
        height: 450,
        padding: 5,
        justifyContent: "center",
      }}
    >
      <View>
        <Text style={styles.heading}>STOP SELL</Text>
        <Text>price</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="1000000"
          value={stopSellPrice}
          onChangeText={(e) => {
            handleNumericInput(setStopSellPrice, e);
          }}
        />
        <Text>num</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="0.01"
          value={stopSellNum}
          onChangeText={(e) => {
            handleNumericInput(setStopSellNum, e);
          }}
        />
        <View style={{ flexDirection: "row" }}>
          <View>
            <Text style={styles.heading}>STOP BUY</Text>
            <View>
              <Text>price</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="1000000"
                value={stopBuyPrice}
                onChangeText={(e) => {
                  handleNumericInput(setStopBuyPrice, e);
                }}
              />
            </View>
            <View>
              <Text>num</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="0.01"
                value={stopBuyNum}
                onChangeText={(e) => {
                  handleNumericInput(setStopBuyNum, e);
                }}
              />
            </View>
          </View>
          <View>
            <Text style={styles.heading}>LIMIT BUY</Text>
            <View>
              <Text>price</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="1000000"
                value={limitBuyPrice}
                onChangeText={(e) => {
                  handleNumericInput(setLimitBuyPrice, e);
                }}
              />
            </View>
            <View>
              <Text>num</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="0.01"
                value={limitBuyNum}
                onChangeText={(e) => {
                  handleNumericInput(setLimitBuyNum, e);
                }}
              />
            </View>
          </View>
        </View>
        <View style={{ position: "absolute", bottom: 0, margin: "auto" }}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              margin: "auto",
            }}
          >
            <OrderSellButton func={submitSellOrder} />
          </View>
        </View>
      </View>
    </View>
  );
};

export const StopOrderForm: React.FC<OrderProps> = ({ setAlert }) => {
  const [price, setPrice] = React.useState("0");
  const [num, setNum] = React.useState("0");

  const { idToken } = useAuth();

  const handleAlert = (data: object) => {
    setAlert(data.message);
  };

  const submitBuyOrder = () => {
    if (!price || !num) return;

    const data = {
      coin_pair: "xrp_jpy",
      type: "stop",
      size: num,
      price: price,
      side: "buy",
      mode: "insert",
    };

    submitSpecialOrder(handleAlert, data, idToken);
  };

  const submitSellOrder = () => {
    if (!price || !num) return;

    const data = {
      coin_pair: "xrp_jpy",
      type: "stop",
      size: num,
      price: price,
      side: "sell",
      mode: "insert",
    };

    submitSpecialOrder(handleAlert, data, idToken);
  };

  return (
    <View
      style={{
        flexDirection: "row",
        height: 250,
        padding: 5,
        justifyContent: "center",
      }}
    >
      <View>
        <Text style={styles.heading}>Stop Order</Text>
        <Text>price</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="1000000"
          value={price}
          onChangeText={(e) => {
            handleNumericInput(setPrice, e);
          }}
        />
        <Text>num</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="0.01"
          value={num}
          onChangeText={(e) => {
            handleNumericInput(setNum, e);
          }}
        />
        <View style={{ position: "absolute", bottom: 0, margin: "auto" }}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              margin: "auto",
            }}
          >
            <OrderBuyButton func={submitBuyOrder} />
            <OrderSellButton func={submitSellOrder} />
          </View>
        </View>
      </View>
    </View>
  );
};

export const AutoOrderForm: React.FC<OrderProps> = ({ setAlert }) => {
  const [price, setPrice] = React.useState("0");
  const [num, setNum] = React.useState("0");

  const { idToken } = useAuth();

  const handleAlert = (data: object) => {
    setAlert(data.message);
  };

  const submitBuyOrder = () => {
    if (!price || !num) return;

    const parameters = [
      {
        type: "STOP",
        size: num,
        price: price,
        side: "buy",
      },
    ];

    const data = {
      coin_pair: "xrp_jpy",
      parameters: parameters,
      order_method: "SIMPLE",
      mode: "insert",
      price: price,
    };

    submitAutoOrder(handleAlert, data, idToken);
  };

  const submitSellOrder = () => {
    if (!price || !num) return;

    const parameters = [
      {
        type: "STOP",
        size: num,
        price: price,
        side: "sell",
      },
    ];

    const data = {
      coin_pair: "xrp_jpy",
      parameters: parameters,
      order_method: "SIMPLE",
      mode: "insert",
      price: price,
    };

    submitAutoOrder(handleAlert, data, idToken);
  };

  return (
    <View
      style={{
        flexDirection: "row",
        height: 250,
        padding: 5,
        justifyContent: "center",
      }}
    >
      <View>
        <Text style={styles.heading}>Limit Order</Text>
        <Text>price</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="1000000"
          value={price}
          onChangeText={(e) => {
            handleNumericInput(setPrice, e);
          }}
        />
        <Text>num</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="0.01"
          value={num}
          onChangeText={(e) => {
            handleNumericInput(setNum, e);
          }}
        />
        <View style={{ position: "absolute", bottom: 0, margin: "auto" }}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              margin: "auto",
            }}
          >
            <OrderBuyButton func={submitBuyOrder} />
            <OrderSellButton func={submitSellOrder} />
          </View>
        </View>
      </View>
    </View>
  );
};
