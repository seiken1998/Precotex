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

MantenimientoActivoFijoCabeceraService(Cod_Accion: string, Cod_Item_Cab: number, Cod_Empresa: number, Cod_Establecimiento: string, Num_Piso: number, Cod_CenCost: string, Cod_Activo: string, Clase_Activo: number){

 
    return this.http.get(`${this.baseUrl}/app_Man_Control_Activo_Fijo.php?Accion=${Cod_Accion}&Cod_Item_Cab=${Cod_Item_Cab}&Cod_Empresa=${Cod_Empresa}&Cod_Establecimiento=${Cod_Establecimiento}&Num_Piso=${Num_Piso}&Cod_CenCost=${Cod_CenCost}&Cod_Activo=${Cod_Activo}&Clase_Activo=${Clase_Activo}&Cod_Usuario=${this.sCod_Usuario}`);                                             
}


MantenimientoActivoFijoDetalleService(
  Cod_Accion: string,
  Cod_Item_Cab: number,
  Cod_Item_Det: number,
  Descripcion: string,
  Marca: string,
  Modelo: string,
  Motor: string,
  Chasis: string,
  Serie: string,
  Placa: string,
  Color: number,
  Combustible: number,
  Caja: number,
  Asiento: number,
  Fabricacion,
  Ejes: number,
  Medidas: string,
  Estado: number,
  Uso: number,
  Observacion: string,
  ){

 
  return this.http.get(`${this.baseUrl}/app_Man_Control_Activo_Fijo_Det.php?Accion=${Cod_Accion}&Cod_Item_Cab=${Cod_Item_Cab}&Cod_Item_Det=${Cod_Item_Det}&Descripcion=${Descripcion}&Marca=${Marca}&Modelo=${Modelo}&Motor=${Motor}&Chasis=${Chasis}&Serie=${Serie}&Placa=${Placa}&Color=${Color}&Combustible=${Combustible}&Caja=${Caja}&Asiento=${Asiento}&Fabricacion=${Fabricacion}&Ejes=${Ejes}&Medidas=${Medidas}&Estado=${Estado}&Uso=${Uso}&Observacion=${Observacion}&Cod_Usuario=${this.sCod_Usuario}`);                                             
}


MostrarSedePorEmpresaService($Accion: number){
  return this.http.get(`${this.baseUrl}/app_Mostrar_Sede_Por_Empresa.php?Accion=${$Accion}`);                                                
}


}



