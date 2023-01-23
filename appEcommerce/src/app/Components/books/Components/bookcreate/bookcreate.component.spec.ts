import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookcreateComponent } from './bookcreate.component';

describe('BookcreateComponent', () => {
  let component: BookcreateComponent;
  let fixture: ComponentFixture<BookcreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookcreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookcreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
