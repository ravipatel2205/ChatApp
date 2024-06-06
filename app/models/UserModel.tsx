export interface UserModel {
    id: string
    name: string
    // messages: [UserMessageModel]
    unReadMessagesCountByUser: [UnReadMessagesCountByUser]
}

export interface UnReadMessagesCountByUser {
    id: string
    count: number
}
