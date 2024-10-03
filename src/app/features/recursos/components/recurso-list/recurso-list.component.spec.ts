import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecursoListComponent } from './recurso-list.component';

describe('RecursoListComponent', () => {
  let component: RecursoListComponent;
  let fixture: ComponentFixture<RecursoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecursoListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecursoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
