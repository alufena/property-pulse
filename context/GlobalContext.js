'use client';

// uso de global state por estar em diferentes componentes. traz a funcionalidade de exibir automaticamente a quantidade notificações. um único arquivo dentro da pasta context, pois são poucos global state values usados

import { createContext, useState, useContext } from 'react';

const GlobalContext = createContext();

export function GlobalProvider({ children }) {
    // "provider" que fornece "context" para todo o projeto. permite acesso a qualquer valor inserido aqui, ou seja, qualquer "global state" desejado colocado aqui. foi trazido em "\app\layout.jsx" e envoltou todo projeto
    const [unreadCount, setUnreadCount] = useState(0);
    return (
        <GlobalContext.Provider
            value={{
                unreadCount, // pega valor
                setUnreadCount, // muda o valor com outro componente
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
}

export function useGlobalContext() {
    // cria custom hook para acessar context. trazido em qualquer situação que precise usar context
    return useContext(GlobalContext);
}
