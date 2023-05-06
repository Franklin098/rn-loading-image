import { useRef } from 'react';
import { Animated } from 'react-native';

interface FadeAnimationParams {
  duration: number;
  useNativeDriver?: boolean;
  delay?: number;
  isInteraction?: boolean;
  easing?: (value: number) => number;
}

export const useAnimation = () => {
  const opacity = useRef(new Animated.Value(0)).current;

  const fadeIn = ({ useNativeDriver = true, ...rest }: FadeAnimationParams) => {
    Animated.timing(opacity, {
      toValue: 1,
      useNativeDriver,
      ...rest,
    }).start();
  };

  const fadeOut = ({
    useNativeDriver = true,
    ...rest
  }: FadeAnimationParams) => {
    Animated.timing(opacity, {
      toValue: 0,
      useNativeDriver,
      ...rest,
    }).start();
  };

  return {
    fadeIn,
    fadeOut,
    opacity,
  };
};
