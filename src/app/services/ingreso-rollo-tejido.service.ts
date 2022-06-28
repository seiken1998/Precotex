import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalVariable } from '../VarGlobals';

import * as _moment from 'moment';


@Injectable({
  providedIn: 'root'
})
export class IngresoRolloTejidoService {

  baseUrl = GlobalVariable.baseUrl;
  baseUrlLocal = GlobalVariable.baseUrlLocal;

  sCod_Usuario = GlobalVariable.vusu;

  constructor(private http: HttpClient) { }

  ListarRolloTejidoService(sFec_Despacho: string, sOrden_Servicio: string) {

    if (!_moment(sFec_Despacho).isValid()) {
      sFec_Despacho = '01/01/1900';
    }

    sFec_Despacho = _moment(sFec_Despacho.valueOf()).format('DD/MM/YYYY');

    return this.http.get(`${this.baseUrl}/app_listar_rollo_tejido.php?Fec_Despacho=${sFec_Despacho}&Orden_Servicio=${sOrden_Servicio}&Cod_Usuario=${this.sCod_Usuario}`);
  }

  ListarDetalleRolloTejidoService(sNum_Movstk: string) {

    return this.http.get(`${this.baseUrl}/app_listar_detalle_rollo_tejido.php?Num_Movstk=${sNum_Movstk}&Cod_Usuario=${this.sCod_Usuario}`);
  }



  GenerarMovimientoRolloTejidoService(sCod_Barras: string) {

    return this.http.get(`${this.baseUrl}/app_man_ingreso_rollo_tejido_genera_mov.php?Cod_Barras=${sCod_Barras}&Cod_Usuario=${this.sCod_Usuario}`);

  }

  LecturarBultoRolloTejidoService(sAccion: string, sCod_Almacen: string, sNum_Movstk: string, sCod_Barras: string) {

    return this.http.get(`${this.baseUrl}/app_man_ingreso_rollo_tejido_lectura.php?Accion=${sAccion}&Cod_Almacen=${sCod_Almacen}&Num_Movstk=${sNum_Movstk}&Cod_Barras=${sCod_Barras}&Cod_Usuario=${this.sCod_Usuario}`);

  }

 
}