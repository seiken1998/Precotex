import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalVariable } from '../VarGlobals';
import * as _moment from 'moment';
 
@Injectable({
  providedIn: 'root'
})
export class AuditoriaHojaMedidaService {

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



  AuditoriaHojaMedidaComplementoService(Cod_Accion: string, Cod_Cliente: string, Cod_EstCli: string, Cod_EstPro: String, Cod_Version: string){
    return this.http.get(`${this.baseUrl}/app_Auditoria_Hoja_Medida_Complemento.php?Accion=${Cod_Accion}&Cod_Cliente=${Cod_Cliente}&Cod_EstCli=${Cod_EstCli}&Cod_EstPro=${Cod_EstPro}&Cod_Version=${Cod_Version}`);                                             
}

AuditoriaHojaMedidaPrendaService(Cod_Accion: string, Cod_Cliente: string, Cod_EstCli: string){
  return this.http.get(`${this.baseUrl}/app_Auditoria_Hoja_Medida_Prenda.php?Accion=${Cod_Accion}&Cod_Cliente=${Cod_Cliente}&Cod_EstCli=${Cod_EstCli}`);                                             
}
AuditoriaHojaMedidaVersionesService(Cod_Accion: string, Cod_EstPro: string){
  return this.http.get(`${this.baseUrl}/app_Auditoria_Hoja_Medida_Versiones.php?Accion=${Cod_Accion}&Cod_EstPro=${Cod_EstPro}&Cod_Usuario=${this.sCod_Usuario}`);                                             
}

AuditoriaHojaMedidaCargaMedidaService(Cod_EstPro: string, Cod_Version: string){
  return this.http.get(`${this.baseUrl}/app_Auditoria_Hoja_Medida_Carga_Medida.php?Cod_EstPro=${Cod_EstPro}&Cod_Version=${Cod_Version}`);                                             
}




  MantenimientoAuditoriaInspeccionCosturaDetalleService(Cod_Accion: string, Num_Auditoria_Detalle: number,  Num_Auditoria: number, Cod_Inspector: string, 
  Cod_OrdPro: string, Cod_Cliente: string, Cod_EstCli: string, Cod_Present: string, Can_Lote: number, Can_Muestra: number, Observacion: string, Flg_Status: string, Flg_Reproceso:string , Flg_Reproceso_Num: number){
  
    return this.http.get(`${this.baseUrl}/app_Man_Auditoria_Inspeccion_Costura_det.php?Accion=${Cod_Accion}&Num_Auditoria_Detalle=${Num_Auditoria_Detalle}&Num_Auditoria=${Num_Auditoria}&Cod_Inspector=${Cod_Inspector}&Cod_OrdPro=${Cod_OrdPro}&Cod_Cliente=${Cod_Cliente}&Cod_EstCli=${Cod_EstCli}&Cod_Present=${Cod_Present}&Can_Lote=${Can_Lote}&Can_Muestra=${Can_Muestra}&Observacion=${Observacion}&Flg_Status=${Flg_Status}&Cod_Usuario=${this.sCod_Usuario}&Flg_Reproceso=${Flg_Reproceso}&Flg_Reproceso_Num=${Flg_Reproceso_Num}`);                                                
  }
  
  MantenimientoAuditoriaInspeccionCosturaSubDetalleService(Cod_Accion: string, Num_Auditoria_Sub_Detalle: number,  Num_Auditoria_Detalle: number, Cod_Motivo: string, 
    Cantidad: number){
    
      return this.http.get(`${this.baseUrl}/app_Man_Auditoria_Inspeccion_Costura_sub_det.php?Accion=${Cod_Accion}&Num_Auditoria_Sub_Detalle=${Num_Auditoria_Sub_Detalle}&Num_Auditoria_Detalle=${Num_Auditoria_Detalle}&Cod_Motivo=${Cod_Motivo}&Cantidad=${Cantidad}&Cod_Usuario=${this.sCod_Usuario}`);                                                
    }
  

}