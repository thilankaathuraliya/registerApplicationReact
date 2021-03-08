import React, { Component } from "react";
import { FormErrors } from '../FormErrors';
import './cssClasses.css';
export default class SignUp extends Component {
    constructor (props) {
        super(props);
        this.state = {
          email: '',
          userName:'',
          rpassword:'',
          password: '',
          formErrors: {email: '', password: '',userName:'',rpassword:''},
          emailValid: false,
          passwordValid: false,
          rpasswordValid: false,
          userNameValid:false,
          formValid: false
        }
      }
    
      handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value},
                      () => { this.validateField(name, value) });
      }
    
      validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;
        let userNameValid = this.state.userNameValid;
        let rpasswordValid = this.state.rpasswordValid;
    debugger;
        switch(fieldName) {
          case 'email':
            emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
            fieldValidationErrors.email = emailValid ? '' : ' is invalid';
            break;
          case 'password':
            passwordValid = value.length == 8;
            fieldValidationErrors.password = passwordValid ? '': ' doest not match with password size';
            break;
          case 'userName':
            userNameValid = value.length == 8;
            fieldValidationErrors.userName = userNameValid ? '': ' doest not match with user name size';
            break;
          case 'rpassword':
           
            if(this.state.password!=value){
              fieldValidationErrors.rpassword=' password and re enter passowrd should be equal';
              rpasswordValid=false;
            }
            else if(value.length < 6){
              fieldValidationErrors.rpassword=' doest not match with re password size';
              rpasswordValid=false;
            }
            else{
              fieldValidationErrors.rpassword='';
              rpasswordValid=true;
            }
            break;
          default:
            break;
        }
        this.setState({formErrors: fieldValidationErrors,
                        emailValid: emailValid,
                        passwordValid: passwordValid,
                        userNameValid:userNameValid,
                        rpasswordValid:rpasswordValid,
                      }, this.validateForm);
      }
    
      validateForm() {
        this.setState({formValid: this.state.emailValid && this.state.passwordValid && this.state.userNameValid && this.state.rpasswordValid});
      }
    
      errorClass(error) {
        return(error.length === 0 ? '' : 'has-error');
      }
    
    
    render() {
        return (
            <form className="myForm">
            <h2>Register</h2>
            <div className="panel panel-default">
              <FormErrors formErrors={this.state.formErrors} />
            </div>
            <div className={`form-group ${this.errorClass(this.state.formErrors.email)}`}>
              <label htmlFor="email">Email address</label>
              <input type="email" required className="form-control" name="email"
                placeholder="Email"
                value={this.state.email}
                onChange={this.handleUserInput}  />
            </div>
            <div className={`form-group ${this.errorClass(this.state.formErrors.email)}`}>
              <label htmlFor="email">User Name</label>
              <input type="text" required className="form-control" name="userName"
                placeholder="User Name"
                value={this.state.userName}
                onChange={this.handleUserInput}  />
            </div>
            <div className={`form-group ${this.errorClass(this.state.formErrors.password)}`}>
              <label htmlFor="password">Password</label>
              <input type="password" className="form-control" name="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handleUserInput}  />
            </div>
            <div className={`form-group ${this.errorClass(this.state.formErrors.rpassword)}`}>
              <label htmlFor="rpassword">Re Enter Password</label>
              <input type="password" className="form-control" name="rpassword"
                placeholder="Re ente Password"
                value={this.state.rpassword}
                onChange={this.handleUserInput}  />
            </div>
            <button type="submit" className="btn btn-primary" disabled={!this.state.formValid}>Register</button>
          </form>
        );
    }
}