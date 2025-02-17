import { Component, OnInit  } from '@angular/core';
import { WebAssemblyService } from 'src/app/_services/web-assembly.service';

@Component({
  selector: 'app-web-assembly',
  templateUrl: './web-assembly.component.html',
  styleUrl: './web-assembly.component.css'
})
export class WebAssemblyComponent implements OnInit {
  output: string = '';

  ngOnInit(): void {
    this.loadWebAssembly();
  }

  async loadWebAssembly() {
    try {
      // Fetch the WebAssembly file from the assets folder
      const wasmFilePath = './assets/wasm/hello.wasm';
      const response = await fetch(wasmFilePath);

      if (!response.ok) {
        throw new Error(`Failed to load WebAssembly file: ${response.statusText}`);
      }

      // Instantiate the WebAssembly module
      const { instance } = await WebAssembly.instantiateStreaming(response);

      // Call exported WebAssembly functions
      //const result = instance.exports['say_hello']?.(); // Replace `myFunction` with your exported function


      //this.output = `Result from WebAssembly: ${result}`;
      const sayHello = instance.exports['say_hello'] as () => void;
      sayHello();

    } catch (error) {
      console.error('Error loading WebAssembly:', error);
      this.output = 'Failed to load WebAssembly.';
    }
  }
 }
