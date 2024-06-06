import { View, Image, Text, StyleSheet } from 'react-native'
import { type UserModel } from '../Models/UserModel'
import React from 'react'

interface UserListItemProps {
    user: UserModel
    unReadMessageCount: number
}

const UserListItem: React.FC<UserListItemProps> = ({
    user,
    unReadMessageCount
}: {
    user: UserModel
    unReadMessageCount: number
}) => {
    return (
        <View style={styles.wraper}>
            <View>
                <Image
                    source={require('../../assets/ic_profile.png')}
                    style={styles.userProfileImage}
                />
            </View>
            <View style={styles.userListText}>
                <Text>{user.name}</Text>
                <Text>Tap to start chat</Text>
            </View>
            {unReadMessageCount > 0 ? (
                <View style={styles.unreadCountViewWrapper}>
                    <View style={styles.unreadCountView}>
                        <Text style={styles.unreadCountText}>{unReadMessageCount}</Text>
                    </View>
                </View>
            ) : (
                <View />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    wraper: {
        alignContent: 'center',
        backgroundColor: '#e6e6e6',
        marginVertical: 5,
        marginHorizontal: 15,
        flexDirection: 'row',
        paddingVertical: 10,
        borderRadius: 10
    },
    userListText: {
        marginLeft: 15,
        flex: 1,
        alignContent: 'center',
        paddingVertical: 10,
        flexDirection: 'column'
    },
    userProfileImage: {
        width: 50,
        height: 50,
        alignItems: 'center',
        marginLeft: 15
    },
    buttonContainer: {
        flexDirection: 'row'
    },
    unreadCountText: {
        fontWeight: '500',
        color: 'white'
    },
    unreadCountView: {
        height: 25,
        width: 25,
        backgroundColor: 'green',
        borderRadius: 12.5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    unreadCountViewWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 15
    }
})
export default UserListItem
