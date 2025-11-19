import React, { useState, useRef, JSX, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
  StyleSheet,
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Video, ResizeMode } from 'expo-av';
import { Event } from '@/types/type';
import events from '@/constants/events';

const { width } = Dimensions.get('window');

type FeaturedEvent = {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  time: string;
  image: string;
  category: string;
};

type LiveStream = {
  id: string;
  title: string;
  viewers: string;
  isLive: boolean;
  thumbnail: string;
};

type Category = {
  id: string;
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
  gradient: [string, string];
};

type UpcomingEvent = {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  image: string;
};

type GalleryPreview = {
  id: string;
  image: string;
};

const featuredEvents: FeaturedEvent[] = [
  {
    id: '1',
    title: 'Opening Ceremony',
    subtitle: 'Grand Cultural Inauguration',
    date: 'December 15, 2024',
    time: '6:00 PM',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800',
    category: 'Main Event',
  },
  {
    id: '3',
    title: 'Music Fusion Festival',
    subtitle: 'East Meets West',
    date: 'December 17, 2024',
    time: '8:00 PM',
    image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800',
    category: 'Music',
  },
];

const liveStreams: LiveStream[] = [
  {
    id: '1',
    title: 'Main Stage Live',
    viewers: '2.3K',
    isLive: true,
    thumbnail: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800',
  },
  {
    id: '2',
    title: 'Workshop Hall',
    viewers: '856',
    isLive: true,
    thumbnail: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800',
  },
];

const categories: Category[] = [
  { id: '1', name: 'Dance', icon: 'body', gradient: ['#FFD700', '#FFA500'] },
  { id: '2', name: 'Music', icon: 'musical-notes', gradient: ['#FFA500', '#FFD700'] },
  { id: '3', name: 'Art', icon: 'color-palette', gradient: ['#FFD700', '#FFA500'] },
  { id: '6', name: 'Coding', icon: 'bulb', gradient: ['#FFA500', '#FFD700'] },
];

