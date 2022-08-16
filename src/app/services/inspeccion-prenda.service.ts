import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalVariable } from '../VarGlobals';
import * as _moment from 'moment';
 

@Injectable({
  providedIn: 'root'
})
export class InspeccionPrendaService {
  baseUrl = GlobalVariable.baseUrl;
  sCod_Usuario = GlobalVariable.vusu;
  
 constructor(private http: HttpClient) { }


  MantenimientoAuditoriaInspeccionCosturaCabeceraService( Cod_Accion: string, Num_Auditoria: number,  Cod_Supervisor: string, Cod_Auditor: string, 
                                                          Fecha_Auditoria: string, Fecha_Auditoria2: string, Cod_LinPro: string, Observacion: string, Flg_Status: string, Cod_OrdPro: string, Cod_EstCli: string){
    if (!_moment(Fecha_Auditoria).isValid()) {
      Fecha_Auditoria = '01/01/1900';
    }
    if (!_moment(Fecha_Auditoria2).isValid()) {
      Fecha_Auditoria2 = '01/01/1900';
    }                                                
    Fecha_Auditoria = _moment(Fecha_Auditoria.valueOf()).format('DD/MM/YYYY'); 
    Fecha_Auditoria2 = _moment(Fecha_Auditoria2.valueOf()).format('DD/MM/YYYY'); 

    return this.http.get(`${this.baseUrl}/app_Man_Auditoria_Inspeccion_Costura_cab.php?Accion=${Cod_Accion}&Num_Auditoria=${Num_Auditoria}&Cod_Supervisor=${Cod_Supervisor}&Cod_Auditor=${Cod_Auditor}&Fecha_Auditoria=${Fecha_Auditoria}&Fecha_Auditoria2=${Fecha_Auditoria2}&Cod_LinPro=${Cod_LinPro}&Observacion=${Observacion}&Flg_Status=${Flg_Status}&Cod_Usuario=${this.sCod_Usuario}&Cod_OrdPro=${Cod_OrdPro}&Cod_EstCli=${Cod_EstCli}`);                                                
  }



  MostrarDefectoPorTipoService(Id: number, Cod_Familia: string){
        return this.http.get(`${this.baseUrl}/app_Mostrar_Defecto_Tipo.php?Id=${Id}&Cod_Familia=${Cod_Familia}`);                                                
  }

  CF_MUESTRA_INSPECCION_LECTURA_TICKET(Codigo: string){
    return this.http.get(`${this.baseUrl}/app_CF_MUESTRA_INSPECCION_LECTURA_TICKET.php?Codigo=${Codigo}`);                                                
  }

  CF_Man_Inspeccion_Prenda_Web(Cod_Accion: string, Cod_Fabrica: string, Cod_OrdPro: string, Cod_Present: number, Cod_Talla: string, Num_Paquete: string, Prendas_Paq: number){
    return this.http.get(`${this.baseUrl}/app_CF_Man_Inspeccion_Prenda_Web.php?Accion=${Cod_Accion}&Cod_Fabrica=${Cod_Fabrica}&Cod_OrdPro=${Cod_OrdPro}&Cod_Present=${Cod_Present}&Cod_Talla=${Cod_Talla}&Prendas_Paq=${Prendas_Paq}&Num_Paquete=${Num_Paquete}&Cod_Usuario=${this.sCod_Usuario}`);                                                
  }


}