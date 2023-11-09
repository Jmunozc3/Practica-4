
// @ts-expect-error
import { Request, Response } from "npm:express@4.17.1";
import { ConcesionarioModel } from "../db/concesionario_schema.ts";

export const block_concesionario_from_selling = async (req: Request, res: Response) => {

    const {idconcesionario}= req.params;

    // check if all fields are provided
    if (!idconcesionario) {
      res.status(400).json({
       code: "Not_enough_variables",
       message:
        "Faltan Variables por introducir",
      });
      return;
    }
    
  // check if Matricula already exists
  const concesionarioExists = await ConcesionarioModel.exists({id:idconcesionario });

  if (!concesionarioExists) {
    res.status(409).json({
      code:"Concesionario_dont_exist",
      message: "Concesionario no existe",
    });
    return;
  }

  try {  
    try {
           
        const datosConcesionario = await ConcesionarioModel.findOne({id:idconcesionario}).exec();

        // check if concesionario already exists
        if(!datosConcesionario){
            res.status(409).json({
              code:"Concesionario_dont_exist",
              message:
                  "Concesionario no existe",
              });
         return;
        }

        const estadoModificado:Boolean = !datosConcesionario.abierto;
        const updatedconcesionario = await ConcesionarioModel.findOneAndUpdate(
            { id:idconcesionario },
            { abierto: estadoModificado},
            { new: true }
          ).exec();

      // send only the data that is public to the client
      res.status(200).send({
       concesionary:idconcesionario,
       avialable:estadoModificado
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
      message: "problem getting data",
    });
    return;
  }
};
