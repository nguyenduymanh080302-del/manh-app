import ButtonFloat from '@/components/Button/ButtonFloat';
import DebtCard from '@/components/Card/DebtCard';
import { IconMaterialIcons } from '@/components/icons/IconMaterialIcons';
import Container from '@/components/Wrapper/Container';
import { getDebts } from '@/database/query';
import { useLoading } from '@/providers/LoadingProvider';
import { Header } from '@react-navigation/elements';
import { useFocusEffect, useTheme } from '@react-navigation/native';
import { router } from 'expo-router';
import { useCallback, useState } from 'react';
import { FlatList } from 'react-native';

export default function Debt() {


    const [debts, setDebts] = useState<Debt[]>([]);
    const { show, hide } = useLoading()
    const { colors } = useTheme()

    const loadDebts = async () => {
        try {
            show()
            const data = await getDebts();
            setDebts(data as Debt[]);
            console.log("Debts loaded:", data);
        } catch (error) {
            console.error("❌ Load debts failed:", error);
        } finally {
            hide()
        }
    };

    useFocusEffect(
        useCallback(() => {
            loadDebts() // chỉ chạy lần đầu / khi app cold start
        }, [])
    )

    const renderItem = useCallback(({ item }: { item: Debt }) => {
        return (
            <DebtCard item={item} />
        );
    }, [])

    const ItemSeparator = () => <Container flex={0} customStyle={{ height: 16 }} />;

    const toDebtUpsert = () => {
        router.push('/debt/upsert')
    }

    return (
        <Container flex={1}>
            <Header
                title='Debt'
                headerRight={() => <IconMaterialIcons name='qr-code-scanner' size={28} color={colors.text} style={{ marginRight: 16 }} />}
            />
            <FlatList
                data={debts} // Replace with actual debt data
                keyExtractor={(item) => item.name.toString()}
                renderItem={renderItem}
                ItemSeparatorComponent={ItemSeparator}
                contentContainerStyle={{ paddingVertical: 24, paddingHorizontal: 16 }}
                scrollEnabled={true}
            />
            <ButtonFloat onPress={toDebtUpsert} />
        </Container>
    );
}