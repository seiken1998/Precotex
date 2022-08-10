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
  ImagePath = 'http://192.168.1.36/Estilos/EP18168.jpg'


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
    console.log(this.ImagePath)
  }

  RestarCompostura(){
   if(this.Compostura != 0){
    this.Compostura = this.Compostura - 1
    this.ActualizarTotal()}
  }

  SumarCompostura(){
    this.Compostura = this.Compostura + 1
    this.ActualizarTotal()
  }

  RestarSegunda(){
    if(this.Segunda != 0){
    this.Segunda = this.Segunda - 1
    this.ActualizarTotal()}
  }

  SumarSegunda(){
    this.Segunda = this.Segunda + 1
    this.ActualizarTotal()
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
  ActualizarTotal(){
    
    this.Total = -1*(this.Compostura + this.Segunda + this.Zurcido + this.Desmanche)
  }

}
