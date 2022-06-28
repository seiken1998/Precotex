import { Component, OnInit, ViewChild, ElementRef, Inject, Renderer2, AfterViewInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { GlobalVariable } from '../../../../VarGlobals';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuditoriaInspeccionCosturaService } from 'src/app/services/auditoria-inspeccion-costura.service';
import { AuditoriaHojaMedidaService} from 'src/app/services/auditoria-hoja-medida.service'
import * as _moment from 'moment';
import { HttpErrorResponse } from '@angular/common/http';
import { map, Observable, startWith } from 'rxjs';



interface data{
  Cod_Talla:  string
  Des_Medida:  string
  Sec: number
  Tip_Medida: string
  Sec_Medida: string
  Cod_Hoja_Medida_Cab: number
  Flg_Enable: boolean
  /*Medida1: string
  Medida2: string
  Medida3: string
  Medida4: string
  Medida5: string*/
}



@Component({
  selector: 'app-dialog-registro-hoja-medida',
  templateUrl: './dialog-registro-hoja-medida.component.html',
  styleUrls: ['./dialog-registro-hoja-medida.component.scss']
})
export class DialogRegistroHojaMedidaComponent implements OnInit {

  @ViewChild('inputMedida2') inputMedida2!: ElementRef;
  @ViewChild('inputMedida3') inputMedida3!: ElementRef;
  @ViewChild('inputMedida4') inputMedida4!: ElementRef;
  @ViewChild('inputMedida5') inputMedida5!: ElementRef;

//data
  Titulo        = ''
  Cod_Talla     = ''
  Des_Medida    = ''
 // nuevas variables
  Cod_Accion    = ''
  Cod_Hoja_Medida_Det = 0
  Cod_Hoja_Medida_Cab = 0
  Sec = 0
  Tip_Medida    = ''
  Sec_Medida    = ''
  Medida1       = ''
  Medida2       = ''
  Medida3       = ''
  Medida4       = ''
  Medida5       = ''

 formulario = this.formBuilder.group({
  Medida1:            [''],
  Medida2:            [''],
  Medida3:            [''],
  Medida4:            [''],
  Medida5:            ['']
 }) 

 NumPattern = "^[0-9+/-]{1,5}$";
 constructor(private formBuilder: FormBuilder,
             private matSnackBar: MatSnackBar, 
             private auditoriaHojaMedidaService: AuditoriaHojaMedidaService,
             @Inject(MAT_DIALOG_DATA) public data: data) 
 {

   this.formulario = formBuilder.group({
    Medida1:            ['', [Validators.required, Validators.pattern(this.NumPattern)]],
    Medida2:            ['', [Validators.required, Validators.pattern(this.NumPattern)]],
    Medida3:            ['', [Validators.required, Validators.pattern(this.NumPattern)]],
    Medida4:            ['', [Validators.required, Validators.pattern(this.NumPattern)]],
    Medida5:            ['', [Validators.required, Validators.pattern(this.NumPattern)]],
       
   });
   
 }

