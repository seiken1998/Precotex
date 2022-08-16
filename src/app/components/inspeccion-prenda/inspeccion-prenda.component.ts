import { Component, OnInit, AfterViewInit, inject, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import * as _moment from 'moment';
import { Observable } from 'rxjs';
import { InspeccionPrendaService } from 'src/app/services/inspeccion-prenda.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgxSpinnerService } from "ngx-spinner";
import { DialogDefectoComponent } from 'src/app/components/inspeccion-prenda/dialog-inspeccion-prenda/dialog-defecto/dialog-defecto.component';
import { DialogConfirmacionComponent } from 'src/app/components/dialogs/dialog-confirmacion/dialog-confirmacion.component'


interface Color {
  COD_PRESENT: number;
  DES_PRESENT: string;
}

@Component({
  selector: 'app-inspeccion-prenda',
  templateUrl: './inspeccion-prenda.component.html',
  styleUrls: ['./inspeccion-prenda.component.scss']
})
export class InspeccionPrendaComponent implements OnInit {

  Cod_Accion = ""
  Cod_OrdPro = ""
  Cod_Present = 0
  Cod_Talla = ""
  Prendas_Paq = 0
  SelectedValueColor = ""
  Compostura = 0
  Segunda = 0
  Zurcido = 0
  Desmanche = 0
  Primeras = 0
  Total = 0
  Inicial = 0
  ImagePath = ''
  Codigo = ''

  Cod_Fabrica = ""
  Num_Paquete = ""
  Flg_Habilitar_Detalle = false

  //http://192.168.1.36/Estilos/EP18168.jpg

  //* Declaramos formulario para obtener los controles */
  formulario = this.formBuilder.group({
    OP: [''],
    Color: [''],
    Talla: [''],
    Codigo: [''],
    Cantidad: ['']
  })

  listar_operacionColor: Color[] = [];
  @ViewChild('Codigo') inputCodigo!: ElementRef;
  constructor(private formBuilder: FormBuilder,
    private matSnackBar: MatSnackBar,
    private inspeccionPrendaService: InspeccionPrendaService,
    public dialog: MatDialog,
    private SpinnerService: NgxSpinnerService,) {

  }

  ngOnInit(): void {
    this.ImagePath = 'http://192.168.1.36/Estilos/default.jpg'
  }

  RestarCompostura() {
    if (this.Compostura != 0) {
      this.Compostura = this.Compostura - 1
      //this.ActualizarTotal()
      this.ActualizarPrimeras()
    }
  }

  SumarCompostura() {
    this.Compostura = this.Compostura + 1
    //this.ActualizarTotal()
    this.ActualizarPrimeras()
  }

  RestarSegunda() {
    if (this.Segunda != 0) {
      this.Segunda = this.Segunda - 1
      //this.ActualizarTotal()
      this.ActualizarPrimeras()
    }
  }

  SumarSegunda() {
    this.Segunda = this.Segunda + 1
    //this.ActualizarTotal()
    this.ActualizarPrimeras()
  }

  RestarZurcido() {
    let dialogRef = this.dialog.open(DialogDefectoComponent,
      {
        disableClose: true,
        panelClass: 'my-class',
        data: {
          Accion: '03'
        }
      });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'false') {

      } else {

        console.log(result.data)
      }
    })
  }

  SumarZurcido() {
    let dialogRef = this.dialog.open(DialogDefectoComponent,
      {
        disableClose: true,
        panelClass: 'my-class',
        data: {
          Accion: '03'
        }
      });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'false') {

      } else {

        console.log(result.data)
      }
    })
  }

  RestarDesmanche() {
    let dialogRef = this.dialog.open(DialogDefectoComponent,
      {
        disableClose: true,
        panelClass: 'my-class',
        data: {
          Accion: '04'
        }
      });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'false') {

      } else {

        console.log(result.data)
      }
    })
  }

  SumarDesmanche() {
    let dialogRef = this.dialog.open(DialogDefectoComponent,
      {
        disableClose: true,
        panelClass: 'my-class',
        data: {
          Accion: '04'
        }
      });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'false') {

      } else {

        console.log(result.data)
      }
    })
  }

  ActualizarPrimeras() {

    this.Primeras = this.Inicial + (-1 * (this.Compostura + this.Segunda + this.Zurcido + this.Desmanche))
  }

  ActualizarTotal() {

    this.Primeras = this.Inicial - this.Total
  }



  LecturaCodBarras() {
    this.Codigo = this.formulario.get('Codigo')?.value
    this.inspeccionPrendaService.CF_MUESTRA_INSPECCION_LECTURA_TICKET(
      this.Codigo
    ).subscribe(
      (result: any) => {
        if (result[0].Respuesta == undefined) {
          this.formulario.controls['OP'].setValue(result[0].COD_ORDPRO)
          this.listar_operacionColor = result
          this.SelectedValueColor = result[0].COD_PRESENT
          this.formulario.controls['Talla'].setValue(result[0].COD_TALLA)
          this.ImagePath = result[0].ICONO_WEB
          this.formulario.controls['Cantidad'].setValue(result[0].PRENDASPAQ)
          this.formulario.controls['Codigo'].disable()
          this.Cod_Fabrica = result[0].COD_FABRICA
          this.Num_Paquete = result[0].NUM_PAQUETE
          this.formulario.controls['OP'].disable()
          this.formulario.controls['Color'].disable()
          this.formulario.controls['Talla'].disable()
        }
        console.log(result)
      },
      (err: HttpErrorResponse) => this.matSnackBar.open(err.message, 'Cerrar', {
        duration: 1500,
      }))




    /* if(this.Codigo == 'PTX000001'){
       this.formulario.controls['OP'].setValue('E5470')
       this.formulario.controls['Color'].setValue('WHITE')
       this.formulario.controls['Talla'].setValue('XL')
       this.ImagePath = 'http://192.168.1.36/Estilos/EP18168.jpg'
       this.Total = 50
       this.Inicial = this.Total

     }*/


  } 

  GuardarCabecera() {
    let dialogRef = this.dialog.open(DialogConfirmacionComponent,
      {
        disableClose: true,
        data: {
        }
      });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'true') {
        this.Cod_Accion   = "I"
        this.Cod_Fabrica  = this.Cod_Fabrica
        this.Cod_OrdPro   = this.formulario.get('OP')?.value
        this.Cod_Present  = this.formulario.get('Color')?.value
        this.Cod_Talla    = this.formulario.get('Talla')?.value
        this.Num_Paquete  = this.Num_Paquete
        this.Prendas_Paq  = this.formulario.get('Cantidad')?.value
        this.inspeccionPrendaService.CF_Man_Inspeccion_Prenda_Web(
          this.Cod_Accion,
          this.Cod_Fabrica,
          this.Cod_OrdPro,
          this.Cod_Present,
          this.Cod_Talla,
          this.Num_Paquete,
          this.Prendas_Paq
        ).subscribe(
          (result: any) => {
            if(result[0].Respuesta == 'OK'){
              this.Flg_Habilitar_Detalle = true
              this.Total    = this.Prendas_Paq
              this.Inicial  = this.Prendas_Paq
              this.Primeras = this.Prendas_Paq
              this.matSnackBar.open('Proceso Correcto...', 'Cerrar', { horizontalPosition: 'center', verticalPosition: 'top', duration: 1500 })
            }
            else{
              this.matSnackBar.open(result[0].Respuesta, 'Cerrar', { horizontalPosition: 'center', verticalPosition: 'top', duration: 1500 })
            }
         
          },
          (err: HttpErrorResponse) => this.matSnackBar.open(err.message, 'Cerrar', {
            duration: 1500,
          }))
      }
    })

  }

  FinalizarProceso() {
    this.Flg_Habilitar_Detalle = false
  }

  Limpiar() {
    this.formulario.controls['Codigo'].setValue('')
    this.formulario.controls['Codigo'].enable()
    this.inputCodigo.nativeElement.focus()
    this.formulario.controls['OP'].setValue('')
    this.formulario.controls['Color'].setValue('')
    this.listar_operacionColor = []
    this.formulario.controls['Talla'].setValue('')
    this.formulario.controls['Cantidad'].setValue('')
    this.formulario.controls['OP'].enable()
    this.formulario.controls['Color'].enable()
    this.formulario.controls['Talla'].enable()
    this.Inicial = 0
    this.Total = 0
    this.Compostura = 0
    this.Segunda = 0
    this.Zurcido = 0
    this.Desmanche = 0
    this.Primeras = 0
    this.ImagePath = 'http://192.168.1.36/Estilos/default.jpg'
  }

}
