import { Component, OnInit, AfterViewInit, inject, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import * as _moment from 'moment';
import { Observable } from 'rxjs';
import { ControlActivoFijoService } from 'src/app/services/control-activo-fijo.service';
import { startWith, map, debounceTime } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { NgxSpinnerService }  from "ngx-spinner";
import { DialogEliminarComponent} from 'src/app/components/dialogs/dialog-eliminar/dialog-eliminar.component'
import { GlobalVariable } from 'src/app/VarGlobals';
import {MatAccordion} from '@angular/material/expansion';

interface data_det {
    Num_Auditoria:    number, 
    Cod_Supervisor:   string,
    Nom_Supervisor:   string,
    Cod_Auditor:      String, 
    Nom_Auditor:      string,
    Fecha_Auditoria:  string,
    Cod_LinPro:       string,
    Observacion:      string,
    Flg_Status:       string,
    Cod_Usuario:      string,
    Cod_Equipo:       string,
    Fecha_Reg:        string,	 		

}
 

interface Clase {
  Cod_Categoria: number;
  Nombre_Categoria: string;
}


@Component({
  selector: 'app-control-activo-fijo',
  templateUrl: './control-activo-fijo.component.html',
  styleUrls: ['./control-activo-fijo.component.scss']
})
export class ControlActivoFijoComponent implements OnInit {

  listar_operacionClase: Clase[] = [];
  @ViewChild(MatAccordion) accordion: MatAccordion;
  
  public data_det = [{
    Num_Auditoria:    0,
    Cod_Supervisor:   "",
    Nom_Supervisor:   "",
    Cod_Auditor:      "",
    Nom_Auditor:      "",
    Fecha_Auditoria:  "",
    Cod_LinPro:       "",
    Observacion:      "",
    Flg_Status:       "",
    Cod_Usuario:      "",
    Cod_Equipo:       "",
    Fecha_Reg:        ""	 		
  }]





 // nuevas variables
  panelOpenState = false;
  PanelVehiculo = false;
  PanelMueble = false;
  PanelEquipo = false;

  Cod_Accion        = ""
  Cod_Empresa				= ""
  Planta						= 0
  Piso						  = 0
  Cod_CenCost				= ""
  Cod_Activo				= ""
  Clase_Activo			= 0

      

  disabled = false;

  //* Declaramos formulario para obtener los controles */
  formulario = this.formBuilder.group({
    //-----------NUEVO
    Empresa:          [''],
    Sede:             [''],
    Piso:             [''],
    Ccosto:           [''],
    Responsable:      [''],
    CodAct:           [''],
    ClaseAct:         [''],
    Fijar:            [''],

    
    Descripcion:      [''],
    Marca:            [''],
    Modelo:           [''],
    Serie:            [''],
    Estado:           [''],
    Uso:              [''],
    Observacion:      [''],
    Color:            [''],
    Medidas:          [''],
    Motor:            [''],
    Chasis:           [''],
    Placa:            [''],
    Combustible:      [''],
    Caja:             [''],
    Asiento:          [''],
    Fabricacion:      [''],
    Ejes:             [''],
  })



  constructor(private formBuilder: FormBuilder,
    private matSnackBar: MatSnackBar,
    private controlActivoFijoService: ControlActivoFijoService,
    public dialog: MatDialog,
    private SpinnerService: NgxSpinnerService) {  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void { 
   this.formulario.controls['Responsable'].setValue(GlobalVariable.vusu)
   this.formulario.controls['Responsable'].disable()
   this.CargarOperacionClase()
  }

  FijarCabecera(){
    console.log(this.formulario.get('Fijar')?.value)
    if(this.formulario.get('Fijar')?.value == true){
      this.HabilitarCabecera()
    }
    else{
      this.DeshabilitarCabecera()
    }
  }
 

  DeshabilitarCabecera(){
    this.formulario.controls['Empresa'].disable()
    this.formulario.controls['Sede'].disable()
    this.formulario.controls['Piso'].disable()
    this.formulario.controls['Ccosto'].disable()
    //this.formulario.controls['Responsable'].disable()
    this.formulario.controls['CodAct'].disable()
    this.formulario.controls['ClaseAct'].disable()
  }

  HabilitarCabecera(){
    this.formulario.controls['Empresa'].enable()
    this.formulario.controls['Sede'].enable()
    this.formulario.controls['Piso'].enable()
    this.formulario.controls['Ccosto'].enable()
    //this.formulario.controls['Responsable'].enable()
    this.formulario.controls['CodAct'].enable()
    this.formulario.controls['ClaseAct'].enable()
  }


  CargarOperacionClase(){
    this.Cod_Accion         = "C"
    this.Cod_Empresa				= ""
    this.Planta						  = 0
    this.Piso						    = 0
    this.Cod_CenCost				= ""
    this.Cod_Activo				  = ""
    this.Clase_Activo			  = 0
    this.controlActivoFijoService.MantenimientoControlActivoFijo(
      this.Cod_Accion,   
      this.Cod_Empresa,
      this.Planta,
      this.Piso,
      this.Cod_CenCost,
      this.Cod_Activo	,
      this.Clase_Activo,
    ).subscribe(
      (result: any) => {
        console.log(result)
        this.listar_operacionClase = result
      },
      (err: HttpErrorResponse) => this.matSnackBar.open(err.message, 'Cerrar', { horizontalPosition: 'center', verticalPosition: 'top', duration: 1500 }))
  
    }

    CambiarContenidoDetalle(Cod_Categoria: number){
      console.log(Cod_Categoria)
      const Vehiculo = [1];
      const Mueble = [2];
      const Equipo = [3, 4, 5, 6, 7, 8, 9];
      if(Vehiculo.includes(Cod_Categoria) == true){
        this.PanelVehiculo = true
        this.panelOpenState = true
        this.PanelMueble = false
        this.PanelEquipo = false
      }
      else if (Mueble.includes(Cod_Categoria) == true){
        this.PanelMueble = true
        this.panelOpenState = true
        this.PanelVehiculo = false
        this.PanelEquipo = false
      }
      else if (Equipo.includes(Cod_Categoria) == true){
        this.PanelEquipo = true
        this.panelOpenState = true
        this.PanelVehiculo = false
        this.PanelMueble = false
      }
    }

  
  

} 

