/* eslint-disable @typescript-eslint/no-explicit-any */

export interface DeleteModalProps<T> {
    onCancel: () => void;
    isModalOpen: boolean;
    isLoading: boolean;
    title: string;
    deletePayload: T | null;
    deleteActionMethod: any;
    setIsModalOpen: React.Dispatch<
        React.SetStateAction<{
            data: T | null;
            open: boolean;
        }>
    >;
  
}