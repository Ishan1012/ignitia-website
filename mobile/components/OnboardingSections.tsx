import { router } from 'expo-router';
import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    ImageBackground,
    Dimensions,
    Animated,
    Easing,
    SafeAreaView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { height: screenHeight } = Dimensions.get('window');

const TITLES = [
    "Fueling Creativity, Empowering Innovation",
    "Unleashing Potential, Shaping Futures",
    "Dreaming Boldly, Achieving Greatness",
    "Challenging Limits, Elevating Success",
    "Building Vision, Driving Impact",
];

const HERO_IMAGE = require('../assets/images/hero.png');

const Section1 = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [showOverlay, setShowOverlay] = useState(true);

    const textCycleAnim = useRef(new Animated.Value(0)).current;
    const headerInitialAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const checkOverlay = async () => {
            const overlayShown = await AsyncStorage.getItem('overlayShown');
            if (overlayShown === 'true') setShowOverlay(false);
        };
        // checkOverlay();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((current) => (current + 1) % TITLES.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        textCycleAnim.setValue(0);
        Animated.timing(textCycleAnim, {
            toValue: 1,
            duration: 500,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
        }).start();
    }, [activeIndex]);

    useEffect(() => {
        Animated.timing(headerInitialAnim, {
            toValue: 1,
            duration: 1000,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
        }).start();
    }, []);

    const opacity = textCycleAnim.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0, 1, 1],
    });

    const translateY = textCycleAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [20, 0],
    });

    const handleViewEvents = async () => {
        await AsyncStorage.setItem('overlayShown', 'true');
        router.replace('/(tabs)/home');
    };

    return (
        <SafeAreaView style={styles.container}>
            {showOverlay && (
                <ImageBackground source={HERO_IMAGE} style={styles.imageBackground} blurRadius={5}>
                    <View style={styles.overlay} />
                </ImageBackground>
            )}
            <View style={styles.content}>
                <Animated.View style={{ opacity: headerInitialAnim, transform: [{ translateY: headerInitialAnim.interpolate({ inputRange: [0, 1], outputRange: [50, 0] }) }] }}>
                    <Text style={styles.mainTitle}>
                        IGNITIA 2K26
                    </Text>
                </Animated.View>

                <View style={styles.cyclingTextWrapper}>
                    <Animated.Text
                        key={TITLES[activeIndex]}
                        style={[
                            styles.cyclingText,
                            {
                                opacity,
                                transform: [{ translateY }],
                            }
                        ]}
                    >
                        {TITLES[activeIndex]}
                    </Animated.Text>
                </View>
                <View style={styles.buttonContainer}>
                    <Pressable
                        onPress={handleViewEvents}
                        style={({ pressed }) => [
                            styles.primaryButton,
                            {
                                opacity: pressed ? 0.8 : 1,
                                backgroundColor: pressed ? '#f59e0b' : '#fbbf24',
                            }
                        ]}
                    >
                        <Text style={styles.primaryButtonText}>
                            Get Started
                        </Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0a0a0a',
    },
    imageBackground: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#0a0a0a',
        opacity: 0.5,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        position: 'relative',
        zIndex: 10,
    },
    mainTitle: {
        fontSize: screenHeight > 800 ? 70 : 48,
        color: '#fde047',
        fontWeight: '900',
        marginBottom: 20,
        textAlign: 'center',
        textShadowColor: 'rgba(253, 224, 71, 0.6)',
        textShadowOffset: { width: 5, height: 5 },
        textShadowRadius: 10,
    },
    cyclingTextWrapper: {
        height: 60,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        marginBottom: 30,
    },
    cyclingText: {
        position: 'absolute',
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fef3c7',
        textAlign: 'center',
        textShadowColor: 'rgba(252, 242, 189, 0.6)',
        textShadowOffset: { width: 3, height: 3 },
        textShadowRadius: 5,
        paddingHorizontal: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 80,
        gap: 20,
    },
    primaryButton: {
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 10,
        backgroundColor: '#fbbf24',
        shadowColor: 'rgba(253, 224, 71, 0.5)',
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 0.8,
        shadowRadius: 15,
        elevation: 5,
    },
    primaryButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    }
});

export default Section1;