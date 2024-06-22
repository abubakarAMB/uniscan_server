import { prop, getModelForClass } from "@typegoose/typegoose";

export class Dog {
  @prop({ required: true })
  public name!: string;

  @prop({ required: true })
  public breed!: string;

  @prop({ required: true })
  public age!: number;

  @prop({ required: false, default: true })
  public isGoodBoy?: boolean;
}

export const DogModel = getModelForClass(Dog);