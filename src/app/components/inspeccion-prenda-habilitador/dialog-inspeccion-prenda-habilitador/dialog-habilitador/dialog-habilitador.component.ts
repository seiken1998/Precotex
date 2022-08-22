import { Component, OnInit, ViewChild, ElementRef, Inject, Renderer2, AfterViewInit } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog'
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { GlobalVariable } from '../../../../VarGlobals';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuditoriaInspeccionCosturaService } from 'src/app/services/auditoria-inspeccion-costura.service';
import { InspeccionPrendaService} from 'src/app/services/inspeccion-prenda.service'
import * as _moment from 'moment';
import { HttpErrorResponse } from '@angular/common/http';
import { map, Observable, startWith } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

interface data{
  Cod_Modulo: string
  Cod_Familia: string
  Ticket: string
}


@Component({
  selector: 'app-dialog-habilitador',
  templateUrl: './dialog-habilitador.component.html',
  styleUrls: ['./dialog-habilitador.component.scss']
})
export class DialogHabilitadorComponent implements OnInit {

  Id            = 0
  Cod_Modulo    = ""
  Cod_Familia   = ""
  Ticket        = ""
  Total         = 0
  Cod_OrdPro    = ""
  Cod_Present   = 0
  Cod_Talla     = ""
  Prendas_Paq   = 0
  ImagePath     = ''
  
  //* Declaramos formulario para obtener los controles */
  formulario = this.formBuilder.group({
    OP:       [''],
    Color:    [''],
    Talla:    [''],
    Codigo:   [''], 
    Cantidad: ['']
  })


 constructor(private formBuilder: FormBuilder,
             private matSnackBar: MatSnackBar, 
             private inspeccionPrendaService: InspeccionPrendaService,
             @Inject(MAT_DIALOG_DATA) public data: data) 
 {
      
   
 }

 ngOnInit(): void {  
  this.formulario.controls['Codigo'].disable()
  this.formulario.controls['OP'].disable()
  this.formulario.controls['Color'].disable()
  this.formulario.controls['Talla'].disable()
  this.formulario.controls['Cantidad'].disable()
  this.MostrarRecojoPrenda()
 }


/* --------------- REGISTRAR CABECERA ------------------------------------------ */



/*selectMedida(Abr_Motivo: string){
  
  this.dialogRef.close({data:Abr_Motivo});
}*/

MostrarRecojoPrenda(){  
    this.Cod_Modulo   = ""
    this.Cod_Familia  = this.data.Cod_Familia
    this.Ticket       = this.data.Ticket
    this.inspeccionPrendaService.CF_MUESTRA_INSPECCION_RECOJO_PRENDA(
      this.Cod_Modulo,
      this.Cod_Familia,
      this.Ticket
      ).subscribe(
        (result: any) => { 
          this.formulario.controls['Codigo'].setValue(this.data.Ticket)
          this.formulario.controls['OP'].setValue(result[0].COD_ORDPRO)
          this.formulario.controls['Color'].setValue(result[0].DES_PRESENT)
          this.formulario.controls['Talla'].setValue(result[0].COD_TALLA)
          this.formulario.controls['Cantidad'].setValue(result[0].PRENDAS_RECOGER)
          this.ImagePath = result[0].ICONO_WEB

        },
        (err: HttpErrorResponse) => this.matSnackBar.open(err.message, 'Cerrar', {
          duration: 1500,
        }))
    }
}
