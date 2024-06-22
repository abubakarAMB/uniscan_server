import { prop, getModelForClass } from "@typegoose/typegoose";

export class Student {

  _id?: string;

  @prop({ required: true })
  public name!: string;

  @prop({ required: true })
  public rollNumber!: string;

  //school and department are optional
  @prop()
  public school?: string;

  @prop()
  public department?: string;

  //createdAt default value is set to the current date
  @prop({ default: new Date() })
  public createdAt?: Date;
}

export const StudentModel = getModelForClass(Student);