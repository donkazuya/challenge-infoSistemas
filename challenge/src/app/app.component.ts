import { Component, OnInit } from '@angular/core';
import { MessageService, PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'challenge';

  constructor(
    private primeNgConfig: PrimeNGConfig,
    private messageService: MessageService
    ) {
    
  }

  ngOnInit(): void {
    this.primeNgConfig.ripple = true;

    
  }

  
}
