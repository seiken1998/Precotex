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
import { DialogRegistrarGiradoOpComponent} from 'src/app/components/permitir-girado-op/dialog-registrar-girado-op/dialog-registrar-girado-op.component'
import { GlobalVariable } from '../../VarGlobals'; //<==== this one
import { ExceljsService } from 'src/app/services/exceljs.service';
import {SelectionModel} from '@angular/cdk/collections';

interface data_det {
    Num_Grupo:                number,
    EstCli:                   string,
    Cod_OrdPro:               string,
    Cod_Present:              string,
    Partida:                  string,
    Flg_Aprobado:             string,
    Nom_Motivo:               string,
    Cod_Usuario:              string,
    Fec_Creacion:             string,
    Cod_Usuario_Aprobacion:   string,
    Fec_Creacion_Aprobacion:  string

}
 

@Component({
  selector: 'app-permitir-girado-op',
  templateUrl: './permitir-girado-op.component.html',
  styleUrls: ['./permitir-girado-op.component.scss']
})
export class PermitirGiradoOpComponent implements OnInit {
 
   
  public data_det = [{
    Num_Grupo:                0,
    Cod_OrdPro:               "",
    Cod_Present:              "",
    Flg_Aprobado:             "",
    Nom_Motivo:               "",
    Cod_Usuario:              "",
    Fec_Creacion:             "",
    Cod_Usuario_Aprobacion:   "",
    Fec_Creacion_Aprobacion:  "",
  }]
 

  Cod_Accion                = ''
  Num_Grupo                 = 0
  Cod_OrdPro                = ""
  Cod_Present               = 0
  Des_Present               = ""
  Flg_Aprobado              = ""
  Nom_Motivo                = ""
  Cod_Usuario               = ""
  Fec_Creacion              = ""
  Cod_Usuario_Aprobacion    = ""
  Fec_Creacion_Aprobacion   = ""
  Id_Motivo                 = 0
  Fec_Inicio                = ''
  Fec_Fin                   = ''
  dataForExcel              = []
  Cod_OrdTra                = ""
    
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  //* Declaramos formulario para obtener los controles */
  formulario = this.formBuilder.group({
    //-----------NUEVO
    Cod_OrdPro: [''],
  })


  displayedColumns_cab: string[] = ['Num_Grupo','EstCli','Cod_OrdPro','Cod_Present','Partida','Flg_Aprobado','Nom_Motivo','Cod_Usuario','Fec_Creacion','Cod_Usuario_Aprobacion','Fec_Creacion_Aprobacion','Acciones']
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
  
  clearDate(event) {
    event.stopPropagation();
    this.range.controls['start'].setValue('')
    this.range.controls['end'].setValue('')
  }

  generateExcel(){
    this.SpinnerService.show();
    this.Cod_Accion           = 'V'
    this.Num_Grupo            = 0
    this.Cod_OrdPro           = this.formulario.get('Cod_OrdPro')?.value
    this.Cod_Present          = 0
    this.Cod_OrdTra           = ""
    this.Id_Motivo            = 0
    this.Fec_Inicio     = this.range.get('start')?.value
    this.Fec_Fin        = this.range.get('end')?.value
    this.despachoOpIncompletaService.Ti_Man_Aprobacion_Despacho_Cod_OrdPro(
      this.Cod_Accion,
      this.Num_Grupo,
      this.Cod_OrdPro,
      this.Cod_Present,
      this.Cod_OrdTra,
      this.Id_Motivo,
      this.Fec_Inicio,
      this.Fec_Fin  
      ).subscribe(
        (result: any) => {
          console.log(result)
        if(result[0].Respuesta){
          this.matSnackBar.open(result[0].Respuesta, 'Cerrar', { horizontalPosition: 'center',  verticalPosition: 'top',duration: 1500 })
          this.SpinnerService.hide();
          
        }else{
          result.forEach((row: any) => {
            this.dataForExcel.push(Object.values(row)) 
          })
      
          let reportData = {
            title: 'REPORTE PERMITIR GIRADO OP',
            data: this.dataForExcel,
            headers: Object.keys(result[0])
          }
      
          this.exceljsService.exportExcel(reportData);
          this.dataForExcel = []
          this.SpinnerService.hide();
        }

        },
        (err: HttpErrorResponse) => this.matSnackBar.open(err.message, 'Cerrar', {
          duration: 1500,
        }))


  }

  listarCabecera(){
    this.SpinnerService.show();
    this.Cod_Accion           = 'V'
    this.Num_Grupo            = 0
    this.Cod_OrdPro           = this.formulario.get('Cod_OrdPro')?.value
    this.Cod_Present          = 0
    this.Cod_OrdTra           = ""
    this.Id_Motivo            = 0
    this.Fec_Inicio     = this.range.get('start')?.value
    this.Fec_Fin        = this.range.get('end')?.value
    this.despachoOpIncompletaService.Ti_Man_Aprobacion_Despacho_Cod_OrdPro(
      this.Cod_Accion,
      this.Num_Grupo,
      this.Cod_OrdPro,
      this.Cod_Present,
      this.Cod_OrdTra,
      this.Id_Motivo,
      this.Fec_Inicio,
      this.Fec_Fin 
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


  aprobarDespacho(Num_Grupo: number, Flg_Aprobado: string){
    let dialogRef =  this.dialog.open(DialogRegistrarGiradoOpComponent, { 
      disableClose: true,
      panelClass: 'my-class',
      maxWidth: '98vw',
      maxHeight: '98vh',
      
      data: { Num_Grupo: Num_Grupo,
              Estado: Flg_Aprobado
  }});
    dialogRef.afterClosed().subscribe(result =>{
    if(result == 'true'){
      this.listarCabecera() 
    }})
  }

}


