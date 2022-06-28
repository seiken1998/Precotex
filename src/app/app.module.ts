import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../app/material.module';
import { MenuComponent } from './components/menu/menu.component';
import { AuditoriaLineaCosturaComponent } from './components/auditoria-linea-costura/auditoria-linea-costura.component';
import { PrincipalComponent } from './components/principal/principal.component'

import { MAT_DATE_FORMATS } from '@angular/material/core';

import { MY_DATE_FORMATS } from '../app/my-date-formats';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { SeguridadControlGuiaComponent } from './components/seguridad-control-guia/seguridad-control-guia.component';
import { SeguridadControlGuiaSalidaComponent } from './components/seguridad-control-guia/seguridad-control-guia-salida/seguridad-control-guia-salida.component';
import { SeguridadControlGuiaAccionComponent } from './components/seguridad-control-guia/seguridad-control-guia-accion/seguridad-control-guia-accion.component';
import { SeguridadControlGuiaInternoComponent } from './components/seguridad-control-guia/seguridad-control-guia-interno/seguridad-control-guia-interno.component';
import { SeguridadControlGuiaExternoComponent } from './components/seguridad-control-guia/seguridad-control-guia-externo/seguridad-control-guia-externo.component';
import { SeguridadControlGuiaHistorialComponent } from './components/seguridad-control-guia/seguridad-control-guia-historial/seguridad-control-guia-historial.component';
import { DespachoTelaCrudaComponent } from './components/despacho-tela-cruda/despacho-tela-cruda.component';
import { TextMaskModule } from 'angular2-text-mask';
import { DespachoTelaCrudaDetalleComponent } from './components/despacho-tela-cruda/despacho-tela-cruda-detalle/despacho-tela-cruda-detalle.component';
import { SeguridadControlMemorandumComponent } from './components/seguridad-control-guia/seguridad-control-memorandum/seguridad-control-memorandum.component';
import { SeguridadControlMemorandumDetalleComponent } from './components/seguridad-control-guia/seguridad-control-memorandum/seguridad-control-memorandum-detalle/seguridad-control-memorandum-detalle.component';
import { SeguridadControlVehiculoComponent } from './components/seguridad-control-vehiculo/seguridad-control-vehiculo.component';
import { SeguridadControlVehiculoAccionComponent } from './components/seguridad-control-vehiculo/seguridad-control-vehiculo-accion/seguridad-control-vehiculo-accion.component';
import { SeguridadControlVehiculoIngresoComponent } from './components/seguridad-control-vehiculo/seguridad-control-vehiculo-ingreso/seguridad-control-vehiculo-ingreso.component';
import { SeguridadControlVehiculoHistorialComponent } from './components/seguridad-control-vehiculo/seguridad-control-vehiculo-historial/seguridad-control-vehiculo-historial.component';
import { SeguridadControlVehiculoSalidaComponent } from './components/seguridad-control-vehiculo/seguridad-control-vehiculo-salida/seguridad-control-vehiculo-salida.component';
import { SeguridadControlJabasComponent } from './components/seguridad-control-jabas/seguridad-control-jabas.component';
import { SeguridadControlJabasAccionComponent } from './components/seguridad-control-jabas/seguridad-control-jabas-accion/seguridad-control-jabas-accion.component';
import { SeguridadControlJabasSalidaComponent } from './components/seguridad-control-jabas/seguridad-control-jabas-salida/seguridad-control-jabas-salida.component';
import { SeguridadControlJabasExternoComponent } from './components/seguridad-control-jabas/seguridad-control-jabas-externo/seguridad-control-jabas-externo.component';
import { SeguridadControlJabasInternoComponent } from './components/seguridad-control-jabas/seguridad-control-jabas-interno/seguridad-control-jabas-interno.component';
import { DialogJabaComponent } from './components/seguridad-control-jabas/dialog-jaba/dialog-jaba.component';
import { SeguridadControlJabasHistorialComponent } from './components/seguridad-control-jabas/seguridad-control-jabas-historial/seguridad-control-jabas-historial.component';
import { DefectosAlmacenDerivadosComponent } from './components/defectos-almacen-derivados/defectos-almacen-derivados.component';
import { DialogDerivadosComponent } from './components/defectos-almacen-derivados/dialog-almacen-derivado/dialog-derivados/dialog-derivados.component';

import { DialogEliminarComponent } from './components/dialogs/dialog-eliminar/dialog-eliminar.component';
import { DialogDerivadosModificarComponent } from './components/defectos-almacen-derivados/dialog-almacen-derivado/dialog-derivados-modificar/dialog-derivados-modificar.component';
import { SeguridadControlVehiculoRegistroVehiculoComponent } from './components/seguridad-control-vehiculo/seguridad-control-vehiculo-registro-vehiculo/seguridad-control-vehiculo-registro-vehiculo.component';
import { SeguridadControlVehiculoRegistroConductorComponent } from './components/seguridad-control-vehiculo/seguridad-control-vehiculo-registro-conductor/seguridad-control-vehiculo-registro-conductor.component';
import { DialogVehiculoRegistrarComponent } from './components/seguridad-control-vehiculo/dialog-vehiculo/dialog-vehiculo-registrar/dialog-vehiculo-registrar.component';
import { ReporteDefectosAlmacenDerivadosComponent } from './components/defectos-almacen-derivados/reporte-almacen-derivado/reporte-defectos-almacen-derivados/reporte-defectos-almacen-derivados.component';

