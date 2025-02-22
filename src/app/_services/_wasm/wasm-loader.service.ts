import { Injectable } from '@angular/core';
import { WASI } from '@wasmer/wasi';
import { WasmFs } from '@wasmer/wasmfs';

@Injectable({
  providedIn: 'root',
})
export class WasmLoaderService {
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
}