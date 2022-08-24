import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';

import { AuditoriaLineaCosturaComponent } from './components/auditoria-linea-costura/auditoria-linea-costura.component';

import { SeguridadControlGuiaComponent } from  './components/seguridad-control-guia/seguridad-control-guia.component';
import { SeguridadControlGuiaAccionComponent} from './components/seguridad-control-guia/seguridad-control-guia-accion/seguridad-control-guia-accion.component';
import { SeguridadControlGuiaSalidaComponent } from './components/seguridad-control-guia/seguridad-control-guia-salida/seguridad-control-guia-salida.component'
import { SeguridadControlGuiaInternoComponent } from './components/seguridad-control-guia/seguridad-control-guia-interno/seguridad-control-guia-interno.component'
import { SeguridadControlGuiaExternoComponent } from './components/seguridad-control-guia/seguridad-control-guia-externo/seguridad-control-guia-externo.component'
import { SeguridadControlGuiaHistorialComponent } from './components/seguridad-control-guia/seguridad-control-guia-historial/seguridad-control-guia-historial.component'
import { SeguridadControlMemorandumComponent } from './components/seguridad-control-guia/seguridad-control-memorandum/seguridad-control-memorandum.component';
import { SeguridadControlMemorandumDetalleComponent } from './components/seguridad-control-guia/seguridad-control-memorandum/seguridad-control-memorandum-detalle/seguridad-control-memorandum-detalle.component';

import { DespachoTelaCrudaComponent } from './components/despacho-tela-cruda/despacho-tela-cruda.component'
import { DespachoTelaCrudaDetalleComponent } from './components/despacho-tela-cruda/despacho-tela-cruda-detalle/despacho-tela-cruda-detalle.component'

import { PrincipalComponent } from './components/principal/principal.component';


import { SeguridadControlVehiculoComponent } from './components/seguridad-control-vehiculo/seguridad-control-vehiculo.component';
import { SeguridadControlVehiculoAccionComponent } from './components/seguridad-control-vehiculo/seguridad-control-vehiculo-accion/seguridad-control-vehiculo-accion.component';
import { SeguridadControlVehiculoIngresoComponent } from './components/seguridad-control-vehiculo/seguridad-control-vehiculo-ingreso/seguridad-control-vehiculo-ingreso.component';
import { SeguridadControlVehiculoSalidaComponent } from './components/seguridad-control-vehiculo/seguridad-control-vehiculo-salida/seguridad-control-vehiculo-salida.component';
import { SeguridadControlVehiculoHistorialComponent } from './components/seguridad-control-vehiculo/seguridad-control-vehiculo-historial/seguridad-control-vehiculo-historial.component';
import { SeguridadControlVehiculoRegistroVehiculoComponent } from './components/seguridad-control-vehiculo/seguridad-control-vehiculo-registro-vehiculo/seguridad-control-vehiculo-registro-vehiculo.component';
import { SeguridadControlVehiculoReporteComponent } from './components/seguridad-control-vehiculo/seguridad-control-vehiculo-reporte/seguridad-control-vehiculo-reporte.component';
import { SeguridadControlVehiculoRegistroConductorComponent } from './components/seguridad-control-vehiculo/seguridad-control-vehiculo-registro-conductor/seguridad-control-vehiculo-registro-conductor.component';

import { SeguridadControlJabasComponent } from './components/seguridad-control-jabas/seguridad-control-jabas.component';
import { SeguridadControlJabasAccionComponent } from './components/seguridad-control-jabas/seguridad-control-jabas-accion/seguridad-control-jabas-accion.component';
import { SeguridadControlJabasSalidaComponent } from './components/seguridad-control-jabas/seguridad-control-jabas-salida/seguridad-control-jabas-salida.component';
import { SeguridadControlJabasInternoComponent } from './components/seguridad-control-jabas/seguridad-control-jabas-interno/seguridad-control-jabas-interno.component';
import { SeguridadControlJabasExternoComponent } from './components/seguridad-control-jabas/seguridad-control-jabas-externo/seguridad-control-jabas-externo.component';
import { SeguridadControlJabasHistorialComponent } from './components/seguridad-control-jabas/seguridad-control-jabas-historial/seguridad-control-jabas-historial.component';


