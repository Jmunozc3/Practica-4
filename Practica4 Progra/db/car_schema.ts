import mongoose from "npm:mongoose@8.0.0";
import { coche } from "../types.ts";

const Schema = mongoose.Schema;

export type CarModelType= mongoose.Document;

const carSchema = new Schema(
    {
      Matricula:{ type: String, required: true, unique:true},
      Color: { type: String, required: true },
      Marca: { type: String, required: true},
      Precio: { type: Number, required: true},
    },
    { timestamps: true }
  );

export const CarModel= mongoose.model<CarModelType>("coche",carSchema);
