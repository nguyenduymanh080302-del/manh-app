import { FontAwesome } from "@expo/vector-icons";
import { ComponentProps } from "react";
import { StyleProp } from "react-native";

export type FontAwesomeIconName = ComponentProps<typeof FontAwesome>["name"];

export function IconFontAwesome({
    name,
    size = 24,
    color,
    style,
}: {
    name: FontAwesomeIconName;
    size?: number;
    color: string;
    style?: StyleProp<any>;
}) {

    return (
        <FontAwesome
            name={name}
            size={size}
            color={color}
            style={style}
        />
    );
}
