// Initializes the `comment` service on path `/comment`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Comment } from './comment.class';
import createModel from '../../models/comment.model';
import hooks from './comment.hooks';
import onPostCommented from './events/onPostCommented';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'comment': Comment & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/comment', new Comment(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('comment');
  service.on('created', onPostCommented)
  service.on('removed', onPostCommented)
  service.hooks(hooks);
}
