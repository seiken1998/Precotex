import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { GlobalVariable } from '../../../VarGlobals';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SeguridadControlVehiculoService } from '../../../services/seguridad-control-vehiculo.service';

import { HttpErrorResponse } from '@angular/common/http';

interface Listar_Origen {
  origen: string,
  num_planta_origen: number,
  vehiculo: string,
  conductor: string,
  kilometraje: number,
  glosa: string,
  Descripcion: String;
  Planta: number;
  des_vehiculo: String,
 
} 


   
@Component({
  selector: 'app-seguridad-control-vehiculo-ingreso',
  templateUrl: './seguridad-control-vehiculo-ingreso.component.html',
  styleUrls: ['./seguridad-control-vehiculo-ingreso.component.scss']
})
export class SeguridadControlVehiculoIngresoComponent implements OnInit {
  
  nNum_Planta = GlobalVariable.num_planta;
  
  //opera: string[] = ['Carga', 'Descarga', 'Carga/Descarga'];

  listes: any[] = [
    { name: "Carga" , cod: "C" },
    {  name: "Descarga", cod: "D"  },
    {  name: "Carga/Descarga", cod: "X" },];
     

  //* Declaramos las variables a usar en los metodos */
  
  des_planta            = ''
  origen_selectt         = ''
  codigo_vehiculo = '';
  des_vehiculo         = ''
  codigo_conductor = '';
  des_conductor = '';
  cod_accion = 'I';
  opera = '';
  Ultimo_Fec_Registro = ''
  Planta = ''
  Accion = ''
  Origen = ''
  Destino = ''
  Ultimo_Km = 0
  Usuario = ''
  Fecha_Registro = ''
  sAccion = ''
 
 
 
 

  //* Declaramos formulario para obtener los controles */
  // poner los formcontrolname en el html y aca para extraer sus valores en los metodos
  //estas variables deben estar en el html 
  formulario = this.formBuilder.group({
    origen: [''],
    num_planta_origen: [0],
    vehiculo: [''],
    conductor: [''],
    kilometraje:[''],
    glosa:[''],
    ope:[''],
    nombre:['']
    
    
  })

 

  listar_origenes: Listar_Origen[] = [];

  

  

  constructor(private formBuilder: FormBuilder,
    private matSnackBar: MatSnackBar,
    private seguridadControlVehiculoService: SeguridadControlVehiculoService,
    
    ) { }

   

    @ViewChild('conductor') inputConductor!: ElementRef;
    @ViewChild('kilometraje') inputKilometraje!: ElementRef;

