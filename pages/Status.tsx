import React from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";

import { Icon, Button, ListItem, Avatar } from "react-native-elements";

import { useNavigationState } from "@react-navigation/native";

import { getOrders, getSpecialOrders, getAssets } from "../utils/API/status";
import { cancelNormalOrder, submitSpecialOrder } from "../utils/API/order"

import Alert from "../components/alerts/Alert";

import { useAuth } from "../utils/AuthStateApp";

const Status: React.FC = ({ navigation }) => {
  const [assets, setAssets] = React.useState();

  const [orders, setOrders] = React.useState([]);
  const [alertMessage, setAlertMessage] = React.useState("");

  const [expanded_list, setExpanded_list] = React.useState([false, false]);

  const index = useNavigationState((state) => state.index);

  const { idToken } = useAuth();

  const handleAlert = (data: object) => {
    setAlertMessage(data.message);
  };

  const setAssetStatus = (data) => {
    if (data.data) {
      console.log(data.data);
      setAssets(data.data);
    } else {
      setAssets("No Position");
    }
  };

  const getAllOrders = async () => {
    const normalOrders = await getOrders(idToken);
    const specialOrders = await getSpecialOrders(idToken);
    const tmpOrders = [];

    if (normalOrders.data) {
      tmpOrders.push({
        type: "Normal",
        data: normalOrders.data,
      });
    }
    if (specialOrders.data) {
      tmpOrders.push({
        type: "Special",
        data: specialOrders.data,
      });
    }
    setOrders(tmpOrders);
  };

  const cancelOrder = async (order:object) => {

    if(order.type == "marer" || order.type == "limit"){
      const data = {
        coin_pair: order.pair,
        order_id: order.order_id
      };
      cancelNormalOrder(handleAlert, data, idToken);
    }else if(order.type == "stop"){
      const data = {
        coin_pair: order.coin_pair,
        type: order.type,
        price: order.price,
        mode: "delete"
      }
      submitSpecialOrder(handleAlert, data, idToken);
    }
  } 

  React.useEffect(() => {
    if (index == 0) {
      getAssets(setAssetStatus, idToken);
      getAllOrders();
    }
  }, [index, alertMessage]);

  return (
    <>
      <Alert content={alertMessage} />
      <View>
        <Text> asset locked amount onhand amount </Text>
        {assets &&
          assets.map((value, key) => {
            return (
              <Text key={key}>
                {value.asset} {value.locked_amount} {value.onhand_amount}{" "}
              </Text>
            );
          })}
      </View>
      {orders.map((value, key) => {
        return (
          <ListItem.Accordion
            key={key}
            content={
              <>
                {/* <Icon name="place" size={30} /> */}
                <ListItem.Content>
                  <ListItem.Title>
                    <Text>{value.type}</Text>
                    {/* {value.price} {value.size}{" "}
                    {value.side} {value.type} */}
                  </ListItem.Title>
                </ListItem.Content>
              </>
            }
            isExpanded={expanded_list[key]}
            onPress={() => {
              let tmp_list = expanded_list.slice(0, expanded_list.length);
              tmp_list[key] = !tmp_list[key];
              setExpanded_list(tmp_list);
            }}
          >
            {expanded_list[key] ? (
              value.data.map((l, i) => (
                <ListItem.Swipeable
                  key={i}
                  bottomDivider
                  rightContent={
                    <Button
                      title="Delete"
                      icon={{ name: "delete", color: "white" }}
                      buttonStyle={{ backgroundColor: "red" }}
                      onPress={() => {
                        console.log(l)
                        cancelOrder(l)}}
                    />
                  }
                  rightStyle={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {/* <Avatar title={l.name[0]} source={{ uri: l.avatar_url }} /> */}

                  <ListItem.Content>
                    <ListItem.Title>{l.price} {l.size} {l.side} {l.type}</ListItem.Title>
                    {/* <ListItem.Subtitle>
                      
                    </ListItem.Subtitle> */}
                  </ListItem.Content>
                  <ListItem.Chevron />
                </ListItem.Swipeable>
              ))
            ) : (
              <></>
            )}
          </ListItem.Accordion>
        );
      })}
    </>
  );
};

export default Status;
