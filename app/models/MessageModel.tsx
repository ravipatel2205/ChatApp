export interface MessageModel {
    id: string
    text: string
    senderIdentifier: string
    reciverIdentifier: string
    hr: string
    mins: string
    date: string
    month: string
    year: string
    secound: string
    type: MessageType
}

export interface UserMessageModel {
    id: string
    messages: [MessageModel]
}

export enum MessageType {
    text = 'text',
    image = 'image',
    video = 'video'
}
