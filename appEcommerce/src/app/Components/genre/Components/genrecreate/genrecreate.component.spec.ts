import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenrecreateComponent } from './genrecreate.component';

describe('GenrecreateComponent', () => {
  let component: GenrecreateComponent;
  let fixture: ComponentFixture<GenrecreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenrecreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenrecreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
