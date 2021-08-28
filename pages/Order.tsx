import React from "react";
import { View, useWindowDimensions } from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";

import NormalOrderArea from "../components/areas/orders/NormalOrderArea";
import SpecialOrderArea from "../components/areas/orders/SpecialOrderArea";
import AutoOrderArea from "../components/areas/orders/AutoOrderArea";

const NormalOrderRoute = () => <NormalOrderArea />;

const SpecialOrderRoute = () => <SpecialOrderArea />;

const AutoOrderRoute = () => <AutoOrderArea />;

const Order: React.FC = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Normal" },
    { key: "second", title: "Special" },
    { key: "third", title: "Auto" },
  ]);

  const renderScene = SceneMap({
    first: NormalOrderRoute,
    second: SpecialOrderRoute,
    third: AutoOrderRoute,
  });

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
};

export default Order;
