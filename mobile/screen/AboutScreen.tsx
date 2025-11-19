import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, Image, TouchableOpacity, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';

const { width } = Dimensions.get('window');
const isTabletOrLarger = width >= 768;

type TeamMember = {
    name: string;
    role: string;
    imageUrl: any;
    xUrl: string;
    linkedinUrl: string;
};

type Sponsor = {
    name: string;
    description: string;
    imageSrc: any;
};

type IconProps = {
    size?: number;
    color?: string;
    style?: any;
    children?: React.ReactNode;
};

const XIcon = () => <Text style={styles.socialText}>X</Text>;

const LinkedInIcon: React.FC<IconProps> = () => (
    <View style={styles.socialIcon}>
        <Svg fill="#aaa" viewBox="0 0 24 24" width="100%" height="100%">
            <Path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </Svg>
    </View>
);

const sponsors: Sponsor[] = [
    { name: 'Rachit Finance Services', description: 'Trusted financial solutions and investment services dedicated to empowering individuals and businesses.', imageSrc: require('@/assets/images/sponsor1.jpeg') },
    { name: 'Rahul Sweets', description: 'Serving sweetness and tradition since 1985 — a name synonymous with authentic Indian delicacies.', imageSrc: require('@/assets/images/sponsor2.jpeg') },
    { name: 'Tanishq', description: "India's most loved jewellery brand, blending craftsmanship with elegance and purity.", imageSrc: require('@/assets/images/sponsor.png') },
    { name: 'Deep Wealth', description: 'Your trusted partner in financial growth, wealth management, and long-term prosperity.', imageSrc: require('@/assets/images/sponsor4.png') },
];

const teamMembers: TeamMember[] = [
    { name: 'Sanskar Soni', role: 'Developers Head', imageUrl: require('@/assets/images/team/member1.jpg'), xUrl: '#', linkedinUrl: '#' },
    { name: 'Shivam Singh', role: 'Developers Head', imageUrl: require('@/assets/images/team/member2.png'), xUrl: '#', linkedinUrl: '#' },
    { name: 'Aryan Bajpai', role: 'Developer', imageUrl: require('@/assets/images/team/member3.png'), xUrl: '#', linkedinUrl: '#' },
    { name: 'Parth Aggarwal', role: 'Developer', imageUrl: require('@/assets/images/team/member4.jpg'), xUrl: '#', linkedinUrl: '#' },
    { name: 'Ritik Gupta', role: 'Developer', imageUrl: require('@/assets/images/team/member5.jpg'), xUrl: '#', linkedinUrl: '#' },
    { name: 'Siddhant Narula', role: 'Developer', imageUrl: require('@/assets/images/team/member6.jpg'), xUrl: '#', linkedinUrl: '#' },
];

const juniorTeamMembers: TeamMember[] = [
    { name: 'Suryansh Sharan', role: 'Junior Developer', imageUrl: require('@/assets/images/team/junior1.jpg'), xUrl: '#', linkedinUrl: '#' },
    { name: 'Divyansh Vijay', role: 'Junior Developer', imageUrl: require('@/assets/images/team/junior2.jpg'), xUrl: '#', linkedinUrl: '#' },
    { name: 'Anshika', role: 'Junior Developer', imageUrl: require('@/assets/images/team/junior3.jpg'), xUrl: '#', linkedinUrl: '#' }
];

const renderSponsorCard = (sponsor: Sponsor, index: number, isStacked: boolean = false) => {
    const cardStyle = [
        styles.sponsorCard
    ];

    return (
        <View key={sponsor.name} style={cardStyle}>
            <Text style={styles.sponsorTitle}>
                {sponsor.name}
            </Text>
            <Text style={styles.sponsorDescription}>
                {sponsor.description}
            </Text>
            <View style={[styles.sponsorImageContainer]}>
                <Image
                    source={sponsor.imageSrc}
                    style={styles.sponsorImage}
                    accessibilityLabel={sponsor.name}
                />
            </View>
        </View>
    );
};

