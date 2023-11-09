
// @ts-expect-error
import { Request, Response } from "npm:express@4.17.1";
import { CarModel } from "../db/car_schema.ts";
import { ConcesionarioModel } from "../db/concesionario_schema.ts";

export const add_car_to_concesionario = async (req: Request, res: Response) => {

    const {idmatricula, idconcesionario}= req.params;

    // check if all fields are provided
    if (!idmatricula || !idconcesionario) {
      res.status(400).json({
      code: "Not_enough_variables",
      message:
        "Faltan Variables por introducir",
      });
      return;
    }

  // check if Matricula and Concesionario already exists
  const carExists = await CarModel.exists({ Matricula: idmatricula });
  const concesionarioExists = await ConcesionarioModel.exists({ id: idconcesionario});

  if (!carExists|| !concesionarioExists) {
    res.status(409).json({
      code:"No existe",
      message: "Matricula or Concesionario dont exists",
    });
    return;
  }

  try {  
    try {
          
         // check if Concesionario already exists
        const antiguo_concesionario = await ConcesionarioModel.findOne({id:idconcesionario}).exec();
        
        if(!antiguo_concesionario){
            res.status(409).json({
                code:"No existe",
                message: "concesionario dont exists",
            });
          return;
        }
          
       const lugar=antiguo_concesionario.lugar;
       const coches=antiguo_concesionario.coches;
       coches.push(idmatricula);

        const updatedconcesionario = await ConcesionarioModel.findOneAndUpdate(
            { id:idconcesionario },
            { lugar, coches},
            { new: true }
          ).exec();

      // send only the data that is public to the client
      res.status(200).send({
        lugar:lugar,
        coches:coches,
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
      message: "problem getting data from id from car or id from concesionary",
    });
    return;
  }
};
