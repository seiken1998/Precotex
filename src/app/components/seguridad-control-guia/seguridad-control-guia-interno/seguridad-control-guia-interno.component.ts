import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { GlobalVariable } from '../../../VarGlobals'; //<==== this one
import { MatSnackBar } from '@angular/material/snack-bar';
import { SeguridadControlGuiaService } from '../../../services/seguridad-control-guia.service';

import { HttpErrorResponse } from '@angular/common/http';

interface Listar_Guia {
  num_guia: string;
  cod_proveedor: string,
  num_planta_origen: number,
  origen: string;
  cod_entregado: string;
  nom_entregado: string;  
  num_bulto: number;
  num_cantidad: number;
  num_peso: number;
  cod_despachado: string;
  nom_despachado: string;
  glosa: string;
}
  
@Component({
  selector: 'app-seguridad-control-guia-interno',
  templateUrl: './seguridad-control-guia-interno.component.html',
  styleUrls: ['./seguridad-control-guia-interno.component.scss']
})
export class SeguridadControlGuiaInternoComponent implements OnInit {

  nNum_Planta = GlobalVariable.num_planta;

  //* Declaramos las variables a usar */
  cod_accion            = 'I'
  texto_libre           = ''
  texto_libre2          = ''
  des_planta            = ''
  origen_select         = ''
  nom_entregado         = ''
  cod_despachado_select = ''
  nom_despachado        = ''
  glosa_select          = ''

  Visible_Registro_Personal: boolean = false

  //* Declaramos formulario para obtener los controles */
  formulario = this.formBuilder.group({
    num_guia: [''],
    cod_proveedor: [''],
    num_planta_origen: [0],
    origen: [''],
    cod_entregado: [''],
    nom_entregado: [''],
    num_bulto: [0],
    num_cantidad: [0],
    num_peso: [0],
    cod_despachado: [''],
    nom_despachado: [''],
    glosa: ['']
  })
 
  personalForm = this.formBuilder.group({
    num_dni: [''],
    ape_paterno: [''],
    ape_materno: [''],
    nombres: [''] 
  }) 

  listar_guias: Listar_Guia[] = [];

  constructor(private formBuilder: FormBuilder,
    private matSnackBar: MatSnackBar,
    private seguridadControlGuiaService: SeguridadControlGuiaService) { }

