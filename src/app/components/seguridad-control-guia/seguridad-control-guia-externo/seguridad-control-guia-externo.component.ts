import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { GlobalVariable } from '../../../VarGlobals'; //<==== this one
import { MatSnackBar } from '@angular/material/snack-bar';
import { SeguridadControlGuiaService } from '../../../services/seguridad-control-guia.service';

import { HttpErrorResponse } from '@angular/common/http';

interface Listar_Num_OrdComp {
  num_ordcomp: string;
} 

@Component({
  selector: 'app-seguridad-control-guia-externo',
  templateUrl: './seguridad-control-guia-externo.component.html',
  styleUrls: ['./seguridad-control-guia-externo.component.scss']
})
export class SeguridadControlGuiaExternoComponent implements OnInit {

  //*num_guiaMascara = [/[A-Z-0-9]/i, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];*/
  num_guiaMascara = [/[A-Z-0-9]/i, /[A-Z-0-9]/i, /[A-Z-0-9]/i, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];
  num_ordcompMascara = [/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];

  nNum_Planta = GlobalVariable.num_planta;

  //* Declaramos las variables a usar */
  cod_accion            = 'E'
  texto_libre           = ''
  texto_libre2          = ''
  des_planta            = ''
  nom_entregado         = ''
  nom_despachado        = ''

  num_guia              = ''
  ruc_proveedor         = ''
  nom_proveedor         = '' 

  ordcomp_proveedor     = ''
 
  Visible_Registro_Personal: boolean = false
  Visible_Registro_OrdComp: boolean = false
  Visible_Registro_Ruc: boolean = false

  displayedColumns_cab: string[] = ['num_ordcomp', 'detalle']

  public data_ordcomp = [{
    num_ordcomp: ""
  }]

  //* Declaramos formulario para obtener los controles */
  formulario = this.formBuilder.group({
    num_guia: [''],
    cod_proveedor: [''],
    ruc_proveedor: [''],
    nom_proveedor: [''],
    num_planta_origen: [0],
    cod_entregado: [''],
    nom_entregado: [''],
    num_bulto: [0],
    num_cantidad: [0],
    num_peso: [0],
    cod_despachado: [''],
    nom_despachado: [''],
    glosa: ['']
  })

  rucForm = this.formBuilder.group({
    num_ordcomp: [''],
    ordcomp_proveedor: ['']
  })

  personalForm = this.formBuilder.group({
    num_dni: [''],
    ape_paterno: [''],
    ape_materno: [''],
    nombres: ['']
  })

  ordcompForm = this.formBuilder.group({
    num_ordcomp: ['']
  }) 

  listar_num_ordcomps: Listar_Num_OrdComp[] = [];

  constructor(private formBuilder: FormBuilder,
    private matSnackBar: MatSnackBar,
    private seguridadControlGuiaService: SeguridadControlGuiaService) { }

