import React, { createContext, useContext, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

interface LoadingContextType {
    show: () => void;
    hide: () => void;
}

const LoadingContext = createContext<LoadingContextType | null>(null);

export const useLoading = () => {
    const context = useContext(LoadingContext);
    if (!context) {
        throw new Error("useLoading must be used inside LoadingProvider");
    }
    return context;
};

export const LoadingProvider = ({ children }: { children: React.ReactNode }) => {
    const [visible, setVisible] = useState(false);

    const show = () => setVisible(true);
    const hide = () => setVisible(false);

    return (
        <LoadingContext.Provider value={{ show, hide }}>
            {children}

            {visible && (
                <View style={styles.overlay}>
                    <ActivityIndicator size="large" color="#fff" />
                </View>
            )}
        </LoadingContext.Provider>
    );
};

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0,0,0,0.4)",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
    },
});
