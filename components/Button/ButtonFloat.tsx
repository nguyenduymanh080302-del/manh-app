import { useTheme } from '@react-navigation/native'
import React from 'react'
import { StyleProp, StyleSheet, TouchableOpacity } from 'react-native'
import { IconFontAwesome, IconName } from '../icons/IconFontAwesome'

interface Props {

    // icon should be React.Node Element - default to IconPlus
    icon?: IconName,

    // icon width and height, affects only when icon is NOT provided
    iconSize?: number

    // button background color - default to primary color
    backgroundColor?: string

    // button width and height - default to 48. Should > icon size (cuz it wraps icon)
    buttonWidth?: number
    buttonHeight?: number

    // button position - default to bottom right 16
    top?: number
    bottom?: number
    right?: number
    left?: number

    // customize style button
    styleButton?: StyleProp<any>

    // customize style icon, affects only when icon is NOT provided
    styleIcon?: StyleProp<any>

    // onPress event handler
    onPress?: () => void
}

const ButtonFloat = ({ icon = "plus", backgroundColor, iconSize = 32, buttonWidth = 48, buttonHeight = 48, bottom = 24, right = 16, top, left, onPress }: Props) => {

    const { colors } = useTheme()

    return (
        <TouchableOpacity
            style={[
                styles.container,
                {
                    width: buttonWidth, height: buttonHeight,
                    bottom, right, top, left,
                    backgroundColor: backgroundColor || colors.primary
                }]}
            onPress={onPress}
            activeOpacity={0.75}
        >
            {icon &&
                <IconFontAwesome name={icon} color={"#FFFFFF"} size={iconSize} />
            }
        </TouchableOpacity>
    )
}

export default React.memo(ButtonFloat)

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        borderRadius: "50%",
        alignItems: 'center',
        justifyContent: 'center',

        shadowColor: "#292929",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.25,
        shadowRadius: 4,

        elevation: 4,
    },
})
