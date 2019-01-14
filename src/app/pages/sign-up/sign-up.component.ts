import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  template: `
    <div className="signupPage">
         Hey please sign up
         <form (submit)="handleSubmit($event)">
             <input type="text"
                 [value]="user.username"
                 (change)="handleNameChange($event)"
             />
             <button type="submit">enter</button>
         </form>
     </div>
  `,
  styles: []
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
    this.router.navigate(['/home'])

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

