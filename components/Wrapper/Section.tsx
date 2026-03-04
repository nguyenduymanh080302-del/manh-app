import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Text } from 'react-native';
import Container from './Container';

interface Props {
    children?: React.ReactNode;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    title?: string;
}

const Section = ({ children, leftIcon, rightIcon, title }: Props) => {

    const { colors } = useTheme()

    return (
        <Container backgroundColor={colors.card} direction='column' padding={16} gap={16}>
            <Container direction='row' align='center' gap={8}>
                {leftIcon}
                <Text style={{ flex: 1, fontSize: 18, color: colors.text, fontWeight: '600' }}>{title}</Text>
                {rightIcon}
            </Container>
            {children}
        </Container>
    )
}

export default Section  