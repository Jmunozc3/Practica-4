// @ts-expect-error
import { Request, Response } from "npm:express@4.17.1";
import { ConcesionarioModel } from "../db/concesionario_schema.ts";

export const pushConcesionario = async (req: Request, res: Response) => {

  const { id,lugar} = req.body;

  // check if all fields are provided
  if (!id || !lugar) {
    res.status(400).json({
      code: "Not_enough_variables",
      message:
        "Faltan Variables por introducir",
    });
    return;
  }

  // check if all fields are strings

  if (
    typeof id !== "string" ||
    typeof lugar !== "string" 
  ) {
    res.status(400).json({
      code: "Not_all_type_are_correct",
      message:
          "No todos los tipos son correctos",
    });
    return;
  }

  // check if id already exists
  const exists = await ConcesionarioModel.exists({ id });
  if (exists) {
    res.status(409).json({
      code:"Concesionario_alredy_exits",
      message: "Concesionario existe",
    });
    return;
  }

  try {  
    try {
      const contact = new ConcesionarioModel({
        id,
        lugar,
      });

      await contact.save();

      // send only the data that is public to the client
      res.status(200).send({
        id,
        lugar,
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
      message: "problem getting data from request",
    });
    return;
  }
};