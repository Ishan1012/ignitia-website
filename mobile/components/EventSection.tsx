import events from "@/constants/events";
import { Event } from "@/types/type";
import { useRouter } from "expo-router";
import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    ScrollView,
    Image,
    Dimensions
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get('window');

const EventSection: React.FC = () => {
    const router = useRouter();

    const showEvent = (event: Event) => {
        router.push({
            pathname: "/event/[id]",
            params: { id: event.id }
        });
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.headerContainer}>
                    <Text style={styles.sectionTitle}>Explore Events</Text>
                    <Text style={styles.sectionSubtitle}>
                        Discover exciting competitions & performances.
                    </Text>
                </View>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.gridContainer}>
                    {events.map((event) => (
                        <Pressable
                            key={event.id}
                            onPress={() => showEvent(event)}
                            style={styles.eventCard}
                        >
                            <Image
                                source={event.imageSrc}
                                style={styles.eventImage}
                                width={160}
                                height={160}
                                accessibilityLabel={event.imageAlt}
                            />
                            <Text style={styles.eventName}>{event.name}</Text>
                            <Text style={styles.eventPrice}>{event.price}</Text>
                        </Pressable>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default EventSection;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#0a0a0a',
    },
    scrollViewContent: {
        paddingVertical: 12,
        paddingHorizontal: 24,
    },
    headerContainer: {
        alignItems: 'center',
        maxWidth: 768,
        alignSelf: 'center',
    },
    sectionTitle: {
        fontSize: 32,
        fontWeight: '600',
        color: '#f9e8a2ff',
        textAlign: 'center',
        textShadowColor: 'rgba(253, 224, 71, 0.6)',
        textShadowOffset: { width: 5, height: 4 },
        textShadowRadius: 10,
    },
    sectionSubtitle: {
        fontSize: 16,
        color: '#fbfaf7ff',
        textAlign: 'center',
        opacity: 0.8,
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    eventCard: {
        width: (width - 48 - 16) / 2,
        marginBottom: 20,
    },
    eventImage: {
        width: '100%',
        aspectRatio: 7 / 8,
        borderRadius: 10,
        backgroundColor: '#374151',
    },
    eventName: {
        marginTop: 10,
        fontSize: 18,
        color: '#f3f4f6',
        fontWeight: '600',
    },
    eventPrice: {
        marginTop: 4,
        fontSize: 16,
        color: '#e5e7eb',
        fontWeight: '700',
    },
});