import { Component, OnInit, ViewChild, ElementRef, Inject, Renderer2, AfterViewInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { GlobalVariable } from 'src/app/VarGlobals';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DespachoOpIncompletaService } from 'src/app/services/despacho-op-incompleta.service';
import * as _moment from 'moment';
import { HttpErrorResponse } from '@angular/common/http';
import { NgxSpinnerService }  from "ngx-spinner";

interface data{
  
}


@Component({
  selector: 'app-dialog-registrar-girado-op',
  templateUrl: './dialog-registrar-girado-op.component.html',
  styleUrls: ['./dialog-registrar-girado-op.component.scss']
})
export class DialogRegistrarGiradoOpComponent implements OnInit {

  
  // nuevas variables
  Cod_Accion      =   ""
  Cod_OrdPro      =   ""
  Fec_Inicio      =   ""
  Fec_Fin         =   ""
  

  formulario = this.formBuilder.group({
    OP:    [''],
  }) 
 
  constructor(private formBuilder: FormBuilder,
              private matSnackBar: MatSnackBar, 
              private despachoOpIncompletaService: DespachoOpIncompletaService,
              private SpinnerService: NgxSpinnerService,
              @Inject(MAT_DIALOG_DATA) public data: data) 
  {

    this.formulario = formBuilder.group({
      OP:    ['', Validators.required],
    });

  }

  ngOnInit(): void {    

  }


/* --------------- REGISTRAR CABECERA ------------------------------------------ */

  submit(formDirective) :void {
      this.SpinnerService.show();
      this.Cod_Accion    = 'I'
      this.Cod_OrdPro    = this.formulario.get('OP')?.value
      this.Fec_Inicio    = ""
      this.Fec_Fin       = ""
      this.despachoOpIncompletaService.PermitirGiradoOp(
        this.Cod_Accion,
        this.Cod_OrdPro,
        this.Fec_Inicio,
        this.Fec_Fin
      ).subscribe(
        (result: any) => {
            console.log(result)
            if(result[0].Respuesta == 'OK'){
              this.matSnackBar.open("Proceso Correcto...", 'Cerrar', { horizontalPosition: 'center', verticalPosition: 'top', duration: 1500 })
            }
            else{
              this.matSnackBar.open(result[0].Respuesta, 'Cerrar', { horizontalPosition: 'center', verticalPosition: 'top', duration: 1500 })
            }

            this.SpinnerService.hide()
        },
        (err: HttpErrorResponse) => this.matSnackBar.open(err.message, 'Cerrar', {
          duration: 1500,
        }))    
  }

}
