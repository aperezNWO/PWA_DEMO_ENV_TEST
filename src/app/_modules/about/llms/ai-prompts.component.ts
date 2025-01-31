import { Component    } from '@angular/core';
import { _environment } from 'src/environments/environment';

@Component({
  selector: 'app-ai-prompts',
  templateUrl: './ai-prompts.component.html',
  styleUrl: './ai-prompts.component.css'
})
export class AiPromptsComponent {
      public aiPrompts : any[] = [];
      constructor()
      {
        console.log('AI Prompts: ' + JSON.stringify(_environment.aiPrompts));

        this.aiPrompts = _environment.aiPrompts;
      }
}
