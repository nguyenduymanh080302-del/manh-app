import FormInput from '@/components/Form/FormInput'
import Container from '@/components/Wrapper/Container'
import { Colors } from '@/constants/theme'
import { createDebt } from '@/database/query'
import { useLoading } from '@/providers/LoadingProvider'
import { Header } from '@react-navigation/elements'
import { useTheme } from '@react-navigation/native'
import { router } from 'expo-router'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Pressable, Text } from 'react-native'
import Animated from 'react-native-reanimated'

interface DebtUpsertProps {
    name: string;
    total: number | string;
}

const DebtUpsert = () => {

    const { show, hide } = useLoading()
    const { colors } = useTheme()
    const { control, handleSubmit, formState: { errors } } = useForm<DebtUpsertProps>({
        defaultValues: {
            name: "",
            total: "",
        }
    });

    const onSubmitUpsert = async (data: DebtUpsertProps) => {
        try {
            show();
            const parsedTotal = typeof data.total === "string" ? Number(data.total.replace(/,/g, "")) : Number(data.total);
            await createDebt(data.name, parsedTotal);
            console.log("Debt created successfully");
            router.back();
        } catch (error) {
            console.error("Error parsing total:", error);
        } finally {
            hide();
        }
    };

    return (
        <Container flex={1}>
            <Header
                title='Create Debt'

            />
            <Animated.ScrollView
                contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 24, gap: 16 }}
            >
                <Controller
                    control={control}
                    name="name"
                    rules={{ required: "Owner name is required" }}
                    render={({ field: { onChange, value } }) => (
                        <FormInput
                            label="Name"
                            value={value}
                            onChangeText={onChange}
                            required={true}
                            placeholder='Enter owner name ...'
                            textError={errors.name?.message}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="total"
                    render={({ field: { onChange, value } }) => (
                        <FormInput
                            label={"Default Amount"}
                            value={value.toString()}
                            regex={/^[0-9,]*$/}
                            transform={(text) => {
                                const raw = text.replace(/[^0-9]/g, "");
                                return raw.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            }}
                            onChangeText={onChange}
                            placeholder='Enter default amount ...'
                        />
                    )}
                />
                <Pressable
                    style={{ backgroundColor: colors.primary, borderRadius: 12, paddingVertical: 12, alignItems: 'center' }}
                    onPress={handleSubmit(onSubmitUpsert)}
                >
                    <Text style={{ color: Colors.dark.white, fontSize: 16, fontWeight: '600' }}>Save</Text>
                </Pressable>
            </Animated.ScrollView>
        </Container>
    )
}

export default DebtUpsert
