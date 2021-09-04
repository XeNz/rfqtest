export interface LockedBy {
    userId: number;
    avatar: string;
    fullName: string;
}

export interface RfqDto {
    rfqId: number;
    projectName: string;
    targetPrice: number;
    bestQuotePrice: number;
    supplierName: string;
    lockedBy?: LockedBy;
    lockedUntil?: Date;
}

export interface TextDto {
    id: number;
    title: string;
    text: string;
}