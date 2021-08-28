import { View, Text, TouchableOpacity, StyleSheet} from "react-native";
import { Button } from "react-native-elements";
import * as React from "react";
import { Auth } from "aws-amplify";

const styles = StyleSheet.create({
  signinButton: {
    backgroundColor: "#eb8634",
    paddingVertical: 20,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "500" },
});

export interface UserInfoProps {
  value?: object;
  setUserInfo?: (val: object) => void;
  removeUserInfo?: () => void;
}

interface Props extends UserInfoProps {
  name: string;
  password: string;
}

type OrderProps = {
  func: () => void;
}

export const Signinbutton: React.FC<Props> = (props: Props) => {
  return (
    <TouchableOpacity
      style={styles.signinButton}
      onPress={async () => {
        if (!props.name || !props.password) return;
        if (props.setUserInfo) {
          try {
            const user = await Auth.signIn(props.name, props.password);
            console.log(user);
            props.setUserInfo(user);
          } catch (err) {
            console.log(err);
          }
        }
      }}
    >
      <Text style={styles.buttonText}>Sign in</Text>
    </TouchableOpacity>
  );
};

export const Signoutbutton: React.FC<UserInfoProps> = (
  props: UserInfoProps
) => {
  return (
    <TouchableOpacity
      style={styles.signinButton}
      onPress={async () => {
        if (props.removeUserInfo) {
          try {
            await Auth.signOut();
            props.removeUserInfo();
          } catch (err) {
            console.log(err);
          }
        }
      }}
    >
      <Text style={styles.buttonText}>Sign out</Text>
    </TouchableOpacity>
  );
};

export const OrderBuyButton: React.FC<OrderProps> = ({func}) => {
  return (
    <Button
      onPress={async () => {
        try {
          func();
        } catch (err) {
          console.log(err);
        }
      }}
      title={"Buy"}
      buttonStyle={{backgroundColor: "red"}}
    />
  );
};

export const OrderSellButton: React.FC<OrderProps> = ({func}) => {
  return (
    <Button
      onPress={async () => {
        try {
          func();
        } catch (err) {
          console.log(err);
        }
      }}
      title={"Sell"}
      buttonStyle={{backgroundColor: "green"}}
    />
  );
};
