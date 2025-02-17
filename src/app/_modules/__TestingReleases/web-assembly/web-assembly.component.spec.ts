import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebAssemblyComponent } from './web-assembly.component';

describe('WebAssemblyComponent', () => {
  let component: WebAssemblyComponent;
  let fixture: ComponentFixture<WebAssemblyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebAssemblyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WebAssemblyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
