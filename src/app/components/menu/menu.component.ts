import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../../services/login.service'
import { HttpErrorResponse } from '@angular/common/http';
import { GlobalVariable } from '../../VarGlobals';
import { Menu} from 'src/app/components/menu/menu';
import { Opcion} from 'src/app/components/menu/opcion';
import { Router} from '@angular/router';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
 
})
export class MenuComponent implements OnInit {
  sCod_Usuario = GlobalVariable.vusu;
  MuestraMenuSeguridad = false
  MuestraMenuCalidad = false
  MuestraMenuMovimiento = false



  constructor(private matSnackBar: MatSnackBar,
    private loginService: LoginService,
    public router: Router) {
  } 

  menu: Menu[] = [
    {
      displayName: 'MENU1',
      iconName: 'close',
      children: [
        {
          displayName: 'OPCION1',
          iconName: 'group',
          
        },
        {
          displayName: 'OPCION2',
          iconName: 'speaker_notes',
         
        },
        {
          displayName: 'OPCION3',
          iconName: 'feedback',
          route: 'feedback'
        }
      ]
    }]



    opciones:  Opcion[];



  ngOnInit(): void {
    this.MuestraMenu()
    this.MuestraMenuSeguridad = false
    this.MuestraMenuCalidad = false
    this.MuestraMenuMovimiento = false

    this.ValidaMuestraMenuSeguridad()
    this.ValidaMuestraMenuCalidad()
    this.ValidaMuestraMenuMovimiento()
    
  }





MuestraMenu(){
    
  this.loginService.MuestraMenu().subscribe(
    (result: any) => {
     
    //this.menu = result
    //console.log(this.menu)
    this.MuestraOpcion()
    },
    (err: HttpErrorResponse) => this.matSnackBar.open(err.message, 'Cerrar', { horizontalPosition: 'center', verticalPosition: 'top', duration: 1500 }))
}

CerrarSession(){
  /*GlobalVariable.vusu = ''
  this.router.navigate(['./']);*/
}


MuestraOpcion(){
    
  this.loginService.MuestraOpcion().subscribe(
    (result: any) => {

      this.opciones = result
    },
    (err: HttpErrorResponse) => this.matSnackBar.open(err.message, 'Cerrar', { horizontalPosition: 'center', verticalPosition: 'top', duration: 1500 }))
}





  ValidaMuestraMenuSeguridad() {
    this.MuestraMenuSeguridad = false
    //this.MuestraMenuCalidad = false
    
    this.loginService.ValidaMuestraMenuSeguridad().subscribe(
        (result: any) => {
          //console.log(result)
          if (result[0].Respuesta == 'OK') {
            this.MuestraMenuSeguridad = true
            //this.MuestraMenuCalidad = false
          }else if (result[0].Respuesta == 'ADMIN') {
            this.MuestraMenuSeguridad = true
            //this.MuestraMenuCalidad = true
          } 
        },
        (err: HttpErrorResponse) => this.matSnackBar.open(err.message, 'Cerrar', { horizontalPosition: 'center', verticalPosition: 'top', duration: 1500 }))
  }

  ValidaMuestraMenuCalidad() {
    this.MuestraMenuCalidad = false
    //this.MuestraMenuCalidad = false
    
    this.loginService.ValidaMuestraMenuCalidad().subscribe(
        (result: any) => {
          //console.log(result)
          if (result[0].Respuesta == 'OK') {
            this.MuestraMenuCalidad = true
            //this.MuestraMenuCalidad = false
          }else if (result[0].Respuesta == 'ADMIN') {
            this.MuestraMenuCalidad = true
            //this.MuestraMenuCalidad = true
          } 
        },
        (err: HttpErrorResponse) => this.matSnackBar.open(err.message, 'Cerrar', { horizontalPosition: 'center', verticalPosition: 'top', duration: 1500 }))
  }

  ValidaMuestraMenuMovimiento() {
    this.MuestraMenuMovimiento = false
    //this.MuestraMenuSeguridad = false

    this.loginService.ValidaMuestraMenuMovimiento().subscribe(
        (result: any) => {
          //console.log(result)
          if (result[0].Respuesta == 'OK') {
            this.MuestraMenuMovimiento = true
          }else if (result[0].Respuesta == 'ADMIN') {
            this.MuestraMenuMovimiento = true
            // this.MuestraMenuSeguridad = true
          } 
        },
        (err: HttpErrorResponse) => this.matSnackBar.open(err.message, 'Cerrar', { horizontalPosition: 'center', verticalPosition: 'top', duration: 1500 }))
  }  
}
