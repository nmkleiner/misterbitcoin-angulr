import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  template: `
    <div class="signupPage">
         <span>Hey please sign up</span>
         <form (submit)="handleSubmit($event)">
             <input type="text"
                 [value]="user.username"
                 (change)="handleNameChange($event)"
                 placeholder="username"
             />
             <button type="submit">sign up</button>
         </form>
     </div>
  `,
  styles: [`
    .signupPage{
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .signupPage form{
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .signupPage input{
      padding: 5px;
      margin-bottom: 10px;
    }
    .signupPage span{
      margin-top: 10px;
      margin-bottom: 10px;
    }

    `]
})
export class SignUpComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }
  user = {
    username: '',
    isLoggedIn: false
  }

  handleSubmit = (ev) => {
    ev.preventDefault();
    this.userService.signup(this.user.username)
    // this.props.handleSubmit()
    this.router.navigate([''])

  }

  handleNameChange = async e => {
      const {
        target: { value }
      } = e;
      this.user.username = value;
  }

  ngOnInit() {
  }
}



// import { Redirect } from "react-router-dom";



//     render() {
//         if (this.state.isLoggedIn === true) {
//             return <Redirect to='/' />
//         }
// }

