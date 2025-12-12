import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmissionFiltersComponent } from './emission-filters.component';

describe('EmissionFiltersComponent', () => {
  let component: EmissionFiltersComponent;
  let fixture: ComponentFixture<EmissionFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmissionFiltersComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(EmissionFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

