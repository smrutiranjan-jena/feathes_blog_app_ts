import { BadRequest, NotAuthenticated } from '@feathersjs/errors';
import { Hook, HookContext } from '@feathersjs/feathers';
import { like_Status, like_Find } from '../services/like/interfaces/likeInterfaces';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (options = {}): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
    const { app, data, params } = context
    const { post } = data
    const { user } = params
    if (user) {
      data.user = user._id
    } else {
      throw new NotAuthenticated()
    }
    // feild validation
    if (!post) {
      throw new BadRequest('post is required')
    }
    // check the same user on the same post alredy liked or not
    await app.service('like').find({
      query: {
        post,
        user,
        status: like_Status.ACTIVE
      }
    }).then((res: like_Find) => {
      if (res.total) {
        throw new BadRequest('you have already liked the post')
      }
    })
    return context;
  };
};
