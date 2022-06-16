import { Component, OnInit, AfterViewInit, inject, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import * as _moment from 'moment';
import { Observable } from 'rxjs';
import { AuditoriaHojaMedidaService} from 'src/app/services/auditoria-hoja-medida.service'
import { startWith, map, debounceTime } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { NgxSpinnerService }  from "ngx-spinner";
import { DialogEliminarComponent} from 'src/app/components/dialogs/dialog-eliminar/dialog-eliminar.component'
import { GlobalVariable } from 'src/app/VarGlobals'; 

interface data_det {
  Version:              string
  Cod_Tarifado_Costeo:  string
  Descr:                string	 		
  Des_Tela_Cliente:     string
}
 


@Component({
  selector: 'app-auditoria-hoja-medida-detalle',
  templateUrl: './auditoria-hoja-medida-detalle.component.html',
  styleUrls: ['./auditoria-hoja-medida-detalle.component.scss']
})
export class AuditoriaHojaMedidaDetalleComponent implements OnInit {
 


  public data_det = [{
    Version:              "",
    Cod_Tarifado_Costeo:  "",
    Descr:                "",	 		
    Des_Tela_Cliente:     ""
  }]


  Cod_EstProG   = GlobalVariable.Cod_EstProG
  Cod_VersionG      = GlobalVariable.Cod_VersionG
  Cod_ClienteG   = GlobalVariable.Cod_ClienteG
  Cod_EstCliG      = GlobalVariable.Cod_EstCliG

  Cod_Accion        = ''
  Cod_Cliente       = ''
  Cod_EstCli        = ''
  


   //* Declaramos formulario para obtener los controles */
   formulario = this.formBuilder.group({
    //-----------NUEVO
    inputCliente:     [''],
    inputEstCli:      [''],
    inputEstPro:      [''],
    inputVersion:     [''],
    inputOps:         [''],
  })

  displayedColumns_cab: string[] = ['CodTarifadoCost', 'Codigo', 'Descripcion', 'DesTelaCli', 'Acciones']
  dataSource: MatTableDataSource<data_det>;

  constructor(private formBuilder: FormBuilder,
    private matSnackBar: MatSnackBar,
    private auditoriaHojaMedidaService: AuditoriaHojaMedidaService,
    public dialog: MatDialog,
    private SpinnerService: NgxSpinnerService) { this.dataSource = new MatTableDataSource(); }


  ngOnInit(): void {
    console.log(this.Cod_EstProG)
    console.log(this.Cod_VersionG)
    console.log(this.Cod_ClienteG)
    console.log(this.Cod_EstCliG)

    this.formulario.controls['inputCliente'].disable()
    this.formulario.controls['inputEstCli'].disable()
    this.formulario.controls['inputEstPro'].disable()
    this.formulario.controls['inputVersion'].disable()
    this.formulario.controls['inputOps'].disable()
    this.MostrarCabeceraCargaMedida()
    this.MostrarCargaMedida()
    this.MostrarOrdenesCargaMedida()
  }
 

  MostrarCabeceraCargaMedida(){

    this.Cod_Accion   = 'M'
    this.Cod_Cliente  = ''
    this.Cod_EstCli   = ''
    this.Cod_EstProG  
    this.Cod_VersionG 
      this.auditoriaHojaMedidaService.AuditoriaHojaMedidaComplementoService(
      this.Cod_Accion,
      this.Cod_Cliente,
      this.Cod_EstCli,
      this.Cod_EstProG,
      this.Cod_VersionG   
      ).subscribe(
       (result: any) => {
         console.log(result)
         this.formulario.controls['inputCliente'].setValue(result[0].CLIENTE)
         this.formulario.controls['inputEstCli'].setValue(result[0].ESTILO)
         this.formulario.controls['inputEstPro'].setValue(result[0].EP)
         this.formulario.controls['inputVersion'].setValue(result[0].VERSION)
       },
       (err: HttpErrorResponse) => this.matSnackBar.open(err.message, 'Cerrar', { horizontalPosition: 'center', verticalPosition: 'top', duration: 1500 }))
   
    }

    MostrarOrdenesCargaMedida() {
      this.Cod_Accion   = 'O'
      this.Cod_Cliente  = ''
      this.Cod_EstCli   = ''
      this.Cod_EstProG  
      this.Cod_VersionG 
        this.auditoriaHojaMedidaService.AuditoriaHojaMedidaComplementoService(
        this.Cod_Accion,
        this.Cod_Cliente,
        this.Cod_EstCli,
        this.Cod_EstProG,
        this.Cod_VersionG   
        ).subscribe(
         (result: any) => {
           console.log(result)

           var OPS = ''
          result.forEach((currentValue, index) => {
            OPS += result[index].COD_ORDPRO + ' - '
          });

          //OPS = OPS.replace(/.$/,'')
          this.formulario.controls['inputOps'].setValue(OPS)
          

         },
         (err: HttpErrorResponse) => this.matSnackBar.open(err.message, 'Cerrar', { horizontalPosition: 'center', verticalPosition: 'top', duration: 1500 }))
     
    }
  

 


  MostrarCargaMedida() {
    this.SpinnerService.show();
    this.Cod_EstProG,
    this.Cod_VersionG
    this.auditoriaHojaMedidaService.AuditoriaHojaMedidaCargaMedidaService(
      this.Cod_EstProG,
      this.Cod_VersionG
    ).subscribe(
      (result: any) => {
       console.log(result)
      
       this.SpinnerService.hide();  
     
      },
      (err: HttpErrorResponse) => this.matSnackBar.open(err.message, 'Cerrar', { horizontalPosition: 'center', verticalPosition: 'top', duration: 1500 }))
  
  }


}
 