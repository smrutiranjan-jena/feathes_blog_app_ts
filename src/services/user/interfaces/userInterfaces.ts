import { Types } from "mongoose"
export enum User_Status {
    ACTIVE = 1,
    DELETED = -1
}
export interface User_Get {
    _id: Types.ObjectId
    username: string,
    email: string,
    password: string,
    blogCount: number,
    followingCount: number,
    invitationCount: number,
    followersCount: number,
    status: number,
    createdAt: Date,
    updatedAt: Date,
    _v: number

}
export interface User_Find {
    total: number,
    limit: number,
    skip: number,
    data: Array<User_Get | null>
}