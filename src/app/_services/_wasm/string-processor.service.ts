// string-processor.service.ts
import { Injectable } from '@angular/core';
import { WASI } from '@wasmer/wasi';
import { WasmFs } from '@wasmer/wasmfs';



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

  async loadWasmModule(wasmFilePath: string): Promise<void> {
    // Set up the file system
    const wasmFs = new WasmFs();

    // Create a new WASI instance
    const wasi = new WASI({
       args: [] // Command-line arguments
      ,env: {} // Environment variables
      /*
      bindings: {
        // Use the file system from WasmFs
        fs: wasmFs.fs,
      },*/
    });

    try {
      // Fetch the WebAssembly module
      const response = await fetch(wasmFilePath);
      const wasmBytes = await response.arrayBuffer();

      // Instantiate the WebAssembly module
      const { instance } = await WebAssembly.instantiate(wasmBytes, {
        ...wasi.getImports(wasmBytes), // Provide WASI imports
      });

      // Start the WASI program
      wasi.start(instance);

      console.log('WebAssembly module instantiated successfully!');
    } catch (error) {
      console.error('Error loading or instantiating WebAssembly module:', error);
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


