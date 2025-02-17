import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebAssemblyService {
  private module: any;

  constructor() {
    this.loadWasm();
  }

  async loadWasm() {
    try {
      const response = await fetch('/assets/wasm/hello.wasm');
      const bytes = await response.arrayBuffer();
      
      // Provide dummy WASI imports
      const wasiImports = {
        wasi_snapshot_preview1: {
          fd_write: () => {}, // Stub function
          proc_exit: () => {}  // Stub function
        }
      };

      const wasmModule = await WebAssembly.instantiate(bytes, wasiImports);

      this.module = wasmModule.instance.exports;
      console.log('WebAssembly Loaded:', this.module);
    } catch (error) {
      console.error('Failed to load WASM', error);
    }
  }

  getData(): number {
    if (!this.module) {
      console.error('WASM module is not loaded yet.');
      return -1;
    }
    return this.module.getData();
  }
}
