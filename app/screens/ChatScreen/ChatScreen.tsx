import {
    FlatList,
    Image,
    Keyboard,
    Pressable,
    SafeAreaView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native'
import { styles } from './ChatScreenStyle'
import React, { useEffect, useRef, useState } from 'react'
import { socket } from '../../network/SocketManager'
import { MessageType, type MessageModel } from '../../models/MessageModel'
import MessageView from '../../componant/MessageView'
import { type UserModel } from '../../models/UserModel'
import { Navigation } from 'react-native-navigation'
import { useSelector } from 'react-redux'
import Modal from 'react-native-modal'
import ActionSheet, { type ActionItem } from '../../componant/ActionSheet'
import { type ImageLibraryOptions, launchImageLibrary } from 'react-native-image-picker'
import { type TimeData } from '../../models/TimeData'
import RNFS from 'react-native-fs'
import VidePlayer from '../../componant/VideoPlayer'

interface ChatScreenProps {
    currentChatUser: UserModel
    componentId: string
}

const ChatScreen: React.FC<ChatScreenProps> = (props) => {
    const flatListRef = useRef<FlatList<MessageModel>>(null)
    const [newMessageList, setNewMessageList] = useState<MessageModel[]>([])
    const [currentChatMesage, setCurrentChatMessage] = useState('')
    const currentUser = useSelector((state: { user: UserModel | null }) => state.user)
    const [actionSheet, setActionSheet] = useState<boolean>(false)
    const [currentVideoURL, setCurrentVideoURL] = useState('')
    const [isDisplayVideo, setIsDisplayVideo] = useState<boolean>(false)

    const closeActionSheet: () => void = () => {
        setActionSheet(false)
    }
    const closeVideoPlayer: () => void = () => {
        setIsDisplayVideo(false)
    }
    const attachementActionItems: ActionItem[] = [
        {
            id: '1',
            label: 'Photo',
            onPress: () => {
                setActionSheet(false)
                setTimeout(() => {
                    presentImagePicker(true)
                }, 400)
            }
        },
        {
            id: '2',
            label: 'Video',
            onPress: () => {
                setActionSheet(false)
                setTimeout(() => {
                    presentImagePicker(false)
                }, 400)
            }
        }
    ]

    const presentImagePicker: (isPresentPhoto: boolean) => void = (isPresentPhoto: boolean) => {
        const imageLibraryOptions: ImageLibraryOptions = {
            mediaType: isPresentPhoto ? 'photo' : 'video',
            includeBase64: true,
            selectionLimit: 1,
            presentationStyle: 'fullScreen'
        }
        launchImageLibrary(imageLibraryOptions, (response) => {
            if (response.assets !== null && response.assets !== undefined) {
                if (response.assets.length > 0) {
                    const imageUri = response.assets[0].uri
                    const fileName = response.assets[0].fileName
                    if (
                        imageUri !== null &&
                        fileName !== null &&
                        imageUri !== undefined &&
                        fileName !== undefined
                    ) {
                        sendImageAndVideo(imageUri, fileName, isPresentPhoto)
                    }
                }
            }
        }).catch((error: any) => {
            // Handle errors here
            console.log(error)
        })
    }

    useEffect(() => {
        socket.on('oldMessages', (allChats) => {
            setNewMessageList(allChats as [MessageModel])
        })
        // other message
        socket.on(
            `new_message_${currentUser?.id ?? ''}_${props.currentChatUser?.id ?? ''}`,
            (message) => {
                messageGet(message as MessageModel)
            }
        )
        socket.emit('chatStart', {
            senderIdentifier: currentUser?.id ?? '',
            reciverIdentifier: props.currentChatUser?.id ?? ''
        })
        socket.emit('getOldMessage', {
            senderIdentifier: currentUser?.id ?? '',
            reciverIdentifier: props.currentChatUser?.id ?? ''
        })
        return () => {
            socket.off('oldMessages')
            socket.off(`new_message_${currentUser?.id ?? ''}_${props.currentChatUser?.id ?? ''}`)
        }
    }, [socket])

    function backButtonTapped(): void {
        socket.emit('chatStop', { senderIdentifier: currentUser?.id ?? '' })
        Navigation.pop(props.componentId).catch((error) => {
            console.error('Error pop:', error)
        })
    }

    function messageGet(message: MessageModel): void {
        setNewMessageList((oldMessageList) => {
            return [...oldMessageList, message]
        })
    }

    function handleAddNewMessage(): void {
        const timeData = getTimeData()
        const currentUserName = currentUser?.name ?? ''
        if (currentUserName.trim().length > 0) {
            socket.emit('sendMessage', {
                currentChatMesage,
                senderIdentifier: currentUser?.id ?? '',
                reciverIdentifier: props.currentChatUser?.id ?? '',
                timeData,
                type: 'text'
            })
            setCurrentChatMessage('')
            Keyboard.dismiss()
        }
    }

    function getTimeData(): TimeData {
        const date = new Date()
        return {
            hr: date.getHours() < 10 ? `0${date.getHours()}` : date.getHours(),
            mins: date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes(),
            date: date.getDate(),
            month: date.getMonth(),
            year: date.getFullYear(),
            secound: date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds()
        }
    }

    function sendImageAndVideo(uri: string, fileName: string, isPresentPhoto: boolean): void {
        const timeData = getTimeData()
        const currentUserName = currentUser?.name ?? ''
        if (currentUserName.trim().length > 0) {
            RNFS.readFile(uri, 'base64')
                .then((data) => {
                    socket.emit('sendMessage', {
                        imageData: data,
                        originalname: fileName,
                        senderIdentifier: currentUser?.id ?? '',
                        reciverIdentifier: props.currentChatUser?.id ?? '',
                        timeData,
                        type: isPresentPhoto ? 'image' : 'video'
                    })
                })
                .catch((error) => {
                    console.log('error', error)
                })
            setCurrentChatMessage('')
        }
    }

    function chatTapped(message: MessageModel): void {
        if (message.type === MessageType.video && message.text !== '') {
            setCurrentVideoURL(message.text)
            setIsDisplayVideo(true)
        }
    }

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <View style={styles.mainWraper}>
                <View style={styles.header}>
                    <View style={styles.backButtonContainer}>
                        <TouchableOpacity onPress={backButtonTapped}>
                            <Image
                                source={require('../../../assets/ic_back.png')}
                                style={styles.backButton}
                            />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.title}>{props.currentChatUser?.name ?? ''}</Text>
                </View>
                <View
                    style={[
                        styles.safeAreaView,
                        {
                            paddingVertical: 15,
                            paddingHorizontal: 10
                        }
                    ]}
                >
                    {newMessageList.length > 0 ? (
                        <FlatList
                            ref={flatListRef}
                            data={newMessageList}
                            keyExtractor={(item: MessageModel) => item.id}
                            renderItem={({ item }) => (
                                <Pressable
                                    onPress={() => {
                                        chatTapped(item)
                                    }}
                                >
                                    <MessageView
                                        currentUser={currentUser?.id ?? ''}
                                        message={item}
                                    />
                                </Pressable>
                            )}
                            onContentSizeChange={() => {
                                setTimeout(() => flatListRef.current?.scrollToEnd(), 0)
                            }}
                        />
                    ) : (
                        <View style={styles.noMessageFoundTitleContainer}>
                            <Text style={styles.noMessageFoundTitle}>No Message Found</Text>
                        </View>
                    )}
                </View>
                <View style={styles.messageInputContainer}>
                    <View style={styles.attachementContainer}>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            style={styles.attachementButton}
                            onPress={() => {
                                setActionSheet(true)
                            }}
                        >
                            <Image
                                source={require('../../../assets/ic_pin.png')}
                                tintColor="white"
                                style={styles.pinImage}
                            />
                        </TouchableOpacity>
                    </View>
                    <TextInput
                        style={styles.messageInput}
                        value={currentChatMesage}
                        onChangeText={(value) => {
                            setCurrentChatMessage(value)
                        }}
                        placeholder="Enter your message"
                    />
                    <Pressable onPress={handleAddNewMessage} style={styles.button}>
                        <View>
                            <Text style={styles.buttonText}>SEND</Text>
                        </View>
                    </Pressable>
                </View>
            </View>
            <Modal
                isVisible={actionSheet}
                style={{
                    margin: 0,
                    justifyContent: 'flex-end',
                    paddingBottom: 15
                }}
            >
                <ActionSheet actionItems={attachementActionItems} onCancel={closeActionSheet} />
            </Modal>
            <Modal isVisible={isDisplayVideo} style={styles.videoPlayer}>
                <VidePlayer videoURL={currentVideoURL} onCancel={closeVideoPlayer} />
            </Modal>
        </SafeAreaView>
    )
}

export default ChatScreen
