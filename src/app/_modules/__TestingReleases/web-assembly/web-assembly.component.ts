
import { Component, OnInit } from '@angular/core';
import { StringProcessorService } from 'src/app/_services/_wasm/string-processor.service';
import { WasmLoaderService } from 'src/app/_services/_wasm/wasm-loader.service';

@Component({
  selector: 'app-web-assembly',
  templateUrl: './web-assembly.component.html',
  styleUrl: './web-assembly.component.css'
})
export class WebAssemblyComponent  implements OnInit {
  inputText = '';
  processedText = '';

  constructor(private stringProcessor: StringProcessorService, private wasmLoader: WasmLoaderService) {}

  async ngOnInit() {
    //await this.stringProcessor.initialize();
    //this.wasmLoader.loadWasmModule('https://apereznwo.github.io/PWA_DEMO_ENV_TEST/assets/wasm/program.wasm');
    await this.stringProcessor.loadWasmModule('https://apereznwo.github.io/PWA_DEMO_ENV_TEST/assets/wasm/program.wasm');
  }

  async processText() {
    try {
      this.processedText = await this.stringProcessor.processString(this.inputText);
    } catch (error) {
      console.error('Error:', error);
    }
  }
}