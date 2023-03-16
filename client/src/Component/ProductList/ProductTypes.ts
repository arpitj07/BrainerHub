import { ObjectId } from 'mongodb'

export interface ProductData {
	_id: ObjectId,
	ProductName:string,
	ProductImage: string,
	ProductDesctription:string,
	ProductQuantity:number,
	ProductPrice: number
}