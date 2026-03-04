import ButtonFloat from '@/components/Button/ButtonFloat';
import RecordCard from '@/components/Card/RecordCard';
import { IconFontAwesome } from '@/components/icons/IconFontAwesome';
import { IconMaterialIcons } from '@/components/icons/IconMaterialIcons';
import ModalAddDebtRecord from '@/components/Modal/ModalAddDebtRecord';
import Container from '@/components/Wrapper/Container';
import Section from '@/components/Wrapper/Section';
import { getDebtById, getRecordsByDebt } from '@/database/query';
import { useLoading } from '@/providers/LoadingProvider';
import { formatMoney } from '@/utils/helper';
import { Header } from '@react-navigation/elements';
import { useTheme } from '@react-navigation/native';
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { useCallback, useState } from 'react';
import { FlatList, Text, TouchableOpacity } from 'react-native';

export default function DebtDetail() {

    const { id } = useLocalSearchParams<{
        id: string
    }>()
    const [showModalAddRecord, setShowModalAddRecord] = useState(false)
    const { show, hide } = useLoading()
    const { colors } = useTheme()
    const [debt, setDebt] = useState<Debt | null>(null)
    const [record, setRecord] = useState<DebtRecord[]>([])

    const refresh = useCallback(() => {
        fetchDebt()
        fetchRecord()
    }, [])

    const fetchRecord = useCallback(async () => {
        try {
            show()
            const res = await getRecordsByDebt(Number(id))
            setRecord(res as DebtRecord[])
        } catch (error) {
            console.log('fetchRecord error: ', error)
        } finally {
            hide()
        }
    }, [id])

    const fetchDebt = useCallback(async () => {
        try {
            show()
            const res = await getDebtById(Number(id))
            setDebt(res as Debt)
        } catch (error) {
            console.log('fetchDebt error: ', error)

        }
        finally {
            hide()
        }
    }, [id])

    useFocusEffect(
        useCallback(() => {
            fetchDebt()
            fetchRecord() // chỉ chạy lần đầu / khi app cold start
        }, [])
    )

    const renderItem = useCallback(({ item }: { item: DebtRecord }) => {
        return (
            <RecordCard item={item} />
        );
    }, [])

    const ItemSeparator = () => <Container flex={0} customStyle={{ height: 16 }} />;

    return (
        <Container flex={1}>
            <Header
                title='Debt Detail'
                headerLeft={() => (
                    <TouchableOpacity onPress={() => router.back()} style={{ padding: 16 }}>
                        <IconFontAwesome name="arrow-left" size={20} color={colors.text} />
                    </TouchableOpacity>
                )}
                headerRight={() => <IconMaterialIcons name='qr-code-scanner' size={28} color={colors.text} style={{ marginRight: 16 }} />}
            />
            <Container direction='column' gap={12} paddingVertical={16}>
                <Section title="Debt Information" leftIcon={<IconFontAwesome name='caret-right' size={24} color={colors.primary} />} >
                    <Container direction='column' gap={4}>
                        <Container direction='row' gap={4} align='center' justify='space-between'>
                            <Text style={{ color: colors.text, fontSize: 16, fontWeight: "500" }}>Chủ nợ:</Text>
                            <Text style={{ color: colors.text, fontSize: 18, fontWeight: '600' }}>{debt?.name}</Text>
                        </Container>
                        <Container direction='row' gap={4} align='center' justify='space-between'>
                            <Text style={{ color: colors.text, fontSize: 16, fontWeight: "500" }}>Dư nợ:</Text>
                            <Text style={{ color: colors.text, fontSize: 18, fontWeight: '600' }}>{formatMoney(Number(debt?.total || 0))} đ</Text>
                        </Container>
                    </Container>
                </Section>
                <Section title="Record"
                    leftIcon={<IconFontAwesome name='caret-right' size={24} color={colors.primary} />}
                    rightIcon={<Container onPressContainer={() => setShowModalAddRecord(true)}><IconFontAwesome name='plus' size={20} color={colors.primary} /></Container>}
                >
                    <FlatList
                        data={record}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id.toString()}
                        ItemSeparatorComponent={ItemSeparator}
                    />
                </Section>
            </Container>
            <ModalAddDebtRecord visible={showModalAddRecord} setVisible={setShowModalAddRecord} debtId={Number(id)} onSuccess={refresh}
            />
            <ButtonFloat onPress={() => setShowModalAddRecord(true)} />
        </Container>
    );
}