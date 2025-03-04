import { ObjectId } from "mongodb";

export type FormResponse = {
  errors: {
    email?: string[] | undefined;
    password?: string[] | undefined;
  };
};

export interface TodoType {
  _id?: ObjectId;
  title: string;
  deadline: string;
  status?: boolean;
}
