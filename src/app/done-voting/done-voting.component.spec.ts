import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoneVotingComponent } from './done-voting.component';

describe('DoneVotingComponent', () => {
  let component: DoneVotingComponent;
  let fixture: ComponentFixture<DoneVotingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoneVotingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoneVotingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
