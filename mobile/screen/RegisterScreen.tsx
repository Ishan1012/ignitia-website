import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    ScrollView,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useAuth } from '@/context/AuthContext';

interface SignUpRequest {
    role: string;
    name: string;
    email: string;
    phone: string;
    rollno: string;
    course: string;
    password: string;
}

const RegisterScreen = () => {
    const { signup, googleLogin } = useAuth();

    const [formData, setFormData] = useState<SignUpRequest>({
        role: '',
        name: '',
        email: '',
        phone: '',
        rollno: '',
        course: '',
        password: '',
    });
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleInputChange = (key: keyof SignUpRequest, value: string) => {
        setFormData({ ...formData, [key]: value });
    };

    const handleSignUp = async () => {
        const { email, password } = formData;
        
        if (!email || !password || !formData.name || !confirmPassword || !formData.rollno || !formData.course) {
            console.log("All fields are required.");
            return;
        }

        if (password !== confirmPassword) {
            console.log("Passwords do not match.");
            return;
        }

        try {
            const success = await signup(formData);

            if (success) {
                console.log("Signup successful!");
                router.replace('/(tabs)/home');
            } else {
                console.log("Failed to sign up. Please try again.");
                router.replace('/register');
            }
        } catch (error) {
            console.error("An error occurred. Error: " + error);
            router.replace('/register');
        }
    };

    const handleGoogleSignup = async () => {
        console.log("Google Signup initiated");
        // try{ 
        //      const success = await googleLogin();
    
        //      if (success) {
        //         console.log("Google Signup successful!");
        //         router.replace('/(tabs)/home');
        //      } else {
        //          console.log("Failed Google signup. Please try again.");
        //          router.replace('/register');
        //      }
        // } catch(error) {
        //      console.error("An error occured during Google signup. Error: " + error);
        //      router.replace('/register');
        // }
    };

    const handleSignIn = () => {
        router.push('/login');
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.formContainer}>
                    <Text style={styles.header}>Register for Ignitia 2K26</Text>

                    <View style={styles.fieldGroup}>
                        
                        <View style={styles.field}>
                            <Text style={styles.label}>Full Name</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="John Doe"
                                placeholderTextColor="#999"
                                value={formData.name}
                                onChangeText={(text) => handleInputChange('name', text)}
                            />
                        </View>

                        <View style={styles.field}>
                            <Text style={styles.label}>Email</Text>
                            <TextInput
                                style={styles.input}
                                keyboardType="email-address"
                                placeholder="m@example.com"
                                placeholderTextColor="#999"
                                value={formData.email}
                                onChangeText={(text) => handleInputChange('email', text)}
                                autoCapitalize="none"
                            />
                        </View>

                        <View style={styles.field}>
                            <Text style={styles.label}>Phone Number</Text>
                            <TextInput
                                style={styles.input}
                                keyboardType="phone-pad"
                                placeholder="+91 98765 43210"
                                placeholderTextColor="#999"
                                value={formData.phone}
                                onChangeText={(text) => handleInputChange('phone', text)}
                            />
                        </View>

                        <View style={styles.field}>
                            <Text style={styles.label}>Roll Number</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your roll number"
                                placeholderTextColor="#999"
                                value={formData.rollno}
                                onChangeText={(text) => handleInputChange('rollno', text)}
                            />
                        </View>

                        <View style={styles.field}>
                            <Text style={styles.label}>Course/Year</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="e.g., B.Tech CSE 2nd Year"
                                placeholderTextColor="#999"
                                value={formData.course}
                                onChangeText={(text) => handleInputChange('course', text)}
                            />
                        </View>

                        <View style={styles.field}>
                            <Text style={styles.label}>Password</Text>
                            <TextInput
                                style={styles.input}
                                secureTextEntry
                                placeholder="*******"
                                placeholderTextColor="#999"
                                value={formData.password}
                                onChangeText={(text) => handleInputChange('password', text)}
                            />
                        </View>

                        <View style={styles.field}>
                            <Text style={styles.label}>Confirm Password</Text>
                            <TextInput
                                style={styles.input}
                                secureTextEntry
                                placeholder="*******"
                                placeholderTextColor="#999"
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                            />
                        </View>

                        <View style={styles.field}>
                            <TouchableOpacity
                                onPress={handleSignUp}
                                style={styles.signupButton}
                            >
                                <Text style={styles.signupButtonText}>Create Account</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.separatorContainer}>
                            <View style={styles.line} />
                            <Text style={styles.separatorText}>Or continue with</Text>
                            <View style={styles.line} />
                        </View>

                        <View style={styles.field}>
                            <TouchableOpacity
                                onPress={handleGoogleSignup}
                                style={styles.googleButton}
                            >
                                <AntDesign
                                    name="google"
                                    size={20}
                                    color="#FFFFFF"
                                    style={styles.googleIcon}
                                />
                                <Text style={styles.googleButtonText}>
                                    Continue with Google
                                </Text>
                            </TouchableOpacity>

                            <Text style={styles.descriptionText}>
                                Already have an account?{" "}
                                <Text onPress={handleSignIn} style={styles.signInLink}>
                                    Sign in
                                </Text>
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default RegisterScreen;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#1E1E1E',
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 24,
        paddingVertical: 60,
        marginBottom: 100,
        alignItems: 'center',
    },
    formContainer: {
        width: '100%',
        maxWidth: 400,
        gap: 24,
    },
    header: {
        textAlign: 'center',
        fontSize: 28,
        fontWeight: '600',
        color: '#FEF9C3',
        textDecorationColor: 'rgba(253,243,185, 0.5)',
        textDecorationStyle: 'solid',
        shadowColor: '#FDE047',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.6,
        shadowRadius: 15,
    },
    fieldGroup: {
        gap: 20,
    },
    field: {
        gap: 8,
    },
    label: {
        color: '#FEF3C7',
        fontSize: 14,
        fontWeight: '500',
    },
    input: {
        height: 44,
        backgroundColor: '#333',
        borderColor: '#444',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 12,
        color: '#FFFFFF',
        fontSize: 16,
    },
    signupButton: {
        height: 44,
        backgroundColor: '#F59E0B',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    signupButtonText: {
        color: '#1F2937',
        fontSize: 16,
        fontWeight: '600',
    },
    separatorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: '#4B5563',
    },
    separatorText: {
        marginHorizontal: 10,
        color: '#9CA3AF',
        fontSize: 12,
    },
    googleButton: {
        flexDirection: 'row',
        height: 44,
        backgroundColor: 'transparent',
        borderColor: '#4B5563',
        borderWidth: 1,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    googleButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
    googleIcon: {
        marginRight: 8,
    },
    descriptionText: {
        textAlign: 'center',
        marginTop: 10,
        color: '#D1D5DB',
        fontSize: 12,
    },
    signInLink: {
        fontWeight: 'bold',
        color: '#FBBF24',
        textDecorationLine: 'underline',
        textDecorationStyle: 'solid',
    },
});