import { ObjectId } from "mongoose"

export interface ProductData {
	_id?: ObjectId,
	ProductName:string,
	ProductImage: string,
	ProductDesctription:string,
	ProductQuantity:number,
	ProductPrice: number,
	__v?: number
}

export interface responseType{
    status: 'ok' | 'error',
    message: string,
    token?: string,
    data?:  ProductData[],
	
}