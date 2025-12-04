import { FilterModal } from "@/feature/house/components";
import { useModalStore } from "@/store";
import { View } from "react-native";

/**
 * 전역 모달 컴포넌트
 * 하나의 모달 인스턴스를 전역에서 관리하고, 내용만 동적으로 변경
 */
export function GlobalModal() {
    const { visible, modalType, filterType, closeModal } = useModalStore();

    // 모달이 보이지 않으면 렌더링하지 않음
    if (!visible || !modalType) {
        return null;
    }

    // 모달 타입에 따라 다른 내용 렌더링
    const renderModalContent = () => {
        switch (modalType) {
            case "filter":
                return (
                    <FilterModal
                        visible={visible}
                        onClose={closeModal}
                        filterType={filterType}
                    />
                );
            default:
                return null;
        }
    };

    return <View pointerEvents="box-none">{renderModalContent()}</View>;
}

