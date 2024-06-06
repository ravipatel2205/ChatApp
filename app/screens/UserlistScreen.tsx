import {
    FlatList,
    Image,
    ImageBackground,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { socket } from '../network/SocketManager'
import { type UserModel, type UnReadMessagesCountByUser } from '../Models/UserModel'
import { Navigation, type NavigationProps } from 'react-native-navigation'
import { ChatRoot, LoginRoot } from '../navigation'
import UserListItem from '../componant/UserListItem'
import { useSelector, useDispatch } from 'react-redux'
import { saveUserData } from '../redux/actions'

const UserListScreen: React.FC<NavigationProps> = (props) => {
    const [userList, setUserlist] = useState<UserModel[]>([])
    const currentUser = useSelector((state: { user: UserModel | null }) => state.user)
    const dispatch = useDispatch()

    useEffect(() => {
        socket.emit('getAllConnectedUser', currentUser?.id ?? '0')
    }, [])

    useEffect(() => {
        socket.on('userList', (users) => {
            setUserList(users as [UserModel])
        })
        socket.on(`update_unreadCount_${currentUser?.id ?? ''}`, (data) => {
            dispatch(saveUserData(data.currentUser as UserModel))
            setUserList(data.chatUsers as [UserModel])
        })
    }, [])

    function setUserList(users: [UserModel]): void {
        const filteredUser = users.filter((user: UserModel) => user.id !== (currentUser?.id ?? ''))
        setUserlist(filteredUser)
    }

    function logoutButtonTapped(): void {
        socket.emit('logout', currentUser?.id ?? '0')
        Navigation.setRoot(LoginRoot).catch((error) => {
            console.error('Error setting root:', error)
        })
    }

    function userTapped(currentChatUser: UserModel): void {
        setTappedUserUnreadCountToZero(currentChatUser.id ?? '')
        if (currentUser != null) {
            Navigation.push(props.componentId, ChatRoot({ currentChatUser })).catch((error) => {
                console.error('Error pushing chat screen:', error)
            })
        }
    }

    function getUnreadMessageCount(userID: string): number {
        const users =
            currentUser?.unReadMessagesCountByUser.filter(
                (user: UnReadMessagesCountByUser) => user.id === userID
            ) ?? []
        if (users.length > 0) {
            return users[0].count
        } else {
            return 0
        }
    }

    function setTappedUserUnreadCountToZero(userID: string): void {
        const senderIndex = currentUser?.unReadMessagesCountByUser.findIndex(
            (user) => user.id === userID
        )
        if (currentUser != null) {
            if (senderIndex !== -1) {
                currentUser.unReadMessagesCountByUser.splice(senderIndex ?? 0, 1)
            }
        }
        // force reload like this
        setUserlist((oldMessageList) => {
            return [...oldMessageList]
        })
    }

    return (
        <ImageBackground
            style={styles.screenContainer}
            source={require('../../assets/ic_chat.jpg')}
        >
            <SafeAreaView>
                <View style={styles.headerView}>
                    <Text style={styles.userName}>Hello, {currentUser?.name ?? ''}</Text>
                    <View style={styles.logoutButton}>
                        <TouchableOpacity onPress={logoutButtonTapped}>
                            <Image
                                source={require('../../assets/ic_logout.png')}
                                style={styles.logoutButton}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <FlatList
                    style={styles.userList}
                    data={userList}
                    keyExtractor={(item: UserModel) => item.id} // id should be string always
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => {
                                userTapped(item)
                            }}
                        >
                            <UserListItem
                                user={item}
                                unReadMessageCount={getUnreadMessageCount(item.id)}
                            />
                        </TouchableOpacity>
                    )}
                />
            </SafeAreaView>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    screenContainer: {
        width: '100%',
        height: '100%'
    },
    headerView: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    userName: {
        marginLeft: 20,
        color: 'red',
        fontSize: 22,
        fontWeight: '700'
    },
    logoutButton: {
        marginRight: 20,
        width: 30,
        height: 30
    },
    userList: {
        width: '100%',
        marginVertical: 10
    }
})

export default UserListScreen
