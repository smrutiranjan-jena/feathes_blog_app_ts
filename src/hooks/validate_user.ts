// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { BadRequest } from '@feathersjs/errors';
import { Hook, HookContext } from '@feathersjs/feathers';
import { User_Find } from '../services/user/interfaces/userInterfaces';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (options = {}): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
    const { app, data } = context
    const { username, email, password } = data
    //  feild validation
    if (!username) {
      throw new BadRequest("username required")
    }
    if (!email) {
      throw new BadRequest("username required")
    }
    if (!password) {
      throw new BadRequest("username required")
    }
    // username or email already exist or not
    // await app.service('user').find({
    //   username,
    //   status: 1
    // }).then((res: User_Find) => {
    //   if (res.total) {
    //     throw new BadRequest("username already exist")
    //   }
    // })
    return context;
  };
};
