export interface IProduct {
    id: string;
    name: string;
    groupProduct?: string;
    category: string;
    description: string;
    color?: string;
    amount: number;
    price: number;
    donviSanPham?: string;
    nhaCungCap: string;
    thoiGianBaoHanh?: number;
    create_time?: string;
    hasExpiryDate: boolean;
}

export enum ProductModificationStatus {
    None = 0,
    Create = 1,
    Edit = 2
}