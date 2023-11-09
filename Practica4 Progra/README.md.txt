Para la creacion de coche,concesionario y cliente he usado Postman

Para añadir un coche :
http://localhost:6000/api/pushcar

Para añadir concesionario:
http://localhost:6000/api/pushconcesionario

Para añadir cliente:
http://localhost:6000/api/pushcliente

Para añadir coche a concesionario:
http://localhost:6000/api/add_car/:idmatricula/:idconcesionario

Para añadir un coche a cliente:
http://localhost:6000/api/buy_car/:dnicliente/:idmatricula/:idconcesionario

Para añadir dinero:
http://localhost:6000/api/add_money/:dnicliente/:money

Para bloquear concesionario:
http://localhost:6000/api/block_concesionario/:idconcesionario

Para obtener los coches de concesionario:
http://localhost:6000/api/see_cars/:idconcesionario

Para obtener los coches de cliente:
http://localhost:6000/api/see_cars_client/:dniclient

Para eliminar coche de cliente:
http://localhost:6000/api/see_cars_client/:dnicliente

Para eliminar coche de concesionario:
http://localhost:6000/api/delete_concesionary/:idconcesionario/:idmatricula



