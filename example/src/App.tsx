import React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import { LoadingImage } from 'rn-loading-image';

export default function App() {
  return (
    <View style={styles.container}>
      <LoadingImage
        source={{
          uri: 'https://wrong-url.com',
        }}
      />

      <LoadingImage
        source={{
          uri: 'https://p1.pxfuel.com/preview/324/157/238/scotland-united-kingdom-england-isle-of-skye.jpg',
        }}
      />

      <LoadingImage
        fadeInDuration={100}
        source={{
          uri: 'https://c0.wallpaperflare.com/preview/991/190/484/lighthouse-ushuaia-beagle-channel-argentina.jpg',
        }}
        activityIndicatorProps={{
          color: 'red',
          size: 'large',
        }}
      />

      <LoadingImage
        fadeInDuration={2000}
        source={{
          uri: 'https://cdn.pixabay.com/photo/2020/04/12/01/58/iguazu-falls-5032457_1280.jpg',
        }}
        customLoadingComponent={<Text>Loading...</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: 50,
    marginBottom: 100,
  },
  box: {
    width: 100,
    height: 100,
  },
});
