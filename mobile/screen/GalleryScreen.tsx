import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
const isTablet = width >= 768;

type GalleryImage = {
  id: number;
  href: string;
  imageSrc: any;
  imageAlt: string;
};

const products: GalleryImage[] = [
  {
    id: 1,
    href: '#',
    imageSrc: require('@/assets/images/gallery/1.jpg'),
    imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
  },
  {
    id: 2,
    href: '#',
    imageSrc: require('@/assets/images/gallery/2.jpg'),
    imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
  },
  {
    id: 3,
    href: '#',
    imageSrc: require('@/assets/images/gallery/3.jpg'),
    imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
  },
  {
    id: 4,
    href: '#',
    imageSrc: require('@/assets/images/gallery/4.jpg'),
    imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
  },
  {
    id: 5,
    href: '#',
    imageSrc: require('@/assets/images/gallery/5.jpg'),
    imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
  },
  {
    id: 6,
    href: '#',
    imageSrc: require('@/assets/images/gallery/6.jpg'),
    imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
  },
  {
    id: 7,
    href: '#',
    imageSrc: require('@/assets/images/gallery/7.jpg'),
    imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
  },
  {
    id: 8,
    href: '#',
    imageSrc: require('@/assets/images/gallery/8.jpg'),
    imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
  },
  {
    id: 9,
    href: '#',
    imageSrc: require('@/assets/images/gallery/9.jpg'),
    imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
  },
  {
    id: 10,
    href: '#',
    imageSrc: require('@/assets/images/gallery/10.jpg'),
    imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
  },
  {
    id: 11,
    href: '#',
    imageSrc: require('@/assets/images/gallery/11.jpg'),
    imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
  },
  {
    id: 12,
    href: '#',
    imageSrc: require('@/assets/images/gallery/12.jpg'),
    imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
  },
];

const GalleryScreen: React.FC = () => {

  const handleImagePress = (image: GalleryImage) => {
    console.log(`Image pressed: ${image.imageAlt}. Navigating to: ${image.href}`);
  };

  const columnCount = isTablet ? 3 : 2;
  const itemWidth = (width - (24 * 2) - ((columnCount - 1) * 16)) / columnCount;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <Text style={styles.sectionTitle}>
          Our Gallery
        </Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.gridContainer}>
          {products.map((image) => (
            <TouchableOpacity
              key={image.id}
              onPress={() => handleImagePress(image)}
              style={[styles.imageWrapper, { width: itemWidth }]}
            >
              <Image
                source={image.imageSrc}
                style={styles.imageStyle}
                accessibilityLabel={image.imageAlt}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  scrollContainer: {
    paddingVertical: 22,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  headerContainer: {
    marginBottom: 15,
    maxWidth: 768,
    alignSelf: 'center',
  },
  sectionTitle: {
    fontSize: 40,
    fontWeight: '600',
    color: '#fef3c7',
    textAlign: 'center',
    textDecorationColor: 'rgba(253, 224, 71, 0.5)',
    textShadowColor: "rgba(253,224,71,0.6)",
    textShadowOffset: { width: 5, height: 5 },
    textShadowRadius: 10,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
    rowGap: 16,
  },
  imageWrapper: {
    borderRadius: 10,
    aspectRatio: 1,
    overflow: 'hidden',
    backgroundColor: '#18181b',
  },
  imageStyle: {
    width: '100%',
    maxHeight: 150,
    alignItems: 'center',
    aspectRatio: 1,
    resizeMode: 'cover',
  },
});

export default GalleryScreen;