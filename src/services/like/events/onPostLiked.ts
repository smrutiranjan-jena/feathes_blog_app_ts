import { Hook, HookContext } from '@feathersjs/feathers';
import { like_Find, like_Get, like_Status } from '../interfaces/likeInterfaces';
const onPostLiked = async (result: like_Get, context: HookContext) => {
    const { app } = context
    const { post } = result
    const likeCount = await app.service('like')._find({
        query: {
            post,
            status: like_Status.ACTIVE
        }
    }).then((res: like_Find) => {
        return res.total
    })
    await app.service('post')._patch(post, {
        likeCount
    })
}
export default onPostLiked