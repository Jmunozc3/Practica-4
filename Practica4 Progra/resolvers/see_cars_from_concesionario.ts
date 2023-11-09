// @ts-expect-error
import { Request, Response } from "npm:express@4.17.1";
import { ConcesionarioModel } from "../db/concesionario_schema.ts";

export const getAllCars = async (req: Request, res: Response) => {
  try {
    const {idconcesionario}= req.params;

  // check if Concesionario already exists
  const exist = await ConcesionarioModel.exists({ id:idconcesionario});
  if (!exist) {
    res.status(409).json({
      code:"Concesionario_dont_exits",
      message: "Concesionario no existe",
    });
    return;
  }  
    //encontramos el concesionario con el array
    const c =await ConcesionarioModel.findOne({id:idconcesionario}).exec();  

    //Buscamos los coches dentro de c
    const matriculas= c.coches;

    res.status(200).send(
        matriculas,
      );
      
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong while finding the cars from the concesionary",
    });
  }
};