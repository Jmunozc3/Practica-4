import mongoose from "npm:mongoose@8.0.0";
import { concesionario } from "../types.ts";

const Schema = mongoose.Schema;

export type ConcesionarioModelType= mongoose.Document;

const concesionarioSchema = new Schema(
    {
      id:{ type: Number, required: true,unique:true },
      lugar: { type: String, required: true },
      coches:{type:[String],required: true},
      abierto:{type: Boolean,required: true},
    },
    { timestamps: true }
  );

export const ConcesionarioModel= mongoose.model<ConcesionarioModelType>("concesionario",concesionarioSchema);
