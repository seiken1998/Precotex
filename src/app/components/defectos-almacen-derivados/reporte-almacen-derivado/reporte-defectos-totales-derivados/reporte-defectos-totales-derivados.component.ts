import { Component, OnInit, AfterViewInit, inject,ViewChild,ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import * as _moment from 'moment';
import { Observable } from 'rxjs';
import { DefectosAlmacenDerivadosService } from 'src/app/services/defectos-almacen-derivados.service';
import { startWith, map,debounceTime } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { NgxSpinnerService }  from "ngx-spinner";
import { ExcelService } from 'src/app/services/excel.service';
import { ExceljsService } from 'src/app/services/exceljs.service';

interface data_det {
  Cod_Auditor: string,
  Nom_Cliente: string,
  Cod_EstCli: string,
  Cod_ColCli: string,
  Cantidad_Total: string,
  
}

interface Cliente {
  Cod_Cliente: string;
  Nom_Cliente: string;
  Abr_Cliente: string;
}

interface Estilo {
  Cod_EstCli: string;
  
}

interface Color {
  Cod_ColCli: string;
  
}
@Component({
  selector: 'app-reporte-defectos-totales-derivados',
  templateUrl: './reporte-defectos-totales-derivados.component.html',
  styleUrls: ['./reporte-defectos-totales-derivados.component.scss']
})
export class ReporteDefectosTotalesDerivadosComponent implements OnInit {

  listar_operacionCliente:  Cliente[] = [];
  listar_operacionEstilo:   Estilo[] = [];
  listar_operacionColor:   Color[] = [];
  filtroOperacionCliente: Observable<Cliente[]> | undefined;
  filtroOperacionEstilo:  Observable<Estilo[]> | undefined;
  filtroOperacionColor:  Observable<Color[]> | undefined;

  public data_det_excel = [{
    fecha: "",
    hora: "",
    numero_guia:"",
    codigo_jaba: "",
    descripcion:"",
    codigo_barras:"",
    accion: "",
    numero_planta_origen:"", 
    planta_origen:"",
    numero_planta_destino:"",
    planta_destino:"",
    codigo_usuario:"",
    codigo_proveedor:"",
    ruc_proveedor:"",
    proveedor:""
  }] 

  public data_det = [{
    Cod_Auditor: "",
    Nom_Cliente: "",
    Cod_EstCli: "",
    Cod_ColCli: "",
    Cantidad_Total: "",
 
   }] 

  Det:any = [] 
  Cod_Accion=''
  sAbr = ''
  sNom_Cli = ''
  sCod_Cli =''
  vCliente  = ''
  vEstilo   = ''
  vColor    = ''
  vAuditor  = '' 
  vTemporada = ''
  vTalla = ''
  vCant = ''
  vCod_Accion = ''
  vNum_Auditoria = 0
  vMotivo = ''
  filterValueCliente =''
  Codigo_Auditoria_a_Modificar = ''
  //* Declaramos formulario para obtener los controles */
  formulario = this.formBuilder.group({
   sCliente: [''],
   sEstilo: [''],
   sColor: [''],
   sAuditor: [''],
   fec_registro: ['']
  })  

  dataForExcel = [];
  dataForExcel2 = [];

  dataSource: MatTableDataSource<data_det>;
  displayedColumns: string[] = ['Descripcion','Total'];
  //displayedColumns: string[] = []
  columnsToDisplay: string[] = this.displayedColumns.slice();
  clickedRows = new Set<data_det>();


  constructor(private formBuilder: FormBuilder,
    private matSnackBar: MatSnackBar, 
    private defectosAlmacenDerivadosService: DefectosAlmacenDerivadosService,
    public dialog: MatDialog,
    private SpinnerService: NgxSpinnerService,
    private excelService:ExcelService,
    private exceljsService:ExceljsService) {  this.dataSource = new MatTableDataSource();}

    @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.CargarOperacionCliente()
    this.CargarOperacionEstilo()
    this.CargarOperacionColor()
   
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = 'items por pagina';
    this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
      if (length === 0 || pageSize === 0) {
        return `0 de ${length}`;
      }
      length = Math.max(length, 0);
      const startIndex = page * pageSize;
      // If the start index exceeds the list length, do not try and fix the end index to the end.
      const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
      return `${startIndex + 1}  - ${endIndex} de ${length}`;
    };
   
  }


  generateExcel() {
    console.log(this.dataSource.data)
    if(this.dataSource.data.length == 0){
      this.matSnackBar.open("No existen registros...!!", 'Cerrar', { horizontalPosition: 'center', verticalPosition: 'top', duration: 1500 })
    }
    else{

    this.dataSource.data.forEach((row: any) => {
      this.dataForExcel.push(Object.values(row)) 
    })

    let reportData = {
      title: 'REPORTE DE DEFECTOS DERIVADOS',
      data: this.dataForExcel,
      headers: Object.keys(this.dataSource.data[0])
    }

    this.exceljsService.exportExcel(reportData);
    this.dataForExcel = []
  }
  }


  generateExcel2() {

    this.SpinnerService.show();
    
    if(this.formulario.get('sCliente')?.value == ''){
      this.vCliente = ''
    }
    this.vEstilo = this.formulario.get('sEstilo')?.value
    this.vColor = this.formulario.get('sColor')?.value
    this.vAuditor = this.formulario.get('sAuditor')?.value
    this.vCod_Accion = 'L'
    this.defectosAlmacenDerivadosService.ListarReporteDetallado2Service(
      this.vCod_Accion,
      this.vCliente,
      this.vEstilo, 
      this.vColor,
      this.vAuditor 
      ).subscribe(
        (result: any) => {
          console.log(result[0].Respuesta)
        if(result[0].Respuesta){
          this.matSnackBar.open(result[0].Respuesta, 'Cerrar', { horizontalPosition: 'center',  verticalPosition: 'top',duration: 1500 })
          this.SpinnerService.hide();
          
        }else{
          result.forEach((row: any) => {
            this.dataForExcel2.push(Object.values(row)) 
          })
      
          let reportData = {
            title: 'REPORTE DE DEFECTOS DERIVADOS - PCP',
            data: this.dataForExcel2,
            headers: Object.keys(result[0])
          }
      
          this.exceljsService.exportExcel(reportData);
          this.dataForExcel2 = []
          this.SpinnerService.hide();
        }

        },
        (err: HttpErrorResponse) => this.matSnackBar.open(err.message, 'Cerrar', {
          duration: 1500,
        }))


  
  }

  exportAsXLSX():void {
   
    this.excelService.exportAsExcelFile(this.dataSource.data, 'Reporte-Detallado-Defectos-Derivado');

 }
  clearDate(event) {
    event.stopPropagation();
    this.formulario.controls['fec_registro'].setValue('')
  }
 

 


  buscarDefectosDerivados(){
    this.SpinnerService.show();
    this.dataSource.data = []
    this.displayedColumns  = ['Descripcion','Total Produccion','Total Recuperado'];
    this.columnsToDisplay = this.displayedColumns.slice();
    if(this.formulario.get('sCliente')?.value == ''){
      this.vCliente = ''
    }
    this.vEstilo = this.formulario.get('sEstilo')?.value
    this.vColor = this.formulario.get('sColor')?.value
    this.vAuditor = this.formulario.get('sAuditor')?.value
    this.vCod_Accion = 'T'
    /*console.log(this.vCliente)
    console.log(this.vEstilo)
    console.log(this.vColor)
    console.log(this.vAuditor)*/

    this.defectosAlmacenDerivadosService.ListarReporteDetalladoService(
      this.vCod_Accion,
      this.vCliente,
      this.vEstilo, 
      this.vColor,
      this.vAuditor 
      ).subscribe(
        (result: any) => {
        
          if(result.length == 0){   
            this.matSnackBar.open('No hay registros..', 'Cerrar', { horizontalPosition: 'center',  verticalPosition: 'top',duration: 1500 })
            this.SpinnerService.hide();
          }
          if(result[0].Respuesta ){
            this.matSnackBar.open(result[0].Respuesta, 'Cerrar', { horizontalPosition: 'center',  verticalPosition: 'top',duration: 1500 })
            this.SpinnerService.hide();
          }
          else{
          
            //console.log(result)
            result.forEach((currentValue, index) => {
             // console.log(result[index].Cod_Talla)
               this.displayedColumns.push(result[index].Cod_Talla)
             })
           
             
          this.columnsToDisplay = this.displayedColumns.slice()
          this.vCod_Accion = 'L'
          this.defectosAlmacenDerivadosService.ListarReporteDetalladoService(
          this.vCod_Accion,
          this.vCliente,
          this.vEstilo,
          this.vColor,
          this.vAuditor 
          ).subscribe(
            (result: any) => {
             // console.log(result)
              this.dataSource.data = result
              this.SpinnerService.hide();
            })
        
        
        }
          //if(result[0].Respuesta != ''){
          //this.matSnackBar.open(result[0].Respuesta, 'Cerrar', { horizontalPosition: 'center',  verticalPosition: 'top',duration: 1500 })
          //}
        },
        (err: HttpErrorResponse) => this.matSnackBar.open(err.message, 'Cerrar', {
          duration: 1500,
        }))
  }
  
 
  CambiarValorCliente(Cod_Cliente: string,Abr_Cliente: string){
    this.vCliente = Cod_Cliente
    //console.log(this.vCliente)
  }

