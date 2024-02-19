import { BadRequest, NotAuthenticated } from '@feathersjs/errors';
import { Hook, HookContext } from '@feathersjs/feathers';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (options = {}): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
    const { params, id } = context
    const { user } = params
    if (user) {
      if (id !== user._id.toString()) {
        throw new BadRequest('not permitted')
      }
    } else {
      throw new NotAuthenticated()
    }
    return context;
  };
};
