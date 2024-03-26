import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface IUser {
    authState: boolean
    fullName: string
    username: string
    role: string
}

const InitUserState: IUser = {
    authState: false,
    fullName: '',
    username: '',
    role: '',
};

export const userSlice = createSlice({
    name: 'auth',
    initialState: InitUserState,
    reducers: {
        setUser: (state, action: PayloadAction<IUser>) => {
            state.authState = action.payload.authState
            state.fullName = action.payload.fullName
            state.username = action.payload.username
            state.role = action.payload.role
        },
    },
})

export const { setUser } = userSlice.actions
export const userReducer = userSlice.reducer
