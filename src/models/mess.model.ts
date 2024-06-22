import { prop, getModelForClass } from "@typegoose/typegoose";

export class Mess {
  @prop({ required: true })
  public studentId!: string;

  @prop({ required: true, enum: ['breakfast', 'lunch', 'snacks', 'dinner'] })
  public meal!: string;

  @prop({ default: new Date() })
  public createdAt?: Date;
}

export const MessModel = getModelForClass(Mess);