import { NgxSpinnerModule } from "ngx-spinner";
import { DialogConfirmacionComponent } from './components/dialogs/dialog-confirmacion/dialog-confirmacion.component';
import { DialogVehiculoRegistrarVehiculoComponent } from './components/seguridad-control-vehiculo/dialog-vehiculo/dialog-vehiculo-registrar-vehiculo/dialog-vehiculo-registrar-vehiculo.component';
import { DialogDerivadosTotalComponent } from './components/defectos-almacen-derivados/dialog-almacen-derivado/dialog-derivados-total/dialog-derivados-total.component';
import { MovimientoInspeccionComponent } from './components/movimiento-inspeccion/movimiento-inspeccion.component';
import { ReporteDefectosTotalesDerivadosComponent } from './components/defectos-almacen-derivados/reporte-almacen-derivado/reporte-defectos-totales-derivados/reporte-defectos-totales-derivados.component';
import { DialogDerivadosObservacionComponent } from './components/defectos-almacen-derivados/dialog-almacen-derivado/dialog-derivados-observacion/dialog-derivados-observacion.component';
import { DialogDerivadosReportexdiaComponent } from './components/defectos-almacen-derivados/dialog-almacen-derivado/dialog-derivados-reportexdia/dialog-derivados-reportexdia.component';
import { AuditoriaInspeccionCosturaComponent } from './components/auditoria-inspeccion-costura/auditoria-inspeccion-costura.component';
import { DialogRegistrarCabeceraComponent } from './components/auditoria-inspeccion-costura/dialog-auditoria-inspeccion-costura/dialog-registrar-cabecera/dialog-registrar-cabecera.component';
import { DialogRegistrarDetalleComponent } from './components/auditoria-inspeccion-costura/dialog-auditoria-inspeccion-costura/dialog-registrar-detalle/dialog-registrar-detalle.component';
import { DialogListaDetalleComponent } from './components/auditoria-inspeccion-costura/dialog-auditoria-inspeccion-costura/dialog-lista-detalle/dialog-lista-detalle.component';
import { AuditoriaDefectoDerivadoComponent } from './components/auditoria-defecto-derivado/auditoria-defecto-derivado.component';
import { DialogListaSubDetalleComponent } from './components/auditoria-inspeccion-costura/dialog-auditoria-inspeccion-costura/dialog-lista-sub-detalle/dialog-lista-sub-detalle.component';
import { DialogRegistrarSubDetalleComponent } from './components/auditoria-inspeccion-costura/dialog-auditoria-inspeccion-costura/dialog-registrar-sub-detalle/dialog-registrar-sub-detalle.component';
import { SeguridadControlVehiculoReporteComponent } from './components/seguridad-control-vehiculo/seguridad-control-vehiculo-reporte/seguridad-control-vehiculo-reporte.component';
import { IngresoRolloTejidoComponent } from './components/ingreso-rollo-tejido/ingreso-rollo-tejido.component';
import { IngresoRolloTejidoDetalleComponent } from './components/ingreso-rollo-tejido/ingreso-rollo-tejido-detalle/ingreso-rollo-tejido-detalle.component';
import { MenuItemComponent } from './components/menu/menu-item/menu-item.component';
import { AuditoriaHojaMedidaComponent } from './components/auditoria-hoja-medida/auditoria-hoja-medida.component';
import { AuditoriaHojaMedidaDetalleComponent } from './components/auditoria-hoja-medida/auditoria-hoja-medida-detalle/auditoria-hoja-medida-detalle.component';
import { SeguridadControlJabaComponent } from './components/seguridad-control-jaba/seguridad-control-jaba.component';
import { DialogRegistrarCabeceraJabaComponent} from './components/seguridad-control-jaba/dialog-seguridad-control-jaba/dialog-registrar-cabecera-jaba/dialog-registrar-cabecera-jaba.component';
import { RegistrarSeguridadControlJabaComponent } from './components/seguridad-control-jaba/registrar-seguridad-control-jaba/registrar-seguridad-control-jaba.component';
import { RegistrarDetalleSeguridadControlJabaComponent } from './components/seguridad-control-jaba/registrar-detalle-seguridad-control-jaba/registrar-detalle-seguridad-control-jaba.component';
import { DialogColorRegistrarDetalleComponent } from './components/seguridad-control-jaba/dialog-seguridad-control-jaba/dialog-color-registrar-detalle/dialog-color-registrar-detalle.component';
import { DialogTallaRegistrarDetalleComponent } from './components/seguridad-control-jaba/dialog-seguridad-control-jaba/dialog-talla-registrar-detalle/dialog-talla-registrar-detalle.component';
import { DialogCantidadRegistrarDetalleComponent } from './components/seguridad-control-jaba/dialog-seguridad-control-jaba/dialog-cantidad-registrar-detalle/dialog-cantidad-registrar-detalle.component';
import { DialogAdicionalComponent } from './components/dialogs/dialog-adicional/dialog-adicional.component';
import { SeguridadControlMovimientosJabasComponent } from './components/seguridad-control-movimientos-jabas/seguridad-control-movimientos-jabas.component';

