import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleTextComponent } from './title-text.component';

describe('TitleTextComponent', () => {
  let component: TitleTextComponent;
  let fixture: ComponentFixture<TitleTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TitleTextComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TitleTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
