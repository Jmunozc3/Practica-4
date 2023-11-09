
import express from "npm:express@4.17.1";
import mongoose from "npm:mongoose@8.0.0";

// import endpoints
import { pushCar } from "./resolvers/add_car.ts";
import { pushCliente } from "./resolvers/add_cliente.ts";
import { pushConcesionario} from "./resolvers/add_concesionario.ts";

import{add_car_to_concesionario}from "./resolvers/add_car_to_concesionario.ts"
import{add_car_to_client_from_concesionary}from "./resolvers/add_car_to_client.ts"

import { getAllCars } from "./resolvers/see_cars_from_concesionario.ts";
import { getAllCars_from_Cliente } from "./resolvers/see_cars_from_cliente.ts";

import { deleteClient } from "./resolvers/delete_from_cliente.ts";
import { deleteConcesionary } from "./resolvers/delete_from_concesionario.ts";

import { add_money_to_cliente } from "./resolvers/add_money_to_cliente.ts";
import { block_concesionario_from_selling } from "./resolvers/block_concesionario_from_selling.ts";

// connecto to MongoDB
await mongoose.connect("mongodb+srv://juan:12345@cluster0.i5x1im4.mongodb.net/juan?retryWrites=true&w=majority");
console.info("MongoDB connected");

// create express app
const app = express();
app.use(express.json());

// create endpoints
app
  .post("/api/pushcar", pushCar)
  .post("/api/pushconcesionario", pushConcesionario)
  .post("/api/pushcliente", pushCliente)
  .put("/api/add_car/:idmatricula/:idconcesionario", add_car_to_concesionario)
  .put("/api/buy_car/:dnicliente/:idmatricula/:idconcesionario", add_car_to_client_from_concesionary)
  .put("/api/add_money/:dnicliente/:money", add_money_to_cliente)
  .put("/api/block_concesionario/:idconcesionario", block_concesionario_from_selling)

  .get("/api/see_cars/:idconcesionario", getAllCars)
  .get("/api/see_cars_client/:dnicliente", getAllCars_from_Cliente)

  .delete("/api/delete_client/:dnicliente/:idmatricula", deleteClient)
  .delete("/api/delete_concesionary/:idconcesionario/:idmatricula", deleteConcesionary);

// start express server
app.listen(6000, () => {
  console.info("Server started on port 6000");
});