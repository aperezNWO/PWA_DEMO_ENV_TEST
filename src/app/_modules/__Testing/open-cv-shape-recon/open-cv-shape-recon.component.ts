import { Component             } from '@angular/core';
import { ShapeDetectionService } from 'src/app/_services/shape-detection.service';


@Component({
  selector: 'app-open-cv-shape-recon',
  templateUrl: './open-cv-shape-recon.component.html',
  styleUrl: './open-cv-shape-recon.component.css'
})
export class OpenCvShapeReconComponent {
  detectedShapes: string[] = [];
  imageURL: string | ArrayBuffer | null = null;

  constructor(private shapeDetectionService: ShapeDetectionService) {

    
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageURL = e.target.result;
        this.detectShapes();
      };
      reader.readAsDataURL(file);
    }
  }

  detectShapes(): void {
    const img = new Image();
    img.onload = () => {
      const shapes = this.shapeDetectionService.detectShapes(img);
      this.detectedShapes = shapes;
    };
    img.src = this.imageURL as string;
}  
}
