import mongoose from "npm:mongoose@8.0.0";

export type coche={
    Matricula:string,
    Color:string,
    Marca:string,
    Precio:number
}

export type concesionario={
    id:number,
    lugar:string,
    coche:string[],
    abierto:boolean
}

export type cliente={
    Dni:string,
    Dinero:number,
    coche:string[]
}
