import { Slider } from "@miblanchard/react-native-slider";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import type { PriceRange } from "@/store/filterStore";

interface PriceRangeSliderProps {
    title: string;
    value: PriceRange;
    onChange: (range: PriceRange) => void;
    min: number;
    max: number;
    step?: number;
    formatValue: (value: number) => string;
    markers?: { value: number; label: string }[];
}

export function PriceRangeSlider({
    title,
    value,
    onChange,
    min,
    max,
    step = 1000000, // 기본값: 100만원 단위
    formatValue,
    markers = [],
}: PriceRangeSliderProps) {
    const [tooltipValue, setTooltipValue] = useState<number | null>(null);

    const handleValueChange = (values: number | number[]) => {
        if (!Array.isArray(values)) {
            // 단일 값인 경우 (범위 슬라이더가 아닌 경우)
            onChange({ min: values, max: values });
            setTooltipValue(values);
            return;
        }

        // 배열인 경우: 값들을 정렬하여 최소값과 최대값 보장
        const sortedValues = [...values].sort((a, b) => a - b);
        const newMin = Math.max(min, Math.min(max, sortedValues[0]));
        const newMax = Math.max(min, Math.min(max, sortedValues[1] || sortedValues[0]));

        // 최소값이 최대값을 넘지 않도록 보장
        const finalMin = Math.min(newMin, newMax);
        const finalMax = Math.max(newMin, newMax);

        onChange({ min: finalMin, max: finalMax });
        
        // 현재 드래그 중인 핸들에 따라 툴팁 표시
        // 값이 변경된 방향을 추적하기 어려우므로, 항상 최대값을 표시
        setTooltipValue(finalMax);
    };

    const handleSlidingComplete = () => {
        // 슬라이딩이 끝나면 툴팁을 숨김
        setTimeout(() => setTooltipValue(null), 500);
    };

    // 툴팁 위치 계산 (오른쪽 핸들 위)
    const tooltipPosition = tooltipValue !== null
        ? ((tooltipValue - min) / (max - min)) * 100
        : ((value.max - min) / (max - min)) * 100;

    return (
        <View style={styles.container}>
            <View style={styles.sliderWrapper}>
                {/* 툴팁 */}
                {tooltipValue !== null && (
                    <View
                        style={[
                            styles.tooltip,
                            {
                                left: `${Math.max(0, Math.min(100, tooltipPosition))}%`,
                                marginLeft: -40,
                            },
                        ]}
                    >
                        <View style={styles.tooltipArrow} />
                        <Text style={styles.tooltipText}>
                            {formatValue(tooltipValue)}까지
                        </Text>
                    </View>
                )}

                {/* 슬라이더 */}
                <Slider
                    value={[Math.min(value.min, value.max), Math.max(value.min, value.max)]}
                    onValueChange={handleValueChange}
                    onSlidingComplete={handleSlidingComplete}
                    minimumValue={min}
                    maximumValue={max}
                    step={step}
                    trackStyle={styles.track}
                    thumbStyle={styles.thumb}
                    minimumTrackTintColor="#424242" // 선택된 범위 (어두운 회색)
                    maximumTrackTintColor="#e0e0e0" // 선택되지 않은 범위 (밝은 회색)
                    animateTransitions
                    animationType="spring"
                    allowTouchTrack={true}
                />

                {/* 마커와 레이블 */}
                <View style={styles.markersContainer}>
                    {/* 최소 */}
                    <View style={[styles.marker, { left: 0 }]}>
                        <View style={styles.markerLine} />
                        <Text style={styles.markerLabel}>최소</Text>
                    </View>

                    {/* 커스텀 마커들 */}
                    {markers.map((marker, index) => {
                        const position =
                            ((marker.value - min) / (max - min)) * 100;
                        return (
                            <View
                                key={index}
                                style={[
                                    styles.marker,
                                    {
                                        left: `${Math.max(0, Math.min(100, position))}%`,
                                    },
                                ]}
                            >
                                <View style={styles.markerLine} />
                                <Text style={styles.markerLabel}>
                                    {marker.label}
                                </Text>
                            </View>
                        );
                    })}

                    {/* 최대 */}
                    <View style={[styles.marker, { right: 0 }]}>
                        <View style={styles.markerLine} />
                        <Text style={styles.markerLabel}>최대</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 8,
    },
    sliderWrapper: {
        position: "relative",
        paddingVertical: 20,
    },
    tooltip: {
        position: "absolute",
        top: -40,
        backgroundColor: "#f5f5f5",
        borderWidth: 1,
        borderColor: "#e0e0e0",
        borderRadius: 6,
        paddingHorizontal: 8,
        paddingVertical: 4,
        minWidth: 80,
        alignItems: "center",
        zIndex: 10,
    },
    tooltipArrow: {
        position: "absolute",
        bottom: -6,
        left: "50%",
        marginLeft: -6,
        width: 0,
        height: 0,
        borderLeftWidth: 6,
        borderRightWidth: 6,
        borderTopWidth: 6,
        borderLeftColor: "transparent",
        borderRightColor: "transparent",
        borderTopColor: "#e0e0e0",
    },
    tooltipText: {
        fontSize: 12,
        color: "#333",
        fontWeight: "500",
    },
    track: {
        height: 4,
        borderRadius: 2,
    },
    thumb: {
        width: 20,
        height: 20,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#bdbdbd",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 3,
    },
    markersContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 12,
        position: "relative",
        paddingHorizontal: 0,
    },
    marker: {
        position: "absolute",
        alignItems: "center",
    },
    markerLine: {
        width: 1,
        height: 8,
        backgroundColor: "#bdbdbd",
        marginBottom: 4,
    },
    markerLabel: {
        fontSize: 11,
        color: "#666",
    },
});

