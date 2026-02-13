import { useTheme } from '@react-navigation/native'
import React from 'react'
import Animated from 'react-native-reanimated'
import Container from '../Wrapper/Container'

const DebtCard = () => {

    const { colors } = useTheme()

    return (
        <Container enabledShadow={true} backgroundColor={colors.card} borderRadius={16} padding={12} direction='column' gap={12}>
            <Container direction='row' justify='space-between' align='center'>
                <Animated.Text style={{ color: colors.text, fontSize: 18, fontWeight: "500" }}>Chủ nợ: Bà</Animated.Text>
                <Animated.Text style={{ color: colors.text, fontSize: 18, fontWeight: "600" }}>Dư nợ: 100.000.000 đ</Animated.Text>
            </Container>
            <Animated.Text style={{ color: colors.text, fontSize: 16 }}>Cập nhật lúc: 8:30 - 20/2/2026</Animated.Text>
        </Container>
    )
}

export default DebtCard