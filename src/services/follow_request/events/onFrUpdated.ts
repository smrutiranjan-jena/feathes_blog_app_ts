import { Hook, HookContext } from "@feathersjs/feathers";
import { Follow_Request_Find, Follow_Request_Get, Follow_Request_status } from "../interface/flwReqInterfaces";
const onFrUpdated = async (result: Follow_Request_Get, context: HookContext) => {
    const { app } = context
    const { sender, reciever, status } = result
    // sender--------------------------------------------------------------------------------
    const followersCountSender = await app.service('follow-request')._find({
        query: {
            sender: sender,
            status: Follow_Request_status.ACCEPTED
        }
    }).then((res: Follow_Request_Find) => {
        return res.total
    })
    await app.service('user')._patch(sender, {
        followersCount: followersCountSender
    })

    const followingCountSender = await app.service('follow-request')._find({
        query: {
            sender: sender,
            status: Follow_Request_status.ACCEPTED || Follow_Request_status.PENDING || Follow_Request_status.REJECTED
        }
    }).then((res: Follow_Request_Find) => {
        return res.total
    })
    await app.service('user')._patch(sender, {
        followingCountSender
    })
    // reciever--------------------------------------------------------------------------------
    const followersCountReciever = await app.service('follow-request')._find({
        query: {
            reciever: reciever,
            status: Follow_Request_status.ACCEPTED
        }
    }).then((res: Follow_Request_Find) => {
        return res.total
    })
    await app.service('user')._patch(reciever, {
        followersCount: followersCountReciever
    })

    const followingCountReciever = await app.service('follow-request')._find({
        query: {
            reciever: reciever,
            status: Follow_Request_status.ACCEPTED || Follow_Request_status.PENDING || Follow_Request_status.REJECTED
        }
    }).then((res: Follow_Request_Find) => {
        return res.total
    })
    await app.service('user')._patch(reciever, {
        followingCountReciever
    })

    const invitationCount = await app.service('follow-request')._find({
        query: {
            reciever: reciever,
            status: Follow_Request_status.PENDING
        }
    }).then((res: Follow_Request_Find) => {
        return res.total
    })
    await app.service('user')._patch(reciever, {
        invitationCount
    })





    // wrong way 
    // console.log(result)
    // if (status === Follow_Request_status.ACCEPTED) {
    //     const followersCount = await app.service('user')._get(sender).then((res: User_Get) => {
    //         return res.followersCount
    //     })
    //     await app.service('user')._patch(sender, {
    //         followersCount: followersCount + 1 
    //     })
    //     await app.service('user')._patch(reciever, {
    //         followersCount: followersCount + 1
    //     })
    //     const invitationCount = await app.service('user')._get(reciever).then((res: User_Get) => {
    //         return res.invitationCount
    //     })
    //     await app.service('user')._patch(reciever, {
    //         invitationCount: invitationCount - 1
    //     })

    // }

    // if (status === Follow_Request_status.REJECTED) {
    //     const followingCount = await app.service('user')._get(sender).then((res: User_Get) => {
    //         return res.followingCount
    //     })
    //     await app.service('user')._patch(sender, {
    //         followersCount: followingCount - 1
    //     })
    //     const invitationCount = await app.service('user')._get(reciever).then((res: User_Get) => {
    //         return res.invitationCount
    //     })
    //     await app.service('user')._patch(reciever, {
    //         invitationCount: invitationCount - 1
    //     })
    // }

    // if (status === Follow_Request_status.UNFOLLOW) {
    //     const followingCount = await app.service('user')._get(sender).then((res: User_Get) => {
    //         return res.followingCount
    //     })
    //     await app.service('user')._patch(sender, {
    //         followersCount: followingCount - 1
    //     })

    // }
}
export default onFrUpdated