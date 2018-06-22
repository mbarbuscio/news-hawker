import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToHomeComponent } from './add-to-home.component';

describe('AddToHomeComponent', () => {
  let component: AddToHomeComponent;
  let fixture: ComponentFixture<AddToHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddToHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddToHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
