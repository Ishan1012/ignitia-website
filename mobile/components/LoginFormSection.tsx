import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useAuth } from '@/context/AuthContext';
import { router } from 'expo-router';

function LoginFormSection() {
    const { login, googleLogin } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async () => {
        if (!email || !password) {
            console.log("Email and Password are required");
            return;
        }

        try{ 
            const success = await login({ email, password });
    
            if (success) {
				console.log("Login successful!");
				router.replace('/(tabs)/home');
			} else {
				console.log("Failed to login. Please try again.");
				router.replace('/login');
			}
        } catch(error) {
            alert("An error occured. Error: " + error);
			router.replace('/login');
        }
    };

    const handleForgotPassword = () => {
        console.log("Navigate to Forgot Password");
    };

    const handleSignUp = () => {
        router.push('/register')
    };
    
    const handleGoogleLogin = async () => {
        console.log("Google Signup");
        // try{ 
        //     const success = await googleLogin();
    
        //     if (success) {
		// 		console.log("Login successful!");
		// 		router.replace('/');
		// 	} else {
		// 		console.log("Failed to login. Please try again.");
		// 		router.replace('/login');
		// 	}
        // } catch(error) {
        //     console.error("An error occured. Error: " + error);
		// 	router.replace('/login');
        // }
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.formContainer}>
                <Text style={styles.header}>Login</Text>

                <View style={styles.fieldGroup}>
                    <View style={styles.field}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            style={styles.input}
                            keyboardType="email-address"
                            placeholder="m@example.com"
                            placeholderTextColor="#999"
                            value={email}
                            onChangeText={setEmail}
                            autoCapitalize="none"
                        />
                    </View>

                    <View style={styles.field}>
                        <View style={styles.passwordHeader}>
                            <Text style={styles.label}>Password</Text>
                            <TouchableOpacity onPress={handleForgotPassword}>
                                <Text style={styles.linkText}>
                                    Forgot your password?
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <TextInput
                            style={styles.input}
                            secureTextEntry
                            placeholder="*******"
                            placeholderTextColor="#999"
                            value={password}
                            onChangeText={setPassword}
                        />
                    </View>

                    <View style={styles.field}>
                        <TouchableOpacity
                            onPress={handleSubmit}
                            style={styles.loginButton}
                        >
                            <Text style={styles.loginButtonText}>Login</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.separatorContainer}>
                        <View style={styles.line} />
                        <Text style={styles.separatorText}>Or continue with</Text>
                        <View style={styles.line} />
                    </View>

                    <View style={styles.field}>
                        <TouchableOpacity
                            onPress={handleGoogleLogin}
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
                            Don&apos;t have an account?{" "}
                            <Text onPress={handleSignUp} style={styles.signUpLink}>
                                Sign up
                            </Text>
                        </Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

export default LoginFormSection;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#1E1E1E',
    },
    formContainer: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 30,
        gap: 24,
    },
    header: {
        marginVertical: 48,
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
        gap: 24,
    },
    field: {
        gap: 8,
    },
    label: {
        color: '#FEF3C7',
        fontSize: 14,
        fontWeight: '500',
    },
    passwordHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    linkText: {
        fontSize: 12,
        color: '#FBBF24',
        textDecorationLine: 'underline',
        textDecorationStyle: 'solid',
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
    loginButton: {
        height: 44,
        backgroundColor: '#F59E0B',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginButtonText: {
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
    signUpLink: {
        fontWeight: 'bold',
    },
});