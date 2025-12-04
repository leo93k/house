import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type ModalType = "filter" | null;
export type FilterModalType = "transaction" | "structure" | "option" | null;

interface ModalState {
    visible: boolean;
    modalType: ModalType;
    filterType: FilterModalType;
    openModal: (type: ModalType, filterType?: FilterModalType) => void;
    closeModal: () => void;
}

export const useModalStore = create<ModalState>()(
    devtools(
        (set) => ({
            visible: false,
            modalType: null,
            filterType: null,
            openModal: (type, filterType = null) =>
                set(
                    { visible: true, modalType: type, filterType },
                    false,
                    "openModal"
                ),
            closeModal: () =>
                set(
                    { visible: false, modalType: null, filterType: null },
                    false,
                    "closeModal"
                ),
        }),
        { name: "ModalStore" }
    )
);

