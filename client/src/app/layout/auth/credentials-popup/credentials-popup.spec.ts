import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CredentialsPopup } from './credentials-popup';

describe('CredentialsPopup', () => {
  let component: CredentialsPopup;
  let fixture: ComponentFixture<CredentialsPopup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CredentialsPopup]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CredentialsPopup);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
