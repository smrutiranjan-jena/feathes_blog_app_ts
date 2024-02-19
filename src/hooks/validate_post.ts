import { BadRequest, NotAuthenticated } from '@feathersjs/errors';
import { Hook, HookContext } from '@feathersjs/feathers';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (options = {}): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
    const { app, data, params } = context
    const { title, description } = data
    const { user } = params

    if (user) {
      data.user = user._id
    } else {
      throw new NotAuthenticated()
    }

    // feild validation
    if (!title) {
      throw new BadRequest("title required")
    }
    if (!description) {
      throw new BadRequest("description required")
    }
    // check wheather the user is trying to create a post is exist or not
    await app.service('user').get(data.user).catch(() => {
      throw new BadRequest('invalid user')
    })
    return context;
  };
};
