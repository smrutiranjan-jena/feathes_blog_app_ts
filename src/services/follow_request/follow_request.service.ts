// Initializes the `follow_request` service on path `/follow-request`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { FollowRequest } from './follow_request.class';
import createModel from '../../models/follow_request.model';
import hooks from './follow_request.hooks';
import onUserFollow from './events/onUserFollow';
import onFrUpdated from './events/onFrUpdated';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'follow-request': FollowRequest & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/follow-request', new FollowRequest(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('follow-request');
  service.on('created',onUserFollow)
  service.on('removed',onUserFollow)
  service.on('patched',onFrUpdated)
  service.hooks(hooks);
}
