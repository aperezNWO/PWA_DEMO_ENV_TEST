
import { Component, OnInit } from '@angular/core';
import { StringProcessorService } from 'src/app/_services/_wasm/string-processor.service';

@Component({
  selector: 'app-web-assembly',
  templateUrl: './web-assembly.component.html',
  styleUrl: './web-assembly.component.css'
})
export class WebAssemblyComponent  implements OnInit {
  inputText = '';
  processedText = '';

  constructor(private stringProcessor: StringProcessorService) {}

  async ngOnInit() {
    await this.stringProcessor.initialize();
  }

  async processText() {
    try {
      this.processedText = await this.stringProcessor.processString(this.inputText);
    } catch (error) {
      console.error('Error:', error);
    }
  }
}