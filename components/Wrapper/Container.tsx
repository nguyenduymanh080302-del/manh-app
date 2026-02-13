import { useTheme } from '@react-navigation/native'
import React from 'react'
import { StyleProp, StyleSheet, ViewStyle } from 'react-native'
import Animated from 'react-native-reanimated'

interface Props {
    children?: React.ReactNode,
    padding?: number
    margin?: number
    flex?: number
    direction?: 'row' | 'column'
    justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly'
    align?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline'
    gap?: number
    backgroundColor?: string
    borderRadius?: number
    borderWidth?: number
    borderColor?: string
    customStyle?: StyleProp<ViewStyle>
    enabledShadow?: boolean
}

const Container = ({
    children, padding, margin,
    flex, direction, justify, align, gap,
    backgroundColor, borderRadius, borderWidth, borderColor, customStyle,
    enabledShadow
}: Props) => {

    const { colors } = useTheme()

    const containerStyle = StyleSheet.flatten([
        padding !== undefined && { padding },
        margin !== undefined && { margin },
        flex !== undefined && { flex },
        direction !== undefined && { flexDirection: direction },
        backgroundColor !== undefined && { backgroundColor },
        borderRadius !== undefined && { borderRadius },
        borderWidth !== undefined && { borderWidth },
        borderColor !== undefined && { borderColor },
        justify !== undefined && { justifyContent: justify },
        align !== undefined && { alignItems: align },
        gap !== undefined && { gap }
    ]);

    return (
        <Animated.View style={[
            containerStyle,
            enabledShadow && {
                shadowColor: colors.text,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 4,
                elevation: 4
            },
            customStyle]}
        >
            {children}
        </Animated.View>
    )
}

export default Container