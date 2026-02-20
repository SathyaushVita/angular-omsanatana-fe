import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TrainingService } from '../services/training.service';
import { NotificationHelper } from '../commons/notification';


@Component({
  selector: 'app-getby-training',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './getby-training.component.html',
  styleUrl: './getby-training.component.css'
})
export class GetbyTrainingComponent {



  organizationId: any;
  organization: any;

  constructor(private route: ActivatedRoute, private trainingService: TrainingService,     private notificationHelper: NotificationHelper,
  ) {}

  ngOnInit(): void {
    this.organizationId = this.route.snapshot.paramMap.get('id');
    this.gettraining();

    
  }
  errorMessage: string | null = null;

  gettraining(): void {
    this.trainingService.getTrainingById(this.organizationId).subscribe(
      (data: any) => {
        this.organization = data;
        this.errorMessage = null; 

        console.log(this.organization, "Organization Details");
 
      },
      (error) => {
        console.error('Error fetching organization details:', error);
        this.organization = null;
        this.errorMessage =
        error.error?.message === 'An error occurred.'
          ? 'Your added training program is currently under review and marked as pending. Our team will process and review it shortly before it becomes visible.'
          : error.error?.message || 'An unknown error occurred.';


      }

    );
  }


  
  // getVideoUrl(): string {
  //   if (this.organization && this.organization.video) {
  //     return ` ${this.organization.video}`;
  //   }
  //   return '';
  // }
  // getVideoUrl(): string {
  //   if (this.organization && this.organization.video) {
  //     return `${this.organization.video}`;
  //   }
  //   return '';
  // }
  
  getVideoUrl(): string {
    if (this.organization && this.organization.video) {
      return `${this.organization.video}`;
    }
    return '';
  }
  
}

