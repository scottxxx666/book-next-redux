import {configureStore} from "@reduxjs/toolkit";
import {bookSlice} from "@/lib/book/bookSlice";

export const makeStore = () => {
    return configureStore({
        reducer: {
            books: bookSlice.reducer,
        }
    })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

