import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { GlobalVariable } from '../../../VarGlobals';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SeguridadControlVehiculoService } from '../../../services/seguridad-control-vehiculo.service';

import { HttpErrorResponse } from '@angular/common/http';

interface Listar_Destino {
  destino: string,
  num_planta_origen: number,
  vehiculo: string,
  conductor: string,
  kilometraje: number,
  glosa: string,
  Descripcion: String;
  Planta: number;
} 

@Component({
  selector: 'app-seguridad-control-vehiculo-salida',
  templateUrl: './seguridad-control-vehiculo-salida.component.html',
  styleUrls: ['./seguridad-control-vehiculo-salida.component.scss']
})
export class SeguridadControlVehiculoSalidaComponent implements OnInit {
  nNum_Planta = GlobalVariable.num_planta;

 //* Declaramos las variables a usar en los metodos */
  
 des_planta            = ''
 codigo_vehiculo = '';
 des_vehiculo         = ''
 codigo_conductor = '';
 des_conductor = '';
 cod_accion = 'S';
 ope = '';


  Visible_Registro_Personal: boolean = false


  //* Declaramos formulario para obtener los controles */
  // poner los formcontrolname en el html y aca para extraer sus valores en los metodos
  //estas variables deben estar en el html 
  formulario = this.formBuilder.group({
    destino: [''],
    num_planta_origen: [0],
    vehiculo: [''],
    conductor: [''],
    kilometraje:[''],
    glosa:[''],
    nombre:['']
    
    
  })

  
  listar_destinos: Listar_Destino[] = [];


  constructor(private formBuilder: FormBuilder,
    private matSnackBar: MatSnackBar,
    private seguridadControlVehiculoService: SeguridadControlVehiculoService) { }

    @ViewChild('conductor') inputConductor!: ElementRef;
    @ViewChild('kilometraje') inputKilometraje!: ElementRef;

  ngOnInit(): void {
    this.formulario.controls['conductor'].disable()
    this.formulario.controls['nombre'].disable()
    this.MostrarTitulo()
    this.ListarDestino()
  }
  
  MostrarTitulo() {
    if (GlobalVariable.num_planta == 1) {
      this.des_planta = 'Santa Maria'
    } else if (GlobalVariable.num_planta == 2) {
      this.des_planta = 'Santa Cecilia'
    } else if (GlobalVariable.num_planta == 3) {
      this.des_planta = 'Huachipa Sede I'
    } else if (GlobalVariable.num_planta == 4) {
      this.des_planta = 'Huachipa Sede II'
    } else if (GlobalVariable.num_planta == 5) {
      this.des_planta = 'Independencia'
    } else if (GlobalVariable.num_planta == 6) {
      this.des_planta = 'Santa Rosa'
    }else if (GlobalVariable.num_planta == 7) {
      this.des_planta = 'VyD'
    } else {
      this.des_planta = ''
    }
  }  

  
  ListarDestino() {
    this.seguridadControlVehiculoService.ListarDestinosService(this.nNum_Planta).subscribe(
      (result: any) => {
        this.listar_destinos = result;
       
      },
      (err: HttpErrorResponse) => this.matSnackBar.open(err.message, 'Cerrar', { horizontalPosition: 'center',  verticalPosition: 'top',duration: 1500 }))
  } 
 
  /*DatosOrigen() {
   let origen_select = this.listar_origenes.find(elemento => elemento.num_guia == this.formulario.get('num_guia')?.value)
   this.formulario.patchValue({ origen: origen_select?.origen })
   this.origen_selectt = this.formulario.get('origen')?.value
  }  
*/