CargarOperacionCliente(){

  this.listar_operacionCliente = []; 
  this.sAbr = ''
  this.sCod_Cli = ''
  this.sNom_Cli = this.formulario.get('sCliente')?.value
  this.Cod_Accion = 'L'
  this.defectosAlmacenDerivadosService.mantenimientoDerivadosService(this.sAbr,this.sCod_Cli,this.sNom_Cli,this.Cod_Accion).subscribe(
    (result: any) => {
      this.listar_operacionCliente = result
      this.RecargarOperacionCliente()
    },
    (err: HttpErrorResponse) => this.matSnackBar.open(err.message, 'Cerrar', { horizontalPosition: 'center', verticalPosition: 'top', duration: 1500 }))
}


RecargarOperacionCliente(){
  this.filtroOperacionCliente = this.formulario.controls['sCliente'].valueChanges.pipe(
    startWith(''),
    map(option => (option ? this._filterOperacionCliente(option) : this.listar_operacionCliente.slice())),
  );
  
}
private _filterOperacionCliente(value: string): Cliente[] {
  if (value == null || value == undefined ) {
    value = ''
    
  }

  const filterValue = value.toLowerCase();

  return this.listar_operacionCliente.filter(option => option.Nom_Cliente.toLowerCase().includes(filterValue));
}






 
CargarOperacionEstilo(){

  this.listar_operacionEstilo = [];
  this.sAbr = ''
  this.sCod_Cli = ''
  this.sNom_Cli = ''
  this.Cod_Accion = 'E'
  this.defectosAlmacenDerivadosService.mantenimientoDerivadosService(this.sAbr,this.sCod_Cli,this.sNom_Cli,this.Cod_Accion).subscribe(
    (result: any) => {
      this.listar_operacionEstilo = result
      this.RecargarOperacionEstilo()
    },
    (err: HttpErrorResponse) => this.matSnackBar.open(err.message, 'Cerrar', { horizontalPosition: 'center', verticalPosition: 'top', duration: 1500 }))
}


