// comment-model.ts - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { Application } from '../declarations';
import { Model, Mongoose } from 'mongoose';

export default function (app: Application): Model<any> {
  const modelName = 'comment';
  const mongooseClient: Mongoose = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema({
    user: {
      type: Schema.Types.ObjectId,
      required: true
    },
    entityType: {
      type: String,
      enum: ["post", "comment"]
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: 'post'
    },
    comment: {
      type: Schema.Types.ObjectId,
      ref: 'comment'
    },
    commentText: {
      type: String,
      required: true
    },
    status: {
      type: Number,
      enum: [1, -1],
      default: 1
    }
  }, { timestamps: true });

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    (mongooseClient as any).deleteModel(modelName);
  }
  return mongooseClient.model<any>(modelName, schema);
}
