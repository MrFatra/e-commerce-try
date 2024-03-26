import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import { userReducer } from "./slice";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

const createNoopStorage = () => {
    return {
        getItem(_key: any) {
            return Promise.resolve(null);
        },
        setItem(_key: any, value: any) {
            return Promise.resolve(value);
        },
        removeItem(_key: any) {
            return Promise.resolve();
        },
    };
};

const storage =
    typeof window !== "undefined"
        ? createWebStorage("local")
        : createNoopStorage();

const authPersistConfig = {
    key: 'auth',
    storage,
}

const persistedReducer = persistReducer(authPersistConfig, userReducer)

const rootReducer = combineReducers({
    auth: persistedReducer
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch