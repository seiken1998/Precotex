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
import { GlobalVariable } from '../../VarGlobals'; //<==== this one

interface data_det {
  Version:              string
  Cod_Tarifado_Costeo:  string
  Descr:                string	 		
  Des_Tela_Cliente:     string
}
 


interface Cliente {
  Cod_Cliente: string;
  Nom_Cliente: string;
  Abr_Cliente: string;
}


interface Temporada {
  Codigo: string;
  Descripcion: string;
  Stock:string
}

@Component({
  selector: 'app-auditoria-hoja-medida',
  templateUrl: './auditoria-hoja-medida.component.html',
  styleUrls: ['./auditoria-hoja-medida.component.scss']
})
export class AuditoriaHojaMedidaComponent implements OnInit {

  
  listar_operacionEstilo: string[] = [''];
  listar_operacionTemporada: Temporada[] = [];
  listar_operacionCliente: Cliente[] = [];
  
  filtroOperacionCliente: Observable<Cliente[]> | undefined;
  filtroOperacionEstilo: Observable<string[]> | undefined;

  tallas:any = []


  public data_det = [{
    Version:              "",
    Cod_Tarifado_Costeo:  "",
    Descr:                "",	 		
    Des_Tela_Cliente:     ""
  }]


  Cod_Accion        = ''
  filterValue       = ''
  flg_reset_estilo  = false
  Cod_Cliente       = ''
  Cod_EstCli        = ''
  Cod_EstPro        = ''
  Cod_Version       = ''

 

  //* Declaramos formulario para obtener los controles */
  formulario = this.formBuilder.group({
    //-----------NUEVO
    inputCodigo:      [''],
    inputCliente:     [''],
    inputEstilo:      [''],
    inputPrenda:      [''],
    inputTipoPrenda:  [''],
  })


  displayedColumns_cab: string[] = ['CodTarifadoCost', 'Codigo', 'Descripcion', 'DesTelaCli', 'Acciones']
  dataSource: MatTableDataSource<data_det>;



  constructor(private formBuilder: FormBuilder,
    private matSnackBar: MatSnackBar,
    private auditoriaHojaMedidaService: AuditoriaHojaMedidaService,
    public dialog: MatDialog,
    private SpinnerService: NgxSpinnerService) { this.dataSource = new MatTableDataSource(); }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void { 
    //this.MostrarCabeceraAuditoria()
    this.formulario.controls['inputPrenda'].disable()
    this.formulario.controls['inputTipoPrenda'].disable()
    this.CargarOperacionCliente()
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
 

  /*openDialog() {

   let dialogRef = this.dialog.open(DialogRegistrarCabeceraComponent, {
      disableClose: true,
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result == 'false') {
        this.MostrarCabeceraAuditoria()
      }
 
    })

  }*/


  



  MostrarVersiones() {
    this.SpinnerService.show();
    this.Cod_Accion = 'V'
    this.Cod_EstPro
    this.auditoriaHojaMedidaService.AuditoriaHojaMedidaVersionesService(
      this.Cod_Accion, 
      this.Cod_EstPro
    ).subscribe(
      (result: any) => {
       console.log(result)
       this.dataSource.data = result
       this.SpinnerService.hide();  
     
      },
      (err: HttpErrorResponse) => this.matSnackBar.open(err.message, 'Cerrar', { horizontalPosition: 'center', verticalPosition: 'top', duration: 1500 }))
  
  }


  EliminarRegistrocCabecera(Num_Auditoria: number, Cod_LinPro: string) {
    let dialogRef = this.dialog.open(DialogEliminarComponent, { disableClose: true, data: {} });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'true') {
      }

    }) 
  }

 
  /******************** LLENAR SELECT DE CLIENTE ****************** */ 

  CargarOperacionCliente(){

    this.listar_operacionCliente = [];
    this.Cod_Accion   = 'C'
    this.Cod_Cliente  = ''
    this.Cod_EstCli   = ''
    this.Cod_EstPro   = ''
    this.Cod_Version  = ''
      this.auditoriaHojaMedidaService.AuditoriaHojaMedidaComplementoService(
      this.Cod_Accion,
      this.Cod_Cliente,
      this.Cod_EstCli,
      this.Cod_EstPro,
      this.Cod_Version
      ).subscribe(

       (result: any) => {
         console.log(result)
         this.listar_operacionCliente = result
         this.RecargarOperacionCliente()
       },
       (err: HttpErrorResponse) => this.matSnackBar.open(err.message, 'Cerrar', { horizontalPosition: 'center', verticalPosition: 'top', duration: 1500 }))
   
       
    }
 
   
   RecargarOperacionCliente(){
 
     this.filtroOperacionCliente = this.formulario.controls['inputCliente'].valueChanges.pipe(
       startWith(''),
       map(option => (option ? this._filterOperacionCliente(option) : this.listar_operacionCliente.slice())),
     );
     
   }
   private _filterOperacionCliente(value: string): Cliente[] {
     if (value == null || value == undefined ) {
       value = ''
       
     }
     if(this.flg_reset_estilo == false){
     this.formulario.controls['inputEstilo'].setValue('');
     }
     const filterValue = value.toLowerCase();
 
     return this.listar_operacionCliente.filter(option => option.Nom_Cliente.toLowerCase().includes(filterValue));
   }
 
    /******************** LLENAR SELECT DE CLIENTE ****************** */ 
 
   /******************** CAMBIAR VALOR DE LA VARIABLE COD_CLIENTE SEGUN LO QUE SELECCIONO EN EL COMBO ****************** */ 

   CambiarValorCliente(Cod_Cliente: string, Abr: string){
    this.Cod_Cliente = Cod_Cliente
    console.log(this.Cod_Cliente)

    this.formulario.controls['inputCodigo'].setValue(Abr);
    this.Cod_Cliente = Cod_Cliente
  
    this.CargarOperacionEstilo()
  }

  /******************** CAMBIAR VALOR DE LA VARIABLE COD_CLIENTE SEGUN LO QUE SELECCIONO EN EL COMBO ****************** */ 