import { ToastrModule } from 'ngx-toastr';
import { HttpErrorInterceptor } from './interceptors/http-error-response.service';
import { SeguridadControlMovimientosJabasAccionComponent } from './components/seguridad-control-movimientos-jabas/seguridad-control-movimientos-jabas-accion/seguridad-control-movimientos-jabas-accion.component';
import { DialogRegistrarEstadoControlMovmientosJabasComponent } from './components/seguridad-control-movimientos-jabas/dialog-seguridad-control-movimientos-jabas/dialog-registrar-estado-control-movmientos-jabas/dialog-registrar-estado-control-movmientos-jabas.component';

import { AgGridModule} from 'ag-grid-angular';
import { DialogRegistroHojaMedidaComponent } from './components/auditoria-hoja-medida/dialog-auditoria-hoja-medida/dialog-registro-hoja-medida/dialog-registro-hoja-medida.component';
import { DialogObservacionHojaMedidaComponent } from './components/auditoria-hoja-medida/dialog-auditoria-hoja-medida/dialog-observacion-hoja-medida/dialog-observacion-hoja-medida.component'

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    AuditoriaLineaCosturaComponent,
    PrincipalComponent,
    SeguridadControlGuiaComponent,
    SeguridadControlGuiaSalidaComponent,
    SeguridadControlGuiaAccionComponent,
    SeguridadControlGuiaInternoComponent,
    SeguridadControlGuiaExternoComponent,
    SeguridadControlGuiaHistorialComponent,
    DespachoTelaCrudaComponent,
    DespachoTelaCrudaDetalleComponent,
    SeguridadControlMemorandumComponent,
    SeguridadControlMemorandumDetalleComponent,
    SeguridadControlVehiculoComponent,
    SeguridadControlVehiculoAccionComponent,
    SeguridadControlVehiculoIngresoComponent,
    SeguridadControlVehiculoHistorialComponent,
    SeguridadControlVehiculoSalidaComponent,
    SeguridadControlJabasComponent,
    SeguridadControlJabasAccionComponent,
    SeguridadControlJabasSalidaComponent,
    SeguridadControlJabasExternoComponent,
    SeguridadControlJabasInternoComponent,
    DialogJabaComponent,
    SeguridadControlJabasHistorialComponent,
    DefectosAlmacenDerivadosComponent,
    DialogDerivadosComponent,
    DialogEliminarComponent,
    DialogDerivadosModificarComponent,
    SeguridadControlVehiculoRegistroVehiculoComponent,
    SeguridadControlVehiculoRegistroConductorComponent,
    DialogVehiculoRegistrarComponent,
    ReporteDefectosAlmacenDerivadosComponent,
    DialogConfirmacionComponent,
    DialogVehiculoRegistrarVehiculoComponent,
    DialogDerivadosTotalComponent,
    MovimientoInspeccionComponent,
    ReporteDefectosTotalesDerivadosComponent,
    DialogDerivadosObservacionComponent,
    DialogDerivadosReportexdiaComponent,
    AuditoriaInspeccionCosturaComponent,
    DialogRegistrarCabeceraComponent,
    DialogRegistrarDetalleComponent,
    DialogListaDetalleComponent,
    AuditoriaDefectoDerivadoComponent,
    DialogListaSubDetalleComponent,
    DialogRegistrarSubDetalleComponent,
    SeguridadControlVehiculoReporteComponent,
    IngresoRolloTejidoComponent,
    IngresoRolloTejidoDetalleComponent,
    MenuItemComponent,
    AuditoriaHojaMedidaComponent,
    AuditoriaHojaMedidaDetalleComponent,
    SeguridadControlJabaComponent,
    DialogRegistrarCabeceraJabaComponent,
    RegistrarSeguridadControlJabaComponent,
    RegistrarDetalleSeguridadControlJabaComponent,
    DialogColorRegistrarDetalleComponent,
    DialogTallaRegistrarDetalleComponent,
    DialogCantidadRegistrarDetalleComponent,
    DialogAdicionalComponent,
    SeguridadControlMovimientosJabasComponent,
    SeguridadControlMovimientosJabasAccionComponent,
    DialogRegistrarEstadoControlMovmientosJabasComponent,
    DialogRegistroHojaMedidaComponent,
    DialogObservacionHojaMedidaComponent
   
    
 
  ], 
  entryComponents: [DialogJabaComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    TextMaskModule,
    AgGridModule,
    NgxSpinnerModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
  
 
  ],
  
 
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    { provide: LocationStrategy, useClass: HashLocationStrategy},
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true}
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
