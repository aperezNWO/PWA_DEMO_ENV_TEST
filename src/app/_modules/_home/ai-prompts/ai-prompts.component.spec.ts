import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiPromptsComponent } from './ai-prompts.component';

describe('AiPromptsComponent', () => {
  let component: AiPromptsComponent;
  let fixture: ComponentFixture<AiPromptsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AiPromptsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AiPromptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
