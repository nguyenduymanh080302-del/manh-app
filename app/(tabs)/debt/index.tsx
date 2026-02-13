import ButtonFloat from '@/components/Button/ButtonFloat';
import DebtCard from '@/components/Card/DebtCard';
import { IconMaterialIcons } from '@/components/icons/IconMaterialIcons';
import Container from '@/components/Wrapper/Container';
import { Header } from '@react-navigation/elements';
import { useTheme } from '@react-navigation/native';
import { router } from 'expo-router';
import { useCallback } from 'react';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';

export default function Debt() {

    const { colors } = useTheme()

    const scrollY = useSharedValue(0);
    const onScroll = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollY.value = event.contentOffset.y;
        },
    });

    const renderItem = useCallback(({ item }: { item: any }) => {
        return (
            <DebtCard />
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
            <Animated.FlatList
                data={[1, 2, 3, 4]} // Replace with actual debt data
                keyExtractor={(item) => item.toString()}
                renderItem={renderItem}
                ItemSeparatorComponent={ItemSeparator}
                contentContainerStyle={{ paddingVertical: 24, paddingHorizontal: 16 }}
                scrollEnabled={true}
                onScroll={onScroll}
            />
            <ButtonFloat onPress={toDebtUpsert} />
        </Container>
    );
}