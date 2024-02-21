import { BadRequest, NotAuthenticated } from '@feathersjs/errors';
import { Hook, HookContext } from '@feathersjs/feathers';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (options = {}): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
    const { app, data, params } = context
    const { entityType, post, comment } = data
    const { user } = params

    // automatic set authenticated userId from context
    if (user) {
      data.user = user._id
    } else {
      throw new NotAuthenticated()
    }

    // feild validation
    if (!entityType) {
      throw new BadRequest('entityType is required')
    }
    if (entityType === 'post' && !post) {
      throw new BadRequest('post is required')
    }
    if (entityType === 'comment' && !comment) {
      throw new BadRequest('comment is required')
    }
    if (entityType === 'post') {
      // check the post you wants to comment is exist or not
      await app.service('post')._get(post).catch(() => {
        throw new BadRequest('invalid post id')
      })
    }
    if (entityType === 'comment') {
      // check the comment you wants to re-comment is exist or not
      await app.service('comment')._get(comment).catch(() => {
        throw new BadRequest('invalid comment id')
      })
    }
    return context;
  };
};
