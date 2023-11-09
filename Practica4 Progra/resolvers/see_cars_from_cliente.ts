// @ts-expect-error
import { Request, Response } from "npm:express@4.17.1";
import { ClienteModel } from "../db/cliente_schema.ts";

export const getAllCars_from_Cliente = async (req: Request, res: Response) => {
  try {

    const {dnicliente}= req.params;

  // check if cliente already exists
  const exist = await ClienteModel.exists({ Dni:dnicliente});
  if (!exist) {
    res.status(409).json({
      code:"Cliente_dont_exits",
      message: "Cliente no existe",
    });
    return;
  }  

  //encontramos el concesionario con el array
  const c =await ClienteModel.findOne({Dni: dnicliente}).exec();  

  //Buscamos los coches dentro de c
  const matriculas= c.coches;

    res.status(200).send(
        matriculas,
      );

  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};