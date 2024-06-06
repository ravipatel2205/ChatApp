import { type UnknownAction } from '@reduxjs/toolkit'
import { type UserModel } from '../models/UserModel'

export const SAVE_USER_DATA = 'SAVE_USER_DATA'

interface SaveUserDataAction extends UnknownAction {
    type: typeof SAVE_USER_DATA
    payload: UserModel
}

export type UserActionTypes = SaveUserDataAction

export const saveUserData = (userData: UserModel): SaveUserDataAction => {
    return {
        type: SAVE_USER_DATA,
        payload: userData
    }
}
