import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Animated,
} from 'react-native';
import React, { useEffect, useRef } from 'react';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

const SuccessScreen: React.FC = () => {
  const handleContinue = () => {
    router.replace('/(tabs)/home');
  };

  const iconScale = useRef(new Animated.Value(0.5)).current;
  const contentOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(iconScale, {
      toValue: 1,
      friction: 5,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(contentOpacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }).start();
    });
  }, []);

  const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

  return (
    <SafeAreaView style={styles.screenContainer}>
      <View style={styles.contentContainer}>
        <Animated.View style={[styles.successIconWrapper, { transform: [{ scale: iconScale }] }]}>
          <Feather name="check-circle" size={100} color="#34D399" />
        </Animated.View>

        <Animated.Text style={[styles.title, { opacity: contentOpacity }]}>
          Success!
        </Animated.Text>

        <Animated.Text style={[styles.message, { opacity: contentOpacity }]}>
          Your action was completed successfully. Thank you!
        </Animated.Text>

        <AnimatedTouchableOpacity
          onPress={handleContinue}
          style={[styles.continueButton, { opacity: contentOpacity }]}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </AnimatedTouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SuccessScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  successIconWrapper: {
    marginBottom: 20,
    shadowColor: '#34D399',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fef08a',
    marginBottom: 10,
    textAlign: 'center',
    textShadowColor: "rgba(253,224,71,0.6)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  message: {
    fontSize: 18,
    color: '#e5e7eb',
    textAlign: 'center',
    marginBottom: 40,
    maxWidth: 400,
  },
  continueButton: {
    marginTop: 20,
    paddingVertical: 18,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: '#FFD700',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    maxWidth: width > 600 ? 300 : '100%',
  },
  continueButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  }
});