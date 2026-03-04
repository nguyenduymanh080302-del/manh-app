import { Colors } from '@/constants/theme'
import { formatMoney } from '@/utils/helper'
import { useTheme } from '@react-navigation/native'
import dayjs from 'dayjs'
import React from 'react'
import { Text } from 'react-native'
import Container from '../Wrapper/Container'
import SwipableRow from '../Wrapper/SwipableRow'
import ActionCard from './ActionCard'

interface Props {
    item: DebtRecord
}

const RecordCard = ({ item }: Props) => {

    const { colors } = useTheme()
    const [isSwiped, setIsSwiped] = React.useState(false)

    return (
        <SwipableRow
            gap={0}
            containerStyle={{ borderTopRightRadius: 16, borderBottomRightRadius: 16 }}
            isSwiped={isSwiped}
            setIsSwiped={setIsSwiped}
            extendChildren={
                <ActionCard
                    editIconColor={Colors.dark.yellow}
                    onPressDelete={() => console.log("Delete pressed")}
                />
            }
        >
            <Container backgroundColor={colors.card} borderColor={colors.primary} borderWidth={1} borderRadius={16} padding={12} direction='column' gap={12}>
                <Container direction='row' justify='space-between' align='center'>
                    <Text style={{ color: colors.text, fontSize: 16, fontWeight: "500" }}>Ghi chú: {item.note || "Chưa cập nhật"}</Text>
                    <Text style={{ color: Number(item.amount) > 0 ? Colors.dark.green : Colors.dark.red, fontSize: 16, fontWeight: "600" }}>{formatMoney(Number(item.amount))} đ</Text>
                </Container>
                <Text style={{ color: colors.text, fontSize: 14 }}>Cập nhật lúc: {dayjs(item.datetime).format('H:mm - D/M/YYYY')}</Text>
            </Container>
        </SwipableRow >

    )
}

export default RecordCard