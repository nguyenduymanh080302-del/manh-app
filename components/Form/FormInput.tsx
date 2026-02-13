import { Colors } from '@/constants/theme';
import { useTheme } from '@react-navigation/native';
import React, { useRef } from 'react';
import { KeyboardTypeOptions, StyleProp, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface FormInputTextProps {
    // input value
    value: string;
    onChangeText?: any;

    // required string - red '*' display in top label
    required?: boolean;

    // text, number, ...
    keyboardType?: KeyboardTypeOptions;

    // top label
    label?: string;

    // callback when input focusing
    onFocus?: any;
    readOnly?: boolean;

    regex?: RegExp;
    transform?: (text: string) => string;

    // custom style
    style?: StyleProp<any>;
    inputStyle?: StyleProp<any>;
    labelStyle?: StyleProp<any>;

    after?: any;
    afterPress?: any;
    disable?: boolean;
    textError?: string;
    placeholder?: string;

    multiline?: boolean;
    numberOfLines?: number;
}
const FormInput = ({
    value,
    required,
    keyboardType,
    label,
    onChangeText,
    onFocus,
    readOnly,
    style,
    inputStyle,
    regex,
    transform,
    after,
    afterPress,
    disable,
    textError,
    placeholder,
    multiline,
    numberOfLines,
    labelStyle
}: FormInputTextProps) => {

    const { colors } = useTheme()
    const inputRef = useRef<any>(null);

    return (
        <View>
            <TouchableOpacity
                activeOpacity={1}
                disabled={readOnly}
                onPress={() => inputRef.current.focus()}
                style={[
                    style,
                    { borderRadius: 12, borderColor: textError ? Colors.dark.red : Colors.dark.lightGray },
                    { paddingHorizontal: 12, paddingVertical: 8, backgroundColor: colors.card, gap: 4 },
                    disable && {
                        backgroundColor: Colors.dark.lightGray,
                    },
                ]}
            >
                {(label || after) &&
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        {label && (
                            <View style={[{ flexDirection: 'row', alignItems: 'center', gap: 4 }]}>
                                <Text style={[{ color: colors.text, fontWeight: "600" }, labelStyle]}>
                                    {label}
                                </Text>
                                {required && <Text style={{ color: Colors.dark.red }}>*</Text>}
                            </View>
                        )}
                        {after && <TouchableOpacity onPress={afterPress}>{after}</TouchableOpacity>}
                    </View>
                }
                <TextInput
                    ref={inputRef}
                    value={value}
                    onChangeText={(text) => {
                        let newText = text;

                        // apply regex filter
                        if (regex) {
                            if (!regex.test(text)) {
                                return;
                            }
                        }

                        // apply transform (optional)
                        if (transform) {
                            newText = transform(text);
                        }

                        onChangeText?.(newText);
                    }}
                    placeholder={placeholder}
                    placeholderTextColor={Colors.dark.lightGray}
                    keyboardType={keyboardType || 'default'}
                    onFocus={onFocus}
                    editable={!disable}
                    readOnly={readOnly}
                    multiline={multiline}
                    numberOfLines={numberOfLines}
                    style={[
                        { fontSize: 16, fontWeight: "500" },
                        { borderColor: textError ? Colors.dark.red : Colors.dark.lightGray },
                        { color: colors.text, flex: 1, padding: 0 },
                        inputStyle,
                    ]}
                />

            </TouchableOpacity>
            {textError && (
                <Text style={{ color: Colors.dark.red, fontSize: 14, fontWeight: '500' }}>{textError}</Text>
            )}
        </View>
    );
};

export default React.memo(FormInput);