import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AskLLMComponent } from './ask-llm.component';

describe('AskLLMComponent', () => {
  let component: AskLLMComponent;
  let fixture: ComponentFixture<AskLLMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AskLLMComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AskLLMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
