import mongoose from "npm:mongoose@8.0.0";
import { cliente } from "../types.ts";

const Schema = mongoose.Schema;

export type ClienteModelType= mongoose.Document;

const clienteSchema = new Schema(
    {
      Dni: { type: String, required: true, unique:true },
      Dinero: { type: Number, required: true},
      coches:{type: [String] , required: false}
    },
    { timestamps: true }
  );

  export const ClienteModel= mongoose.model<ClienteModelType>("cliente",clienteSchema);
