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
import { Router} from '@angular/router';
import { DialogRegistrarEstadoControlMovmientosJabasComponent} from './dialog-seguridad-control-movimientos-jabas/dialog-registrar-estado-control-movmientos-jabas/dialog-registrar-estado-control-movmientos-jabas.component'
import { DialogConfirmacionComponent} from 'src/app/components/dialogs/dialog-confirmacion/dialog-confirmacion.component';
import { GlobalVariable } from 'src/app/VarGlobals';

interface data_det {
  Cod_Mov_Jaba:     number,
  Cod_Jaba:         number,
  Des_Jaba:         string,
  Cod_Barras:       string,
  Cod_Jaba_Estado:  number,
  Des_Jaba_Estado:  string,
  Observacion:      string,
  Cod_Accion:       string,
  Accion:           string,
  Fec_Registro:     string,
  Fecha:            string,
  Hora:             string,
  Cod_Usuario:      string,
  Cod_Estado:       string
}
@Component({
  selector: 'app-seguridad-control-movimientos-jabas',
  templateUrl: './seguridad-control-movimientos-jabas.component.html',
  styleUrls: ['./seguridad-control-movimientos-jabas.component.scss']
})
export class SeguridadControlMovimientosJabasComponent implements OnInit {
  
  public data_det = [{
    Cod_Mov_Jaba:     0,
    Cod_Jaba:         0,
    Des_Jaba:         '',
    Cod_Barras:       '',
    Cod_Jaba_Estado:  0,
    Des_Jaba_Estado:  '',
    Observacion:      '',
    Cod_Accion:       '',
    Accion:           '',
    Fec_Registro:     '',
    Fecha:            '',
    Hora:             '',
    Cod_Usuario:      '',
    Cod_Estado:       ''
  }]


 // nuevas variables
 Cod_Accion       = ''
 Cod_Mov_Jaba     =  0
 Cod_Jaba         =  0
 Cod_Baras        = ''
 Cod_Jaba_Estado  = 0
 Cod_Estado       = ''
 Observacion      = ''
 Des_Jaba         = ''
 Cod_Barras       = ''
 Operacion        = GlobalVariable.Accion
 Fec_Registro     = ''
 Fecha            = ''
 Hora             = ''
 Cod_Usuario      = ''
 Titulo           = ''
 Cod_Barras_Flg   = ''





 @ViewChild('myinputAdd') inputAdd!: ElementRef;
 @ViewChild('myinputDel') inputDel!: ElementRef;

  //* Declaramos formulario para obtener los controles */
  formulario = this.formBuilder.group({
    bulto_añadir:     [''],
    bulto_eliminar:   [''],
  })



  //displayedColumns_cab: string[] = ['Cod_Registro_Det', 'Des_Jaba', 'Total', 'Fecha','Hora', 'Usuario', 'Acciones']
  displayedColumns_cab: string[] = ['Estado', 'Fecha','Hora', 'Usuario','Acciones']
  dataSource: MatTableDataSource<data_det>;




  constructor(private formBuilder: FormBuilder,
    private matSnackBar: MatSnackBar,
    private seguridadControlJabaService: SeguridadControlJabaService,
    public dialog: MatDialog,
    public router: Router,
    private SpinnerService: NgxSpinnerService,) { this.dataSource = new MatTableDataSource(); }


     
    
  ngOnInit(): void { 
   if(this.Operacion == 'S'){
     this.Titulo = 'Salida'
   }
   else if(this.Operacion == 'I'){
     this.Titulo = 'Ingreso'
   }
  }

