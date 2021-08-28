import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
interface Props {
  title: string;
}
const Header: React.FC<Props> = ({title, children}) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>{title}</Text>
      {children ?? <></>}
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#cfcfcf',
    alignItems: 'center',
    flexDirection: "row",
    flexWrap: "wrap",
    marginRight: 10,
    marginLeft: 10
  },
  headerText: {
    fontSize: 20,
    fontWeight: '600',
    marginRight: 'auto'
  },
});
export default Header;