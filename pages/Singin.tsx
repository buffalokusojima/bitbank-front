import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { Auth } from "aws-amplify";
import {
  AuthState,
} from "@aws-amplify/ui-components";

import {SigninButtonContainer} from '../containers/UserInfo'

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    fontWeight: "700",
  },
  form: {
    marginTop: 30,
  },
  input: {
    padding: 15,
    borderColor: "rgba(0, 0, 0, 0.2)",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
  },
  addItemButton: {
    backgroundColor: "#eb8634",
    paddingVertical: 20,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "500" },
});

// interface Props {
//   setAuthState: any;
// };

const SigninForm: React.FC = () => {
  const [userName, setUserName] = React.useState("");

  const [password, setPassword] = React.useState("");

  // const signIn = async () => {

  //   if(!userName || !password) return;

  //   try {
  //     await Auth.signIn(userName, password);
  //     Auth.currentAuthenticatedUser().then((authData) => {
  //       setAuthState(AuthState.SignedIn);
  //     });
  //   } catch (error) {
  //     console.log("error signing in", error);
  //   }
  // };
  type userInfo = {
    name: string,
    password: string
}
  return (
    <View>
      <View style={styles.form}>
        <Text style={styles.heading}>Sign in page</Text>
        <Text>userName</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter userName"
          value={userName}
          autoCapitalize="none"
          onChangeText={(text) => setUserName(text)}
        />
        <Text>password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter password"
          secureTextEntry={true}
          value={password}
          autoCapitalize="none"
          onChangeText={(text) => {
            setPassword(text);
          }}
        />
        <SigninButtonContainer name={userName} password={password}/>
      </View>
    </View>
  );
};

export default SigninForm;
