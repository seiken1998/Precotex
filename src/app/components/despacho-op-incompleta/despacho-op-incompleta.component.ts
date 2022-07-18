import { Component, OnInit, AfterViewInit, inject, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import * as _moment from 'moment';
import { Observable } from 'rxjs';
import { DespachoOpIncompletaService} from 'src/app/services/despacho-op-incompleta.service'
import { startWith, map, debounceTime } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { NgxSpinnerService }  from "ngx-spinner";
import { DialogDespachoOpIncompletaComponent} from 'src/app/components/despacho-op-incompleta/dialog-despacho-op-incompleta/dialog-despacho-op-incompleta.component'
import { GlobalVariable } from '../../VarGlobals'; //<==== this one
import { ExceljsService } from 'src/app/services/exceljs.service';
import {SelectionModel} from '@angular/cdk/collections';

interface data_det {
    Cod_Ordtra:               string,
    Flg_Aprobado:             string,
    Nom_Motivo:               string,
    Cod_Usuario:              string,
    Fec_Creacion:             string,
    Cod_Usuario_Aprobacion:   string,
    Fec_Creacion_Aprobacion:  string

}
 
@Component({
  selector: 'app-despacho-op-incompleta',
  templateUrl: './despacho-op-incompleta.component.html',
  styleUrls: ['./despacho-op-incompleta.component.scss']
})
export class DespachoOpIncompletaComponent implements OnInit {

   
  public data_det = [{
    Cod_Ordtra:               "",
    Flg_Aprobado:             "",
    Nom_Motivo:               "",
    Cod_Usuario:              "",
    Fec_Creacion:             "",
    Cod_Usuario_Aprobacion:   "",
    Fec_Creacion_Aprobacion:  ""
  }]


  Cod_Accion              = ''
  Cod_Ordtra              = ''
  Flg_Aprobado            = ''
  Nom_Motivo              = ''
  Cod_Usuario             = ''
  Fec_Creacion            = ''
  Cod_Usuario_Aprobacion  = ''
  Fec_Creacion_Aprobacion = ''
  Id_Motivo: 0


   


  //* Declaramos formulario para obtener los controles */
  formulario = this.formBuilder.group({
    //-----------NUEVO
    Cod_Ordtra: [''],
  })


  displayedColumns_cab: string[] = ['Cod_Ordtra','Flg_Aprobado','Nom_Motivo','Cod_Usuario','Fec_Creacion','Cod_Usuario_Aprobacion','Fec_Creacion_Aprobacion','Acciones']
  dataSource: MatTableDataSource<data_det>;

 

  constructor(private formBuilder: FormBuilder, 
    private matSnackBar: MatSnackBar,
    private despachoOpIncompletaService: DespachoOpIncompletaService,
    public dialog: MatDialog,
    private SpinnerService: NgxSpinnerService,
    private exceljsService:ExceljsService) { this.dataSource = new MatTableDataSource(); }



  ngOnInit(): void { 
      this.listarCabecera()
    } 
 

  listarCabecera(){
    this.SpinnerService.show();
    this.Cod_Accion           = 'V'
    this.Cod_Ordtra           = this.formulario.get('Cod_Ordtra')?.value
    this.Id_Motivo            = 0
    this.despachoOpIncompletaService.MantenimientoDespachoOpIncompleta(
      this.Cod_Accion,
      this.Cod_Ordtra,
      this.Id_Motivo         
      ).subscribe(
      (result: any) => {
        console.log(result) 
        if (result.length > 0) {
          this.dataSource.data = result
          this.SpinnerService.hide();
        
        }else{
          this.matSnackBar.open("No se encontraron registros...", 'Cerrar', { horizontalPosition: 'center', verticalPosition: 'top', duration: 1500 })
          this.dataSource.data = []
          this.SpinnerService.hide();
        }
      },
      (err: HttpErrorResponse) => this.matSnackBar.open(err.message, 'Cerrar', { horizontalPosition: 'center', verticalPosition: 'top', duration: 1500 }))
      
  }


  aprobarDespacho(Cod_Ordtra: string){
    let dialogRef =  this.dialog.open(DialogDespachoOpIncompletaComponent, { 
      disableClose: true,
      panelClass: 'my-class',
      data: { Cod_Ordtra: Cod_Ordtra
  }});
    dialogRef.afterClosed().subscribe(result =>{
    if(result == 'true'){
      this.listarCabecera()
    }})
  }

}