export default function HomeScreen() {
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const flatListRef = useRef<FlatList<FeaturedEvent> | null>(null);
  const videoRef = useRef<Video | null>(null);
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = () => {
      const data = events;
      setUpcomingEvents(data);
    }
    fetchEvents();
  }, []);

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>): void => {
    const slide = Math.round(event.nativeEvent.contentOffset.x / (width - 48));
    setActiveSlide(slide);
  };

  const renderFeaturedItem = ({ item }: { item: FeaturedEvent }): JSX.Element => (
    <TouchableOpacity
      style={{ width: width - 48, marginHorizontal: 24 }}
      onPress={() => router.push(`/event/${item.id}`)}
      activeOpacity={0.9}
    >
      <View style={styles.featuredCard}>
        <Image source={{ uri: item.image }} style={styles.featuredImage} />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.7)', 'rgba(0,0,0,0.95)']}
          style={styles.featuredGradient}
        >
          <View style={styles.categoryBadge}>
            <View style={styles.categoryDot} />
            <Text style={styles.categoryText}>{item.category}</Text>
          </View>
          <Text style={styles.featuredTitle}>{item.title}</Text>
          <Text style={styles.featuredSubtitle}>{item.subtitle}</Text>
          <View style={styles.featuredFooter}>
            <View style={styles.featuredDetail}>
              <Ionicons name="calendar-outline" size={16} color="#FFD700" />
              <Text style={styles.featuredDate}>{item.date}</Text>
            </View>
            <View style={styles.featuredDetail}>
              <Ionicons name="time-outline" size={16} color="#FFD700" />
              <Text style={styles.featuredDate}>{item.time}</Text>
            </View>
          </View>
        </LinearGradient>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient colors={['#000000', '#0a0a0a', '#1a1a1a'] as [string, string, string]} style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.logo}>IGNITIA</Text>
            <Text style={styles.tagline}>Celebrate Culture, Ignite Passion</Text>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity
              style={styles.iconBtn}
            // onPress={() => router.push('/notifications')}
            >
              <Ionicons name="notifications-outline" size={24} color="#FFD700" />
              <View style={styles.notificationBadge} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color="#6B7280" />
            <TextInput
              placeholder="Search events, artists, venues..."
              placeholderTextColor="#6B7280"
              style={styles.searchInput}
            />
            <TouchableOpacity style={styles.filterBtn} onPress={() => console.log('Filter Pressed')}>
              <Ionicons name="options-outline" size={20} color="#FFD700" />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.statsContainer}>
        <LinearGradient colors={['#1a1a1a', '#000000']} style={styles.statsGradient}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>50+</Text>
            <Text style={styles.statLabel}>Events</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>100+</Text>
            <Text style={styles.statLabel}>Artists</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>5K+</Text>
            <Text style={styles.statLabel}>Attendees</Text>
          </View>
        </LinearGradient>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View>
            <View style={styles.liveTitleWrapper}>
              <Text style={styles.sectionTitle}>Live Now</Text>
              <View style={styles.livePulse}>
                <View style={styles.liveDot} />
              </View>
            </View>
            <View style={styles.titleUnderline} />
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.liveStreamsScroll}
        >
          {liveStreams.map((stream) => (
            <TouchableOpacity
              key={stream.id}
              style={styles.liveStreamCard}
              activeOpacity={0.9}
            // onPress={() => router.push(`/live/${stream.id}`)}
            >
              <Image source={{ uri: stream.thumbnail }} style={styles.liveStreamImage} />

              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.9)']}
                style={styles.liveStreamGradient}
              >
                <View style={styles.liveStreamHeader}>
                  <View style={styles.liveBadge}>
                    <View style={styles.liveIndicator} />
                    <Text style={styles.liveText}>LIVE</Text>
                  </View>
                  <View style={styles.viewersContainer}>
                    <Ionicons name="eye-outline" size={14} color="#FFF" />
                    <Text style={styles.viewersText}>{stream.viewers}</Text>
                  </View>
                </View>
                <Text style={styles.liveStreamTitle}>{stream.title}</Text>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>Featured Events</Text>
            <View style={styles.titleUnderline} />
          </View>
          <TouchableOpacity onPress={() => router.push('/events')}>
            <Text style={styles.seeAllText}>View All →</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          ref={flatListRef}
          data={featuredEvents}
          renderItem={renderFeaturedItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          onScroll={onScroll}
          scrollEventThrottle={16}
          snapToInterval={width}
          decelerationRate="fast"
          contentContainerStyle={{ paddingHorizontal: 0 }}
        />

        <View style={styles.indicators}>
          {featuredEvents.map((_, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                flatListRef.current?.scrollToIndex({ index, animated: true });
              }}
            >
              <View
                style={[
                  styles.indicator,
                  index === activeSlide ? styles.indicatorActive : styles.indicatorInactive,
                ]}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>Explore Categories</Text>
            <View style={styles.titleUnderline} />
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesScroll}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={styles.categoryCard}
              onPress={() => router.push('/events')}
              activeOpacity={0.8}
            >
              <LinearGradient colors={category.gradient} style={styles.categoryGradient}>
                <View style={styles.categoryIconWrapper}>
                  <Ionicons name={category.icon} size={28} color="#000" />
                </View>
              </LinearGradient>
              <Text style={styles.categoryName}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>Upcoming Events</Text>
            <View style={styles.titleUnderline} />
          </View>
          <TouchableOpacity onPress={() => router.push('/events')}>
            <Text style={styles.seeAllText}>View All →</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.upcomingContainer}>
          {upcomingEvents.map((event, index) => (
            <TouchableOpacity
              key={event.id}
              style={[styles.upcomingCard, index !== 0 && styles.upcomingCardMargin]}
              onPress={() => router.push(`/event/${event.id}`)}
              activeOpacity={0.9}
            >
              <Image source={event.imageSrc} style={styles.upcomingImage} />
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.8)']}
                style={styles.upcomingGradient}
              >
                <View style={styles.upcomingBadge}>
                  <Ionicons name="time-outline" size={12} color="#FFD700" />
                  <Text style={styles.upcomingBadgeText}>Upcoming</Text>
                </View>
              </LinearGradient>
              <View style={styles.upcomingContent}>
                <Text style={styles.upcomingTitle} numberOfLines={2}>
                  {event.name}
                </Text>
                <View style={styles.upcomingDetails}>
                  <View style={styles.upcomingDetail}>
                    <Ionicons name="calendar-outline" size={14} color="#9CA3AF" />
                    <Text style={styles.upcomingText}>{event.date}</Text>
                  </View>
                  <View style={styles.upcomingDetail}>
                    <Ionicons name="time-outline" size={14} color="#9CA3AF" />
                    <Text style={styles.upcomingText}>{event.time}</Text>
                  </View>
                </View>
                <View style={styles.upcomingDetail}>
                  <Ionicons name="location-outline" size={14} color="#FFD700" />
                  <Text style={styles.upcomingVenue}>{event.location}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 26,
    paddingBottom: 24,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  logo: {
    color: '#FFD700',
    fontSize: 32,
    fontWeight: 'bold',
    letterSpacing: 2,
    textShadowColor: 'rgba(255,215,0,0.8)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  tagline: {
    color: '#9CA3AF',
    fontSize: 11,
    marginTop: 2,
    letterSpacing: 0.5,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  iconBtn: {
    backgroundColor: 'rgba(39, 39, 42, 0.5)',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.3)',
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
  },
  searchContainer: {
    marginTop: 8,
  },
  searchBar: {
    backgroundColor: 'rgba(24, 24, 27, 0.8)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.2)',
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    color: '#FFF',
    fontSize: 15,
  },
  filterBtn: {
    padding: 4,
  },
  statsContainer: {
    marginHorizontal: 24,
    marginTop: -12,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.3)',
  },
  statsGradient: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    color: '#FFD700',
    fontSize: 24,
    fontWeight: 'bold',
    textShadowColor: 'rgba(255,215,0,0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  statLabel: {
    color: '#9CA3AF',
    fontSize: 12,
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
  },
  section: {
    marginTop: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  sectionTitle: {
    color: '#FFD700',
    fontSize: 24,
    fontWeight: 'bold',
    textShadowColor: 'rgba(255,215,0,0.6)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
  },
  liveTitleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  livePulse: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'rgba(239, 68, 68, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#EF4444',
  },
  titleUnderline: {
    height: 3,
    width: 60,
    backgroundColor: 'rgba(255, 215, 0, 0.5)',
    marginTop: 6,
    borderRadius: 2,
  },
  seeAllText: {
    color: '#FFA500',
    marginTop: 10,
    fontSize: 14,
    fontWeight: '600',
  },
  liveStreamsScroll: {
    paddingHorizontal: 24,
    gap: 16,
  },
  liveStreamCard: {
    width: 280,
    height: 180,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#EF4444',
  },
  liveStreamImage: {
    width: '100%',
    height: '100%',
  },
  liveStreamGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: 16,
    justifyContent: 'space-between',
  },
  liveStreamHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EF4444',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    gap: 6,
  },
  liveIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FFF',
  },
  liveText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  viewersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    gap: 6,
  },
  viewersText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },
  liveStreamTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  featuredCard: {
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'rgba(255, 215, 0, 0.3)',
    backgroundColor: '#000',
  },
  featuredImage: {
    width: '100%',
    height: 320,
  },
  featuredGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 215, 0, 0.15)',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.3)',
  },
  categoryDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FFD700',
    marginRight: 6,
  },
  categoryText: {
    color: '#FFD700',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  featuredTitle: {
    color: '#FFF',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  featuredSubtitle: {
    color: '#D1D5DB',
    fontSize: 14,
    marginBottom: 12,
  },
  featuredFooter: {
    flexDirection: 'row',
    gap: 16,
  },
  featuredDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  featuredDate: {
    color: '#FFD700',
    fontSize: 13,
    fontWeight: '600',
  },
  indicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    gap: 8,
  },
  indicator: {
    height: 8,
    borderRadius: 4,
  },
  indicatorActive: {
    width: 32,
    backgroundColor: '#FFD700',
  },
  indicatorInactive: {
    width: 8,
    backgroundColor: 'rgba(255, 215, 0, 0.3)',
  },
  categoriesScroll: {
    paddingHorizontal: 24,
    gap: 16,
  },
  categoryCard: {
    alignItems: 'center',
    width: 100,
  },
  categoryGradient: {
    width: 80,
    height: 80,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryIconWrapper: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    padding: 12,
    borderRadius: 12,
  },
  categoryName: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 13,
  },
  upcomingContainer: {
    paddingHorizontal: 24,
    marginBottom: 20
  },
  upcomingCard: {
    backgroundColor: 'rgba(24, 24, 27, 0.6)',
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.2)',
    borderRadius: 20,
    overflow: 'hidden',
  },
  upcomingCardMargin: {
    marginTop: 16,
  },
  upcomingImage: {
    width: '100%',
    height: 180,
  },
  upcomingGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  upcomingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.3)',
  },
  upcomingBadgeText: {
    color: '#FFD700',
    fontSize: 10,
    fontWeight: '700',
  },
  upcomingContent: {
    padding: 16,
  },
  upcomingTitle: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 12,
  },
  upcomingDetails: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 8,
  },
  upcomingDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  upcomingText: {
    color: '#9CA3AF',
    fontSize: 13,
  },
  upcomingVenue: {
    color: '#FFD700',
    fontSize: 13,
    fontWeight: '600',
  }
});