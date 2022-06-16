import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalVariable } from '../VarGlobals';
import * as _moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class AuditoriaLineaCosturaService { 

  baseUrl = GlobalVariable.baseUrl;
  sCod_Usuario = GlobalVariable.vusu;
  // _url: string ="/ws_android/muestra_auditoria_en_linea_cab.php";
  // //_url: string ="https://gestion.precotex.com/ws_android/muestra_auditoria_en_linea_cab.php";

  constructor(private http: HttpClient) { }

  ViewAuditoriaService_Cab(
    nNum_Auditoria: string, sFec_Auditoria: string, sCod_LinPro: string, sCod_Auditor: string, sCod_OrdPro: string, sFlg_Pendiente: string, sFlg_Cerrado: string) {

    if (!_moment(sFec_Auditoria).isValid()) {
      sFec_Auditoria = '01/01/1900';
    } 

    sFec_Auditoria = _moment(sFec_Auditoria.valueOf()).format('DD/MM/YYYY');

    return this.http.get(`${this.baseUrl}/app_muestra_auditoria_en_linea_cab_copia.php?Cod_Estilo=${nNum_Auditoria}&Fec_Auditoria=${sFec_Auditoria}&Cod_LinPro=${sCod_LinPro}&Cod_Auditor=${sCod_Auditor}&Cod_OrdPro=${sCod_OrdPro}&Flg_Pendiente=${sFlg_Pendiente}&Flg_Cerrado=${sFlg_Cerrado}&Cod_Usuario=${this.sCod_Usuario}`);
  }

   
  CargarFamiliaService() { 

    return this.http.get(`${this.baseUrl}/app_cargar_familia.php`);

  }

  CargarOperacionService(sCod_Familia: string) {
    if (sCod_Familia == null) {
      sCod_Familia = '';
    }

    return this.http.get(`${this.baseUrl}/app_cargar_operacion.php?Cod_Familia=${sCod_Familia}`);

  }  

  BuscarLineaService() {

    return this.http.get(`${this.baseUrl}/app_buscar_linea.php`);

  }

  BuscarColorOPService(
    sCod_OrdPro: string) {

    return this.http.get(`${this.baseUrl}/app_buscar_color_op.php?Cod_OrdPro=${sCod_OrdPro}`);

  }

  ManAuditoriaService_Cab(
    sFlg_Accion: string, nNum_Auditoria: string, sFec_Auditoria: string, sCod_LinPro: string, sCod_OrdPro: string, nCod_Present: string) {

    if (!_moment(sFec_Auditoria).isValid()) {
      sFec_Auditoria = '01/01/1900';
    }

    sFec_Auditoria = _moment(sFec_Auditoria.valueOf()).format('DD/MM/YYYY');

    if (sCod_LinPro === null) {
      sCod_LinPro = '';
    }

    if (sCod_OrdPro === null) {
      sCod_OrdPro = 'X0000';
    }

    if (nCod_Present === null) {
      nCod_Present = '0';
    }
    

    return this.http.get(`${this.baseUrl}/app_man_auditoria_linea_costura_cab.php?Flg_Accion=${sFlg_Accion}&Num_Auditoria=${nNum_Auditoria}&Fec_Auditoria=${sFec_Auditoria}&Cod_LinPro=${sCod_LinPro}&Cod_OrdPro=${sCod_OrdPro}&Cod_Present=${nCod_Present}&Cod_Usuario=${this.sCod_Usuario}`);

  }


  ViewAuditoriaService_Det(
    nNum_Auditoria: number) {

    if (nNum_Auditoria.toString.length == 0) {
      nNum_Auditoria = 0
    }

    return this.http.get(`${this.baseUrl}/app_muestra_auditoria_en_linea_det.php?Num_Auditoria=${nNum_Auditoria}&Cod_Usuario=${this.sCod_Usuario}`);
  }

  BuscarTrabajadorService(
    sTipo: string, sValor: string) {

    return this.http.get(`${this.baseUrl}/app_buscar_trabajador.php?Tipo=${sTipo}&Valor=${sValor}`);

  }

  BuscarOperacionService(
    nNum_Auditoria: number, sCod_Operacion: string) {

    return this.http.get(`${this.baseUrl}/app_buscar_operacion.php?Num_Auditoria=${nNum_Auditoria}&Cod_Operacion=${sCod_Operacion}`);

  }

  ManAuditoriaService_Tra(
    sFlg_Accion: string, nNum_Auditoria: number, sCodigo: string, sDes_Operacion: string) {

    return this.http.get(`${this.baseUrl}/app_man_auditoria_linea_costura_tra.php?Flg_Accion=${sFlg_Accion}&Num_Auditoria=${nNum_Auditoria}&Cod_Trabajador=${sCodigo}&Des_Operacion=${sDes_Operacion}&Cod_Usuario=${this.sCod_Usuario}`);

  }

  ViewAuditoriaService_Cal(nNum_Auditoria: number, sCodigo: string, sDes_Operacion: string) {

    if (nNum_Auditoria.toString.length == 0) {
      nNum_Auditoria = 0
    }

    return this.http.get(`${this.baseUrl}/app_muestra_auditoria_en_linea_cal.php?Num_Auditoria=${nNum_Auditoria}&Cod_Trabajador=${sCodigo}&Des_Operacion=${sDes_Operacion}&Cod_Usuario=${this.sCod_Usuario}`);
  }

  ManAuditoriaService_Cal(
    nNum_Auditoria: number, sCodigo: string, sDes_Operacion: string,
    srev1_status: string, srev1_abr_motivo: string, nrev1_num_prendas: number,
    srev2_status: string, srev2_abr_motivo: string, nrev2_num_prendas: number,
    srev3_status: string, srev3_abr_motivo: string, nrev3_num_prendas: number, sGlosa: string) {

    if (nNum_Auditoria.toString.length == 0) {
      nNum_Auditoria = 0
    }

    srev1_status = srev1_status.replace(/\s+/g, " ").trim();
    srev2_status = srev2_status.replace(/\s+/g, " ").trim();
    srev3_status = srev3_status.replace(/\s+/g, " ").trim();

    srev1_abr_motivo = srev1_abr_motivo.replace(/\s+/g, " ").trim();
    srev2_abr_motivo = srev2_abr_motivo.replace(/\s+/g, " ").trim();
    srev3_abr_motivo = srev3_abr_motivo.replace(/\s+/g, " ").trim();

    sGlosa = sGlosa.replace(/\s+/g, " ").trim();
    sGlosa = sGlosa.replace("ñ", "n").trim();

    return this.http.get(`${this.baseUrl}/app_man_auditoria_linea_costura_cal.php?Num_Auditoria=${nNum_Auditoria}&Cod_Trabajador=${sCodigo}&Des_Operacion=${sDes_Operacion}&rev1_flg_status=${srev1_status}&rev1_abr_motivo=${srev1_abr_motivo}&rev1_num_prendas=${nrev1_num_prendas}&rev2_flg_status=${srev2_status}&rev2_abr_motivo=${srev2_abr_motivo}&rev2_num_prendas=${nrev2_num_prendas}&rev3_flg_status=${srev3_status}&rev3_abr_motivo=${srev3_abr_motivo}&rev3_num_prendas=${nrev3_num_prendas}&Glosa=${sGlosa}&Cod_Usuario=${this.sCod_Usuario}`);

  }

  BuscarMotivoService(
    sAbr_Motivo: string) {

    return this.http.get(`${this.baseUrl}/app_buscar_motivo_defecto.php?Abr_Motivo=${sAbr_Motivo}`);
  } 

}
