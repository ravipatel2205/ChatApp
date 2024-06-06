import { type UserModel } from '../../models/UserModel'
import { type UserActionTypes, SAVE_USER_DATA } from '../actions'

const initialState: UserModel | null = null

const userReducer = (state = initialState, action: UserActionTypes): UserModel | null => {
    switch (action.type) {
        case SAVE_USER_DATA:
            return action.payload
        default:
            return state
    }
}

export default userReducer
