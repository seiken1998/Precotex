import { Component, OnInit, ViewChild, ElementRef, Inject, Renderer2, AfterViewInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { GlobalVariable } from '../../../../VarGlobals';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DefectosAlmacenDerivadosService } from 'src/app/services/defectos-almacen-derivados.service';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { startWith, map, debounceTime } from 'rxjs/operators';
import * as _moment from 'moment';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSelect } from '@angular/material/select';


interface data{
  Fec_Auditoria: string
  
}

@Component({
  selector: 'app-dialog-derivados-reportexdia',
  templateUrl: './dialog-derivados-reportexdia.component.html',
  styleUrls: ['./dialog-derivados-reportexdia.component.scss']
})
export class DialogDerivadosReportexdiaComponent implements OnInit {

  
  Cod_Accion    = ''
  Fec_Auditoria = ''


  formulario = this.formBuilder.group({
  Total:            [''],
  Defecto:          [''],
  Especial:         [''],
  }) 


  constructor(private formBuilder: FormBuilder,
    private matSnackBar: MatSnackBar, private defectosAlmacenDerivadosService: DefectosAlmacenDerivadosService
    , @Inject(MAT_DIALOG_DATA) public data: data
  ) {

  
  }



  ngOnInit(): void {
    this.formulario.controls['Total'].disable()
    this.formulario.controls['Defecto'].disable()
    this.formulario.controls['Especial'].disable()
    this.traerReporte()
  }


traerReporte(){
  this.Cod_Accion  = 'L' 
  this.Fec_Auditoria = this.data.Fec_Auditoria
  
  this.defectosAlmacenDerivadosService.ReporteCantidadesPorFecha(
    this.Cod_Accion,
    this.Fec_Auditoria,
   ).subscribe(
      (result: any) => {
        console.log(result)
        this.formulario.controls['Total'].setValue(result[0].Ingresado)
        this.formulario.controls['Defecto'].setValue(result[0].Defecto)
        this.formulario.controls['Especial'].setValue(result[0].Especial)
        
      },
      (err: HttpErrorResponse) => this.matSnackBar.open(err.message, 'Cerrar', { horizontalPosition: 'center',  verticalPosition: 'top',duration: 1500 })
    )
}


}
