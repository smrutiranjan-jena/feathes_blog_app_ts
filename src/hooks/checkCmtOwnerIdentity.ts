import { BadRequest, NotAuthenticated } from '@feathersjs/errors';
import { Hook, HookContext } from '@feathersjs/feathers';
import { Comment_Get } from '../services/comment/interfaces/cmtInterfaces';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (options = {}): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
    const { id, app, params } = context
    const { user } = params
    await app.service('comment')._get(id).then((res: Comment_Get) => {
      if (user) {
        if (user._id.toString() !== res.user.toString()) {
          throw new BadRequest('not permitted')
        }
      } else {
        throw new NotAuthenticated()
      }
    })
    return context;
  };
};
