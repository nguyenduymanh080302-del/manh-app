import { MaterialIcons } from "@expo/vector-icons";
import { ComponentProps } from "react";
import { StyleProp } from "react-native";

export type MaterialIconsIconName = ComponentProps<typeof MaterialIcons>["name"];

export function IconMaterialIcons({
    name,
    size = 24,
    color,
    style,
}: {
    name: MaterialIconsIconName;
    size?: number;
    color: string;
    style?: StyleProp<any>;
}) {

    return (
        <MaterialIcons
            name={name}
            size={size}
            color={color}
            style={style}
        />
    );
}
