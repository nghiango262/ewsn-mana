export type LoginDto = {
    username: string
    password: string
    platform: string
    devicecode: string
}

export type CreateNotifyDto = {
    title: string,
    description: string,
    type: string,
    spec: any,
};

export type CreateNotifyTaskDto = {
    title: string,
    description: string,
    manage_user: string,
    task_for: string,
    deadline: string,
};

export type User = {
    userId: string,
    username: string,
    password: string,
    display_user: string,
    accessToken: string,
    fcmToken:string,
    avatarLink: string,
    isActive: boolean,
    isNotFirst: boolean,
    isNotConnected?: boolean
};


export type TaskStatusDto = {
	"status": string,
	"username": string
}

export type NhaKhoaDeclareDto = {
    id?: number
    name: string;
    image?: string
    hotline?: string
    address?: string;
    create_time?: string;
}

export type ProductDeclareDto = {
    id?: string
    name?: string
    image?: string
    description?: string
    groupProduct?: string
    color?: string
    price?: number,
    donviSanPham?: string,
    nhaCungCap?: string
    thoiGianBaoHanh?: number 
    create_time?: string
    viTri?: Array<string>
}


export type BaoHanhDeclareDto = {
    nhakhoa: any,
    
    //Benh Nhan Info
    tenbenhnhan: string,
    ngaysinhbn: string,
    sdtbenhnhan: string,
    
    tenbacsi: string,
    sdtbacsi: string,
    listSanPham: Array<RangDeclareDto> 
}

export type RangDeclareDto = {
    id: string,
    viTriRang: Array<string>,
    soLuong?: number
}

export type CreateNotify = {
    title: string,
    description: string,
    type: string,
    spec: any,
};

export type CreateNotifyTask = {
    title: string,
    description: string,
    manage_user: string,
    task_for: string,
    deadline: string,
};