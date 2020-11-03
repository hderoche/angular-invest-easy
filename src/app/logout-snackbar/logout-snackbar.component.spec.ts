import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoutSnackbarComponent } from './logout-snackbar.component';

describe('LogoutSnackbarComponent', () => {
  let component: LogoutSnackbarComponent;
  let fixture: ComponentFixture<LogoutSnackbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogoutSnackbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoutSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
