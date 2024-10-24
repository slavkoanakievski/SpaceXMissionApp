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
  passwordValidator,
  whiteSpaceValidator,
} from '../../shared/validators/validators';
import { ToastrService } from 'ngx-toastr';

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
    private router: Router,
    private toastr: ToastrService
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
    
    this.authService.loginUser(loginDto).subscribe((response) => {
      if (response.success && response.data) {
        this.toastr.success('You are online!');
        this.router.navigate(['/spacex-latest-launch']);
      } else {
        this.toastr.error(response.errorMessage);
      }
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
        Validators.minLength(8),
        passwordValidator(),
      ]),
    });
  }
}
