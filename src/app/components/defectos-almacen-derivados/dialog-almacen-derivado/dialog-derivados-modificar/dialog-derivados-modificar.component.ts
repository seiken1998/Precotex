import { Component, OnInit, ViewChild, ElementRef, Inject, Renderer2, AfterViewInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormControlName, FormGroup } from '@angular/forms';
import { GlobalVariable } from '../../../../VarGlobals';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DefectosAlmacenDerivadosService } from 'src/app/services/defectos-almacen-derivados.service';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { startWith, map,debounceTime } from 'rxjs/operators';
import * as _moment from 'moment';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSelect } from '@angular/material/select';


interface Derivados {
  Abr_Motivo: string;
  MotivoDefecto: string;
  TotxMotivo: string;
  m:string;
  x: string;
  xl: string;
  total: number;
}


interface Listar_Cliente {
  Nom_Cliente: string;
}

interface Talla {
  Cod_Talla: string
}

interface Cliente {
  Cod_Cliente: string;
  Nom_Cliente: string;
  Abr_Cliente: string;
}

interface Temporada {
  Codigo: string;
  Descripcion: string;
}
interface Color {
  Cod_ColCli: string;
  Nom_ColCli: string;
}


@Component({
  selector: 'app-dialog-derivados-modificar',
  templateUrl: './dialog-derivados-modificar.component.html',
  styleUrls: ['./dialog-derivados-modificar.component.scss']
})
export class DialogDerivadosModificarComponent implements OnInit,AfterViewInit {

  sCod_Usuario = GlobalVariable.vusu;



  listar_operacionEstilo: string[] = [''];
  listar_operacionTemporada: Temporada[] = [];
  listar_operacionColor: Color[] = [];
  listar_operacionCliente: Cliente[] = [];
  
  filtroOperacionCliente: Observable<Cliente[]> | undefined;
  filtroOperacionEstilo: Observable<string[]> | undefined;


  tallas: Talla[] = [];

  dataT: any = []
  Cod_Accion      = ''
  Num_Auditoria   = 0
  Cod_Cliente     = ''
  Cod_Auditor     = ''
  Fec_Auditoria   = ''
  Total           = 0
  Cod_EstCli      = ''
  Cod_TemCli	    = ''
  Cod_ColCli      = '' 
  Glosa           = ''
  Cod_Talla	      = ''
  Cod_Motivo      = ''
  Can_Defecto     = 0
  Op              = ''
  Abr             = ''
  Nom_Cliente     = ''
  Abr_Motivo      = ''
  filterValue     = ''
  Numero_Auditoria_Cabecera = 0
  Codigo_Defecto_Eliminar   = ''
  flg_btn_detalle   = false
  flg_btn_cabecera  = true
  flg_reset_estilo  = false
  num = 0
  Altertas_Caidas_Global  = ''
  Total_Global = 0
  Defectos_Global = 0
  Caidas_Global = 0

 


  myControl = new FormControl();
  fec_registro = new FormControl(new Date())

  formulario = this.formBuilder.group({
    sCliente:   [''],
    sEstilo:    [''],
    sColor:     [''],
    sAuditor:   [''],
    sAbr:       [''],
    cod:        [''],
    defecto:    [''],
    s:          [''],
    m:          [''],
    x:          [''],
    xl:         [''],
    cant:       [''],
    sTemporada: [''],
    sCodCli:    [''],
    sCodTemp:   [''],
    Cod_Motivo: ['']
  })



  listar_cliente: Listar_Cliente[] = [];

  dataSource: MatTableDataSource<Derivados>;
  