  ListarMovimientosJabas() {
    this.SpinnerService.show();
    this.Cod_Accion         = 'L'
    this.Cod_Mov_Jaba       = 0 
    this.Cod_Barras         = this.formulario.get('bulto_añadir')?.value
    this.Cod_Estado         = ''
    this.Observacion        = ''
    this.Operacion          = ''
    this.Fec_Registro       = ''        
    this.seguridadControlJabaService.ListarMovimientosJabas(
      this.Cod_Accion,
      this.Cod_Mov_Jaba,
      this.Cod_Barras,
      this.Cod_Estado,
      this.Observacion,
      this.Operacion,
      this.Fec_Registro
    ).subscribe(
      (result: any) => { 
        if (result.length > 0) {
          console.log(result)
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
 

  DarDeBajaJaba(){
    let dialogRef =  this.dialog.open(DialogConfirmacionComponent, {disableClose: true,data: { }});
      dialogRef.afterClosed().subscribe(result => {
      if (result == 'true') {
        this.Cod_Accion         = 'B'
        this.Cod_Mov_Jaba       = 0
        this.Cod_Barras         
        this.Cod_Estado         = 'C'
        this.Observacion        = ''
        this.Operacion          = ''
        this.Fec_Registro       = ''
        this.seguridadControlJabaService.ListarMovimientosJabas(
          this.Cod_Accion,
          this.Cod_Mov_Jaba,
          this.Cod_Barras,
          this.Cod_Estado,
          this.Observacion,
          this.Operacion,
          this.Fec_Registro
        ).subscribe(
          (result: any) => { 
            if (result[0].Respuesta == 'OK') {
              this.matSnackBar.open("Proceso Correcto..!!", 'Cerrar', { horizontalPosition: 'center', verticalPosition: 'top', duration: 2500 })
              this.Cod_Barras_Flg = ''
              this.dataSource.data = []
              this.inputAdd.nativeElement.focus()
            }
            else {
              this.matSnackBar.open(result[0].Respuesta, 'Cerrar', { horizontalPosition: 'center', verticalPosition: 'top', duration: 2500 })
            }
          },
          (err: HttpErrorResponse) => this.matSnackBar.open(err.message, 'Cerrar', {
            duration: 2500,
          }))
    }}) 
  }
  

  applyEnterAdd(event: any) {
    this.InsertarRegistro()
  }

  applyEnterDel(event: any) {
    this.EliminarRegistroDetalle()
  }

  EliminarRegistroDetalle(){
    alert('eliminar')
  }

  InsertarRegistro() {
    this.Cod_Accion         = 'I'
    this.Cod_Mov_Jaba       = 0
    this.Cod_Barras         = this.formulario.get('bulto_añadir')?.value
    this.Cod_Estado         = 'C'
    this.Observacion        = ''
    this.Operacion          = GlobalVariable.Accion
    this.Fec_Registro       = ''
    this.seguridadControlJabaService.ListarMovimientosJabas(
      this.Cod_Accion,
      this.Cod_Mov_Jaba,
      this.Cod_Barras,
      this.Cod_Estado,
      this.Observacion,
      this.Operacion,
      this.Fec_Registro
    ).subscribe(
      (result: any) => { 
        if (result[0].Respuesta == 'OK') {
         
          this.ListarMovimientosJabas()
          this.matSnackBar.open("Proceso Correcto..!!", 'Cerrar', { horizontalPosition: 'center', verticalPosition: 'top', duration: 2500 })
          this.Cod_Baras = this.formulario.get('bulto_añadir')?.value
          this.Cod_Barras_Flg = this.formulario.get('bulto_añadir')?.value
          this.formulario.controls['bulto_añadir'].setValue('')
          this.inputAdd.nativeElement.focus()
        }
        else {
          this.matSnackBar.open(result[0].Respuesta, 'Cerrar', { horizontalPosition: 'center', verticalPosition: 'top', duration: 2500 })
          this.formulario.controls['bulto_añadir'].setValue('')
          this.Cod_Baras = ''
          this.Cod_Barras_Flg = ''
          this.dataSource.data = []
          this.inputAdd.nativeElement.focus()
        }
      },
      (err: HttpErrorResponse) => this.matSnackBar.open(err.message, 'Cerrar', {
        duration: 2500,
      }))
  }





  ReproducirError() {
    const audio = new Audio('assets/error.mp3');
    audio.play();
  }
 
  ReproducirOk() {
    const audio = new Audio('assets/aceptado.mp3');
    audio.play();
  } 

  clearDate(event) {
    event.stopPropagation();
    this.formulario.controls['Fec_Registro'].setValue('')
  }

  VerDetalle(Cod_Mov_Jaba: number, Cod_Jaba_Estado: number,Cod_Estado: string, Observacion:string){
    let dialogRef =  this.dialog.open(DialogRegistrarEstadoControlMovmientosJabasComponent, { 
      disableClose: true,
      panelClass: 'my-class',
      data: { 
        Cod_Mov_Jaba:     Cod_Mov_Jaba,
        Cod_Jaba_Estado:  Cod_Jaba_Estado,
        Cod_Estado:       Cod_Estado,
        Observacion:      Observacion}});
        dialogRef.afterClosed().subscribe(result => {
          if (result == 'true') { 
            this.ListarMovimientosJabas()

          }})
  
  }


}

