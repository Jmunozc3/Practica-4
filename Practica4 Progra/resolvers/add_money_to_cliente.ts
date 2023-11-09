
// @ts-expect-error
import { Request, Response } from "npm:express@4.17.1";
import { ClienteModel } from "../db/cliente_schema.ts";

export const add_money_to_cliente = async (req: Request, res: Response) => {

    const {dnicliente, money}= req.params;

    // check if all fields are provided
    if (!dnicliente || !money) {
      res.status(400).json({
      code: "Not_enough_variables",
      message:
        "Faltan Variables por introducir",
      });
      return;
    }

    // check if Matricula already exists
  const carExists = await ClienteModel.exists({ Dni: dnicliente });
  if (!carExists) {
    res.status(409).json({
      code:"Cliente_alredy_exits",
      message: "Cliente existe",
    });
    return;
  }

  try {  
    try {
           
        const datosCliente = await ClienteModel.findOne({Dni:dnicliente} ).exec();
        
        // check if cliente already exists
        if(!datosCliente){
            res.status(409).json({
                code:"Cliente_dont_exist",
                message:
                    "cliente no existe",
              });
              return;
        }  
        const moneyUpdated:number = datosCliente.Dinero + Number(money);
        const updatedCliente = await ClienteModel.findOneAndUpdate(
            { Dni:dnicliente },
            { Dinero: moneyUpdated},
            { new: true }
          ).exec();

       // send only the data that is public to the client
      res.status(200).send({
        Dni:datosCliente.Dni,
        Dinero: updatedCliente?.Dinero
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
