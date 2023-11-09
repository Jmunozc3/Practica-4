
// @ts-expect-error
import { Request, Response } from "npm:express@4.17.1";
import { CarModel } from "../db/car_schema.ts";
import { ClienteModel } from "../db/cliente_schema.ts";
import { ConcesionarioModel } from "../db/concesionario_schema.ts";

export const add_car_to_client_from_concesionary = async (req: Request, res: Response) => {

    const {dnicliente, idmatricula, idconcesionario}= req.params;

    // check if all fields are provided
    if (!idmatricula || !idconcesionario || !dnicliente) {
      res.status(400).json({
        code: "Not_enough_variables",
        message:
         "Faltan Variables por introducir",
      });
      return;
    }
  // check if Matricula already exists, client exist and concesionario exist
  const clientExists = await ClienteModel.exists({ Dni: dnicliente });
  const carExists = await CarModel.exists({ Matricula: idmatricula });
  const concesionarioExists = await ConcesionarioModel.exists({ id: idconcesionario});

  if (!clientExists || !carExists|| !concesionarioExists) {
    res.status(409).json({
      code:"No existe",
      message: "dni or matricula or concesionario dont exists",
    });
    return;
  }

  try {  
    try {
           
        const datosCliente = await ClienteModel.findOne( {Dni:dnicliente}).exec();
        
         // check if cliente already exists
        if(!datosCliente){
            res.status(409).json({
                code:"No existe",
                message: "client dont exists",
              });
              return;
        }   

        const datosCoche = await CarModel.findOne({Matricula:idmatricula}).exec();
        // check if coche already exists
        if(!datosCoche){
            res.status(409).json({
                code:"No existe",
                message: "car dont exists",
              });
              return;
        }

        const datosConcesionario = await ConcesionarioModel.findOne({id:idconcesionario}).exec();
        // check if concesionario already exists
        if(!datosConcesionario){
            res.status(409).json({
                code:"No existe",
                message: "concesionario dont exists",
              });
          return;
        }
        
       //filter
        const cliented=datosConcesionario.coches;
        const cochesConcesionario=cliented.filter((item) => item !== idmatricula);

        const lugarConcesionario=datosConcesionario.lugar;

        const updatedconcesionario = await ConcesionarioModel.findOneAndUpdate(
            { id:idconcesionario },
            { lugar: lugarConcesionario, coches: cochesConcesionario},
            { new: true }
          ).exec();


          const cochesCliente=datosCliente.coches;
          cochesCliente.push(idmatricula);

          const updatedCliente = await ClienteModel.findOneAndUpdate(
            { Dni:dnicliente },
            { coches: cochesCliente},
            { new: true }
          ).exec();

      // send only the data that is public to the client
      res.status(200).send({
        coches:cochesCliente,
        updatedCliente,
        updatedconcesionario
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