  ngOnInit(): void {
    this.MostrarTitulo()
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

  BuscarNomProveedor() {
    this.texto_libre = this.formulario.get('ruc_proveedor')?.value

    if (this.texto_libre.length !== 11 || this.texto_libre == null) {
      this.formulario.patchValue({ cod_proveedor: '' })
      this.nom_proveedor = ''
    } else {

      this.seguridadControlGuiaService.BuscarNomProveedorService(this.texto_libre).subscribe(
        (result: any) => {
          if (result[0].Respuesta == 'OK') {

            this.formulario.patchValue({ cod_proveedor: result[0].Codigo })
            this.formulario.patchValue({ nom_proveedor: result[0].Nombres })

            this.nom_proveedor = result[0].Nombres

          } else {
            this.matSnackBar.open(result[0].Respuesta, 'Cerrar', { horizontalPosition: 'center',  verticalPosition: 'top',duration: 1500 })
            this.formulario.patchValue({ cod_proveedor: '' })
            this.nom_proveedor = ''
          }
        },
        (err: HttpErrorResponse) => this.matSnackBar.open(err.message, 'Cerrar', { horizontalPosition: 'center',  verticalPosition: 'top',duration: 1500 }))
    }
  }

  BuscarNomTrabajador(sTipo: string) {
    if (sTipo == 'E') {
      this.texto_libre = this.formulario.get('cod_entregado')?.value
    } else {
      this.texto_libre = this.formulario.get('cod_despachado')?.value
    }

    if (this.texto_libre == null) {

    } else if (sTipo == 'E' && (this.texto_libre.length < 8 || this.texto_libre.length > 10)) {
      this.nom_entregado = ''
    } else if (sTipo == 'D' && (this.texto_libre.length < 8 || this.texto_libre.length > 10)) {
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
      99,
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
          }
          else {
            this.matSnackBar.open(result[0].Respuesta, 'Cerrar', { horizontalPosition: 'center',  verticalPosition: 'top',duration: 1500 })
          }
        },
        (err: HttpErrorResponse) => this.matSnackBar.open(err.message, 'Cerrar', { horizontalPosition: 'center',  verticalPosition: 'top',duration: 1500 }))
  }

  Limpiar() {
    this.formulario.reset()
    this.nom_entregado = ''
    this.nom_despachado = ''
  }

  BuscarRucProveedor() {
    this.texto_libre = this.rucForm.get('num_ordcomp')?.value

    if (this.texto_libre.length !== 10 || this.texto_libre == null) {
      this.rucForm.patchValue({ ordcomp_proveedor: '' })
      this.ordcomp_proveedor = ''
    } else {

      this.seguridadControlGuiaService.BuscarNomProveedorService(this.texto_libre).subscribe(
        (result: any) => {
          if (result[0].Respuesta == 'OK') {

            this.rucForm.patchValue({ ordcomp_proveedor: result[0].Nombres })

            this.ordcomp_proveedor = result[0].Nombres

          } else {
            this.matSnackBar.open(result[0].Respuesta, 'Cerrar', { horizontalPosition: 'center',  verticalPosition: 'top',duration: 1500 })
            this.rucForm.patchValue({ ordcomp_proveedor: '' })
            this.ordcomp_proveedor = ''
          }
        },
        (err: HttpErrorResponse) => this.matSnackBar.open(err.message, 'Cerrar', { horizontalPosition: 'center',  verticalPosition: 'top',duration: 1500 }))
    }
  }

  // Venta registro personal 
  MostrarVentanaRuc() {
    this.Visible_Registro_Ruc = !this.Visible_Registro_Ruc

    this.rucForm.reset()

    // this.texto_libre = this.formulario.get('cod_entregado')?.value
    // this.texto_libre2 = this.formulario.get('cod_despachado')?.value

    // if (this.texto_libre.length==8 && this.nom_entregado.length==0){
    //   this.personalForm.patchValue({ num_dni: this.texto_libre })
    //   this.texto_libre2 = ''
    // }else if (this.texto_libre2.length==8 && this.nom_despachado.length==0){
    //   this.personalForm.patchValue({ num_dni: this.texto_libre2 })
    //   this.texto_libre = ''
    // }else {
    //   this.texto_libre = ''
    //   this.texto_libre2 = ''
    // }
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

  // Venta registro orden de compra 
  MostrarVentanaOrdComp() {

    this.num_guia = this.formulario.get('num_guia')?.value
    this.ruc_proveedor = this.formulario.get('ruc_proveedor')?.value
    this.num_guia = this.num_guia.replace("_", "").trim();

    if (this.Visible_Registro_OrdComp == true) {
      this.Visible_Registro_OrdComp = !this.Visible_Registro_OrdComp
    }else if (this.num_guia.length !== 13 || this.num_guia == null || this.ruc_proveedor.length !== 11 || this.nom_proveedor.length == 0) {
    } else {

      this.Visible_Registro_OrdComp = !this.Visible_Registro_OrdComp
      this.ListarOrdComp()
      this.CargarListaOrdComp()
    }

    //this.personalForm.reset()
  }
  
  ListarOrdComp() {
    this.ordcompForm.reset()
    this.seguridadControlGuiaService.ListarOrdCompService(this.formulario.get('cod_proveedor')?.value).subscribe(
      (result: any) => {
        //console.log(result)
        this.listar_num_ordcomps = result;
      },
      (err: HttpErrorResponse) => this.matSnackBar.open(err.message, 'Cerrar', { horizontalPosition: 'center',  verticalPosition: 'top',duration: 1500 }))
  }

  InsertDeleteOrdComp(sAccion: string, sNum_OrdComp: string) {
    if (sAccion == 'I') {
      this.texto_libre = this.ordcompForm.get('num_ordcomp')?.value
    } else {
      this.texto_libre = sNum_OrdComp
    }

    if (this.texto_libre == null || this.texto_libre.length !== 10) {
      this.matSnackBar.open('Seleccione la Orden Compra..', 'Cerrar', { horizontalPosition: 'center',  verticalPosition: 'top',duration: 1500 })
    } else {

      this.seguridadControlGuiaService.ManOrdCompService(
        sAccion,
        this.formulario.get('num_guia')?.value,
        this.formulario.get('cod_proveedor')?.value,
        this.texto_libre).subscribe(
          (result: any) => {
            if (result[0].Respuesta == 'OK0') {

              this.ListarOrdComp()
              this.CargarListaOrdComp()

            }else if (result[0].Respuesta == 'OK') {
              
              this.data_ordcomp = result
              this.ListarOrdComp()
              
            }
            else {
              this.matSnackBar.open(result[0].Respuesta, 'Cerrar', { horizontalPosition: 'center',  verticalPosition: 'top',duration: 1500 })
            }
          },
          (err: HttpErrorResponse) => this.matSnackBar.open(err.message, 'Cerrar', { horizontalPosition: 'center',  verticalPosition: 'top',duration: 1500 }))
    }
  }
 
  CargarListaOrdComp() {

    this.seguridadControlGuiaService.CargarListaNumGuiaOrdCompService(this.formulario.get('num_guia')?.value,
      this.formulario.get('cod_proveedor')?.value).subscribe(
        (result: any) => {
          console.log('---------')
          console.log(result)
          this.data_ordcomp = result
        },
        (err: HttpErrorResponse) => this.matSnackBar.open(err.message, 'Cerrar', { horizontalPosition: 'center',  verticalPosition: 'top',duration: 1500 }))
  }
}
