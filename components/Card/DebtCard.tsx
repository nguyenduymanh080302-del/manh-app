import { useTheme } from '@react-navigation/native'
import React from 'react'
import { StyleSheet } from 'react-native'
import Animated from 'react-native-reanimated'
import Container from '../Wrapper/Container'

const DebtCard = () => {

    const { colors } = useTheme()

    return (
        <Container backgroundColor={colors.card} borderRadius={16} padding={12} direction='column' gap={12}>
            <Container direction='row' justify='space-between' align='center'>
                <Animated.Text style={{ color: colors.text, fontSize: 18 }}>Chủ nợ: Bà</Animated.Text>
                <Animated.Text style={{ color: colors.text, fontSize: 16 }}>Dư nợ: 100.000.000 đ</Animated.Text>
            </Container>
            <Container direction='row' align='center' gap={8}>
                <Animated.Text style={{ color: colors.text }}>Cập nhật lúc</Animated.Text>
                <Animated.Text style={{ color: colors.text }}>8h30 - 20/2/2026</Animated.Text>
            </Container>
        </Container>
    )
}

export default DebtCard

const styles = StyleSheet.create({})