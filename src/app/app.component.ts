import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GlobalVariable } from './VarGlobals'; //<==== this one

import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
}) 

export class AppComponent implements OnInit {
  hide = true;
  login_activo: boolean = true;
  usuario =''

  constructor(private loginService: LoginService,
    private matSnackBar: MatSnackBar,
    private router: Router,
    private formBuilder: FormBuilder) { }
 
    @ViewChild('contraseña') inputContraseña!: ElementRef;

    

  ngOnInit(): void {
    this.login_activo= true; 
    this.usuario = GlobalVariable.vusu
  }

  loginForm = this.formBuilder.group({
    user  : ['', [Validators.required, Validators.minLength(3)]],
    pass  : ['', [Validators.required, Validators.minLength(3)]]
  })

  get user(){
    return this.loginForm.get('user');
  }  


  focusContra(){
    this.inputContraseña.nativeElement.focus()
  }
 
  validarUsuario() {
 
    this.loginService.validarUsuario2(this.loginForm.value).subscribe(
      (result: any) => {
 
          console.log(result)
        if(result[0].resp == 'OK' || result == 'OK'){

          this.login_activo = false
          this.usuario = result[0].Nom_Usuario
          GlobalVariable.vusu  = this.loginForm.get('user').value
          this.usuario =  GlobalVariable.vusu  
          GlobalVariable.vCod_Rol = result[0].Cod_Rol

          //this.router.navigate(['/principal']);
        }
        else {
          this.matSnackBar.open('Datos Incorrectos!!' , 'Cerrar', {
            duration: 1500,
          })
        }
      },
      err => this.matSnackBar.open(err, 'Cerrar', {
        duration: 1500,
      }))
    
  }

  ir_a(){
    this.router.navigate(['/menu']);
  }

}

