import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalVariable } from '../VarGlobals';
import * as _moment from 'moment';
 
@Injectable({
  providedIn: 'root'
})
export class EstilosLiquidarService {

  baseUrl = GlobalVariable.baseUrl;
  sCod_Usuario = GlobalVariable.vusu;
  
 constructor(private http: HttpClient) { }


 UP_RPT_SITUACION_ORDENES_INSPECCION_PANTALLA_FINAL(Cod_Accion: string ){
    
    return this.http.get(`${this.baseUrl}/app_UP_RPT_SITUACION_ORDENES_INSPECCION_PANTALLA_FINAL.php?Accion=${Cod_Accion}`);                                                
  }

  ActualizarIni(){
    
    return this.http.get(`${this.baseUrl}/app_ActualizarIni.php`);                                                
  }
}