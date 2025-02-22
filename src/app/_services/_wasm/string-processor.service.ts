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

        fetch('assets/wasm/program.wasm')
          .then(response => response.arrayBuffer())
          .then(bytes => WebAssembly.instantiate(bytes, {
            env: {
              memory: new WebAssembly.Memory({ initial: 256, maximum: 512 }),  // Shared memory (if required)
              print: (arg: number) => console.log("WASM says:", arg), // Example import function
              abort: () => console.error("WASM aborted!") // Handle errors from WASM
            }
          }))
          .then(({ instance }) => {
            console.log("WASM Loaded Successfully!", instance);
            this.isLoaded = true;
          })
          .catch(err => console.error("Failed to load WASM:", err));

        //this.wasmModule = await program();
        //this.isLoaded = true;
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


