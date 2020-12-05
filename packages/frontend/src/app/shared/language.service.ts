import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {BehaviorSubject, Observable} from 'rxjs';

import {availableLanguagesCodes, AvailableLanguageToCode} from 'src/environments/available-languages-codes';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(private translateService: TranslateService) {
    translateService.onLangChange.subscribe((event) => {
      this.currentLanguage.next(event.lang);
    });
  }

  private defaultLanguageCode: AvailableLanguageToCode = AvailableLanguageToCode.Polish;

  private currentLanguage: BehaviorSubject<AvailableLanguageToCode> =
    new BehaviorSubject<AvailableLanguageToCode>(this.defaultLanguageCode);

  public currentLanguage$: Observable<AvailableLanguageToCode> = this.currentLanguage.asObservable();

  private checkLanguageAvailability(languageCode): boolean {
    const availableLanguages = this.getAvailableLanguages();

    return availableLanguages.includes(languageCode);
  }

  public prepareTranslationService(): void {
    const browserLang = this.translateService.getBrowserLang();

    try {
      this.setLanguage(browserLang);
    } catch {
      this.setLanguage(this.defaultLanguageCode);
    }
  }

  public setLanguage(newLanguageCode: string): void {
    if (this.checkLanguageAvailability(newLanguageCode)) {
      this.translateService.use(newLanguageCode);
    } else {
      throw new Error(`This language is not available: ${newLanguageCode}`);
    }
  }

  public getAvailableLanguages(): string[] {
    return availableLanguagesCodes;
  }
}
