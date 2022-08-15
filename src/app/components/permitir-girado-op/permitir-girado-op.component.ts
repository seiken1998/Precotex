import { Component, OnInit, AfterViewInit, inject, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import * as _moment from 'moment';
import { Observable } from 'rxjs';
import { DespachoOpIncompletaService } from 'src/app/services/despacho-op-incompleta.service';
import { startWith, map, debounceTime } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { NgxSpinnerService }  from "ngx-spinner";
import { DialogRegistrarGiradoOpComponent } from "src/app/components/permitir-girado-op/dialog-registrar-girado-op/dialog-registrar-girado-op.component"
import { DialogEliminarComponent} from 'src/app/components/dialogs/dialog-eliminar/dialog-eliminar.component'
import { GlobalVariable } from 'src/app/VarGlobals';

interface data_det {
  Cod_OrdPro: string;
  Cod_Usuario: string;
  Fec_Creacion: string;
}

@Component({
  selector: 'app-permitir-girado-op',
  templateUrl: './permitir-girado-op.component.html',
  styleUrls: ['./permitir-girado-op.component.scss']
})
export class PermitirGiradoOpComponent implements OnInit {
 
 
  public data_det = [{
    Cod_OrdPro:   "",
    Cod_Usuario:  "",
    Fec_Creacion: "" 		
  }]


 // nuevas variables
  Cod_Accion    = ""
  Cod_OrdPro    = ""
  Fec_Inicio    = ""
  Fec_Fin       = ""

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  formulario = this.formBuilder.group({
    OP:           [''],
  })


  displayedColumns_cab: string[] = ['Cod_OrdPro', 'Cod_Usuario', 'Fec_Creacion', 'Acciones']
  dataSource: MatTableDataSource<data_det>;



  constructor(private formBuilder: FormBuilder,
    private matSnackBar: MatSnackBar,
    private despachoOpIncompletaService: DespachoOpIncompletaService,
    public dialog: MatDialog,
    private SpinnerService: NgxSpinnerService) { this.dataSource = new MatTableDataSource(); }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void { 
    this.MostrarCabecera()
  }

  
  clearDate(event) {
    event.stopPropagation();
    this.range.controls['start'].setValue('')
    this.range.controls['end'].setValue('')
  }


  openDialog() {

   let dialogRef = this.dialog.open(DialogRegistrarGiradoOpComponent, {
      disableClose: true,
      panelClass: 'my-class',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result == 'true') {
        this.MostrarCabecera()
      }
 
    })

  }


  

  MostrarCabecera() {
    this.SpinnerService.show();
    this.Cod_Accion    = 'L'
    this.Cod_OrdPro    = this.formulario.get('OP')?.value 
    this.Fec_Inicio    = this.range.get('start')?.value
    this.Fec_Fin       = this.range.get('end')?.value  
    this.despachoOpIncompletaService.PermitirGiradoOp(
      this.Cod_Accion,
      this.Cod_OrdPro,
      this.Fec_Inicio,
      this.Fec_Fin
    ).subscribe(
      (result: any) => {
          console.log(result[0].Respuesta)
          if(result[0].Respuesta == undefined){
            this.dataSource.data = result
          }
          else{
            this.matSnackBar.open(result[0].Respuesta, 'Cerrar', { horizontalPosition: 'center', verticalPosition: 'top', duration: 1500 })
            this.dataSource.data = []  
          }
         
          this.SpinnerService.hide()
      },
      (err: HttpErrorResponse) => this.matSnackBar.open(err.message, 'Cerrar', {
        duration: 1500,
      }))
  }


  EliminarRegistrocCabecera(Cod_OrdPro: string) {
    let dialogRef = this.dialog.open(DialogEliminarComponent, { disableClose: true, data: {} });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'true') {
        this.SpinnerService.show();
        this.Cod_Accion    = 'D'
        this.Cod_OrdPro    = Cod_OrdPro
        this.Fec_Inicio    = ""
        this.Fec_Fin       = ""
        this.despachoOpIncompletaService.PermitirGiradoOp(
          this.Cod_Accion,
          this.Cod_OrdPro,
          this.Fec_Inicio,
          this.Fec_Fin
        ).subscribe(
          (result: any) => {
            this.SpinnerService.hide();
            this.MostrarCabecera()
            this.matSnackBar.open("Proceso Correcto...", 'Cerrar', { horizontalPosition: 'center', verticalPosition: 'top', duration: 1500 })
          },
          (err: HttpErrorResponse) => this.matSnackBar.open(err.message, 'Cerrar', {
            duration: 1500,
          }))
      }

    })
  }



}

