import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResNotificationsComponent } from './res-notifications.component';

describe('ResNotificationsComponent', () => {
  let component: ResNotificationsComponent;
  let fixture: ComponentFixture<ResNotificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResNotificationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
