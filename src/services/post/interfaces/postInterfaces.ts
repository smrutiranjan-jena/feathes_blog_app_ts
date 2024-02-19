import { Types } from "mongoose"
export enum Post_Status {
    ACTIVE = 1,
    DELETED = -1
}
export interface Post_Get {
    _id: Types.ObjectId,
    user: Types.ObjectId,
    title: string,
    description: string,
    likeCount: number,
    commentCount: number,
    status: number,
    createdAt: Date,
    updatedAt: Date,
    _v: 0
}