import { Component, OnInit, ViewChild, ElementRef, Inject, Renderer2, AfterViewInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { GlobalVariable } from '../../../../VarGlobals';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SeguridadControlJabaService } from 'src/app/services/seguridad-control-jaba.service'
import * as _moment from 'moment';
import { HttpErrorResponse } from '@angular/common/http';
import { map, Observable, startWith } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

interface data{
 Cod_Mov_Jaba:    number,
 Cod_Jaba_Estado: number,
 Cod_Estado:      string, 
 Observacion:     string, 
   
}
 
  
 

@Component({
  selector: 'app-dialog-registrar-estado-control-movmientos-jabas',
  templateUrl: './dialog-registrar-estado-control-movmientos-jabas.component.html',
  styleUrls: ['./dialog-registrar-estado-control-movmientos-jabas.component.scss']
})
export class DialogRegistrarEstadoControlMovmientosJabasComponent implements OnInit {

  
  // nuevas variables
  Cod_Accion       =   ""
  Cod_Mov_Jaba     =  0
  Cod_Jaba         =  0
  Cod_Baras        = ''
  Cod_Jaba_Estado  = 0
  Cod_Estado       = ''
  Observacion      = ''
  Des_Jaba         = ''
  Cod_Barras       = ''
  Operacion        = ''
  Fec_Registro     = ''
  Fecha            = ''
  Hora             = ''
  Cod_Usuario      = ''
  Opciones         = []
 

  displayedColumns_cab: string[] = ['Estado']
  dataSource: MatTableDataSource<data>;

  formulario = this.formBuilder.group({
    Defectos:         [''],
    Observacion:      [''],
  
  }) 

  constructor(private formBuilder: FormBuilder,
              private matSnackBar: MatSnackBar, 
              private seguridadControlJabaService: SeguridadControlJabaService,
              @Inject(MAT_DIALOG_DATA) public data: data) 
  {
    this.dataSource = new MatTableDataSource();

    this.formulario = formBuilder.group({
      Defectos:         ['', Validators.required],
      Observacion:      [''],
    });

  }

  ngOnInit(): void {    

    this.llenarEstados()
  
    /*this.Opciones = [
      {Cod_Jaba_Estado: 1,  Des_Jaba_Estado:'Roto'},
      {Cod_Jaba_Estado: 2,  Des_Jaba_Estado:'Rajado'},
      {Cod_Jaba_Estado: 3,  Des_Jaba_Estado:'Sin Defecto'},
    ];*/
    this.Observacion = this.data.Observacion
    this.formulario.controls['Defectos'].setValue(this.data.Cod_Estado)
    this.formulario.controls['Observacion'].setValue(this.Observacion)

  
  }

 
/* --------------- REGISTRAR CABECERA ------------------------------------------ */

  submit(formDirective) :void {
   //console.log(this.formulario.get('Defectos')?.value)
   this.Cod_Accion         = 'U'
   this.Cod_Mov_Jaba       = this.data.Cod_Mov_Jaba
   this.Cod_Barras         = ''
   this.Cod_Estado         = this.formulario.get('Defectos')?.value
   this.Observacion        = this.formulario.get('Observacion')?.value
   this.Operacion          
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
      if(result[0].Respuesta == 'OK'){
        this.matSnackBar.open("Proceso Correcto..!!", 'Cerrar', { horizontalPosition: 'center', verticalPosition: 'top', duration: 2500 })
      }
      else{
        this.matSnackBar.open(result[0].Respuesta, 'Cerrar', { horizontalPosition: 'center', verticalPosition: 'top', duration: 2500 })
      }
     },
     (err: HttpErrorResponse) => this.matSnackBar.open(err.message, 'Cerrar', {
       duration: 2500,
     }))
    
  } 
 

  llenarEstados(){
    this.Cod_Accion         = 'E'
    this.Cod_Mov_Jaba       = 0
    this.Cod_Barras         = ''
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
       this.dataSource.data = result
      },
      (err: HttpErrorResponse) => this.matSnackBar.open(err.message, 'Cerrar', {
        duration: 2500,
      }))
  }

  selectEstado(Cod_Estado: string){
    this.Cod_Estado = Cod_Estado
    console.log(this.Cod_Estado)
  }


  

}
