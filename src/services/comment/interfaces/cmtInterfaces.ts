import { Types } from "mongoose"

export enum Comment_Status {
    ACTIVE = 1,
    DELETED = -1
}
export interface Comment_Get {
    user: Types.ObjectId,
    post: Types.ObjectId,
    comment: string,
    status: number,
    _id: Types.ObjectId,
    createdAt: Date,
    updatedAt: Date,
    _v: number
}
export interface Comment_Find {
    total: number,
    limit: number,
    skip: number,
    data: Array<Comment_Get | null>
}