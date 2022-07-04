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
  selector: 'app-dialog-registro-hoja-medida',
  templateUrl: './dialog-registro-hoja-medida.component.html',
  styleUrls: ['./dialog-registro-hoja-medida.component.scss']
})
export class DialogRegistroHojaMedidaComponent implements OnInit {
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

 constructor(public dialogRef: MatDialogRef<DialogRegistroHojaMedidaComponent>,
          private formBuilder: FormBuilder,
             private matSnackBar: MatSnackBar, 
             private auditoriaHojaMedidaService: AuditoriaHojaMedidaService,
             @Inject(MAT_DIALOG_DATA) public data: data) 
 {
    this.dataSource = new MatTableDataSource();
  
   
 }

 ngOnInit(): void {  
  this.CargarOperacionMedida()
  this.Cod_Talla            = this.data.Cod_Talla
  this.Des_Medida           = this.data.Des_Medida
  this.Sec                  = this.data.Sec
  this.Tip_Medida           = this.data.Tip_Medida
  this.Sec_Medida           = this.data.Sec_Medida
  this.Cod_Hoja_Medida_Cab  = this.data.Cod_Hoja_Medida_Cab

 }


/* --------------- REGISTRAR CABECERA ------------------------------------------ */


doAction(){
  this.dialogRef.close({data:'XS'});
}



selectMedida(medida: string){
  if(medida == '-'){
    this.Menos = medida
  }else{
    if(this.Menos == '-'){
      medida = medida.replace('+','-')
    }
  this.dialogRef.close({data:medida});
  this.Menos = ''
}
}

    CargarOperacionMedida(){  
      this.Cod_Accion   = 'M'
      this.Cod_Hoja_Medida_Det
      this.Cod_Hoja_Medida_Cab = this.data.Cod_Hoja_Medida_Cab
      this.Sec = this.data.Sec
      this.Tip_Medida = ''
      this.Sec_Medida = ''
      this.Cod_Talla = ''
      this.Medida1 = ''
      this.Medida2 = ''
      this.Medida3 = ''
      this.Medida4 = ''
      this.Medida5 = ''
     this.auditoriaHojaMedidaService.MantenimientoAuditoriaHojaMedidaDetalle(
      this.Cod_Accion,
      this.Cod_Hoja_Medida_Det,
      this.Cod_Hoja_Medida_Cab,
      this.Sec,
      this.Tip_Medida,
      this.Sec_Medida,
      this.Cod_Talla,
      this.Medida1,
      this.Medida2,
      this.Medida3,
      this.Medida4,
      this.Medida5,
      ).subscribe(
        (result: any) => { 
          this.dataSource.data = result
        },
        (err: HttpErrorResponse) => this.matSnackBar.open(err.message, 'Cerrar', {
          duration: 1500,
        }))
    }
}
