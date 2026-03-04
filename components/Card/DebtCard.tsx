import { Colors } from '@/constants/theme'
import { formatMoney } from '@/utils/helper'
import { useTheme } from '@react-navigation/native'
import dayjs from 'dayjs'
import { router } from 'expo-router'
import React from 'react'
import { Text } from 'react-native'
import Container from '../Wrapper/Container'
import SwipableRow from '../Wrapper/SwipableRow'
import ActionCard from './ActionCard'

interface Props {
    item: Debt
}

const DebtCard = ({ item }: Props) => {

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
                    onPressEdit={() => {
                        router.push({
                            pathname: '/debt/upsert',
                            params: {
                                id: item.id,
                                name: item.name,
                                total: item.total.toString(),
                            },
                        })
                    }}
                    onPressDelete={() => console.log("Delete pressed")}
                />
            }
        >
            <Container
                onPressContainer={() => router.push({
                    pathname: '/debt/detail',
                    params: {
                        id: item.id,
                        name: item?.name,
                        total: item?.total?.toString(),
                        created_at: item?.created_at?.toString(),
                    }
                })}
                enabledShadow={true} backgroundColor={colors.card} borderRadius={16} padding={12} direction='column' gap={12}>
                <Container direction='row' justify='space-between' align='center'>
                    <Text style={{ color: colors.text, fontSize: 16, fontWeight: "500" }}>Chủ nợ: {item.name}</Text>
                    <Text style={{ color: colors.text, fontSize: 16, fontWeight: "600" }}>Dư nợ: {formatMoney(Number(item.total))} đ</Text>
                </Container>
                <Text style={{ color: colors.text, fontSize: 14 }}>Cập nhật lúc: {dayjs(item.created_at).format('H:mm - D/M/YYYY')}</Text>
            </Container>
        </SwipableRow >

    )
}

export default DebtCard