import { DefectosAlmacenDerivadosComponent } from './components/defectos-almacen-derivados/defectos-almacen-derivados.component';
import { ReporteDefectosAlmacenDerivadosComponent } from './components/defectos-almacen-derivados/reporte-almacen-derivado/reporte-defectos-almacen-derivados/reporte-defectos-almacen-derivados.component';
import { ReporteDefectosTotalesDerivadosComponent} from  './components/defectos-almacen-derivados/reporte-almacen-derivado/reporte-defectos-totales-derivados/reporte-defectos-totales-derivados.component'
import { AuditoriaDefectoDerivadoComponent} from './components/auditoria-defecto-derivado/auditoria-defecto-derivado.component'


import { MovimientoInspeccionComponent } from './components/movimiento-inspeccion/movimiento-inspeccion.component';
import { AuditoriaInspeccionCosturaComponent } from './components/auditoria-inspeccion-costura/auditoria-inspeccion-costura.component';


import { IngresoRolloTejidoComponent} from './components/ingreso-rollo-tejido/ingreso-rollo-tejido.component'
import { IngresoRolloTejidoDetalleComponent} from './components/ingreso-rollo-tejido/ingreso-rollo-tejido-detalle/ingreso-rollo-tejido-detalle.component';

import { AuditoriaHojaMedidaComponent} from './components/auditoria-hoja-medida/auditoria-hoja-medida.component'
import { AuditoriaHojaMedidaDetalleComponent } from './components/auditoria-hoja-medida/auditoria-hoja-medida-detalle/auditoria-hoja-medida-detalle.component';

import { SeguridadControlJabaComponent} from './components/seguridad-control-jaba/seguridad-control-jaba.component'
import { RegistrarSeguridadControlJabaComponent} from './components/seguridad-control-jaba/registrar-seguridad-control-jaba/registrar-seguridad-control-jaba.component'
import { RegistrarDetalleSeguridadControlJabaComponent} from './components/seguridad-control-jaba/registrar-detalle-seguridad-control-jaba/registrar-detalle-seguridad-control-jaba.component'
import { SeguridadControlMovimientosJabasComponent} from './components/seguridad-control-movimientos-jabas/seguridad-control-movimientos-jabas.component'
import { SeguridadControlMovimientosJabasAccionComponent} from './components/seguridad-control-movimientos-jabas/seguridad-control-movimientos-jabas-accion/seguridad-control-movimientos-jabas-accion.component'

import { DespachoOpIncompletaComponent} from './components/despacho-op-incompleta/despacho-op-incompleta.component'

import { ControlActivoFijoComponent} from './components/control-activo-fijo/control-activo-fijo.component'

import { InspeccionPrendaComponent} from './components/inspeccion-prenda/inspeccion-prenda.component'
import { ReinspeccionPrendaComponent} from './components/reinspeccion-prenda/reinspeccion-prenda.component'
import { InspeccionPrendaHabilitadorComponent} from './components/inspeccion-prenda-habilitador/inspeccion-prenda-habilitador.component'

import { PermitirGiradoOpComponent} from './components/permitir-girado-op/permitir-girado-op.component'

