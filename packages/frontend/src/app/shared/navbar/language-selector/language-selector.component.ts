import {Component, OnInit} from '@angular/core';

import {LanguageService} from 'src/app/shared/language.service';
import {AvailableLanguageToCode} from '../../../../environments/available-languages-codes';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss']
})
export class LanguageSelectorComponent implements OnInit {

  public languageCodeToFlagEmoji = new Map([
    [AvailableLanguageToCode.Polish as string, '🇵🇱'],
    [AvailableLanguageToCode.German as string, '🇩🇪'],
    [AvailableLanguageToCode.English as string, '🇬🇧']
  ]);

  constructor(public languageService: LanguageService) {
  }

  ngOnInit(): void {
  }

}
