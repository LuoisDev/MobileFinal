import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

function ProfileScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Text>abc</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 10,
  },
  card: {
    width: '90%',
  },
});

export default ProfileScreen;
