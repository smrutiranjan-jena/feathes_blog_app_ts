import { Application } from '../declarations';
import user from './user/user.service';
import post from './post/post.service';
import like from './like/like.service';
import comment from './comment/comment.service';
import followRequest from './follow_request/follow_request.service';
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application): void {
  app.configure(user);
  app.configure(post);
  app.configure(like);
  app.configure(comment);
  app.configure(followRequest);
}
