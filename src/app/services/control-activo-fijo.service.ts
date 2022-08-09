import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalVariable } from '../VarGlobals';
import * as _moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ControlActivoFijoService {

  baseUrl = GlobalVariable.baseUrl;
  sCod_Usuario = GlobalVariable.vusu;
  
  constructor(private http: HttpClient) { }

  MantenimientoControlActivoFijo(Cod_Accion: string, Cod_Empresa: string, Planta: number, Piso: number, Cod_CenCost: string, Cod_Activo: string, Clase_Activo: number){

 
    return this.http.get(`${this.baseUrl}/app_Man_Control_Activo_Fijo.php?Accion=${Cod_Accion}&Cod_Empresa=${Cod_Empresa}&Planta=${Planta}&Piso=${Piso}&Cod_CenCost=${Cod_CenCost}&Cod_Activo=${Cod_Activo}&Clase_Activo=${Clase_Activo}&Cod_Usuario=${this.sCod_Usuario}`);                                             
}
}
