// @ts-expect-error
import { Request, Response } from "npm:express@4.17.1";
import { ClienteModel } from "../db/cliente_schema.ts";

export const deleteClient = async (req: Request, res: Response) => {
  const { dnicliente,idmatricula } = req.params;
  
  // check if all fields are provided
  if (!dnicliente || !idmatricula) {
    res.status(400).json({
      code: "Not_enough_variables",
      message:
        "Faltan Variables por introducir"
    });
    return;
  }
  
  // check if all fields are strings
  if (
     typeof dnicliente !== "string" || 
     typeof idmatricula !== "string" 
  ) {
    res.status(400).json({
      code: "Not_all_type_are_correct",
      message:
        "No todos los tipos son correctos",
    });
    return;
  }

  try {

    const datosCliente = await ClienteModel.findOne({Dni:dnicliente});
     // check if cliente already exists
    if (!datosCliente) {
      res.status(404).json({
        code:"Cliente_dont_exist",
        message:
            "Cliente no existe",
      });
      return;
    }

    //filter
    const cliented=datosCliente.coches;
    const removeObject=cliented.filter((item) => item !== idmatricula);

    const client = await ClienteModel.findOneAndUpdate(
      { Dni: dnicliente },
      {coches:removeObject}
      );

    res.status(200).json({
      message: "Client car deleted from owned list",
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }

};