 ngOnInit(): void {  

  this.Cod_Talla            = this.data.Cod_Talla
  this.Des_Medida           = this.data.Des_Medida
  this.Sec                  = this.data.Sec
  this.Tip_Medida           = this.data.Tip_Medida
  this.Sec_Medida           = this.data.Sec_Medida
  this.Cod_Hoja_Medida_Cab  = this.data.Cod_Hoja_Medida_Cab

  /*if(this.data.Medida1 != '' && this.data.Medida2 != '' && this.data.Medida3 != '' && this.data.Medida4 != '' && this.data.Medida5 != ''){
    this.formulario.controls['Medida1'].setValue(this.data.Medida1)
    this.formulario.controls['Medida2'].setValue(this.data.Medida2)
    this.formulario.controls['Medida3'].setValue(this.data.Medida3)
    this.formulario.controls['Medida4'].setValue(this.data.Medida4)
    this.formulario.controls['Medida5'].setValue(this.data.Medida5)
  }*/

  if(this.data.Flg_Enable == false){
    this.formulario.controls['Medida1'].disable()
    this.formulario.controls['Medida2'].disable()
    this.formulario.controls['Medida3'].disable()
    this.formulario.controls['Medida4'].disable()
    this.formulario.controls['Medida5'].disable()
  }

  this.Cod_Accion   = 'T'
  this.Cod_Hoja_Medida_Det
  this.Cod_Hoja_Medida_Cab = this.data.Cod_Hoja_Medida_Cab
  this.Sec = this.data.Sec
  this.Tip_Medida = this.data.Tip_Medida
  this.Sec_Medida = this.data.Sec_Medida
  this.Cod_Talla = this.data.Cod_Talla
  this.Medida1 = this.Medida1
  this.Medida2 = this.Medida2
  this.Medida3 = this.Medida3
  this.Medida4 = this.Medida4
  this.Medida5 = this.Medida5
 this.auditoriaHojaMedidaService.MantenimientoAuditoriaHojaMedidaDetalle(
  this.Cod_Accion,
  this.Cod_Hoja_Medida_Det,
  this.Cod_Hoja_Medida_Cab,
  this.Sec,
  this.Tip_Medida,
  this.Sec_Medida,
  this.Cod_Talla,
  this.Medida1,
  this.Medida2,
  this.Medida3,
  this.Medida4,
  this.Medida5,
    ).subscribe(
    (result: any) => {
      if(result.length > 0){
        console.log(result)
        /*this.Medida1 = result[0].Medida1
        this.Medida2 = result[0].Medida2
        this.Medida3 = result[0].Medida3
        this.Medida4 = result[0].Medida4
        this.Medida5 = result[0].Medida5*/

        this.formulario.controls['Medida1'].setValue(result[0].Medida1)
        this.formulario.controls['Medida2'].setValue(result[0].Medida2)
        this.formulario.controls['Medida3'].setValue(result[0].Medida3)
        this.formulario.controls['Medida4'].setValue(result[0].Medida4)
        this.formulario.controls['Medida5'].setValue(result[0].Medida5)

      }else{
        
      } 
    },
    (err: HttpErrorResponse) => this.matSnackBar.open(err.message, 'Cerrar', { horizontalPosition: 'center', verticalPosition: 'top', duration: 1500 }))
  

 }


/* --------------- REGISTRAR CABECERA ------------------------------------------ */


 submit(formDirective) :void {

    this.Cod_Accion   = 'I'
    this.Cod_Hoja_Medida_Det
    this.Cod_Hoja_Medida_Cab
    this.Sec
    this.Tip_Medida
    this.Sec_Medida
    this.Cod_Talla
    this.Medida1 = this.formulario.get('Medida1')?.value
    this.Medida2 = this.formulario.get('Medida2')?.value
    this.Medida3 = this.formulario.get('Medida3')?.value
    this.Medida4 = this.formulario.get('Medida4')?.value
    this.Medida5 = this.formulario.get('Medida5')?.value
   this.auditoriaHojaMedidaService.MantenimientoAuditoriaHojaMedidaDetalle(
    this.Cod_Accion,
    this.Cod_Hoja_Medida_Det,
    this.Cod_Hoja_Medida_Cab,
    this.Sec,
    this.Tip_Medida,
    this.Sec_Medida,
    this.Cod_Talla,
    this.Medida1,
    this.Medida2,
    this.Medida3,
    this.Medida4,
    this.Medida5,
      ).subscribe(
      (result: any) => {
        if(result[0].Respuesta == 'OK'){
          this.matSnackBar.open('Proceso correcto..!!', 'Cerrar', { horizontalPosition: 'center', verticalPosition: 'top', duration: 1500 })
        }else{
          this.matSnackBar.open(result[0].Respuesta, 'Cerrar', { horizontalPosition: 'center', verticalPosition: 'top', duration: 1500 })
        } 
      },
      (err: HttpErrorResponse) => this.matSnackBar.open(err.message, 'Cerrar', { horizontalPosition: 'center', verticalPosition: 'top', duration: 1500 }))
    
    }

 
    focusMedida2() {
      this.inputMedida2.nativeElement.focus()
    }
    focusMedida3() {
      this.inputMedida3.nativeElement.focus()
    }
    focusMedida4() {
      this.inputMedida4.nativeElement.focus()
    }
    focusMedida5() {
      this.inputMedida5.nativeElement.focus()
    }

}
