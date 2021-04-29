import { createContext, useState } from 'react';


type StateType = {
    alertStatus: AlertStatusType;
    user: string | null;
}

type ActionType ={
    setAlertStatus: (props: AlertStatusType) => void;
    setUser: (props: string | null) => void;
}

type BundleType = {
    state: StateType,
    action: ActionType,
}

const initialData: BundleType = {
    state: {
        alertStatus: {
            status: false
        },
        user: null
    },

    action: {
        setAlertStatus: (props: AlertStatusType): void => {},
        setUser: (props: string | null): void => {}
    }
}

const Context = createContext(initialData);

const ContextProvider = (props: { children: JSX.Element}) => {
    const [alertStatus, setAlertStatus] = useState<AlertStatusType>(initialData.state.alertStatus);    
    const [user, setUser] = useState(initialData.state.user);
    
    const state: StateType = {
        alertStatus,
        user
    }

    const action: ActionType = {
        setAlertStatus,
        setUser
    }

    const bundle: BundleType = {
        state,
        action
    }   

    return <Context.Provider value={bundle}>{props.children}</Context.Provider>
}

export { Context, ContextProvider };