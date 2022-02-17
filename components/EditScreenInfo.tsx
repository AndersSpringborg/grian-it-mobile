import { StyleSheet } from 'react-native';
import { View } from './Themed';
import ApiTest from "./ApiTest";

export default function EditScreenInfo() {
  return (
    <View>
      <View style={styles.getStartedContainer}>
        <ApiTest/>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  }
});
