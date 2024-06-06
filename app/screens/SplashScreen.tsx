import React, { useState, useEffect } from 'react'
import { Text, ImageBackground, StyleSheet } from 'react-native'
import { Navigation, type NavigationProps } from 'react-native-navigation'
import { LoginRoot } from '../navigation'

const SplashScreen: React.FC<NavigationProps> = (props) => {
    const [isNavigateToHome, setIsNavigateToHome] = useState(false)

    setTimeout(() => {
        setIsNavigateToHome(true)
    }, 2000)

    useEffect(() => {
        if (isNavigateToHome) {
            Navigation.setRoot(LoginRoot).catch((error) => {
                console.error('Error setting root:', error)
            })
        }
    }, [isNavigateToHome])

    return (
        <ImageBackground
            style={styles.screenContainer}
            source={require('../../assets/ic_splash.jpg')}
        >
            <Text style={styles.letsChat}>Chat App</Text>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    letsChat: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold'
    }
})

export default SplashScreen
