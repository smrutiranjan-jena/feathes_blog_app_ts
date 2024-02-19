import { BadRequest, NotAuthenticated } from '@feathersjs/errors';
import { Hook, HookContext } from '@feathersjs/feathers';
import { Post_Get } from '../services/post/interfaces/postInterfaces';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (options = {}): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
    const { app, params, id } = context
    const { user } = params
    await app.service('post')._get(id).then((res: Post_Get) => {
      if (user) {
        if (res.user._id.toString() !== user._id.toString()) {
          throw new BadRequest("not permitted")
        }
      } else {
        throw new NotAuthenticated()
      }

    })
    return context;
  };
};
