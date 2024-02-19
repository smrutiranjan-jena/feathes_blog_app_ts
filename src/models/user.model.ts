import { Application } from '../declarations';
import { Model, Mongoose } from 'mongoose';
import { User_Status } from '../services/user/interfaces/userInterfaces'
export default function (app: Application): Model<any> {
  const modelName = 'user';
  const mongooseClient: Mongoose = app.get('mongooseClient');
  const schema = new mongooseClient.Schema({
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    blogCount: {
      type: Number,
      default: 0,
      required: true
    },
    followingCount: {
      type: Number,
      default: 0,
      required: true
    },
    invitationCount: {
      type: Number,
      default: 0,
      required: true
    },
    followersCount: {
      type: Number,
      default: 0,
      required: true
    },
    status: {
      type: Number,
      enum: User_Status,
      default: User_Status.ACTIVE
    }
  }, {
    timestamps: true
  });

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    (mongooseClient as any).deleteModel(modelName);
  }
  return mongooseClient.model<any>(modelName, schema);
}
