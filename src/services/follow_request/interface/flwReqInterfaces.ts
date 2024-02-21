import { Types } from "mongoose"
export enum Follow_Request_status {
    PENDING = 1,
    ACCEPTED = 2,
    REJECTED = -1,
    UNFOLLOW = 3
}
export interface Follow_Request_Get {
    _id: Types.ObjectId,
    sender: Types.ObjectId,
    reciever: Types.ObjectId,
    status: number,
    createdAt: Date,
    updatedAt: Date,
    _v: number
}
export interface Follow_Request_Find {
    total: number,
    limit: number,
    skip: number,
    data: Array<Follow_Request_Get | null>
}