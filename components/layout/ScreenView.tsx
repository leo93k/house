/**
 * 모든 스크린에 공통으로 사용하는 루트 View 컴포넌트
 * 배경색과 기본 스타일을 제공합니다.
 */

import { useColorScheme } from "@/hooks/use-color-scheme";
import { StyleSheet, View, ViewProps } from "react-native";

export type ScreenViewProps = ViewProps & {
    /**
     * 배경색 커스터마이징 (선택적)
     * 제공하지 않으면 다크모드에 따라 자동으로 설정됩니다.
     */
    backgroundColor?: string;
};

/**
 * 모든 스크린의 루트 컨테이너로 사용하는 View 컴포넌트
 * - 기본 배경색: 라이트모드(#fff), 다크모드(#000)
 * - flex: 1이 기본 적용됨
 */
const ScreenView = ({
    style,
    backgroundColor,
    children,
    ...props
}: ScreenViewProps) => {
    const colorScheme = useColorScheme();
    const defaultBackgroundColor =
        backgroundColor || (colorScheme === "dark" ? "#000" : "#fff");

    return (
        <View
            style={[
                styles.container,
                { backgroundColor: defaultBackgroundColor },
                style,
            ]}
            {...props}
        >
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default ScreenView;
