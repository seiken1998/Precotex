import { Component, OnInit, ViewChild, ElementRef, Inject, Renderer2, AfterViewInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { GlobalVariable } from '../../VarGlobals';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MovimientoInspeccionService } from 'src/app/services/movimiento-inspeccion.service';
import { InspeccionPrendaService} from 'src/app/services/inspeccion-prenda.service'
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { startWith, map, debounceTime } from 'rxjs/operators';
import * as _moment from 'moment';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSelect } from '@angular/material/select';
import {SelectionModel} from '@angular/cdk/collections';
import { DialogHabilitadorComponent } from 'src/app/components/inspeccion-prenda-habilitador/dialog-inspeccion-prenda-habilitador/dialog-habilitador/dialog-habilitador.component';
import { NgxSpinnerService }  from "ngx-spinner";
interface Color {
  Codigo:       string;
  Descripcion:  string;
}

interface Modulo {
  Cod_Modulo:  number;
  Des_Modulo:  string;
}

interface Tipo_Proceso {
  Cod_Familia:        string;
  Des_Familia:        string;
  Cod_Almcen:         number;
  Cod_TipMov:         string;
}

@Component({
  selector: 'app-inspeccion-prenda-habilitador',
  templateUrl: './inspeccion-prenda-habilitador.component.html',
  styleUrls: ['./inspeccion-prenda-habilitador.component.scss']
})
export class InspeccionPrendaHabilitadorComponent implements OnInit {
  
  listar_operacionColor: Color[] = [];


  displayedColumns: string[] = ['Sel', 'Codigo', 'Color','Stock'];
  dataSource = new MatTableDataSource<Color>(this.listar_operacionColor);
  selection = new SelectionModel<Color>(true, []);

  Op              = ''
  Color           = []
  Cod_Accion      = ''
  ColorConcat     = '' 
  Flg_Btn_Buscar  = false
  Ticket          = ""
  Tipo_Proceso    = ""

  formulario = this.formBuilder.group({
    Modulo:       [''],
    Tipo_Proceso: [''],
    op:           [''],
    color:        ['']
  }) 

  listar_operacionModulo: Modulo[] = [];
  listar_operacionTipo_Proceso: Tipo_Proceso[] = [];

  constructor(private formBuilder: FormBuilder,
    private matSnackBar: MatSnackBar,private SpinnerService: NgxSpinnerService, 
    private movimientoInspeccionService: MovimientoInspeccionService,
    public dialog: MatDialog,
    private inspeccionPrendaService: InspeccionPrendaService
  ) {

    this.formulario = formBuilder.group({
      op:          ['', Validators.required],
      Tipo_Proceso: ['', Validators.required],
      Modulo:       ['']
    });
  }
 

  ngOnInit(): void {
    this.MuestraTipoProceso()
  }


  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(row?: Color): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.Codigo + 1}`;
  }


  llenarColorPorOp(){
    this.listar_operacionColor = []
    this.ColorConcat = ''
    this.Cod_Accion = 'F'
    this.Op         = this.formulario.get('op')?.value
    this.movimientoInspeccionService.llenarColorPorOp(this.Cod_Accion,this.Op).subscribe(
      (result: any) => {
        console.log(result[0].Respuesta)
        if (result[0].Respuesta == undefined) {
        this.dataSource.data = result
        }else{
          this.matSnackBar.open(result[0].Respuesta, 'Cerrar', { horizontalPosition: 'center', verticalPosition: 'top', duration: 1500 })
        }
      },
      (err: HttpErrorResponse) => this.matSnackBar.open(err.message, 'Cerrar', { horizontalPosition: 'center', verticalPosition: 'top', duration: 1500 }))
  }

  ValidarActivarBuscar(){
    if(this.formulario.get('op')?.value.length == 5){
      this.Flg_Btn_Buscar = true
    }
    else{
      this.reset()

    }
  }





 /* submit(formDirective) :void {
    this.SpinnerService.show();
    this.ColorConcat = ''
    this.Op     = this.formulario.get('op')?.value
    this.Color  = this.selection.selected
    this.Color.forEach((currentValue, index) => {
    this.ColorConcat += this.Color[index].Codigo + '-'
    });

    this.movimientoInspeccionService.generaMovimientoIngresoOpColor(this.Op, this.ColorConcat).subscribe(
      (result: any) => {
        if (result[0].Respuesta  == 'OK') {
          this.matSnackBar.open('El movimiento se genero correctamente..!!', 'Cerrar', { horizontalPosition: 'center', verticalPosition: 'top', duration: 1500 })
          this.reset()
          this.SpinnerService.hide();
        }
        else{
          this.SpinnerService.hide();
          this.matSnackBar.open(result[0].Respuesta, 'Cerrar', { horizontalPosition: 'center', verticalPosition: 'top', duration: 1500 })
        }
      },
      (err: HttpErrorResponse) => this.matSnackBar.open(err.message, 'Cerrar', { horizontalPosition: 'center', verticalPosition: 'top', duration: 1500 }))
    


  }*/

 
  reset(){
      this.Flg_Btn_Buscar = false
      this.ColorConcat = ''
      this.dataSource.data = []
      this.Color = []
      this.selection = new SelectionModel<Color>(true, []);
    
  }

  MuestraTipoProceso(){
      this.inspeccionPrendaService.CF_MUESTRA_INSPECCION_FAMILIA(
      ).subscribe(
        (result: any) => {
        this.listar_operacionTipo_Proceso = result
        },
        (err: HttpErrorResponse) => this.matSnackBar.open(err.message, 'Cerrar', {
          duration: 1500,
        }))
    
  }

  ValidarTicket(){
      this.Ticket = this.formulario.get('op')?.value
      this.Tipo_Proceso = this.formulario.get('Tipo_Proceso')?.value
      if(this.Ticket != ""){
      let dialogRef = this.dialog.open(DialogHabilitadorComponent,
        {
          disableClose: false,
          panelClass: 'my-class',
          data: { Cod_Modulo: "",
                  Cod_Familia: this.Tipo_Proceso,
                  Ticket: this.Ticket 
          }
        });
      dialogRef.afterClosed().subscribe(result => {

          /*this.Cod_Accion = "I"
          this.Id
          this.Tipo_Sub_Proceso = '04'
          this.Cod_Defecto = result.data
          this.inspeccionPrendaService.CF_Man_Inspeccion_Prenda_Detalle_Web(
            this.Cod_Accion,
            this.Id,
            this.Tipo_Sub_Proceso,
            this.Cod_Defecto
          ).subscribe(
            (result: any) => {
              console.log(result)
             
            },
            (err: HttpErrorResponse) => this.matSnackBar.open(err.message, 'Cerrar', {
              duration: 1500,
            }))*/

      })
    }
  }

}
