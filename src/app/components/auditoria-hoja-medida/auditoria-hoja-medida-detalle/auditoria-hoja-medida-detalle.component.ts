import { Component, OnInit, AfterViewInit, inject, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import * as _moment from 'moment';
import { Observable } from 'rxjs';
import { AuditoriaHojaMedidaService} from 'src/app/services/auditoria-hoja-medida.service'
import { AuditoriaInspeccionCosturaService} from 'src/app/services/auditoria-inspeccion-costura.service'
import { startWith, map, debounceTime } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { NgxSpinnerService }  from "ngx-spinner";
import { DialogEliminarComponent} from 'src/app/components/dialogs/dialog-eliminar/dialog-eliminar.component'
import { GlobalVariable } from 'src/app/VarGlobals'; 

interface data_det {
  SEC_MEDIDA:    string
  Orden:         number
  DES_MEDIDA:    string
  TOLERANCIA:    string
}
 
interface Supervisor {
  Cod_Auditor: string;
  Nom_Auditor: string;
}

interface Auditor {
  Cod_Auditor: string;
  Nom_Auditor: string;
}


@Component({
  selector: 'app-auditoria-hoja-medida-detalle',
  templateUrl: './auditoria-hoja-medida-detalle.component.html',
  styleUrls: ['./auditoria-hoja-medida-detalle.component.scss']
})
export class AuditoriaHojaMedidaDetalleComponent implements OnInit {
 
  listar_operacionSupervisor:   Supervisor[] = [];
  filtroOperacionSupervisor:    Observable<Supervisor[]> | undefined;
  listar_operacionAuditor:      Auditor[] = [];
  filtroOperacionAuditor:       Observable<Auditor[]> | undefined;

  public data_det = [{
    SEC_MEDIDA:           '',
    Orden:                0,
    DES_MEDIDA:           '',
    TOLERANCIA:           ''
  }]


  Cod_EstProG   = GlobalVariable.Cod_EstProG
  Cod_VersionG      = GlobalVariable.Cod_VersionG
  Cod_ClienteG   = GlobalVariable.Cod_ClienteG
  Cod_EstCliG      = GlobalVariable.Cod_EstCliG

  Cod_Accion        = ''
  Cod_Cliente       = ''
  Cod_EstCli        = ''

  //var
  Cod_Auditor  = ''
  Nom_Auditor  = ''
  Cod_OrdPro   = ''
  Can_Lote     = 0
  Cod_Motivo   = ''
  InputFechaDesHabilitado = true	 

  myControl = new FormControl();
  Fecha = new FormControl(new Date())

   //* Declaramos formulario para obtener los controles */
   formulario = this.formBuilder.group({
    //-----------NUEVO
    inputCliente:     [''],
    inputEstCli:      [''],
    inputEstPro:      [''],
    inputVersion:     [''],
    inputOps:         [''],
    Linea:            [''],
    CodSupervisor:    [''],
    Supervisor:       [''],
    CodAuditor:       [''],
    Auditor:          [''],
  })

  displayedColumns_cab: string[] = []
  dataSource: MatTableDataSource<data_det>;
  columnsToDisplay: string[] = this.displayedColumns_cab.slice();

  constructor(private formBuilder: FormBuilder,
    private matSnackBar: MatSnackBar,
    private auditoriaHojaMedidaService: AuditoriaHojaMedidaService,
    private auditoriaInspeccionCosturaService: AuditoriaInspeccionCosturaService,
    public dialog: MatDialog,
    private SpinnerService: NgxSpinnerService) { this.dataSource = new MatTableDataSource(); }


  ngOnInit(): void {
    /*console.log(this.Cod_EstProG)
    console.log(this.Cod_VersionG)
    console.log(this.Cod_ClienteG)
    console.log(this.Cod_EstCliG)*/

    this.formulario.controls['inputCliente'].disable()
    this.formulario.controls['inputEstCli'].disable()
    this.formulario.controls['inputEstPro'].disable()
    this.formulario.controls['inputVersion'].disable()
    this.formulario.controls['inputOps'].disable()
    this.formulario.controls['CodSupervisor'].disable()
    this.formulario.controls['CodAuditor'].disable()
    this.MostrarCabeceraCargaMedida()
    this.MostrarCargaMedida()
    this.MostrarOrdenesCargaMedida()
    this.CargarOperacionSupervisor()
    this.CargarOperacionAuditor()
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
         //console.log(result)
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
           //console.log(result)

           var OPS = ''
          result.forEach((currentValue, index) => {
            OPS += result[index].COD_ORDPRO + ' - '
          });

          //OPS = OPS.replace(/.$/,'')
          this.formulario.controls['inputOps'].setValue(OPS)
          

         },
         (err: HttpErrorResponse) => this.matSnackBar.open(err.message, 'Cerrar', { horizontalPosition: 'center', verticalPosition: 'top', duration: 1500 }))
     
    }
  

 print(){
  const printContent = document.getElementById("container");
  const WindowPrt = window.open('', '', 'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0');
  WindowPrt.document.write(printContent.innerHTML);
  WindowPrt.document.close();
  WindowPrt.focus();
  WindowPrt.print();
  WindowPrt.close();
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
      /*var dataForExcel = []
       result.forEach((row: any) => {
        dataForExcel.push(Object.values(row)) 
      })
      console.log(dataForExcel)*/
      if(result.length > 0){
        //TRAE TODOS LOS NOMBRES DE LOS INDICES DE UN ARREGLO
        Object.keys(result[0]).forEach((currentValue, index) => {
          console.log(Object.keys(result[0])[index])
          this.displayedColumns_cab.push(Object.keys(result[0])[index])
        })
        this.columnsToDisplay = this.displayedColumns_cab.slice()
        this.dataSource.data = result
        this.SpinnerService.hide();
      }else {
        this.matSnackBar.open("No existen registros..!!", 'Cerrar', { horizontalPosition: 'center', verticalPosition: 'top', duration: 1500 })
        this.SpinnerService.hide();
      }

     
      },
      (err: HttpErrorResponse) => this.matSnackBar.open(err.message, 'Cerrar', { horizontalPosition: 'center', verticalPosition: 'top', duration: 1500 }))
  
  }


  /* --------------- LLENAR SELECT SUPERVISOR ------------------------------------------ */

  CargarOperacionSupervisor(){

    this.listar_operacionSupervisor = [];
    this.Cod_Accion   = 'I'
    this.Cod_Auditor  = ''
    this.Nom_Auditor  = ''
    this.Cod_OrdPro   = ''
    this.Can_Lote     = 0
    this.Cod_Motivo   = ''
    this.auditoriaInspeccionCosturaService.MantenimientoAuditoriaInspeccionCosturaComplemento(
      this.Cod_Accion,
      this.Cod_Auditor,
      this.Nom_Auditor,
      this.Cod_OrdPro,
      this.Can_Lote,
      this.Cod_Motivo
      ).subscribe(
      (result: any) => {
        this.listar_operacionSupervisor = result
        this.RecargarOperacionSupervisor()

      },
      (err: HttpErrorResponse) => this.matSnackBar.open(err.message, 'Cerrar', { horizontalPosition: 'center', verticalPosition: 'top', duration: 1500 }))
  }
  
  
  RecargarOperacionSupervisor(){
    this.filtroOperacionSupervisor = this.formulario.controls['Supervisor'].valueChanges.pipe(
      startWith(''),
      map(option => (option ? this._filterOperacionSupervisor(option) : this.listar_operacionSupervisor.slice())),
    );
    
  }
  /*private _filterOperacionSupervisor(value: string): Supervisor[] {
    if (value == null || value == undefined ) {
      value = ''  
    }
    this.formulario.controls['CodSupervisor'].setValue('')
    const filterValue = value.toLowerCase();
    return this.listar_operacionSupervisor.filter(option => option.Nom_Auditor.toLowerCase().includes(filterValue));
  }*/

  private _filterOperacionSupervisor(value: string): Supervisor[] {
    this.formulario.controls['CodSupervisor'].setValue('')
    const filterValue = value.toLowerCase();
    //PERMITE BUSCAR POR 2 VARIABLES
    return this.listar_operacionSupervisor.filter(option => String(option.Cod_Auditor).toLowerCase().indexOf(filterValue ) > -1 || 
    option.Nom_Auditor.toLowerCase().indexOf(filterValue ) > -1);
  }



  /* --------------- CAMBIAR VALOR DEL INPUT COD SUPERVISOR ------------------------------------------ */

  CambiarValorCodSupervisor(Cod_Auditor: string){
    this.formulario.controls['CodSupervisor'].setValue(Cod_Auditor)
  }


  /* --------------- BUSCAR SUPERVISOR Y LLENAR INPUT SUPERVISOR ------------------------------------------ */
  BuscarSupervisor(){
    this.listar_operacionSupervisor = [];
    this.Cod_Accion   = 'T'
    this.Cod_Auditor  = this.formulario.get('CodSupervisor')?.value
    this.Nom_Auditor  = ''
    this.Cod_OrdPro   = ''
    this.Can_Lote     = 0
    this.Cod_Motivo   = ''
    this.auditoriaInspeccionCosturaService.MantenimientoAuditoriaInspeccionCosturaComplemento(
      this.Cod_Accion,
      this.Cod_Auditor,
      this.Nom_Auditor,
      this.Cod_OrdPro,
      this.Can_Lote,
      this.Cod_Motivo
      ).subscribe(
      (result: any) => {
       this.formulario.controls['Supervisor'].setValue(result[0].Nom_Auditor)
       this.formulario.controls['CodSupervisor'].setValue(result[0].Cod_Auditor)
      },
      (err: HttpErrorResponse) => this.matSnackBar.open(err.message, 'Cerrar', { horizontalPosition: 'center', verticalPosition: 'top', duration: 1500 }))
  }



  /* --------------- LLENAR SELECT AUDITOR ------------------------------------------ */

  CargarOperacionAuditor(){

    this.listar_operacionAuditor = [];
    this.Cod_Accion   = 'L'
    this.Cod_Auditor  = ''
    this.Nom_Auditor  = ''
    this.Cod_OrdPro   = ''
    this.Can_Lote     = 0
    this.Cod_Motivo   = ''
    this.auditoriaInspeccionCosturaService.MantenimientoAuditoriaInspeccionCosturaComplemento(
      this.Cod_Accion,
      this.Cod_Auditor,
      this.Nom_Auditor,
      this.Cod_OrdPro,
      this.Can_Lote,
      this.Cod_Motivo
      ).subscribe(
      (result: any) => {
        this.listar_operacionAuditor = result
        this.RecargarOperacionAuditor()
      },
      (err: HttpErrorResponse) => this.matSnackBar.open(err.message, 'Cerrar', { horizontalPosition: 'center', verticalPosition: 'top', duration: 1500 }))
  }
  
  
  RecargarOperacionAuditor(){
    this.filtroOperacionAuditor = this.formulario.controls['Auditor'].valueChanges.pipe(
      startWith(''),
      map(option => (option ? this._filterOperacionAuditor(option) : this.listar_operacionAuditor.slice())),
    );
    
  }
 
  private _filterOperacionAuditor(value: string): Auditor[] {
    this.formulario.controls['CodAuditor'].setValue('')
    const filterValue = value.toLowerCase();
    //PERMITE BUSCAR POR 2 VARIABLES
    return this.listar_operacionAuditor.filter(option => String(option.Cod_Auditor).toLowerCase().indexOf(filterValue ) > -1 || 
    option.Nom_Auditor.toLowerCase().indexOf(filterValue ) > -1);
  }



  /* --------------- CAMBIAR VALOR DEL INPUT COD SUPERVISOR ------------------------------------------ */

  CambiarValorCodAuditor(Cod_Auditor: string){
    this.formulario.controls['CodAuditor'].setValue(Cod_Auditor)
  }


}
 