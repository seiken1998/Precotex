import { Component, OnInit, AfterViewInit, inject, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import * as _moment from 'moment';
import { Observable } from 'rxjs';
import { AuditoriaInspeccionCosturaService } from 'src/app/services/auditoria-inspeccion-costura.service';
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
 


interface Auditor {
  Cod_Auditor: string;
  Nom_Auditor: string;
}

@Component({
  selector: 'app-control-activo-fijo',
  templateUrl: './control-activo-fijo.component.html',
  styleUrls: ['./control-activo-fijo.component.scss']
})
export class ControlActivoFijoComponent implements OnInit {

  
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
  Cod_Accion        =   ""
  Num_Auditoria     =   0
  Cod_Supervisor    =   ""
  Nom_Supervisor    =   ""
  Cod_Auditor       =   ""
  Nom_Auditor       =   ""
  Fecha_Auditoria   =   ""
  Fecha_Auditoria2  =   ""
  Cod_LinPro        =   ""
  Observacion       =   ""
  Flg_Status        =   ""
  Cod_Usuario       =   ""
  Cod_Equipo        =   ""
  Fecha_Reg         =   ""	 	
  Cod_OrdPro        =   ""
  Cod_EstCli        =   ""
  Can_Lote          = 0
  Cod_Motivo        = ''

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
    Fijar:            ['']
  })



  constructor(private formBuilder: FormBuilder,
    private matSnackBar: MatSnackBar,
    private auditoriaInspeccionCosturaService: AuditoriaInspeccionCosturaService,
    public dialog: MatDialog,
    private SpinnerService: NgxSpinnerService) {  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void { 
   
  }


  MostrarCabeceraAuditoria() {
    

   
  }


  openDialogDetalle(Cod_LinPro: string, Num_Auditoria: number, Flg_Status: string){
    
  }


  
  /* --------------- LLENAR SELECT AUDITOR ------------------------------------------ */

  CargarOperacionAuditor(){

    
  }
  
  

}

