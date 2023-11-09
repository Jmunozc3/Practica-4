
// @ts-expect-error
import { Request, Response } from "npm:express@4.17.1";
import { ClienteModel } from "../db/cliente_schema.ts";

export const pushCliente = async (req: Request, res: Response) => {

  const {Dni, Dinero } = req.body;

  // check if all fields are provided
  if (!Dni || !Dinero) {
    res.status(400).json({
      code:"Not_enough_variables",
      message:
        "Faltan Variables por introducir",
    });
    return;
  }

  // check if all fields are strings
  if (
    typeof Dni !== "string" ||
    typeof Dinero !== "number"  
  ) {
    res.status(400).json({
      code: "Not_all_type_are_correct",
      message:
          "No todos los tipos son correctos",
    });
    return;
  }

  // check if DNI already exists
  const exists = await ClienteModel.exists({Dni });
  if (exists) {
    res.status(409).json({
      code:"Client_alredy_exits",
      message: "Cliente existe",
    });
    return;
  }

  try {
   
    try {
      const a:string[]=[];
      const contact = new ClienteModel({
        Dni,
        Dinero,
        a,
      });

      await contact.save();

      // send only the data that is public to the client
      res.status(200).send({
        Dni,
        Dinero,
      });

    } catch (error) {
      res.status(400).json({
        error: error.message,
        message: "Problema saving data to MongoDB",
      });
      return;
    }
  } catch (error) {
    res.status(400).json({
      error: error.message,
      message: "problem getting data from cp or isocode",
    });
    return;
  }
};