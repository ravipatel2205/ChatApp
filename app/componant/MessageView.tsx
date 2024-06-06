import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, View, Dimensions } from 'react-native'
import { type MessageModel, MessageType } from '../models/MessageModel'
import { createThumbnail } from 'react-native-create-thumbnail'

interface MessageComponentProps {
    currentUser: string
    message: MessageModel
}

const MessageComponent: React.FC<MessageComponentProps> = ({
    currentUser,
    message
}: {
    currentUser: string
    message: MessageModel
}) => {
    const currentUserStatus = message.senderIdentifier !== currentUser
    const messageStyle = currentUserStatus
        ? { backgroundColor: '#f2f2f2', color: '#000000' }
        : { backgroundColor: '#703efe', color: '#ffffff' }

    const [thumbnail, setThumbnail] = useState<string | null>(null)
    useEffect(() => {
        if (message.type === MessageType.video) {
            createThumbnail({ url: message.text })
                .then((path) => {
                    setThumbnail(path.path)
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }, [])

    return (
        <View style={currentUserStatus ? {} : { alignItems: 'flex-end' }}>
            <View style={styles.messageItemWrapper}>
                <View style={styles.messageItemInnerWrapper}>
                    {message.type === MessageType.text ? (
                        <View style={[styles.messageItem, messageStyle]}>
                            <Text style={{ fontWeight: '600', color: messageStyle.color }}>
                                {message.text}
                            </Text>
                        </View>
                    ) : message.type === MessageType.image ? (
                        <Image
                            source={{
                                uri: message.text
                            }}
                            style={styles.image}
                        />
                    ) : (
                        <View style={styles.videoContainer}>
                            <Image
                                source={{ uri: thumbnail ?? message.text }}
                                style={styles.image}
                            />
                            <Image
                                source={require('../../assets/ic_play.png')}
                                style={styles.playIcon}
                            />
                        </View>
                    )}
                </View>
                <Text style={styles.messageTime}>
                    {message.hr}:{message.mins}:{message.secound}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    messageItemWrapper: {
        maxWidth: '50%',
        marginBottom: 15
    },
    messageItemInnerWrapper: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    messageItem: {
        width: '100%',
        padding: 20,
        borderRadius: 10,
        marginBottom: 2
    },
    image: {
        width: '100%',
        height: Dimensions.get('screen').width / 2.5,
        borderRadius: 10,
        marginBottom: 5
    },
    messageTime: {
        marginLeft: 10
    },
    videoContainer: {
        width: '100%',
        height: '100%',
        position: 'relative'
    },
    playIcon: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginLeft: -25, // Adjust this according to the size of your play icon
        marginTop: -25, // Adjust this according to the size of your play icon
        width: 50,
        height: 50,
        zIndex: 1,
        tintColor: 'white'
    }
})

export default MessageComponent
