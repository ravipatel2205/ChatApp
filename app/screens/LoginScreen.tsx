import {
    StyleSheet,
    TextInput,
    View,
    ImageBackground,
    Button,
    SafeAreaView,
    Alert,
    Keyboard
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { type UserModel } from '../models/UserModel'
import { socket } from '../network/SocketManager'
import { Navigation, type NavigationProps } from 'react-native-navigation'
import { UserListRoot } from '../navigation'
import { useDispatch } from 'react-redux'
import { saveUserData } from '../redux/actions'

const LoginScreen: React.FC<NavigationProps> = (props) => {
    const [name, setName] = useState('')
    const [isRegister, setIsRegister] = useState(true)

    const dispatch = useDispatch()

    function registerButtonTapped(): void {
        if (name.trim().length > 0) {
            setIsRegister(true)
            socket.emit('createNewUser', name)
        } else {
            Alert.alert('Alert', 'Please Enter Name')
        }
        Keyboard.dismiss()
    }

    function loginButtonTapped(): void {
        if (name.trim().length > 0) {
            setIsRegister(false)
            socket.emit('loginUser', name)
        } else {
            Alert.alert('Alert', 'Please Enter Name')
        }
        Keyboard.dismiss()
    }

    useEffect(() => {
        socket.on('isUserRegisterSuccessfully', (currentUser) => {
            if (currentUser !== null) {
                const userData = currentUser as UserModel
                dispatch(saveUserData(userData))
                navigateToUserListScreen(currentUser as UserModel)
            } else {
                Alert.alert(
                    'Alert',
                    isRegister ? 'Username is already there!!!' : 'Invalid username!!!'
                )
            }
        })
        return () => {
            socket.off('isUserRegisterSuccessfully')
        }
    }, [])

    function navigateToUserListScreen(currentUser: UserModel): void {
        Navigation.setRoot(UserListRoot).catch((error) => {
            console.error('Error setting root:', error)
        })
    }

    return (
        <ImageBackground
            style={styles.screenContainer}
            source={require('../../assets/ic_chat.jpg')}
        >
            <SafeAreaView>
                <View style={styles.contentWrapper}>
                    <TextInput
                        style={styles.textInputs}
                        placeholder="Enter Name"
                        onChangeText={(text) => {
                            setName(text)
                        }}
                    />
                    <View style={styles.buttonWrapper}>
                        <View style={styles.buttonContainer}>
                            <Button title="Register" onPress={registerButtonTapped} />
                        </View>
                        <View style={styles.buttonContainer}>
                            <Button title="login" onPress={loginButtonTapped} />
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    screenContainer: {
        width: '100%',
        height: '100%'
    },
    textInputs: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: 'gray',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10
    },
    buttonContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        borderColor: 'gray',
        borderWidth: 1,
        width: '45%',
        marginVertical: 40,
        marginHorizontal: 15
    },
    buttonWrapper: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center'
    },
    contentWrapper: {
        marginTop: '60%',
        flexDirection: 'column',
        padding: 10
    }
})
export default LoginScreen
