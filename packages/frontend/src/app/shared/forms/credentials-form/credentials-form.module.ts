import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CredentialsFormComponent} from './credentials-form.component';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {TranslateModule} from '@ngx-translate/core';


@NgModule({
  declarations: [CredentialsFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    TranslateModule,
  ],
  exports: [CredentialsFormComponent]
})
export class CredentialsFormModule {
}
