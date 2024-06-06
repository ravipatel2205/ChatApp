import { Platform } from 'react-native'
import { io } from 'socket.io-client'

export const BaseUrl: string =
    Platform.OS === 'android' ? 'http://10.0.2.2:3000/' : 'http://localhost:3000'

export const socket = io('http://192.168.1.102:3001/') //	use the IP address of your machine

// class SocketManager {
//     private static instance: SocketManager
//     private socket: Socket

//     private constructor(socket: Socket) {
//         this.socket = socket
//     }

//     public static getInstance(): SocketManager {
//         if (!SocketManager.instance) {
//             SocketManager.instance = new SocketManager(socket)
//         }
//         return SocketManager.instance as SocketManager
//     }

//     // recive given event
//     public on(eventName: string, callback: (...args: any[]) => void): void {
//         this.socket.on(eventName, callback)
//     }

//     // send any event
//     public emit(eventName: string, data?: any): void {
//         this.socket.emit(eventName, data)
//     }

//     // stop event listion
//     public off(eventName: string): void {
//         this.socket.off(eventName)
//     }
// }

// const socketManager = SocketManager.getInstance()
// export default socketManager
