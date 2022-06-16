import { Component, OnInit, AfterViewInit, inject, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import * as _moment from 'moment'; 
import { Observable } from 'rxjs';
import { SeguridadControlJabaService } from 'src/app/services/seguridad-control-jaba.service';
import { startWith, map, debounceTime } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { NgxSpinnerService }  from "ngx-spinner";
import { GlobalVariable } from '../../VarGlobals'; //<==== this one
import { DialogEliminarComponent } from 'src/app/components/dialogs/dialog-eliminar/dialog-eliminar.component';
import { DialogRegistrarCabeceraJabaComponent } from "./dialog-seguridad-control-jaba/dialog-registrar-cabecera-jaba/dialog-registrar-cabecera-jaba.component";

interface data_det {
  Cod_Registro_Cab: number
  Observacion:      string,
  Total:            number,
  Fec_Registro:     string,
  Cod_Usuario:      string,
  Flg_Estado:       string

}
 
@Component({
  selector: 'app-seguridad-control-jaba',
  templateUrl: './seguridad-control-jaba.component.html',
  styleUrls: ['./seguridad-control-jaba.component.scss']
})
export class SeguridadControlJabaComponent implements OnInit {

  //Orden_ServicioMascara = [/[0-9]/i, /[0-9]/i, /[0-9]/i, '-', /[0-9]/i, /[0-9]/i, /[0-9]/i, /[0-9]/i, /[0-9]/i,/[0-9]/i];
  
  
  public data_det = [{
    Cod_Registro_Cab: '',
    Observacion:      '',
    Total:            '',
    Fec_Registro:     '',
    Cod_Usuario:      ''
  }]


 // nuevas variables
 Cod_Accion           = ''
 Cod_Registro_Cab     = 0
 Observacion          = ''
 Total                = 0
 Fec_Registro         = ''
 Cod_Usuario          = ''
 isDisableVerDetalle  = true


  //* Declaramos formulario para obtener los controles */
  formulario = this.formBuilder.group({
    Fec_Registro:   [''],
    Cod_registro: ['']
  })


  displayedColumns_cab: string[] = ['Codigo',  'Total', 'Fec_Registro', 'Cod_Usuario','Observacion', 'Estado', 'Acciones']
  dataSource: MatTableDataSource<data_det>;



  constructor(private formBuilder: FormBuilder,
    private matSnackBar: MatSnackBar,
    private seguridadControlJabaService: SeguridadControlJabaService,
    public dialog: MatDialog,
    private SpinnerService: NgxSpinnerService) { this.dataSource = new MatTableDataSource(); }



  ngOnInit(): void { 
    GlobalVariable.Num_movstk = '';
    this.ListarCabeceraJaba()
  }


 
  clearDate(event) {
    event.stopPropagation();
    this.formulario.controls['Fec_Registro'].setValue('')
  }

  ListarCabeceraJaba() {
    this.SpinnerService.show();
    this.Cod_Accion       = 'L'
    this.Cod_Registro_Cab 
    this.Observacion      = ''
    this.Total            = 0
    this.Fec_Registro     = this.formulario.get('Fec_Registro')?.value
    console.log(this.formulario.get('Fec_Registro')?.value)
    

    this.seguridadControlJabaService.ListarCabeceraJabaService(
      this.Cod_Accion,
      this.Cod_Registro_Cab,
      this.Observacion,
      this.Total,
      this.Fec_Registro
    ).subscribe(
      (result: any) => { 
        if (result.length > 0) {
          //console.log(result)
          this.dataSource.data = result
          this.SpinnerService.hide();
        }
        else {
          this.matSnackBar.open("No existen registros..!!", 'Cerrar', { horizontalPosition: 'center', verticalPosition: 'top', duration: 2500 })
          this.dataSource.data = []
          this.SpinnerService.hide();
        }
      },
      (err: HttpErrorResponse) => this.matSnackBar.open(err.message, 'Cerrar', {
        duration: 2500,
      }))
  }


  AgregarDetalle(){
    GlobalVariable.Cod_Registro_CabG = 0
    GlobalVariable.Flg_Estado = 'N'
  }


  VerDetalle(Cod_Registro_Cab: number, Observacion: string, Flg_Estado: string) {
   // console.log(Cod_Registro_Cab)
    GlobalVariable.Cod_Registro_CabG = Cod_Registro_Cab
    GlobalVariable.ObservacionG = Observacion
    GlobalVariable.Flg_Estado = Flg_Estado
  }

  EliminarRegistroCabecera(Cod_Registro_Cab: number){
    let dialogRef =  this.dialog.open(DialogEliminarComponent, { disableClose: true});
    dialogRef.afterClosed().subscribe(result =>{
    if(result == 'true'){
      this.Cod_Accion       = 'D'
      this.Cod_Registro_Cab = Cod_Registro_Cab
      this.Observacion      = ''
      this.Total            = 0
      this.Fec_Registro     = ''
      this.seguridadControlJabaService.ListarCabeceraJabaService(
        this.Cod_Accion,
        this.Cod_Registro_Cab,
        this.Observacion,
        this.Total,
        this.Fec_Registro
      ).subscribe(
        (result: any) => { 
          if(result[0].Respuesta == 'OK'){
            console.log(result)
            this.ListarCabeceraJaba()
            this.matSnackBar.open("Proceso correcto..!!", 'Cerrar', { horizontalPosition: 'center', verticalPosition: 'top', duration: 2500 })
          }
          else{
            this.matSnackBar.open(result[0].Respuesta, 'Cerrar', { horizontalPosition: 'center', verticalPosition: 'top', duration: 2500 })
          }
  
        
         
        },
        (err: HttpErrorResponse) => this.matSnackBar.open(err.message, 'Cerrar', {
          duration: 2500,
        }))
    }})
  }

  openDialog() {

    let dialogRef = this.dialog.open(DialogRegistrarCabeceraJabaComponent, {
       disableClose: true,
       data: {}
     });
 
     dialogRef.afterClosed().subscribe(result => {
 
       if (result == 'false') {
         this.ListarCabeceraJaba()
       }
  
     })
 
   }

}