/*********************************ESTILO*************************************************** */
CargarOperacionEstilo(){
 
 
  this.listar_operacionEstilo = [];
  this.Cod_Accion   = 'E'
  this.Cod_EstCli   = ''
  this.Cod_EstPro   = ''
  this.Cod_Version  = ''
  this.auditoriaHojaMedidaService.AuditoriaHojaMedidaComplementoService(
    this.Cod_Accion,
    this.Cod_Cliente,
    this.Cod_EstCli,
    this.Cod_EstPro,
    this.Cod_Version).subscribe(
    (result: any) => {

      if(result.length >0){
      for (let i = 0; i < result.length; i++) {
        this.listar_operacionEstilo.push(result[i].Cod_Estcli.replace(/\s+/g, " ").trim()) 
      }
      this.RecargarOperacionEstilo() 
    }
    
    },
    (err: HttpErrorResponse) => this.matSnackBar.open(err.message, 'Cerrar', {
      duration: 1500,
    }))

  

}


private _filterOperacionEstilo(value: string): string[] {

  if (value == null || value == undefined ) {
    value = ''
    
  }

  this.filterValue = value?.toLowerCase();

  return this.listar_operacionEstilo.filter(option => option.toLowerCase().includes(this.filterValue) );

}

RecargarOperacionEstilo(){
  this.filtroOperacionEstilo = this.formulario.controls['inputEstilo'].valueChanges.pipe(
    debounceTime(100),
    startWith(''),
    map(value => this._filterOperacionEstilo(value))
  );
}

/*********************************ESTILO*************************************************** */



BuscarPrenda(){

  this.Cod_Accion = '2'
  this.Cod_Cliente
  this.Cod_EstCli = this.formulario.get('inputEstilo')?.value
  this.auditoriaHojaMedidaService.AuditoriaHojaMedidaPrendaService(
    this.Cod_Accion, 
    this.Cod_Cliente,
    this.Cod_EstCli
  ).subscribe(
    (result: any) => {
     console.log(result)
     this.Cod_EstPro = result[0].Codigo
     this.formulario.controls['inputPrenda'].setValue(result[0].Descripcion)
     this.formulario.controls['inputTipoPrenda'].setValue(result[0].des_tippre)
    },
    (err: HttpErrorResponse) => this.matSnackBar.open(err.message, 'Cerrar', { horizontalPosition: 'center', verticalPosition: 'top', duration: 1500 }))

  }


  VerDetalle(Cod_Tarifado_Costeo: string, Version: string) {
    GlobalVariable.Cod_ClienteG = this.Cod_Cliente
    GlobalVariable.Cod_EstCliG =  this.formulario.get('inputEstilo')?.value
    GlobalVariable.Cod_EstProG = Cod_Tarifado_Costeo
    GlobalVariable.Cod_VersionG = Version

  }


/*************************************CARGAR SELECT TEMPORADA*********************************************** */

  
/*CargarOperacionTemporada(){

  this.Cod_Accion = 'T'
  this.Cod_Cliente
  this.Cod_EstCli = this.formulario.get('inputEstilo')?.value
  this.auditoriaHojaMedidaService.AuditoriaHojaMedidaComplementoService(
    this.Cod_Accion, 
    this.Cod_Cliente,
    this.Cod_EstCli
  ).subscribe(
    (result: any) => {
      this.listar_operacionTemporada = result
    },
    (err: HttpErrorResponse) => this.matSnackBar.open(err.message, 'Cerrar', { horizontalPosition: 'center', verticalPosition: 'top', duration: 1500 }))

  }*/

/*************************************CARGAR SELECT TEMPORADA*********************************************** */


 


}

