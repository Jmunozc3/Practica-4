// @ts-expect-error
import { Request, Response } from "npm:express@4.17.1";
import { ConcesionarioModel } from "../db/concesionario_schema.ts";

export const deleteConcesionary = async (req: Request, res: Response) => {
  const { idconcesionario,idmatricula } = req.params;

  // check if all fields are provided
  if (!idconcesionario || !idmatricula) {
    res.status(400).json({
      code: "Not_enough_variables",
      message:
        "Faltan Variables por introducir",
    });
    return;
  }

  // check if all fields are strings
  if (
    typeof idconcesionario !== "string" ||
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
    const datosConcesionary = await ConcesionarioModel.findOne({id:idconcesionario});
     // check if concesionario already exists
    if (!datosConcesionary) {
      res.status(404).json({
        code:"Concesionario_dont_exist",
        message:
          "Concesionario no existe",
      });
      return;
    }
    if (datosConcesionary.coches.indexOf(idmatricula)<0) {
      res.status(409).json({
        message: "car not found inside the Concesionary owned cars",
      });
      return;
    }

    //filter
    const cliented=datosConcesionary.coches;
    const removeObject=cliented.filter((item) => item !== idmatricula);

    const Concesionary = await ConcesionarioModel.findOneAndUpdate(
      { id: idconcesionario },
      {coches:removeObject}
      );
    

    res.status(200).json({
      message: "Concesionary car deleted from owned list",
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }

};