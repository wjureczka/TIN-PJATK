import { TestBed } from '@angular/core/testing';

import { CMSInterceptor } from './cms.interceptor';

describe('CMSInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      CMSInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: CMSInterceptor = TestBed.inject(CMSInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
