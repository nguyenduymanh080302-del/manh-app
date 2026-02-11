import DebtCard from '@/components/Card/DebtCard';
import { IconSymbol } from '@/components/icons/icon-symbol';
import Container from '@/components/Wrapper/Container';
import { colors } from '@/constants/_colors';
import { Header } from '@react-navigation/elements';
import { useCallback } from 'react';
import { StyleSheet } from 'react-native';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';

export default function DebtScreen() {
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

  const ItemSeparator = () => <Container flex={0} customStyle={{ height: 12 }} />;

  return (
    <Container flex={1}>
      <Header
        title='Debt'
        headerRight={() => <IconSymbol name='qr-code-scanner' size={28} color={colors.white} style={{ marginRight: 16 }} />}
      />
      <Animated.FlatList
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} // Replace with actual debt data
        keyExtractor={(item) => item.toString()}
        renderItem={renderItem}
        ItemSeparatorComponent={ItemSeparator}
        contentContainerStyle={{ padding: 16 }}
        scrollEnabled={true}
        onScroll={onScroll}
      />
    </Container>
  );
}

const styles = StyleSheet.create({
});
