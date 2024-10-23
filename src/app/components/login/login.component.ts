import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthenticationService } from '../../../auth/services/authentication.service';
import { LoginDto } from '../../../auth/models/login-dto';
import { Router } from '@angular/router';
import {
  emailValidator,
  whiteSpaceValidator,
} from '../../shared/validators/validators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthenticationService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup<{
    username: FormControl<string | null>;
    password: FormControl<string | null>;
  }>;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.createForm();
  }

  onLoginClick() {
    if (this.loginForm.invalid) {
      return;
    }
    const loginDto: LoginDto = {
      username: this.loginForm.controls.username.value ?? '',
      password: this.loginForm.controls.password.value ?? '',
    };

    console.log(
      'login form data, username, password',
      this.loginForm.controls.username.value,
      this.loginForm.controls.password.value
    );
    this.authService.loginUser(loginDto).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          console.log(
            'Login successful',
            response.data.accessToken,
            response.data.refreshToken
          );
        } else {
          console.log('Unuccessful', response.errorMessage);
        }
      },
      error: (err) => {
        console.error('Login failed', err);
      },
    });
  }

  onRegisterClick() {
    this.router.navigate(['/register']);
  }

  private createForm() {
    return this.fb.group({
      username: this.fb.control('', [
        Validators.required,
        Validators.maxLength(100),
        emailValidator(),
        whiteSpaceValidator(),
      ]),
      password: this.fb.control('', [
        Validators.required,
        Validators.maxLength(40),
      ]),
    });
  }
}
