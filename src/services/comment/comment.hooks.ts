import { HooksObject } from '@feathersjs/feathers';
import * as authentication from '@feathersjs/authentication';
import valiadate_cmt from '../../hooks/valiadate_cmt';
import checkCmtOwnerIdentity from '../../hooks/checkCmtOwnerIdentity';
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

export default {
  before: {
    all: [authenticate('jwt')],
    find: [],
    get: [],
    create: [valiadate_cmt()],
    update: [],
    patch: [checkCmtOwnerIdentity()],
    remove: [checkCmtOwnerIdentity()]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
