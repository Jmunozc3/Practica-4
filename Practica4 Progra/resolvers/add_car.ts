
// @ts-expect-error
import { Request, Response } from "npm:express@4.17.1";
import { CarModel } from "../db/car_schema.ts";

export const pushCar = async (req: Request, res: Response) => {
  console.info(req.body);
  const { Matricula,Color,Marca,Precio } = req.body;

  // check if all fields are provided
  if (!Matricula || !Color || !Marca|| !Precio) {
    res.status(400).json({
      code: "Not_enough_variables",
      message:
        "Faltan Variables por introducir",
    });
    return;
  }

  // check if all fields are strings
  if (
    typeof Matricula !== "string" ||
    typeof Color !== "string" ||
    typeof Marca !== "string"||
    typeof Precio !== "number"   
  ) {
    res.status(400).json({
        code: "Not_all_type_are_correct",
        message:
          "No todos los tipos son correctos",
    });
    return;
  }

  // check if Coche already exists
  const exists = await CarModel.exists({ Matricula: Matricula });
  if (exists) {
    res.status(409).json({
      code:"Car_alredy_exits",
      message: "Coche existe",
    });
    return;
  }

  try {
   
    try {
      const contact = new CarModel({
        Matricula,
        Color,
        Marca,
        Precio
      });

      await contact.save();

      // send only the data that is public to the client
      res.status(200).send({
        Matricula,
        Color,
        Marca,
        Precio
      });

    } catch (error) {
      res.status(400).json({
        code: error.message,
        message: "Problem saving data",
      });
      return;
    }
  } catch (error) {
    res.status(400).json({
      code: error.message,
      message: "problem getting data",
    });
    return;
  }
};
