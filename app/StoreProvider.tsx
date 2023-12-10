'use client'

import {useRef} from "react";
import {Provider} from "react-redux";
import {AppStore, makeStore} from "@/lib/store";

export default function StoreProvider({children}:{children:React.ReactNode}) {
    const store = useRef<AppStore>()
    if (!store.current) {
        store.current = makeStore()
    }
    return <Provider store={store.current}>{children}</Provider>
}