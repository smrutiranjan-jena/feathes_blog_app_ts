import { Hook, HookContext } from "@feathersjs/feathers"
import { Comment_Find, Comment_Get } from "../../comment/interfaces/cmtInterfaces";
const onPostCommented = async (result: Comment_Get, context: HookContext) => {
    const { app } = context
    const { post } = result
    const commentCount = await app.service('comment')._find({
        query: {
            post,
            status: 1
        }
    }).then((res: Comment_Find) => {
        return res.total
    })
    await app.service('post')._patch(post, {
        commentCount
    })
}
export default onPostCommented;