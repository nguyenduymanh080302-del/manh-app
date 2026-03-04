import FormInput from '@/components/Form/FormInput'
import Container from '@/components/Wrapper/Container'
import { createRecord } from '@/database/query'
import { useLoading } from '@/providers/LoadingProvider'
import { useTheme } from '@react-navigation/native'
import React, { memo } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Modal, Pressable, Text, TouchableOpacity } from 'react-native'

interface Props {
    visible: boolean
    setVisible: (visible: boolean) => void
    debtId: number
    onSuccess?: () => void
}

interface RecordForm {
    note: string
    amount: string
}

const ModalAddDebtRecord = ({ visible, setVisible, debtId, onSuccess }: Props) => {
    const { colors } = useTheme()
    const { show, hide } = useLoading()

    const { control, handleSubmit, reset, formState: { errors } } = useForm<RecordForm>({
        defaultValues: {
            note: "",
            amount: "",
        },
    })

    const onSubmit = async (data: RecordForm) => {
        try {
            show()

            const amount = Number(data.amount.replace(/,/g, ''))
            if (!amount) throw new Error('Invalid amount')

            await createRecord(debtId, data.note, amount)

            reset()
            setVisible(false)
        } finally {
            onSuccess?.()
            hide()
        }
    }

    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={() => setVisible(false)}
        >
            <Container
                flex={1}
                justify="center"
                align="center"
                customStyle={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
            >
                <Container
                    enabledShadow
                    backgroundColor={colors.background}
                    padding={16}
                    gap={16}
                    customStyle={{ width: '90%', borderRadius: 12 }}
                >
                    <Text style={{ fontSize: 18, fontWeight: '600', color: colors.text }}>
                        Add new record
                    </Text>

                    {/* Note */}
                    <Controller
                        control={control}
                        name="note"
                        render={({ field: { onChange, value } }) => (
                            <FormInput
                                label="Note (optional)"
                                value={value}
                                onChangeText={onChange}
                                placeholder="Enter note name..."
                                textError={errors.note?.message}
                            />
                        )}
                    />

                    {/* Amount */}
                    <Controller
                        control={control}
                        name="amount"
                        rules={{ required: 'Amount is required' }}
                        render={({ field: { onChange, value } }) => (
                            <FormInput
                                keyboardType='phone-pad'
                                label="Amount"
                                required
                                value={value}
                                regex={/^-?[0-9,]*$/}
                                transform={(text) => {
                                    // check negative
                                    const isNegative = text.startsWith('-')

                                    // remove everything except number
                                    const raw = text.replace(/[^0-9]/g, '')

                                    if (!raw) return isNegative ? '-' : ''

                                    const formatted = raw.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

                                    return isNegative ? `-${formatted}` : formatted
                                }}
                                onChangeText={onChange}
                                placeholder="Enter amount..."
                                textError={errors.amount?.message}
                            />
                        )}
                    />

                    {/* Actions */}
                    <Container direction="row" justify="flex-end" gap={16}>
                        <TouchableOpacity onPress={() => setVisible(false)}>
                            <Text style={{ color: colors.notification }}>Cancel</Text>
                        </TouchableOpacity>

                        <Pressable onPress={handleSubmit(onSubmit)}>
                            <Text style={{ color: colors.primary, fontWeight: '600' }}>
                                Save
                            </Text>
                        </Pressable>
                    </Container>
                </Container>
            </Container>
        </Modal>
    )
}

export default memo(ModalAddDebtRecord)