const routes: Routes = [
  { path: "root", component: AppComponent },
  { path: "principal", component: PrincipalComponent },
  { path: "menu", component: MenuComponent },

  { path: "AuditoriaLineaCostura", component: AuditoriaLineaCosturaComponent },

  { path: "SeguridadControlGuia", component: SeguridadControlGuiaComponent },
  { path: "SeguridadControlGuiaAccion", component: SeguridadControlGuiaAccionComponent },
  { path: "SeguridadControlGuiaSalida", component: SeguridadControlGuiaSalidaComponent },
  { path: "SeguridadControlGuiaInterno", component: SeguridadControlGuiaInternoComponent },
  { path: "SeguridadControlGuiaExterno", component: SeguridadControlGuiaExternoComponent },
  { path: "SeguridadControlMemorandum", component: SeguridadControlMemorandumComponent },
  { path: "SeguridadControlMemorandumDetalle", component: SeguridadControlMemorandumDetalleComponent },  
  { path: "SeguridadControlGuiaHistorial", component: SeguridadControlGuiaHistorialComponent },

  { path: "DespachoTelaCruda", component: DespachoTelaCrudaComponent },
  { path: "DespachoTelaCrudaDetalle", component: DespachoTelaCrudaDetalleComponent},

  { path: "SeguridadControlVehiculo", component: SeguridadControlVehiculoComponent},
  { path: "SeguridadControlVehiculoAccion", component: SeguridadControlVehiculoAccionComponent},
  { path: "SeguridadControlVehiculoIngreso", component: SeguridadControlVehiculoIngresoComponent},
  { path: "SeguridadControlVehiculoSalida", component: SeguridadControlVehiculoSalidaComponent},
  { path: "SeguridadControlVehiculoHistorial", component: SeguridadControlVehiculoHistorialComponent},
  { path: "SeguridadControlVehiculoRegistroVehiculo", component: SeguridadControlVehiculoRegistroVehiculoComponent},
  { path: "SeguridadControlVehiculoRegistroConductor", component: SeguridadControlVehiculoRegistroConductorComponent},
  { path: "SeguridadControlVehiculoReporte", component: SeguridadControlVehiculoReporteComponent},

  { path: "SeguridadControlJabas", component: SeguridadControlJabasComponent},
  { path: "SeguridadControlJabaAccion", component:  SeguridadControlJabasAccionComponent},
  { path: "SeguridadControlJabaSalida", component:  SeguridadControlJabasSalidaComponent},
  { path: "SeguridadControlJabaInterno", component: SeguridadControlJabasInternoComponent},
  { path: "SeguridadControlJabaExterno", component: SeguridadControlJabasExternoComponent},
  { path: "SeguridadControlJabaHistorial", component: SeguridadControlJabasHistorialComponent},

  { path: "DefectosAlamacenDerivados", component:DefectosAlmacenDerivadosComponent},
  { path: "ReporteDefectosAlmacenDerivados", component:ReporteDefectosAlmacenDerivadosComponent},
  { path: "ReporteDefectosTotalesDerivados", component:ReporteDefectosTotalesDerivadosComponent},
  { path: "AuditoriaDefectoDerivado", component: AuditoriaDefectoDerivadoComponent},

  { path: "MovimientoInspeccion" , component:MovimientoInspeccionComponent},
  { path: "AuditoriaInspeccionCostura", component: AuditoriaInspeccionCosturaComponent},

  { path: "IngresoRolloTejido", component: IngresoRolloTejidoComponent},
  { path: "IngresoRolloTejidoDetalle", component: IngresoRolloTejidoDetalleComponent},

  { path: "AuditoriaHojaMedida", component: AuditoriaHojaMedidaComponent},
  { path: "AuditoriaHojaMedidaDetalle", component: AuditoriaHojaMedidaDetalleComponent},

  { path: "SeguridadControlJaba", component: SeguridadControlJabaComponent},
  { path: "RegistrarSeguridadControlJaba", component: RegistrarSeguridadControlJabaComponent},
  { path: "RegistrarDetalleSeguridadControlJaba", component: RegistrarDetalleSeguridadControlJabaComponent},
  { path: "SeguridadControlMovimientosJabas", component: SeguridadControlMovimientosJabasComponent},
  { path: "SeguridadControlMovimientosJabasAccion", component: SeguridadControlMovimientosJabasAccionComponent},

  { path: "GiradoPartidaIncompleta", component: DespachoOpIncompletaComponent},

  { path: "ControlActivoFijo", component: ControlActivoFijoComponent},

  {path: "InspeccionPrenda", component: InspeccionPrendaComponent},
  {path: "AuditoriainspeccionPrenda", component: ReinspeccionPrendaComponent},
  {path: "InspeccionPrendaHabilitador", component: InspeccionPrendaHabilitadorComponent},

  {path: "PermitirGiradoOp", component: PermitirGiradoOpComponent},
  
  { path: "", redirectTo: "/", pathMatch: "full" },// Cuando es la raíz
  //{ path: "**", component: AuditoriaLineaCosturaComponent }
  { path: "**", redirectTo: "/principal" }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routing = RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' });