  displayedColumns: string[] = ['Codigo', 'Motivo', 'Total'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  clickedRows = new Set<Derivados>();



  constructor(private formBuilder: FormBuilder,
    private matSnackBar: MatSnackBar,
    private defectosAlmacenDerivadosService: DefectosAlmacenDerivadosService,
    private elementRef: ElementRef,
    private renderer: Renderer2
    , @Inject(MAT_DIALOG_DATA) public data: any) {

    this.dataSource = new MatTableDataSource();
  }


  @ViewChild('s') inputS!:ElementRef;
  @ViewChild('abr') inputAbr!:ElementRef;
  @ViewChild('cod') inputCodMotivo!:ElementRef;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  


  ngOnInit(): void {

    this.fec_registro.disable()
    this.formulario.controls['sAuditor'].setValue(this.sCod_Usuario);
    this.DeshabilitarCabcera()
    //console.log(this.data)
    this.Numero_Auditoria_Cabecera=this.data
    this.ListarRegistroDefecto()
    this.listarDetalle()
   
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


  mostrarAlertaCaidas(){
    this.Total_Global = 0
    this.Defectos_Global = 0
    this.Caidas_Global = 0

    this.Cod_Accion     = 'C'
    this.Num_Auditoria  = this.data
    this.Cod_Cliente    = this.formulario.controls['sCodCli'].value
    this.Cod_Auditor    = ''
    this.Fec_Auditoria  = ''
    this.Total          = 0
    this.Cod_EstCli     = this.formulario.controls['sEstilo'].value
    this.Cod_TemCli     = this.formulario.controls['sCodTemp'].value
    this.Cod_ColCli     = this.formulario.controls['sColor'].value
    this.Glosa          = ''
    this.Cod_Talla      = ''
    this.Cod_Motivo     = ''
    this.Can_Defecto    = 0 
    this.Op             = ''

    /*console.log( this.Cod_Cliente)
    console.log( this.Cod_EstCli)
    console.log( this.Cod_TemCli)*/
    this.defectosAlmacenDerivadosService.Cf_Mantenimiento_Derivados(
      this.Cod_Accion,
      this.Num_Auditoria, 
      this.Cod_Cliente,
      this.Cod_Auditor,
      this.Fec_Auditoria,
      this.Total,
      this.Cod_EstCli,
      this.Cod_TemCli,
      this.Cod_ColCli,
      this.Glosa,
      this.Cod_Talla,
      this.Cod_Motivo,
      this.Can_Defecto,
      this.Op,
    ).subscribe(
        (result: any) => {
          if(result[0]['Alerta'] !=undefined){
         /* console.log(result[0]['Total'])
          console.log(result[0]['Defectos'])
          console.log(result[0]['Caidas'])*/
          this.Total_Global = result[0]['Total']
          this.Defectos_Global = result[0]['Defectos']
          this.Caidas_Global = result[0]['Caidas']

          this.Altertas_Caidas_Global = result[0]['Alerta']
          this.EnviarAlertaTelegram()  
        }
        },
        (err: HttpErrorResponse) => this.matSnackBar.open(err.message, 'Cerrar', { horizontalPosition: 'center',  verticalPosition: 'top',duration: 1500 }))


  }

  EnviarAlertaTelegram(){
    console.log(this.formulario.controls['sCodCli'].value)
    console.log(this.formulario.controls['sEstilo'].value)
    console.log(this.formulario.controls['sCodTemp'].value)
    console.log(this.formulario.controls['sColor'].value)
    console.log(this.formulario.controls['sCliente'].value)
    console.log(this.formulario.controls['sTemporada'].value)
    console.log(this.Total_Global)
    console.log(this.Defectos_Global)
    console.log(this.Caidas_Global)

 

    this.defectosAlmacenDerivadosService.Cf_Enviar_Alerta_Audita_Defectos_Derivados_Telegram(
      this.formulario.controls['sCodCli'].value ,
      this.formulario.controls['sCliente'].value,
      this.formulario.controls['sEstilo'].value,
      this.formulario.controls['sCodTemp'].value,
      this.formulario.controls['sTemporada'].value,
      this.formulario.controls['sColor'].value,
      this.Total_Global,
      this.Defectos_Global,
      this.Caidas_Global
    ).subscribe(
 
        (result: any) => {

        },
        (err: HttpErrorResponse) => this.matSnackBar.open(err.message, 'Cerrar', { horizontalPosition: 'center',  verticalPosition: 'top',duration: 1500 }))


  }

  
  listarDetalle(){
    
    this.Cod_Accion     = 'F'
    this.Num_Auditoria  = this.data
    this.Cod_Cliente    = '' 
    this.Cod_Auditor    = ''
    this.Fec_Auditoria  = ''
    this.Total          = 0
    this.Cod_EstCli     = ''
    this.Cod_TemCli     = ''
    this.Cod_ColCli     = ''
    this.Glosa          = ''
    this.Cod_Talla      = ''
    this.Cod_Motivo     = ''
    this.Can_Defecto    = 0
    this.Op             = ''

    this.defectosAlmacenDerivadosService.Cf_Mantenimiento_Derivados(
      this.Cod_Accion,
      this.Num_Auditoria, 
      this.Cod_Cliente,
      this.Cod_Auditor,
      this.Fec_Auditoria,
      this.Total,
      this.Cod_EstCli,
      this.Cod_TemCli,
      this.Cod_ColCli,
      this.Glosa,
      this.Cod_Talla,
      this.Cod_Motivo,
      this.Can_Defecto,
      this.Op,
    ).subscribe(
 
        (result: any) => {
            this.Cod_Cliente  = result[0].Cod_Cliente
            this.Cod_TemCli   = result[0].Cod_TemCli
            this.Cod_EstCli   = result[0].Cod_EstCli
            this.Cod_ColCli   = result[0].Cod_ColCli

     
 
            this.formulario.controls['sEstilo'].setValue(result[0].Cod_EstCli)
            this.formulario.controls['sCliente'].setValue(result[0].Des_Cliente)
            this.formulario.controls['sTemporada'].setValue(result[0].Nom_TemCli)
            this.formulario.controls['sColor'].setValue(result[0].Cod_ColCli)
            this.formulario.controls['sAbr'].setValue(result[0].Abr_Cliente)
            this.formulario.controls['sCodCli'].setValue(result[0].Cod_Cliente)
            this.formulario.controls['sCodTemp'].setValue(result[0].Cod_TemCli)

            console.log(this.Cod_Cliente)
            console.log(this.Cod_TemCli)
            console.log(this.Cod_EstCli)
            console.log(this.Cod_ColCli)
            this.ListarTallas()
            this.mostrarAlertaCaidas()
        },
        (err: HttpErrorResponse) => this.matSnackBar.open(err.message, 'Cerrar', { horizontalPosition: 'center',  verticalPosition: 'top',duration: 1500 }))


  
  }
 
/******************************LISTAR LAS TALLAS Y AGREGAR ESAS TALALS A LA COLUMNAS DEL TABLE******************** */
ListarTallas() {
  this.displayedColumns = ['Codigo', 'Motivo', 'Total'];
  this.columnsToDisplay = this.displayedColumns.slice();
  this.Cod_ColCli = this.formulario.get('sColor')?.value

  this.defectosAlmacenDerivadosService.Cf_Busca_Derivado_Talla(this.Cod_Cliente,this.Cod_TemCli,this.Cod_EstCli,this.Cod_ColCli).subscribe(
    (result: any) => {
      this.tallas = result 
      if(this.tallas.length>0){
      this.tallas.forEach((currentValue, index) => {

          this.displayedColumns.push(this.tallas[index].Cod_Talla)
        })
        
        this.columnsToDisplay = this.displayedColumns.slice()
      }

    },
    (err: HttpErrorResponse) => this.matSnackBar.open(err.message, 'Cerrar', { horizontalPosition: 'center', verticalPosition: 'top', duration: 1500 }))

}
/******************************LISTAR LAS TALLAS Y AGREGAR ESAS TALALS A LA COLUMNAS DEL TABLE******************** */

/********************************* LISTAR EL DETALLE ********************************************* */

  ListarRegistroDefecto(){
    this.defectosAlmacenDerivadosService.Cf_Busca_Derivado_Detalle(this.Numero_Auditoria_Cabecera).subscribe(
      (result: any) => {
    
        this.dataSource.data = result
      },
      (err: HttpErrorResponse) => this.matSnackBar.open(err.message, 'Cerrar', { horizontalPosition: 'center', verticalPosition: 'top', duration: 1500 }))
  }


  /********************************* LISTAR EL DETALLE ********************************************* */
  



  /************************FILTAR EL MOTIVO SEGUN SU CODIGO**************************** */
BuscarMotivo(){

  this.Abr_Motivo = this.formulario.get('cod')?.value
  if(this.Abr_Motivo == null){
    this.Abr_Motivo = ''
  }
  if(this.Abr_Motivo.length <3 || this.Abr_Motivo.length>3){

    this.formulario.controls['defecto'].setValue('')

  }
  else {
  this.Abr = ''
  this.Nom_Cliente = ''
  this.Cod_Accion = 'M'

  this.defectosAlmacenDerivadosService.mantenimientoDerivadosService(this.Abr,this.Abr_Motivo, this.Nom_Cliente,this.Cod_Accion).subscribe(
    (result: any) => {
      if (result.length > 0) {
        this.formulario.controls['defecto'].setValue(result[0].Descripcion)
        this.Cod_Motivo = result[0].Cod_Motivo
        this.formulario.controls['Cod_Motivo'].setValue(result[0].Cod_Motivo)
        
      }
      else {
        
        this.matSnackBar.open('Abr de motivo no existe..!', 'Cerrar', { horizontalPosition: 'center', verticalPosition: 'top', duration: 1500 })
      }
    },
    (err: HttpErrorResponse) => this.matSnackBar.open(err.message, 'Cerrar', { horizontalPosition: 'center', verticalPosition: 'top', duration: 1500 }))
  }
  
}

  /************************FILTAR EL MOTIVO SEGUN SU CODIGO**************************** */


  
  abrFocus(){
    this.inputAbr.nativeElement.focus()
  }

  /******************************INSERTAR DETALLE **************************************** */
  InsertarFila(){
    this.Cod_Accion     = 'U'
    this.Num_Auditoria  = this.Numero_Auditoria_Cabecera
    this.Cod_Cliente    = '' 
    this.Cod_Auditor    = ''
    this.Fec_Auditoria  = ''
    this.Total          = 0
    this.Cod_EstCli     = ''
    this.Cod_TemCli     = ''
    this.Cod_ColCli     = ''
    this.Glosa          = ''
    this.Cod_Talla      = this.formulario.get('s')?.value
    this.Cod_Motivo     = this.formulario.controls['Cod_Motivo'].value
    this.Can_Defecto    = this.formulario.get('cant')?.value
    this.Op             = ''

    console.log(this.Cod_Talla)
    console.log(this.Cod_Motivo)
    console.log(this.Can_Defecto)
    if(this.Cod_Talla != '' && this.Cod_Motivo != '' && this.Can_Defecto != 0 && this.Can_Defecto != null ){
   
    this.defectosAlmacenDerivadosService.Cf_Mantenimiento_Derivados(
      this.Cod_Accion,
      this.Num_Auditoria, 
      this.Cod_Cliente,
      this.Cod_Auditor,
      this.Fec_Auditoria,
      this.Total,
      this.Cod_EstCli,
      this.Cod_TemCli,
      this.Cod_ColCli,
      this.Glosa,
      this.Cod_Talla,
      this.Cod_Motivo,
      this.Can_Defecto,
      this.Op,
      ).subscribe(
        (result: any) => {
          if(result[0].Respuesta == 'OK'){
          //this.inputCodMotivo.nativeElement.focus()
          this.formulario.controls['cant'].setValue('')
        
          this.matSnackBar.open('Defecto agregado correctamente..!!', 'Cerrar', { horizontalPosition: 'center',  verticalPosition: 'top',duration: 1500 })
          this.ListarRegistroDefecto()
          this.mostrarAlertaCaidas()
          }else{
            this.matSnackBar.open(result[0].Respuesta, 'Cerrar', { horizontalPosition: 'center',  verticalPosition: 'top',duration: 1500 })
            
          }
        },
        (err: HttpErrorResponse) => this.matSnackBar.open(err.message, 'Cerrar', {
          duration: 1500,
        }))
        
      }
      
      else {
        this.matSnackBar.open('Complete todos los campos requeridos..!!', 'Cerrar', { horizontalPosition: 'center',  verticalPosition: 'top',duration: 1500 })
      }
          

  }
  /******************************INSERTAR DETALLE **************************************** */


  ModificarRegistro(){
    this.num  = this.formulario.get('cant')?.value
    this.num = this.num * -1
    this.formulario.controls['cant'].setValue(this.num)

    
  }


  
  
/****************ASIGNAR A UNA VARIABLE LO QUE SELECCIONE EN EL DETALLE PARA POSTERIORMENTE ELIMINAR *********** */
AsignarCodRegistroVariableEliminar(cod: string){
  this.Codigo_Defecto_Eliminar=cod
}
/****************ASIGNAR A UNA VARIABLE LO QUE SELECCIONE EN EL DETALLE PARA POSTERIORMENTE ELIMINAR *********** */

/*****************DESHABILITAR INPUTS DE LA CABECERA************************ */

DeshabilitarCabcera(){


  this.formulario.controls['sAuditor'].disable()
  this.formulario.controls['sEstilo'].disable()
  this.formulario.controls['sCliente'].disable()
  this.formulario.controls['sTemporada'].disable()
  this.formulario.controls['sColor'].disable()
  this.formulario.controls['sAbr'].disable()

}
/*****************DESHABILITAR INPUTS DE LA CABECERA************************ */



  /****************************ELIMINAR UN REGISTRO DEL DETALLE ***************************** */

  EliminarRegistro(){
    this.Cod_Accion     = 'E'
    this.Num_Auditoria  = this.Numero_Auditoria_Cabecera
    this.Cod_Cliente    = '' 
    this.Cod_Auditor    = ''
    this.Fec_Auditoria  = ''
    this.Total          = 0
    this.Cod_EstCli     = ''
    this.Cod_TemCli     = ''
    this.Cod_ColCli     = ''
    this.Glosa          = ''
    this.Cod_Talla      = ''
    this.Cod_Motivo     = this.Codigo_Defecto_Eliminar
    this.Can_Defecto    = 0
    this.Op             = ''
   
    this.defectosAlmacenDerivadosService.Cf_Mantenimiento_Derivados(
      this.Cod_Accion,
      this.Num_Auditoria, 
      this.Cod_Cliente,
      this.Cod_Auditor,
      this.Fec_Auditoria,
      this.Total,
      this.Cod_EstCli,
      this.Cod_TemCli,
      this.Cod_ColCli,
      this.Glosa,
      this.Cod_Talla,
      this.Cod_Motivo,
      this.Can_Defecto,
      this.Op,
    ).subscribe(

        (result: any) => {
          if (result[0].Respuesta == 'OK') {
          
            this.ListarRegistroDefecto()
            this.matSnackBar.open('Registro Eliminado!!!', 'Cerrar', { horizontalPosition: 'center',  verticalPosition: 'top',duration: 1500 })
            this.mostrarAlertaCaidas()
          }
          else {
            this.matSnackBar.open(result[0].Respuesta, 'Cerrar', { horizontalPosition: 'center',  verticalPosition: 'top',duration: 1500 })
          }
        },
        (err: HttpErrorResponse) => this.matSnackBar.open(err.message, 'Cerrar', { horizontalPosition: 'center',  verticalPosition: 'top',duration: 1500 })

    )}

/****************************ELIMINAR UN REGISTRO DEL DETALLE ***************************** */












  
  


}
