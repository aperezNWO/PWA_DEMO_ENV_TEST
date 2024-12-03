
import { Component                } from '@angular/core';
import { SpeechRecognitionService } from 'src/app/_services/speechRecognition/speech-recognition.service';

@Component({
  selector: 'app-speech-recognition',
  templateUrl: './speech-recognition.component.html',
  styleUrl: './speech-recognition.component.css'
})
export class SpeechRecognitionComponent  {
    //
    public transcript: string = '';

    constructor(public speechToTextService : SpeechRecognitionService ) {}

    startRecognition() {
      this.speechToTextService.startRecognition();
    }

    stopRecognition() {
      this.speechToTextService.stopRecognition();
    }
}

