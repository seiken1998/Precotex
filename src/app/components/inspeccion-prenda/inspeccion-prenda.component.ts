import { Component, OnInit, AfterViewInit, inject, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import * as _moment from 'moment'; 
import { Observable } from 'rxjs';
import { SeguridadControlJabaService } from 'src/app/services/seguridad-control-jaba.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgxSpinnerService }  from "ngx-spinner";
import { DialogDefectoComponent} from 'src/app/components/inspeccion-prenda/dialog-inspeccion-prenda/dialog-defecto/dialog-defecto.component';

@Component({
  selector: 'app-inspeccion-prenda',
  templateUrl: './inspeccion-prenda.component.html',
  styleUrls: ['./inspeccion-prenda.component.scss']
})
export class InspeccionPrendaComponent implements OnInit {


  Compostura = 0
  Segunda = 0
  Zurcido = 0
  Desmanche = 0
  Primeras = 0
  Total = 0
  Inicial = 0 
  ImagePath = ''
  Codigo = ''
  //http://192.168.1.36/Estilos/EP18168.jpg

  //* Declaramos formulario para obtener los controles */
  formulario = this.formBuilder.group({
    OP:     [''],
    Color:  [''],
    Talla:  [''],
    Codigo: ['']
  })



  constructor(private formBuilder: FormBuilder,
    private matSnackBar: MatSnackBar,
    private seguridadControlJabaService: SeguridadControlJabaService,
    public dialog: MatDialog,
    private SpinnerService: NgxSpinnerService,) { 

    }

  ngOnInit(): void {
    this.ImagePath = 'http://192.168.1.36/Estilos/default.jpg'
    this.formulario.controls['OP'].disable()
    this.formulario.controls['Color'].disable()
    this.formulario.controls['Talla'].disable()
  }

  RestarCompostura(){
   if(this.Compostura != 0){
    this.Compostura = this.Compostura - 1
    //this.ActualizarTotal()
    this.ActualizarPrimeras()}
  }

  SumarCompostura(){
    this.Compostura = this.Compostura + 1
    //this.ActualizarTotal()
    this.ActualizarPrimeras()
  }

  RestarSegunda(){
    if(this.Segunda != 0){
    this.Segunda = this.Segunda - 1
    //this.ActualizarTotal()
    this.ActualizarPrimeras()}
  }

  SumarSegunda(){
    this.Segunda = this.Segunda + 1
    //this.ActualizarTotal()
    this.ActualizarPrimeras()
  }

  RestarZurcido(){
    let dialogRef =  this.dialog.open(DialogDefectoComponent, 
      { disableClose: true,
        panelClass: 'my-class',
        data: { 
        }});  
      dialogRef.afterClosed().subscribe(result => {
          if (result == 'false') { 

          }else{
            
              console.log(result.data)
            }
          })
  }

  SumarZurcido(){
    let dialogRef =  this.dialog.open(DialogDefectoComponent, 
      { disableClose: true,
        panelClass: 'my-class',
        data: { 
        }});  
      dialogRef.afterClosed().subscribe(result => {
          if (result == 'false') { 

          }else{
            
              console.log(result.data)
            }
          })
  }

  RestarDesmanche(){ 
    let dialogRef =  this.dialog.open(DialogDefectoComponent, 
      { disableClose: true,
        panelClass: 'my-class',
        data: { 
        }});  
      dialogRef.afterClosed().subscribe(result => {
          if (result == 'false') { 

          }else{
            
              console.log(result.data)
            }
          })
  }

  SumarDesmanche(){
    let dialogRef =  this.dialog.open(DialogDefectoComponent, 
      { disableClose: true,
        panelClass: 'my-class',
        data: { 
        }});  
      dialogRef.afterClosed().subscribe(result => {
          if (result == 'false') { 

          }else{
            
              console.log(result.data)
            }
          })
  }
  ActualizarPrimeras(){
    
    this.Primeras = this.Inicial + (-1*(this.Compostura + this.Segunda + this.Zurcido + this.Desmanche))
  }

  ActualizarTotal(){
    
    this.Primeras = this.Inicial - this.Total
  }



  LecturaCodBarras(){
    this.Codigo = this.formulario.get('Codigo')?.value
    if(this.Codigo.length == 9){
      if(this.Codigo == 'PTX000001'){
        this.formulario.controls['OP'].setValue('E5470')
        this.formulario.controls['Color'].setValue('WHITE')
        this.formulario.controls['Talla'].setValue('XL')
        this.ImagePath = 'http://192.168.1.36/Estilos/EP18168.jpg'
        this.Total = 50
        this.Inicial = this.Total

      }
    }
  
  }

  Limpiar(){
    this.formulario.controls['Codigo'].setValue('')
    this.formulario.controls['OP'].setValue('')
    this.formulario.controls['Color'].setValue('')
    this.formulario.controls['Talla'].setValue('')
    this.Total = 0
    this.Compostura = 0
    this.Segunda = 0
    this.Zurcido = 0
    this.Desmanche = 0
    this.Primeras = 0
    this.ImagePath = 'http://192.168.1.36/Estilos/default.jpg'
  }

}
