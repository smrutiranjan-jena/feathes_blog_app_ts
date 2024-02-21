import { BadRequest, NotAuthenticated } from '@feathersjs/errors';
import { Hook, HookContext } from '@feathersjs/feathers';
import { Follow_Request_Find } from '../services/follow_request/interface/flwReqInterfaces';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (options = {}): Hook => {
    return async (context: HookContext): Promise<HookContext> => {
        const { app, data, params } = context
        const { reciever } = data
        const { user } = params

        if (user) {
            data.sender = user._id
        } else {
            throw new NotAuthenticated()
        }
        
        // feild validation
        if (!reciever) {
            throw new BadRequest('reciever id is required')
        }

        // targeted reciever is exist or not in our database
        await app.service('user')._get(reciever).catch(() => {
            throw new BadRequest('invalid reciever')
        })

        // you have already followed or not
        if (user) {
            await app.service('follow-request').find({
                query: {
                    sender: user._id,
                    reciever
                }
            }).then((res: Follow_Request_Find) => {
                if (res.total) {
                    throw new BadRequest("you have already followed this user")
                }
            })
        }
        return context;
    };
};
