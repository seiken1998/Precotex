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
  Accion: string
}

interface data_det {
  Abr_Motivo: string;
  Descripcion: string;
  Cantidad: number;

}


@Component({
  selector: 'app-dialog-defecto',
  templateUrl: './dialog-defecto.component.html',
  styleUrls: ['./dialog-defecto.component.scss']
})
export class DialogDefectoComponent implements OnInit {

  Id = 0
  Cod_Familia = ""
  
 displayedColumns_cab: string[] = ['Tallas', 'Cantidad']
 dataSource: MatTableDataSource<data_det>;

 constructor(public dialogRef: MatDialogRef<DialogDefectoComponent>,
          private formBuilder: FormBuilder,
             private matSnackBar: MatSnackBar, 
             private inspeccionPrendaService: InspeccionPrendaService,
             @Inject(MAT_DIALOG_DATA) public data: data) 
 {
    this.dataSource = new MatTableDataSource();
  
   
 }

 ngOnInit(): void {  
  this.MostrarDefectoPorTipo()
 }


/* --------------- REGISTRAR CABECERA ------------------------------------------ */



selectMedida(medida: string){
  

  this.dialogRef.close({data:medida});
  

}

MostrarDefectoPorTipo(){  
    this.Id = 1
    this.Cod_Familia = this.data.Accion
    this.inspeccionPrendaService.MostrarDefectoPorTipoService(
      this.Id,
      this.Cod_Familia
      ).subscribe(
        (result: any) => { 
         this.dataSource.data = result
        },
        (err: HttpErrorResponse) => this.matSnackBar.open(err.message, 'Cerrar', {
          duration: 1500,
        }))
    }
}
