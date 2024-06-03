// Discount Type Enum
type DiscountType = "Fixed" | "Percentage";

export type TCreateCouponForm = {
    code: string;
    uses: number;
    discountAmount: number;
    isActive: boolean;
    discountType: DiscountType;
    expiresAt: Date;
};