  ngOnInit(): void {
    this.MostrarTitulo()
    this.ListarGuia()    
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
    } else {
      this.des_planta = ''
    }
  }    
 
  ListarGuia() {
    this.seguridadControlGuiaService.ListarGuiaInternoService(GlobalVariable.num_planta).subscribe(
      (result: any) => {
        this.listar_guias = result;
        console.log(result)
      },
      (err: HttpErrorResponse) => this.matSnackBar.open(err.message, 'Cerrar', { horizontalPosition: 'center',  verticalPosition: 'top',duration: 1500 }))
  } 

  DatosGuia() {
    let guia_select = this.listar_guias.find(elemento => elemento.num_guia == this.formulario.get('num_guia')?.value)

    this.formulario.patchValue({ cod_proveedor: guia_select?.cod_proveedor })
    this.formulario.patchValue({ num_planta_origen: guia_select?.num_planta_origen })
    this.formulario.patchValue({ origen: guia_select?.origen })
    this.formulario.patchValue({ cod_entregado: guia_select?.cod_entregado })
    this.formulario.patchValue({ nom_entregado: guia_select?.nom_entregado })    
    this.formulario.patchValue({ num_bulto: guia_select?.num_bulto })
    this.formulario.patchValue({ num_cantidad: guia_select?.num_cantidad })
    this.formulario.patchValue({ num_peso: guia_select?.num_peso })
    this.formulario.patchValue({ cod_despachado: guia_select?.cod_despachado })
    this.formulario.patchValue({ nom_despachado: guia_select?.nom_despachado })
    this.formulario.patchValue({ glosa: guia_select?.glosa })
    this.origen_select = this.formulario.get('origen')?.value

    this.nom_entregado = this.formulario.get('nom_entregado')?.value

    this.cod_despachado_select = this.formulario.get('cod_despachado')?.value    
    this.nom_despachado = this.formulario.get('nom_despachado')?.value
    this.glosa_select = this.formulario.get('glosa')?.value
  }  

  BuscarNomTrabajador(sTipo: string) {
    if (sTipo == 'E') {
      this.texto_libre = this.formulario.get('cod_entregado')?.value
    } else {
      this.texto_libre = this.formulario.get('cod_despachado')?.value
    }
 
    if (this.texto_libre == null) {

    }else if (sTipo == 'E' && (this.texto_libre.length < 8 || this.texto_libre.length > 10)) {
      this.nom_entregado = ''
    }else if (sTipo == 'D' && (this.texto_libre.length < 8 || this.texto_libre.length > 10)) {
      this.nom_despachado = ''
    } else {

      this.seguridadControlGuiaService.BuscarNomTrabajadorService(this.texto_libre).subscribe(
        (result: any) => {
          if (result[0].Respuesta == 'OK') {

            if (sTipo == 'E') {
              this.formulario.patchValue({ nom_entregado: result[0].Nombres })
              this.nom_entregado = result[0].Nombres
            } else {
              this.formulario.patchValue({ nom_despachado: result[0].Nombres })
              this.nom_despachado = result[0].Nombres
            }

          } else {
            this.matSnackBar.open(result[0].Respuesta, 'Cerrar', { horizontalPosition: 'center',  verticalPosition: 'top',duration: 1500 })

            if (sTipo == 'E'){
              this.nom_entregado = ''
            }

            if (sTipo == 'D'){
              this.nom_despachado = ''
            }  
          }
        },
        (err: HttpErrorResponse) => this.matSnackBar.open(err.message, 'Cerrar', { horizontalPosition: 'center',  verticalPosition: 'top',duration: 1500 }))
    }
  }

  Guardar() {
    this.seguridadControlGuiaService.GuardarService(
      this.cod_accion,
      this.nNum_Planta,
      this.formulario.get('num_guia')?.value,
      this.formulario.get('cod_proveedor')?.value,
      this.nNum_Planta,
      this.formulario.get('num_planta_origen')?.value,
      this.formulario.get('cod_entregado')?.value,
      this.formulario.get('num_bulto')?.value,
      this.formulario.get('num_cantidad')?.value,
      this.formulario.get('num_peso')?.value,      
      this.formulario.get('cod_despachado')?.value,
      this.formulario.get('glosa')?.value).subscribe(

        (result: any) => {
          if (result[0].Respuesta == 'OK') {
            this.matSnackBar.open('Proceso Correcto !!!', 'Cerrar', { horizontalPosition: 'center',  verticalPosition: 'top',duration: 1500 })

            this.Limpiar()
            this.ListarGuia()
          }
          else {
            this.matSnackBar.open(result[0].Respuesta, 'Cerrar', { horizontalPosition: 'center',  verticalPosition: 'top',duration: 1500 })
          }
        },
        (err: HttpErrorResponse) => this.matSnackBar.open(err.message, 'Cerrar', { horizontalPosition: 'center',  verticalPosition: 'top',duration: 1500 }))
  } 
 
  Limpiar(){
    this.formulario.reset()
    this.nom_entregado = ''
    this.cod_despachado_select = ''
    this.nom_despachado = ''
    this.glosa_select = ''
    this.origen_select = ''
  } 
  
  // Venta registro personal 
  MostrarVentanaPersonal() {
    this.Visible_Registro_Personal = !this.Visible_Registro_Personal

    this.personalForm.reset()

    this.texto_libre = this.formulario.get('cod_entregado')?.value
    this.texto_libre2 = this.formulario.get('cod_despachado')?.value

    if (this.texto_libre.length==8 && this.nom_entregado.length==0){
      this.personalForm.patchValue({ num_dni: this.texto_libre })
      this.texto_libre2 = ''
    }else if (this.texto_libre2.length==8 && this.nom_despachado.length==0){
      this.personalForm.patchValue({ num_dni: this.texto_libre2 })
      this.texto_libre = ''
    }else {
      this.texto_libre = ''
      this.texto_libre2 = ''
    }
  }
 
  GuardarRegistroPersonal() {
    this.seguridadControlGuiaService.GuardarPersonalService(
      this.personalForm.get('num_dni')?.value,
      this.personalForm.get('ape_paterno')?.value,
      this.personalForm.get('ape_materno')?.value,
      this.personalForm.get('nombres')?.value).subscribe(
        (result: any) => {
          if (result[0].Respuesta == 'OK') {
            this.matSnackBar.open('Proceso Correcto !!!', 'Cerrar', { horizontalPosition: 'center',  verticalPosition: 'top',duration: 1500 })

            this.Visible_Registro_Personal = !this.Visible_Registro_Personal
            
            if (this.texto_libre.length==8){
              this.BuscarNomTrabajador('E')
            }else if (this.texto_libre2.length==8){
              this.BuscarNomTrabajador('D')
            }else{

            }          
          }
          else {
            this.matSnackBar.open(result[0].Respuesta, 'Cerrar', { horizontalPosition: 'center',  verticalPosition: 'top',duration: 1500 })
          }
        },
        (err: HttpErrorResponse) => this.matSnackBar.open(err.message, 'Cerrar', { horizontalPosition: 'center',  verticalPosition: 'top',duration: 1500 }))    
  }  
}