const renderTeamMember = (person: TeamMember) => {

    return (
        <View key={person.name} style={[styles.teamCard, { flexBasis: '100%' }]}>
            <View style={styles.teamImageWrapper}>
                <Image
                    style={styles.teamImage}
                    source={person.imageUrl}
                    accessibilityLabel={`Portrait of ${person.name}`}
                />
            </View>
            <View style={styles.teamDetails}>
                <Text style={styles.memberName}>{person.name}</Text>
                <Text style={styles.memberRole}>{person.role}</Text>
                <View style={styles.socialLinksContainer}>
                    <TouchableOpacity
                        onPress={() => console.log(`Navigating to ${person.name}'s X profile`)}
                        style={styles.socialLink}
                    >
                        <XIcon />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => console.log(`Navigating to ${person.name}'s LinkedIn profile`)}
                        style={styles.socialLink}
                    >
                        <LinkedInIcon />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const AboutScreen: React.FC = () => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                <View style={styles.innerContainer}>
                    <View style={styles.sectionPadding}>
                        <Text style={styles.sectionHeaderTitle}>Our Sponsors</Text>
                        <View style={styles.sponsorGridWrapper}>
                            <View style={styles.sponsorGrid}>
                                <View style={[styles.sponsorColumn, isTabletOrLarger && styles.sponsorColumnWide]}>
                                    {renderSponsorCard(sponsors[0], 0)}
                                    {renderSponsorCard(sponsors[1], 1)}
                                    {renderSponsorCard(sponsors[2], 2)}
                                    {renderSponsorCard(sponsors[3], 3)}
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={styles.sectionPadding}>
                        <View style={styles.teamHeader}>
                            <Text style={styles.sectionHeaderTitle}>Last Year: Ignitia Team</Text>
                            <Text style={styles.teamSubtitle}>
                                The brilliant minds powering Ignitia 2K26 — developers, designers, and innovators bringing creativity to life.
                            </Text>
                        </View>

                        <View style={styles.teamGrid}>
                            {teamMembers.map(renderTeamMember)}
                        </View>

                        <View style={styles.teamHeader}>
                            <Text style={styles.sectionHeaderTitle}>Junior Developers</Text>
                        </View>
                        <View style={styles.teamGrid}>
                            {juniorTeamMembers.map(renderTeamMember)}
                        </View>
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default AboutScreen;


const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#0a0a0a',
    },
    scrollContainer: {
        paddingVertical: 12,
        paddingHorizontal: 8,
    },
    innerContainer: {
        flex: 1,
        gap: 24,
    },
    sectionPadding: {
        paddingVertical: 24,
    },
    sectionHeaderTitle: {
        fontSize: 40,
        fontWeight: '600',
        color: '#fef3c7',
        textAlign: 'center',
        textDecorationColor: 'rgba(253, 224, 71, 0.5)',
        textShadowColor: "rgba(253,224,71,0.6)",
        textShadowOffset: { width: 5, height: 5 },
        textShadowRadius: 10,
        marginBottom: 30,
        paddingHorizontal: 20,
    },

    // 1. About/PSIT Card Styles
    cardContainer: {
        backgroundColor: 'rgba(39, 39, 42, 0.2)',
        borderRadius: 24,
        padding: isTabletOrLarger ? 48 : 24,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
    },
    gridContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 30,
    },
    fullWidth: {
        flexDirection: 'column',
    },
    reverseLayout: {
        flexDirection: isTabletOrLarger ? 'row-reverse' : 'column',
    },
    textColumn: {
        flex: 1,
        paddingVertical: isTabletOrLarger ? 64 : 0,
    },
    textColumnLg: {
        maxWidth: isTabletOrLarger ? width * 0.4 : '100%',
    },
    mainTitle: {
        fontSize: 40,
        fontWeight: '600',
        color: '#fef3c7',
        textAlign: isTabletOrLarger ? 'left' : 'center',
        marginBottom: 20,
        textShadowColor: "rgba(253,224,71,0.6)",
        textShadowOffset: { width: 5, height: 5 },
        textShadowRadius: 10,
    },
    paragraph: {
        marginTop: 12,
        fontSize: 18,
        color: '#d4d4d8',
        textAlign: isTabletOrLarger ? 'left' : 'center',
        lineHeight: 28,
    },
    imageColumn: {
        flex: 1,
        height: isTabletOrLarger ? 300 : 200,
        marginTop: isTabletOrLarger ? 0 : 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 6,
        overflow: 'hidden',
    },
    imagePlaceholder: {
        width: '100%',
        height: '100%',
        backgroundColor: '#18181b',
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    imagePlaceholderText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fde047',
    },
    imagePlaceholderSubText: {
        fontSize: 14,
        color: '#a1a1aa',
        marginTop: 5,
    },
    campusImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 6,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    sponsorGridWrapper: {
        paddingHorizontal: isTabletOrLarger ? 24 : 20,
    },
    sponsorGrid: {
        flexDirection: isTabletOrLarger ? 'row' : 'column',
        gap: isTabletOrLarger ? 24 : 0,
        marginTop: 16,
    },
    sponsorColumn: {
        flex: 1,
    },
    sponsorColumnWide: {
        flex: 1.5,
    },
    sponsorCard: {
        backgroundColor: 'rgba(92, 92, 92, 0.25)',
        borderRadius: 10,
        padding: 32,
        marginBottom: 24,
    },
    stackedSponsorColumn: {
        flex: 1,
        gap: 24,
    },
    sponsorTitle: {
        fontSize: 24,
        fontWeight: '500',
        color: '#fef3c7',
        marginBottom: 8,
        textShadowColor: "rgba(253,224,71,0.6)",
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 8,
    },
    sponsorDescription: {
        fontSize: 16,
        color: '#a1a1aa',
        marginBottom: 16,
    },
    sponsorImageContainer: {
        width: "100%",
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        overflow: 'hidden',
    },
    sponsorImage: {
        width: 50,
        aspectRatio: 1,
        resizeMode: 'cover',
        borderRadius: 10,
    },
    teamHeader: {
        alignItems: 'center',
        marginBottom: 32,
        paddingHorizontal: 24,
    },
    teamSubtitle: {
        marginTop: 16,
        fontSize: 18,
        color: '#d4d4d8',
        textAlign: 'center',
    },
    teamGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        paddingHorizontal: 24,
    },
    teamCard: {
        backgroundColor: '#18181b',
        borderRadius: 16,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 8,
        margin: 8,
        flexGrow: 0,
    },
    teamImageWrapper: {
        overflow: 'hidden',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
    },
    teamImage: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
    },
    teamDetails: {
        padding: 24,
    },
    memberName: {
        fontSize: 20,
        fontWeight: '600',
        color: 'white',
    },
    memberRole: {
        fontSize: 16,
        fontWeight: '500',
        color: '#fde047',
    },
    socialLinksContainer: {
        marginTop: 16,
        flexDirection: 'row',
        gap: 16,
    },
    socialLink: {
        padding: 5,
    },
    socialText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#a1a1aa',
    },
    socialIcon: {
        width: 24,
        height: 24,
        color: '#a1a1aa',
    }
});