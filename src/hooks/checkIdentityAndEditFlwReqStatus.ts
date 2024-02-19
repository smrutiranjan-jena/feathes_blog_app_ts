import { BadRequest, NotAuthenticated } from '@feathersjs/errors';
import { Hook, HookContext } from '@feathersjs/feathers';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (options = {}): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
    const { app, data, params, id } = context
    const { user } = params
    await app.service('follow-request')._get(id).then((res: any) => {
      console.log(res)
    })
    return context;
  };
};
