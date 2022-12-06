import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailablePackageComponent } from './available-package.component';

describe('AvailablePackageComponent', () => {
  let component: AvailablePackageComponent;
  let fixture: ComponentFixture<AvailablePackageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvailablePackageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvailablePackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
