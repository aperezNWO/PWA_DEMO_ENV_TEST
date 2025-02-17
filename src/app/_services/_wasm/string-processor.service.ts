// string-processor.service.ts
import { Injectable } from '@angular/core';
import program from 'src/assets/wasm/program';




@Injectable({
  providedIn: 'root'
})
export class StringProcessorService {
  private wasmModule: any;
  private isLoaded = false;

  async initialize() {
    if (!this.isLoaded) {
      try {
        this.wasmModule = await program();
        this.isLoaded = true;
      } catch (error) {
        console.error('Failed to load WebAssembly module:', error);
        throw error;
      }
    }
  }

  async processString(input: string): Promise<string> {
    if (!this.isLoaded) {
      await this.initialize();
    }
    try {
      let output : string  = this.wasmModule._process_string(input);
      console.log('output : ' + output);
      return output;
    } catch (error) {
      console.error('Error processing string:', error);
      throw error;
    }
  }
}