  ngOnInit(): void {
    this.formulario.controls['conductor'].disable()
    this.formulario.controls['nombre'].disable()
    this.MostrarTitulo()
    this.ListarOrigen()

 
    
    //this.DatosOrigen()
    //this.BuscarVehiculo()
    
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
    } else if (GlobalVariable.num_planta == 13) {
      this.des_planta = 'Santa Rosa'
    } else if (GlobalVariable.num_planta == 11) {
      this.des_planta = 'VyD'
    }else {
      this.des_planta = ''
    }
  }  
 
  


  ListarOrigen() {
    this.seguridadControlVehiculoService.ListarOrigenesService(this.nNum_Planta).subscribe(
      (result: any) => {
        this.listar_origenes = result;
       
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
    this.Ultimo_Fec_Registro = ''
    this.Planta     = ''
    this.Accion     = ''
    this.Origen     = ''
    this.Destino    = ''
    this.Ultimo_Km  = 0
    this.Usuario    = ''
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
            console.log(result)
            this.formulario.controls['conductor'].setValue(result[0].Dni_Conductor);
            this.formulario.controls['nombre'].setValue(result[0].Nombres);
            //this.BuscarConductor()
            this.Ultimo_Fec_Registro = result[0].Ultimo_Fec_Registro
            this.Planta     = result[0].Planta
            this.Accion     = result[0].Accion
            this.Origen     = result[0].Origen
            this.Destino    = result[0].Destino
            this.Ultimo_Km  = result[0].Ultimo_Km 
            this.Usuario    = result[0].Usuario 
          }
        }else {
          
         // this.formulario.controls['conductor'].setValue('');
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

    console.log(this.formulario.get('ope')?.value)
    this.sAccion = 'I'
    if(this.Fecha_Registro != ''){
      this.sAccion = 'U'
    }

    if(this.formulario.get('vehiculo')?.value =='' ||
      this.formulario.get('conductor')?.value =='' ||
      this.formulario.get('origen')?.value == ''||
      this.formulario.get('kilometraje')?.value == ''||
      this.formulario.get('ope')?.value == ''){
        this.matSnackBar.open('Rellene todos los campos!!!', 'Cerrar', { horizontalPosition: 'center',  verticalPosition: 'top',duration: 1500 })
    }
    else{ 
    this.seguridadControlVehiculoService.GuardarService(
      this.sAccion,
      this.cod_accion,
      this.nNum_Planta, 
      this.formulario.get('vehiculo')?.value,
      this.formulario.get('conductor')?.value,
      this.formulario.get('origen')?.value,
      this.formulario.get('kilometraje')?.value,
      this.formulario.get('glosa')?.value,
      this.formulario.get('ope')?.value,
      this.Fecha_Registro).subscribe(

        (result: any) => {
          if (result[0].Respuesta == 'OK') {
            this.matSnackBar.open('Proceso Correcto !!!', 'Cerrar', { horizontalPosition: 'center',  verticalPosition: 'top',duration: 1500 })
            this.Fecha_Registro = ''
            this.Limpiar()
            this.formulario.controls['origen'].enable()
            this.formulario.controls['ope'].enable()
            this.formulario.controls['glosa'].enable()
            this.formulario.controls['vehiculo'].enable()
           // this.ListarGuia()
          }
          else {
            this.matSnackBar.open(result[0].Respuesta, 'Cerrar', { horizontalPosition: 'center',  verticalPosition: 'top',duration: 1500 })
          }
        },
        (err: HttpErrorResponse) => this.matSnackBar.open(err.message, 'Cerrar', { horizontalPosition: 'center',  verticalPosition: 'top',duration: 1500 })
       
        )
  
      }
  }
  
  Limpiar(){
    this.formulario.reset()
    this.des_vehiculo = '';
    this.des_conductor = '';
    this.formulario.controls['nombre'].setValue('');
  } 



  CompletarInfo(){
    if(this.formulario.get('vehiculo')?.value == ''){
      this.matSnackBar.open('Ingresa el codigo del vehiculo..!!', 'Cerrar', { horizontalPosition: 'center',  verticalPosition: 'top',duration: 1500 })
    }
    else{
      this.sAccion = 'T'
      this.seguridadControlVehiculoService.GuardarService(
        this.sAccion,
        this.cod_accion,
        this.nNum_Planta = 0, 
        this.formulario.get('vehiculo')?.value,
        this.formulario.get('conductor')?.value,
        0,
        0,
        this.formulario.get('glosa')?.value,
        this.formulario.get('ope')?.value,
        this.Fecha_Registro).subscribe(
          (result: any) => {
    
          if(result.length > 0){
          this.formulario.controls['vehiculo'].setValue(result[0].Cod_Barras)
          this.formulario.controls['conductor'].setValue(result[0].Dni_Conductor)
          this.formulario.controls['nombre'].setValue(result[0].Nombre)
          this.formulario.controls['origen'].setValue(result[0].Num_Planta_Origen)
          this.formulario.controls['kilometraje'].setValue(result[0].Num_Kilometraje)
          this.formulario.controls['glosa'].setValue(result[0].Observacion)
          this.formulario.controls['ope'].setValue(result[0].Operacion) 
          this.des_vehiculo = result[0].Descripcion
          this.formulario.controls['origen'].disable()
          this.formulario.controls['ope'].disable()
          this.formulario.controls['glosa'].disable()
          this.formulario.controls['vehiculo'].disable()
          this.Fecha_Registro = result[0].FECHA
          }
          else{
            this.matSnackBar.open('No se encontraron resultados..!!', 'Cerrar', { horizontalPosition: 'center',  verticalPosition: 'top',duration: 1500 })
          }
          },
          (err: HttpErrorResponse) => this.matSnackBar.open(err.message, 'Cerrar', { horizontalPosition: 'center',  verticalPosition: 'top',duration: 1500 })   
          )
        }
      }
}
 