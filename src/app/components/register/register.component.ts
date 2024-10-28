import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthenticationService } from '../../../auth/services/authentication.service';
import { RegisterDto } from '../../../auth/models/register-dto';
import { Router } from '@angular/router';
import {
  emailValidator,
  matchingPasswordValidator,
  passwordValidator,
  whiteSpaceValidator,
} from '../../shared/validators/validators';
import { ToastrService } from 'ngx-toastr';
import { take, tap } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [AuthenticationService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup<{
    firstName: FormControl<string | null>;
    lastName: FormControl<string | null>;
    email: FormControl<string | null>;
    password: FormControl<string | null>;
    confirmPassword: FormControl<string | null>;
  }>;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.createForm();
  }

  onRegisterSubmit() {
    if (this.registerForm.invalid) {
      return;
    }

    const registerDto: RegisterDto = {
      firstName: this.registerForm.controls.firstName.value ?? '',
      lastName: this.registerForm.controls.lastName.value ?? '',
      email: this.registerForm.controls.email.value ?? '',
      password: this.registerForm.controls.password.value ?? '',
      confirmPassword: this.registerForm.controls.confirmPassword.value ?? '',
    };

    console.log('Register form data', registerDto);

    this.authService
      .registerUser(registerDto)
      .pipe(
        take(1),
        tap((response) => {
          if (response.success && response.data) {
            this.toastrService.success('Registration successful');
            this.router.navigate(['/login']);
          } else {
            this.toastrService.error(response.errorMessage);
          }
        })
      )
      .subscribe();
  }

  onLoginClick() {
    this.router.navigate(['/login']);
  }

  private createForm() {
    return this.fb.group(
      {
        firstName: this.fb.control('', [
          Validators.required,
          Validators.maxLength(50),
          whiteSpaceValidator(),
        ]),
        lastName: this.fb.control('', [
          Validators.required,
          Validators.maxLength(50),
          whiteSpaceValidator(),
        ]),
        email: this.fb.control('', [
          Validators.required,
          Validators.maxLength(100),
          emailValidator(),
          whiteSpaceValidator(),
        ]),
        password: this.fb.control('', [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(40),
          passwordValidator(),
        ]),
        confirmPassword: this.fb.control('', [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(40),
        ]),
      },
      {
        validators: matchingPasswordValidator('password', 'confirmPassword'),
      }
    );
  }
}
