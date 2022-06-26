import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from '../services/authenticate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: any;
  password: any;
  Estado: any;  

  constructor(private AuthServ: AuthenticateService, private router: Router) { }

  ngOnInit(): void {
  }

  login(){
      this.AuthServ.login(this.username, this.password).subscribe(
        data => {
          this.Estado = data
          localStorage.setItem('token', this.Estado.token);
          this.router.navigate(['/']);
        },
        error => {
          console.log("Hubo un error");

        })
  }

}
