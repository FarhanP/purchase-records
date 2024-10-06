import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppCustomerListComponent } from './app-customer-list.component';

describe('AppCustomerListComponent', () => {
  let component: AppCustomerListComponent;
  let fixture: ComponentFixture<AppCustomerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppCustomerListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppCustomerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
