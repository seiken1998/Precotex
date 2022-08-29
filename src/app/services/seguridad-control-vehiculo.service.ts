import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalVariable } from '../VarGlobals';

import * as _moment from 'moment';
 
@Injectable({
  providedIn: 'root'
})
export class SeguridadControlVehiculoService {

  baseUrl = GlobalVariable.baseUrl;
  baseUrlLocal = GlobalVariable.baseUrlLocal;

  sCod_Usuario = GlobalVariable.vusu;
 
  constructor(private http: HttpClient) { }

  HabilitarNum_Planta(nNum_Planta: number) {
    return this.http.get(`https://192.168.1.31:9443/ws_android/app_habilitar_num_planta.php?Num_Planta=${nNum_Planta}`);
  }

  ListarOrigenesService(
    sNum_Planta: number) {

    return this.http.get(`${this.baseUrl}/app_listar_planta.php?Accion=I&Num_Planta=${sNum_Planta}`);
  }

  traerInfoVehiculoService(
    sNum_Planta: number, sCod_barras: string) {
      return this.http.get(`${this.baseUrl}/app_buscar_vehiculo.php?Cod_Barras=${sCod_barras}&Num_Planta=${sNum_Planta}`)
    }

    traerInfoConductorService(
      sNum_Planta: number, sCod_conductor: string) {
        return this.http.get(`${this.baseUrl}/app_muestra_nom_trabajador_nro_docide_vehiculo.php?Nro_DocIde=${sCod_conductor}`)
      }


     GuardarService(Accion: string, sCod_Accion: string, nNum_Planta: number, sCod_barras: string, sDni_conductor: string, nNum_Planta_Ref: number, nNum_kilometraje: number,
        sGlosa: string, sOperacion: string, Fecha_Registro: string) {
    
        if(Fecha_Registro != ''){
        sGlosa = sGlosa.replace(/\s+/g, " ").trim();
        sGlosa = sGlosa.replace("ñ", "n").trim();}
    
        //return this.http.get(`${this.baseUrl}/app_man_registro_control_guia.php?Accion=${'I'}&Num_Planta=${nNum_Planta}&Cod_Accion=${sCod_Accion}&Num_Guia=${sNum_Guia}&Cod_Proveedor=${sCod_Proveedor}&Num_Planta_Destino=${nNum_Planta_Destino}&Num_Planta_Origen=${nNum_Planta_Origen}&Dni_Entregado=${sDni_Entregado}&Num_Bulto=${nNum_Bulto}&Num_Cantidad=${nNum_Cantidad}&Num_Peso=${nNum_Peso}&Dni_Despachado=${sDni_Despachado}&Glosa=${sGlosa}&Cod_Usuario=${this.sCod_Usuario}`);
        return this.http.get(`${this.baseUrl}/app_man_registro_vehiculo.php?Accion=${Accion}&Num_Planta=${nNum_Planta}&Cod_Accion=${sCod_Accion}&Cod_Barras=${sCod_barras}&Dni_Conductor=${sDni_conductor}&Num_Planta_Referencia=${nNum_Planta_Ref}&Num_Kilometraje=${nNum_kilometraje}&Observacion=${sGlosa}&Cod_Usuario=${this.sCod_Usuario}&Operacion=${sOperacion}&Fecha_Registro=${Fecha_Registro}`);  

      }
     
 

      ListarDestinosService(
        sNum_Planta: number) {
    
        return this.http.get(`${this.baseUrl}/app_listar_planta.php?Accion=S&Num_Planta=${sNum_Planta}`);
      }
      


      ListarHistoritalService(nNum_Planta:number,sCod_Barras: string, nDni_Conductor: String , sFec_Registro: string) {

        if (!_moment(sFec_Registro).isValid()) {
          sFec_Registro = '01/01/1900';
        } 
    
        sFec_Registro = _moment(sFec_Registro.valueOf()).format('DD/MM/YYYY');
    
        return this.http.get(`${this.baseUrl}/app_listar_historial_control_vehiculo.php?Num_Planta=${nNum_Planta}&Cod_Barras=${sCod_Barras}&Dni_Conductor=${nDni_Conductor}&Fec_Registro=${sFec_Registro}`);
      }


