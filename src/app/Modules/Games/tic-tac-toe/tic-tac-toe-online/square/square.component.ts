import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-square-online',
  standalone: true,
  imports: [],
  templateUrl: './square.component.html',
  styleUrl: './square.component.css'
})
export class SquareComponent {
  //
  @Input() value: 'X' | 'O' | null = null;
  @Output() clickEvent = new EventEmitter<void>();
  //
  onClick(): void {
    this.clickEvent.emit();
  }
}

