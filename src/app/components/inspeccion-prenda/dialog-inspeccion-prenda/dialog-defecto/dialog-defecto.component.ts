import { Component, OnInit, ViewChild, ElementRef, Inject, Renderer2, AfterViewInit } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog'
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { GlobalVariable } from '../../../../VarGlobals';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuditoriaInspeccionCosturaService } from 'src/app/services/auditoria-inspeccion-costura.service';
import { AuditoriaHojaMedidaService} from 'src/app/services/auditoria-hoja-medida.service'
import * as _moment from 'moment';
import { HttpErrorResponse } from '@angular/common/http';
import { map, Observable, startWith } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

interface data{
  Cod_Talla:  string
  Des_Medida:  string
  Sec: number
  Tip_Medida: string
  Sec_Medida: string
  Cod_Hoja_Medida_Cab: number
  Flg_Enable: boolean
}

interface data_det {
  Cod_Medida: number;
  Des_Medida: string;

}


@Component({
  selector: 'app-dialog-defecto',
  templateUrl: './dialog-defecto.component.html',
  styleUrls: ['./dialog-defecto.component.scss']
})
export class DialogDefectoComponent implements OnInit {

  Titulo        = ''
  Cod_Talla     = ''
  Des_Medida    = ''
  Cod_Accion    = ''
  Cod_Hoja_Medida_Det = 0
  Cod_Hoja_Medida_Cab = 0
  Sec = 0
  Tip_Medida    = ''
  Sec_Medida    = ''
  Medida1       = ''
  Medida2       = ''
  Medida3       = ''
  Medida4       = ''
  Medida5       = ''

  Menos = ''
 displayedColumns_cab: string[] = ['Tallas']
 dataSource: MatTableDataSource<data_det>;

 constructor(public dialogRef: MatDialogRef<DialogDefectoComponent>,
          private formBuilder: FormBuilder,
             private matSnackBar: MatSnackBar, 
             private auditoriaHojaMedidaService: AuditoriaHojaMedidaService,
             @Inject(MAT_DIALOG_DATA) public data: data) 
 {
    this.dataSource = new MatTableDataSource();
  
   
 }

 ngOnInit(): void {  
  //this.CargarOperacionMedida()
  this.dataSource.data = GlobalVariable.Arr_Medidas
  
 }


/* --------------- REGISTRAR CABECERA ------------------------------------------ */



selectMedida(medida: string){
  

  this.dialogRef.close({data:medida});
  

}

    CargarOperacionMedida(){  
      this.Cod_Accion   = 'M'
      this.Cod_Hoja_Medida_Det = 1
      this.Cod_Hoja_Medida_Cab = 1
      this.Sec = 0
      this.Tip_Medida = ''
      this.Sec_Medida = ''
      this.Cod_Talla = ''
      this.Medida1 = ''
      this.Medida2 = ''
     this.auditoriaHojaMedidaService.MantenimientoAuditoriaHojaMedidaDetalle(
      this.Cod_Accion,
      this.Cod_Hoja_Medida_Det,
      this.Cod_Hoja_Medida_Cab,
      this.Sec,
      this.Tip_Medida,
      this.Sec_Medida,
      this.Cod_Talla,
      this.Medida1,
      this.Medida2
      ).subscribe(
        (result: any) => { 
          GlobalVariable.Arr_Medidas = result
        },
        (err: HttpErrorResponse) => this.matSnackBar.open(err.message, 'Cerrar', {
          duration: 1500,
        }))
    }
}
