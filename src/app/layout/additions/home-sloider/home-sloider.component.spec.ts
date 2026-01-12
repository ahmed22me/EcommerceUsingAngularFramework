import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSloiderComponent } from './home-sloider.component';

describe('HomeSloiderComponent', () => {
  let component: HomeSloiderComponent;
  let fixture: ComponentFixture<HomeSloiderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeSloiderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeSloiderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
