import { createContext, useState } from 'react';


type StateType = {
    alertStatus: AlertStatusType;
}

type ActionType ={
    setAlertStatus: (props: AlertStatusType) => void;
}

type BundleType = {
    state: StateType,
    action: ActionType,
}

const initialData: BundleType = {
    state: {
        alertStatus: {
            status: false
        }
    },

    action: {
        setAlertStatus: (props: AlertStatusType): void => {}
    }
}

const Context = createContext(initialData);

const ContextProvider = (props: { children: JSX.Element}) => {
    const [alertStatus, setAlertStatus] = useState<AlertStatusType>(initialData.state.alertStatus);    

    const state: StateType = {
        alertStatus
    }

    const action: ActionType = {
        setAlertStatus
    }

    const bundle: BundleType = {
        state,
        action
    }   

    return <Context.Provider value={bundle}>{props.children}</Context.Provider>
}

export { Context, ContextProvider };