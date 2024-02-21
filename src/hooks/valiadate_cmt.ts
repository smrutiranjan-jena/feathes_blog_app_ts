import { BadRequest, NotAuthenticated } from '@feathersjs/errors';
import { Hook, HookContext } from '@feathersjs/feathers';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (options = {}): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
    const { app, data, params } = context
    const { post, comment } = data
    const { user } = params

    // automatic set authenticated userId from context
    if (user) {
      data.user = user._id
    } else {
      throw new NotAuthenticated()
    }

    // feild validation
    if (!post) {
      throw new BadRequest('post is required')
    }
    if (!comment) {
      throw new BadRequest('comment is required')
    }
    return context;
  };
};
