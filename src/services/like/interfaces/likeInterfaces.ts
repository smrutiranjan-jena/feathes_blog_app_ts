import { Types } from "mongoose"
export enum like_Status {
    ACTIVE = 1,
    DELETED = -1
}
export interface like_Get {
    _id: Types.ObjectId,
    post: Types.ObjectId,
    user: Types.ObjectId,
    createdAt: Date,
    updatedAt: Date,
    _v: number
}
export interface like_Find {
    total: number,
    limit: number,
    skip: number,
    data: Array<like_Get | null>
}