import { useEffect } from 'react';
import { useAnimatedStyle, withSpring, withTiming, useSharedValue } from 'react-native-reanimated';

export const useBlockAnimation = (isActive, color) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);
  const rotation = useSharedValue(0);

  useEffect(() => {
    if (isActive) {
      // Subtle bounce effect when piece becomes active
      scale.value = withSpring(1.05, {
        damping: 10,
        stiffness: 100,
      });
      scale.value = withSpring(1, {
        damping: 10,
        stiffness: 100,
      });
    }
  }, [isActive]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: scale.value },
        { rotate: `${rotation.value}deg` }
      ],
      opacity: opacity.value,
    };
  });

  const triggerLandingAnimation = () => {
    // Flash effect when piece lands
    scale.value = withSpring(1.1, {
      damping: 10,
      stiffness: 100,
    });
    scale.value = withSpring(1, {
      damping: 10,
      stiffness: 100,
    });
  };

  const triggerClearAnimation = () => {
    // Fade out and rotate when row is cleared
    opacity.value = withTiming(0, {
      duration: 300,
    });
    rotation.value = withSpring(90, {
      damping: 10,
      stiffness: 100,
    });
  };

  const resetAnimation = () => {
    scale.value = 1;
    opacity.value = 1;
    rotation.value = 0;
  };

  return {
    animatedStyle,
    triggerLandingAnimation,
    triggerClearAnimation,
    resetAnimation,
  };
};
