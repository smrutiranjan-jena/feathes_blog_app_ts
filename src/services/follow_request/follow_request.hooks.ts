import { HooksObject } from '@feathersjs/feathers';
import * as authentication from '@feathersjs/authentication';
import validate_follow_request from '../../hooks/validate_follow_request';
import checkFlwReqOwnerIdentity from '../../hooks/checkFlwReqOwnerIdentity';
import checkIdentityAndEditFlwReqStatus from '../../hooks/checkIdentityAndEditFlwReqStatus';
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

export default {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [validate_follow_request()],
    update: [],
    patch: [checkIdentityAndEditFlwReqStatus()],
    remove: [checkFlwReqOwnerIdentity()]
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
