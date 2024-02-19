import { Hook, HookContext } from "@feathersjs/feathers";
import { Follow_Request_Find, Follow_Request_Get, Follow_Request_status } from "../interface/flwReqInterfaces";
const onUserFollow = async (result: Follow_Request_Get, context: HookContext) => {
    const { app, params } = context
    const { user } = params
    const { sender, reciever } = result
    const followingCount = await app.service('follow-request')._find({
        query: {
            sender
        }
    }).then((res: Follow_Request_Find) => {
        return res.total
    })
    await app.service('user')._patch(sender, {
        followingCount
    })
    // ----------------------------------------------------------------------
    const invitationCount = await app.service('follow-request')._find({
        query: {
            reciever,
            status: Follow_Request_status.PENDING
        }
    }).then((res: Follow_Request_Find) => {
        return res.total
    })
    await app.service('user')._patch(reciever, {
        invitationCount
    })

}
export default onUserFollow