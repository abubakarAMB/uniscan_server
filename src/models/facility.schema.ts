import { prop, getModelForClass } from "@typegoose/typegoose";
import { Student } from "./student.model";

export class Facility {
  @prop({ required: true })
  public rollNumber!: String;

  //name
  @prop({ required: true })
  public name!: String;

  //status of request default is PENDING, THEN APPROVED, REJECTED
  @prop({ default: "PENDING", enum: ["PENDING", "APPROVED", "DECLINED", "OUT", "IN"] })
  public status?: String;

  //roomNumber
  @prop({ required: true })
  public roomNumber!: String;

  //purpose
  @prop({ required: true })
  public purpose!: String;

  //outDateTime
  @prop({ required: false, default: new Date()})
  public outDateTime!: Date;

  //inDateTime
  @prop({ required: false, default: null})
  public inDateTime!: Date;

  @prop({ default: new Date() })
  public createdAt?: Date;
}

export const FacilityModel = getModelForClass(Facility);
