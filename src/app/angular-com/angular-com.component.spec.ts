import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularComComponent } from './angular-com.component';

describe('AngularComComponent', () => {
  let component: AngularComComponent;
  let fixture: ComponentFixture<AngularComComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AngularComComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularComComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
