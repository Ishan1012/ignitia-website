import events from "@/constants/events";
import { Event } from "@/types/type";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, ScrollView, Image, Text, View, Pressable, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Svg, Path } from 'react-native-svg';

const { width } = Dimensions.get('window');

type IconProps = {
    size?: number;
    color?: string;
    style?: any;
    children?: React.ReactNode;
};

type EventProps = {
    eventId: number;
}

const BackButton = ({ size = 30, color = '#fefefe' }: IconProps) => (
    <View style={{ width: size, height: size }}>
        <Svg
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke={color}
            width={size}
            height={size}
        >
            <Path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
            />
        </Svg>
    </View>
);

const Icon = ({ children, size = 20, style }: IconProps) => (
    <View style={[{ width: size, height: size, marginRight: 8, justifyContent: 'center', alignItems: 'center' }, style]}>
        {children}
    </View>
);

const CalendarIcon = (props: IconProps) => (
    <Icon {...props}>
        <Svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#a5b4fc" width={18} height={18}>
            <Path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5" />
        </Svg>
    </Icon>
);

const ClockIcon = (props: IconProps) => (
    <Icon {...props}>
        <Svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#a5b4fc" width={18} height={18}>
            <Path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </Svg>
    </Icon>
);

const LocationIcon = (props: IconProps) => (
    <Icon {...props}>
        <Svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#a5b4fc" width={18} height={18}>
            <Path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
            <Path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 4.25-7.5 11.25-7.5 11.25S4.5 14.75 4.5 10.5a7.5 7.5 0 0115 0z" />
        </Svg>
    </Icon>
);

const PhoneIcon = (props: IconProps) => (
    <Icon {...props}>
        <Svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#a5b4fc" width={18} height={18}>
            <Path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-2.25a2.25 2.25 0 00-2.25-2.25h-1.318a3.75 3.75 0 110-7.5h1.318c.621 0 1.125-.504 1.125-1.125V5.25a2.25 2.25 0 00-2.25-2.25h-2.25C8.941 3 2.25 9.716 2.25 18z" />
        </Svg>
    </Icon>
);

const EventDetailScreen: React.FC<EventProps> = ({ eventId }) => {
    const router = useRouter();
    const [event, setEvent] = useState<Event | null>(null);

    useEffect(() => {
        const fetchEvent = async () => {
            console.log(eventId);
            const data = events.find((item) => item.id === eventId);
            if (data) {
                setEvent(data);
            }
        };

        fetchEvent();
    }, [])

    const handleBack = () => {
        router.back();
    }

    const handlePurchase = () => {
        router.replace('/success');
    }

    if (!event) {
        return (
            <View>
                <Text>Event not found!</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.screenContainer}>
            <TouchableOpacity
                onPress={handleBack}
                style={styles.closeButton}
            >
                <BackButton />
            </TouchableOpacity>

            <ScrollView contentContainerStyle={styles.screenScrollContent}>
                <View style={styles.detailsGrid}>
                    <View style={styles.imageSection}>
                        <Image
                            source={event.imageSrc}
                            style={styles.detailImage}
                            alt={event.imageAlt}
                        />
                    </View>

                    <View style={styles.detailsSection}>
                        <Text style={styles.detailTitle}>
                            {event.name}
                        </Text>

                        <View style={styles.sectionMargin}>
                            <Text style={styles.detailPrice}>{event.price}</Text>
                        </View>

                        <View style={styles.sectionMargin}>
                            <Text style={styles.detailDescription}>{event.desc}</Text>
                        </View>

                        <View style={styles.infoRow}>
                            <LocationIcon />
                            <Text style={styles.infoText}>{event.location}</Text>
                        </View>

                        <View style={styles.infoRow}>
                            <CalendarIcon />
                            <Text style={styles.infoText}>{event.date}</Text>
                        </View>

                        <View style={styles.infoRow}>
                            <ClockIcon />
                            <Text style={styles.infoText}>{event.time}</Text>
                        </View>

                        <View style={styles.infoRow}>
                            <PhoneIcon />
                            <Text style={styles.infoText}>{event.contact}</Text>
                        </View>

                        <Pressable style={styles.buyButton} onPress={handlePurchase}>
                            <Text style={styles.buyButtonText}>Buy Now</Text>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default EventDetailScreen;

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: '#0a0a0a',
    },
    screenScrollContent: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        minHeight: '100%',
    },
    closeButton: {
        position: 'absolute',
        top: 15,
        left: 15,
        zIndex: 20,
        padding: 5,
    },
    detailsGrid: {
        flexDirection: width > 768 ? 'row' : 'column',
        justifyContent: 'space-between',
        paddingTop: 20,
    },
    imageSection: {
        width: '100%',
        maxHeight: 300,
        alignItems: 'center',
        marginBottom: width > 768 ? 0 : 20,
        paddingRight: width > 768 ? 16 : 0,
    },

    detailImage: {
        width: '100%',
        maxWidth: 300,
        maxHeight: 300,
        aspectRatio: 2 / 3,
        borderRadius: 6,
        backgroundColor: '#374151',
    },
    detailsSection: {
        flex: width > 768 ? 7 : 1,
        paddingLeft: width > 768 ? 16 : 0,
    },
    detailTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fef08a',
        marginBottom: 10,
        textShadowColor: "rgba(253,224,71,0.6)",
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 8,
    },
    sectionMargin: {
        marginBottom: 15,
    },
    detailPrice: {
        fontSize: 24,
        color: '#e5e7eb',
        fontWeight: 'bold',
    },
    detailDescription: {
        fontSize: 16,
        color: '#e5e7eb',
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    infoText: {
        fontSize: 16,
        color: '#e5e7eb',
        flexShrink: 1,
    },
    buyButton: {
        marginTop: 20,
        paddingVertical: 18,
        paddingHorizontal: 16,
        borderRadius: 10,
        backgroundColor: '#FFD700',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buyButtonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000000',
    }
});