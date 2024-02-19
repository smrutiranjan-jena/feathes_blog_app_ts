// Initializes the `post` service on path `/post`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Post } from './post.class';
import createModel from '../../models/post.model';
import hooks from './post.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'post': Post & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/post', new Post(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('post');

  service.hooks(hooks);
}
