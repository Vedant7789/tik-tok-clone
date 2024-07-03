import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ModalContextProps {
    isModalVisible: boolean;
    setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalContext = createContext<ModalContextProps>({ isModalVisible: true, setIsModalVisible: () => { } });

export const ModalContextProvider = ({ children }: { children: ReactNode }) => {
    const [isModalVisible, setIsModalVisible] = useState(true);

    return (
        <ModalContext.Provider value={{ isModalVisible, setIsModalVisible }}>
            {children}
        </ModalContext.Provider>
    );
};

export const useModalContext = () => {
    const context = useContext(ModalContext);
    return context;
};
