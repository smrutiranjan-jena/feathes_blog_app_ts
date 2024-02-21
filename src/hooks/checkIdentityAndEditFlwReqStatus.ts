import { BadRequest, NotAuthenticated } from '@feathersjs/errors';
import { Hook, HookContext } from '@feathersjs/feathers';
import { Follow_Request_Get } from '../services/follow_request/interface/flwReqInterfaces';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (options = {}): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
    const { app, data, params, id } = context
    const { user } = params
    if (user) {
      await app.service('follow-request')._get(id).then((res: Follow_Request_Get) => {
        if (res.reciever.toString() !== user._id.toString()) {
          throw new BadRequest('not permitted')
        }
      })
    } else {
      throw new NotAuthenticated()
    }

    return context;
  };
};