RecargarOperacionEstilo(){
  this.filtroOperacionEstilo = this.formulario.controls['sEstilo'].valueChanges.pipe(
    startWith(''),
    map(option => (option ? this._filterOperacionEstilo(option) : this.listar_operacionEstilo.slice())),
  );
  
}
private _filterOperacionEstilo(value: string): Estilo[] {
  if (value == null || value == undefined ) {
    value = ''
    
  }

  const filterValue = value.toLowerCase();

  return this.listar_operacionEstilo.filter(option => option.Cod_EstCli.toLowerCase().includes(filterValue));
}


CargarOperacionColor(){

  this.listar_operacionColor = [];
  this.sAbr = ''
  this.sCod_Cli = ''
  this.sNom_Cli = ''
  this.Cod_Accion = 'C'
  this.defectosAlmacenDerivadosService.mantenimientoDerivadosService(this.sAbr,this.sCod_Cli,this.sNom_Cli,this.Cod_Accion).subscribe(
    (result: any) => {
      this.listar_operacionColor = result
      this.RecargarOperacionColor()
    },
    (err: HttpErrorResponse) => this.matSnackBar.open(err.message, 'Cerrar', { horizontalPosition: 'center', verticalPosition: 'top', duration: 1500 }))
}


RecargarOperacionColor(){
  this.filtroOperacionColor = this.formulario.controls['sColor'].valueChanges.pipe(
    startWith(''),
    map(option => (option ? this._filterOperacionColor(option) : this.listar_operacionColor.slice())),
  );
  
}
private _filterOperacionColor(value: string): Color[] {
  if (value == null || value == undefined ) {
    value = ''
    
  }

  const filterValue = value.toLowerCase();

  return this.listar_operacionColor.filter(option => option.Cod_ColCli.toLowerCase().includes(filterValue));
}





 

}

