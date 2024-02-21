import { BadRequest, NotAuthenticated } from '@feathersjs/errors';
import { Hook, HookContext } from '@feathersjs/feathers';
import { like_Status, like_Find } from '../services/like/interfaces/likeInterfaces';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (options = {}): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
    const { app, data, params } = context
    const { post, comment, entityType } = data
    const { user } = params

    // set user id
    if (user) {
      data.user = user._id
    } else {
      throw new NotAuthenticated()
    }

    // feild validation
    if (entityType === 'post' && !post) {
      throw new BadRequest('post is required')
    }
    if (entityType === 'comment' && !comment) {
      throw new BadRequest('comment is required')
    }
    if (entityType === 'post') {
      // check the post you wants to like is exist or not
      await app.service('post')._get(post).catch(() => {
        throw new BadRequest('invalid post')
      })
    }
    if (entityType === 'comment') {
      // check the post you wants to like is exist or not
      await app.service('comment')._get(comment).catch(() => {
        throw new BadRequest('invalid comment')
      })
    }


    // check the same user on the same post alredy liked or not
    await app.service('like').find({
      query: {
        entityType: "post",
        post,
        user,
        status: like_Status.ACTIVE
      }
    }).then((res: like_Find) => {
      if (res.total) {
        throw new BadRequest('you have already liked the post')
      }
    })

    // check the same user on the same post alredy liked or not
    await app.service('like').find({
      query: {
        entityType: "comment",
        post,
        user,
        status: like_Status.ACTIVE
      }
    }).then((res: like_Find) => {
      if (res.total) {
        throw new BadRequest('you have already liked the comment')
      }
    })


    return context;
  };
};
