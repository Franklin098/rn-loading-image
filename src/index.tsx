import React, { useState } from 'react';
import type {
  ImageErrorEventData,
  ImageLoadEventData,
  ImageStyle,
  NativeSyntheticEvent,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {
  ActivityIndicator,
  Animated,
  ImageProps,
  StyleSheet,
  View,
} from 'react-native';
import { useAnimation } from './useAnimation';
import { Image } from 'react-native';

export interface LoadingImageProps extends Omit<ImageProps, 'style'> {
  fadeInDuration?: number;
  imageStyle?: StyleProp<ImageStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  activityIndicatorProps?: React.ComponentProps<typeof ActivityIndicator>;
  customLoadingComponent?: React.ReactNode;
  missingImageStyle?: StyleProp<ImageStyle>;
  customMissingImageComponent?: React.ReactNode;
}

interface LoadingImageState {
  isLoading: boolean;
  isError: boolean;
}

export const LoadingImage = (props: LoadingImageProps) => {
  const {
    fadeInDuration = 300,
    imageStyle,
    onLoad,
    onError,
    containerStyle,
    activityIndicatorProps,
    customLoadingComponent,
    missingImageStyle,
    customMissingImageComponent,
    ...rest
  } = props;

  const { fadeIn, opacity } = useAnimation();
  const [state, setState] = useState<LoadingImageState>({
    isError: false,
    isLoading: true,
  });

  const handleLoadEvent = (event: NativeSyntheticEvent<ImageLoadEventData>) => {
    setState({ isError: false, isLoading: false });
    fadeIn({ duration: fadeInDuration });
    onLoad?.(event);
  };

  const handleErrorEvent = (
    event: NativeSyntheticEvent<ImageErrorEventData>
  ) => {
    setState({ isError: true, isLoading: false });
    onError?.(event);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {state.isLoading && (
        <>
          {customLoadingComponent ? (
            <>{customLoadingComponent}</>
          ) : (
            <ActivityIndicator
              color={'grey'}
              size={30}
              style={[styles.activityIndicator]}
              {...activityIndicatorProps}
            />
          )}
        </>
      )}
      {state.isError && (
        <>
          {customMissingImageComponent ? (
            <> {customMissingImageComponent}</>
          ) : (
            <Image
              style={[styles.missingImage, missingImageStyle]}
              source={require('./assets/no-image.png')}
            />
          )}
        </>
      )}
      <Animated.Image
        style={[styles.image, { opacity }, imageStyle]}
        onLoad={handleLoadEvent}
        onError={handleErrorEvent}
        {...rest}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityIndicator: {
    position: 'absolute',
  },
  image: {
    width: 100,
    height: 100,
  },
  missingImage: {
    width: 50,
    height: 50,
    tintColor: 'grey',
  },
});
