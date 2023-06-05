import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'calix-show-form-errors',
  templateUrl: './calix-show-form-errors.component.html',
  styleUrls: ['./calix-show-form-errors.component.scss'],
})
export class CalixShowFormErrorsComponent {
  @Input() control!: AbstractControl | null;
  @Input() icon: string = 'fas fa-sharp fa-solid fa-circle-exclamation';
  @Input() customErrorMessages: any = {};

  private static readonly defaultErrorMessages: { [key: string]: (params?: any[]) => string } = {
    required: () => 'Ce champ est obligatoire',
    minlength: (param: any) => `Veuillez saisir au moins ${param.requiredLength} caractères`,
    maxlength: (param: any) => `Veuillez saisir moins de ${param.requiredLength} caractères`,
    min: (param: any) => `Veuillez saisir une valeur supérieure ou égale à: ${param.min}`,
    max: (param: any) => `Veuillez saisir une valeur inférieure ou égale à: ${param.max}`,
  };

  /**
   * Getter le message d'erreur correspondant au type d'erreur
   */
  private getErrorMessage(type: string, params: any): string {
    if (this.customErrorMessages && this.customErrorMessages[type]) {
      return this.customErrorMessages[type](params);
    } else {
      return CalixShowFormErrorsComponent.defaultErrorMessages[type](params);
    }
  }

  /**
   * Détermine s'il faut afficher les erreurs
   */
  shouldShowErrors(): boolean {
    return (
      this.control &&
      this.control.errors &&
      (this.control.dirty || this.control.touched)
    ) ?? false;
  }

  /**
   * Envoie une liste des messages d'erreur
   */
  listOfErrors(): string[] {
    const errors = this.control?.errors ?? {};
    return Object.keys(errors).map((field) => this.getErrorMessage(field, errors[field]));
  }
}
