import React, { ReactNode, useEffect, useMemo, useRef, useState } from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, {
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated'

interface SwipableRowProps {
    children: ReactNode
    extendChildren?: ReactNode
    isSwiped?: boolean
    setIsSwiped?: (isSwiped: boolean) => void
    containerStyle?: StyleProp<ViewStyle>
    gap?: number
}

const SWIPE_THRESHOLD = -40
const GAP = 8
const DURATION = 220

const SwipableRow = ({
    children,
    extendChildren,
    isSwiped = false,
    setIsSwiped,
    containerStyle,
    gap = GAP,
}: SwipableRowProps) => {
    /** measure action width */
    const actionWidthRef = useRef(0)
    const [measured, setMeasured] = useState(false)

    /** shared values */
    const widthSV = useSharedValue(0)
    const gapSV = useSharedValue(0)

    /** sync animation when state changes */
    useEffect(() => {
        if (!measured) return

        widthSV.value = withTiming(
            isSwiped ? actionWidthRef.current : 0,
            { duration: DURATION }
        )

        gapSV.value = withTiming(
            isSwiped ? gap : 0,
            { duration: DURATION }
        )
    }, [isSwiped, measured, gap])

    /** animated styles */
    const actionStyle = useAnimatedStyle(() => ({
        width: widthSV.value,
        marginLeft: gapSV.value,
    }))

    /** gesture */
    const panGesture = useMemo(() => {
        if (!setIsSwiped) return Gesture.Native()

        return Gesture.Pan()
            .activeOffsetX([-15, 15])
            .failOffsetY([-10, 10])
            .onEnd(e => {
                runOnJS(setIsSwiped)(e.translationX < SWIPE_THRESHOLD)
            })
    }, [setIsSwiped])

    return (
        <GestureDetector gesture={panGesture}>
            <View style={[styles.container, containerStyle, { gap: isSwiped ? GAP : 0 }]}>
                {/* MAIN CONTENT */}
                <View style={styles.content}>
                    {children}
                </View>

                <Animated.View style={[styles.actions, actionStyle, { opacity: isSwiped ? 1 : 0 }]}>
                    {extendChildren}
                </Animated.View>

                {/* HIDDEN MEASURE */}
                {!measured && (
                    <View
                        style={styles.hidden}
                        onLayout={e => {
                            actionWidthRef.current = e.nativeEvent.layout.width
                            setMeasured(true)
                        }}
                    >
                        {extendChildren}
                    </View>
                )}
            </View>
        </GestureDetector>
    )
}

export default React.memo(SwipableRow)

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'stretch',
    },
    content: {
        flex: 1,
    },
    actions: {
        alignItems: 'center',
        alignSelf: 'stretch',
    },
    hidden: {
        position: 'absolute',
        opacity: 0,
        zIndex: -1,
    },
})