      EliminarRegistroService(nNum_Planta: Number,Cod_Barras: String,Cod_Accion:string,Cod_Vehiculo:string,Num_Kilometraje: string,Num_Planta_Destino: String,Dni_Conductor: string, Numero_Planta: string, ope:string) {

        return this.http.get(`${this.baseUrl}/app_man_registro_vehiculo.php?Accion=${'D'}&Num_Planta=${Numero_Planta}&Cod_Accion=${Cod_Accion}&Cod_Barras=${Cod_Barras}&Dni_Conductor=${Dni_Conductor}&Num_Planta_Referencia=${Num_Planta_Destino}&Num_Kilometraje=${Num_Kilometraje}&Observacion=${''}&Cod_Usuario=${this.sCod_Usuario}&Operacion=${ope}`);
      }

      mantenimientoConductorService(Cod_Accion: string,Cod_Conductor:string, dni: string, nombres: string, apellido_p: string, apellido_m: string, NumLic:string, Cat:string, Fec_Fin_Lic:string, Flg_Status:string){
      
        if (!_moment(Fec_Fin_Lic).isValid()) {
          Fec_Fin_Lic = '01/01/1900';
        } 
    
        Fec_Fin_Lic = _moment(Fec_Fin_Lic.valueOf()).format('DD/MM/YYYY');
       
        return this.http.get(`${this.baseUrl}/app_man_conductor_vehiculo.php?Accion=${Cod_Accion}&Cod_Conductor=${Cod_Conductor}&Nro_DocIde=${dni}&Nombres=${nombres}&Apellido_P=${apellido_p}&Apellido_M=${apellido_m}&NumLic=${NumLic}&Cat=${Cat}&Fec_Fin_Lic=${Fec_Fin_Lic}&Flg_Status=${Flg_Status}&Cod_Usuario=${this.sCod_Usuario}`);
      }

      mantenimientoVehiculoService(Cod_Accion: string, Des_Vehiculo: string, Num_Placa: string, Cod_Barras: string, Flg_Activo: string, Num_Soat: string, Fec_Fin_Soat: string, Num_Tarjeta_Prop: string, Tmp_Carga: string, Tmp_Descarga: string, Cod_Conductor: string, Cod_Vehiculo: string){
        if (!_moment(Fec_Fin_Soat).isValid()) {
          Fec_Fin_Soat = '01/01/1900';
        } 
    
        Fec_Fin_Soat = _moment(Fec_Fin_Soat.valueOf()).format('DD/MM/YYYY');
       
        
        return this.http.get(`${this.baseUrl}/app_man_vehiuculo_vehiculo.php?Accion=${Cod_Accion}&Des_Vehiculo=${Des_Vehiculo}&Num_Placa=${Num_Placa}&Cod_Barras=${Cod_Barras}&Flg_Activo=${Flg_Activo}&Cod_Usuario=${this.sCod_Usuario}&Num_Soat=${Num_Soat}&Fec_Fin_Soat=${Fec_Fin_Soat}&Num_Tarjeta_Prop=${Num_Tarjeta_Prop}&Tmp_Carga=${Tmp_Carga}&Tmp_Descarga=${Tmp_Descarga}&Cod_Conductor=${Cod_Conductor}&Cod_Vehiculo=${Cod_Vehiculo}`);
      }

      verReporteControlVehiculos(Fecha_Auditoria: string, Fecha_Auditoria2: string){
        if (!_moment(Fecha_Auditoria).isValid()) {
          Fecha_Auditoria = '01/01/1900';
        } 
        if (!_moment(Fecha_Auditoria2).isValid()) {
          Fecha_Auditoria2 = '01/01/1900';
        } 
    
        Fecha_Auditoria = _moment(Fecha_Auditoria.valueOf()).format('DD/MM/YYYY');
        Fecha_Auditoria2 = _moment(Fecha_Auditoria2.valueOf()).format('DD/MM/YYYY');
        
        return this.http.get(`${this.baseUrl}/app_ver_reporte_control_vehiculo.php?Fec_Inicio=${Fecha_Auditoria}&Fec_Fin=${Fecha_Auditoria2}`);
      }

     Modificar_Km_Vehiculo(Id: number, Num_Kilometraje: number){
      return this.http.get(`${this.baseUrl}/app_Modificar_Km_Vehiculo.php?Id=${Id}&Km=${Num_Kilometraje}&Cod_Usuario=${this.sCod_Usuario}`);
     }

}
   