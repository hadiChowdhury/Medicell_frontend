export interface Product {
    Id: number;
    Name: string;
    Description: string;
    Price: number;
    ImageUrl: string;
    Quantity: number;
    IsAvailable: boolean;
    CategoryId: number;
    CompanyId: number;
}

export interface Orders{
    Id: number;
    OderDate: string;
    Total:number;
    OrderedBy: number;
    UserFirstName: string;
}
export interface Users{
    Id: number;
    FirstName: string;
    LastName: string;
    Gender: number;
    DateOfBirth: string;
    Email:string;
    Phone: string;
    Address: string;
    Role: string;
}
export type Props = {
    params: {
        id: string;
    }
};