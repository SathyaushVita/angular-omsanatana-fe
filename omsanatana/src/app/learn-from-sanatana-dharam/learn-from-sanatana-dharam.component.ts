import { Component } from '@angular/core';
import { LearnFromSanatanaService } from '../services/learn-from-sanatana.service';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule,NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-learn-from-sanatana-dharam',
  standalone: true,
  imports: [CommonModule,NgxSpinnerModule],
  templateUrl: './learn-from-sanatana-dharam.component.html',
  styleUrl: './learn-from-sanatana-dharam.component.css'
})
export class LearnFromSanatanaDharamComponent {

  learn:any;
  constructor(private learanfromsatanaservice:LearnFromSanatanaService,private spinner: NgxSpinnerService,){}

  ngOnInit(): void {
    this.learnfromsnaatanadharam();
  }


  learnfromsnaatanadharam(): void {
    this.spinner.show();
    this.learanfromsatanaservice.learnfromsanatanadharama().subscribe(
      (data: any) => {
        this.learn = data.results;   
        this.spinner.hide();
            
      },
      error => {
        console.error('Error fetching latest articles', error);
        this.spinner.hide();
      }
    );
  }

}
