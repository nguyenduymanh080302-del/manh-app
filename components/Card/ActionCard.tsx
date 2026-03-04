import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import Container from '../Wrapper/Container';

interface Props {
    onPressEdit?: () => void;
    onPressDelete?: () => void;
    editIconSize?: number;
    editIconColor?: string;
    deleteIconColor?: string;
}

const ActionCard = ({ onPressEdit, onPressDelete, editIconSize, editIconColor, deleteIconColor }: Props) => {

    const { colors } = useTheme();

    return (
        <Container enabledShadow={true} backgroundColor={colors.card} borderRadius={16} padding={12} direction='column' gap={12}>
            {onPressEdit
                &&
                <TouchableOpacity
                    onPress={onPressEdit}
                >
                    <MaterialIcons name="edit" size={editIconSize || 20} color={editIconColor || "black"} />
                </TouchableOpacity>
            }
            {onPressDelete && (
                <TouchableOpacity
                    onPress={onPressDelete}
                >
                    <MaterialIcons name="delete" size={editIconSize || 20} color={deleteIconColor || "red"} />
                </TouchableOpacity>
            )}
        </Container>
    )
}

export default ActionCard