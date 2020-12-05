import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-credentials-form',
  templateUrl: './credentials-form.component.html',
  styleUrls: ['./credentials-form.component.scss']
})
export class CredentialsFormComponent implements OnInit {

  form: FormGroup;

  isPasswordVisible = false;

  visibilityIcon = 'visibility';

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.form = this.buildForm();
  }

  get email(): string {
    return this.form.get('email').value as string;
  }

  get password(): string {
    return this.form.get('password').value as string;
  }

  get isValid(): boolean {
    return this.form.valid;
  }

  showPassword(): void {
    this.isPasswordVisible = true;
    this.setVisibilityIcon();
  }

  hidePassword(): void {
    this.isPasswordVisible = false;
    this.setVisibilityIcon();
  }

  setVisibilityIcon(): void {
    this.visibilityIcon = this.isPasswordVisible ? 'visibility_off' : 'visibility';
  }

  private buildForm(): FormGroup {
    return this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

}