  BuscarVehiculo(){
    this.codigo_vehiculo = this.formulario.get('vehiculo')?.value

    if  (this.codigo_vehiculo == null){
      this.formulario.controls['conductor'].setValue('');
    }else if (this.codigo_vehiculo.length <= 8 || this.codigo_vehiculo.length >= 10) {
      this.formulario.controls['conductor'].setValue('');
      this.des_vehiculo = '';
      this.des_conductor = '';
      this.formulario.controls['nombre'].setValue('');
    } else {



    this.seguridadControlVehiculoService.traerInfoVehiculoService(this.nNum_Planta, this.codigo_vehiculo).subscribe(
      (result: any) => {

        if (result[0].Respuesta == 'OK') {
        this.des_vehiculo = result[0].Descripcion;
        this.inputConductor.nativeElement.focus()
        if(result[0].Dni_Conductor.length>0){
          this.formulario.controls['conductor'].setValue(result[0].Dni_Conductor);
          this.formulario.controls['nombre'].setValue(result[0].Nombres);
          //this.BuscarConductor()
           
        }
      }else {
        this.matSnackBar.open(result[0].Respuesta, 'Cerrar', { horizontalPosition: 'center',  verticalPosition: 'top',duration: 1500 })
      }


      },
      (err: HttpErrorResponse) => this.matSnackBar.open(err.message, 'Cerrar', {horizontalPosition: 'center', verticalPosition: 'top', duration: 1500}))
 


    } 
 
    }


  BuscarConductor(){
    this.codigo_conductor = this.formulario.get('conductor')?.value

    if (this.codigo_conductor.length <= 7 || this.codigo_conductor.length >= 9) {
      //this.des_vehiculo = '';
      this.des_conductor = '';
    } else {



    this.seguridadControlVehiculoService.traerInfoConductorService(this.nNum_Planta, this.codigo_conductor).subscribe(
      (result: any) => {

        if (result[0].Respuesta == 'OK') {
        this.des_conductor = result[0].Nombres;
        this.inputKilometraje.nativeElement.focus()
        }else {
          this.matSnackBar.open(result[0].Respuesta, 'Cerrar', { horizontalPosition: 'center',  verticalPosition: 'top',duration: 1500 })
        }
        
      },
      (err: HttpErrorResponse) => this.matSnackBar.open(err.message, 'Cerrar', {horizontalPosition: 'center', verticalPosition: 'top', duration: 1500}))
  
  
    }
  
    }
  

//sCod_Accion: string, nNum_Planta: number, sCod_barras: string, sDni_conductor: string,
 //nNum_Planta_Ref: number, nNum_kilometraje: number,sGlosa: string
  
  Guardar() { 

    if(this.formulario.get('vehiculo')?.value =='' ||
    this.formulario.get('conductor')?.value =='' ||
    this.formulario.get('destino')?.value == ''||
    this.formulario.get('kilometraje')?.value == ''){
      this.matSnackBar.open('Rellene todos los campos!!!', 'Cerrar', { horizontalPosition: 'center',  verticalPosition: 'top',duration: 1500 })
  }else{
    this.seguridadControlVehiculoService.GuardarService(
      this.cod_accion, 
      this.nNum_Planta,
      this.formulario.get('vehiculo')?.value,
      this.formulario.get('conductor')?.value,
      this.formulario.get('destino')?.value,
      this.formulario.get('kilometraje')?.value,
      this.formulario.get('glosa')?.value,
      this.ope).subscribe(

        (result: any) => {
          if (result[0].Respuesta == 'OK') {
            this.matSnackBar.open('Proceso Correcto !!!', 'Cerrar', { horizontalPosition: 'center',  verticalPosition: 'top',duration: 1500 })

            this.Limpiar()
          
          }
          else {
            this.matSnackBar.open(result[0].Respuesta, 'Cerrar', { horizontalPosition: 'center',  verticalPosition: 'top',duration: 1500 })
          }
        },
        (err: HttpErrorResponse) => this.matSnackBar.open(err.message, 'Cerrar', { horizontalPosition: 'center',  verticalPosition: 'top',duration: 1500 }))
  }
  
}  
 
  
Limpiar(){
  this.formulario.reset()
  this.des_vehiculo = '';
  this.des_conductor = '';
  this.formulario.controls['nombre'].setValue('');
} 
 

}
