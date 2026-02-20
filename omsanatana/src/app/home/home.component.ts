import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HomeService } from '../services/home.service';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule,NgxSpinnerService } from "ngx-spinner";
import { AuthenticationService } from '../services/authentication.service';

// import {
//   CarouselComponent,
//   CarouselInnerComponent,
//   CarouselItemComponent,
//   CarouselControlComponent,
//   CarouselCaptionComponent,
//   CarouselIndicatorsComponent,
//   ThemeDirective
// } from '@coreui/angular';




// declare var $: any;
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,NgxSpinnerModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy{
  categories: any[] = [];
  latestArticles: any[] = [];
  articlesdata: any = {}; 
  religious: any[] = [];
  slides: any[] =[]
  intervalId: any;
  subCategories: any[] = [];
  training: any[] = [];



  constructor(private homepageservice:HomeService,private router:Router, private dialog:MatDialog,    private spinner: NgxSpinnerService,
    private authenticationService:AuthenticationService
  ) {}

  ngOnInit(): void {
    this.fetchhome();
    this.fetchLatest();
    this.startAutoScroll();
    this.fetchtraining();
  }

  // fetchhome(): void {
  //   this.homepageservice.homepage().subscribe(
  //     (data: any) => {
  //       this.categories = data.index;

  //     },
  //     (error) => {
  //       console.error('Error fetching organizations:', error);
  //     }
  //   );
  // }
  fetchhome(): void {
    this.spinner.show();
    this.homepageservice.homepage().subscribe(
      (data: any) => {
        this.categories = data.index.sort((a: any, b: any) => {
          return a.name.localeCompare(b.name); 
        });
        this.spinner.hide();
      },
      (error) => {
        console.error('Error fetching organizations:', error);
        this.spinner.hide(); 
      }
    );
  }
  

  fetchtraining(): void {
    this.homepageservice.training().subscribe(
      (data: any) => {
        this.training = data.training_categories;
        // this.religious = data.religion_categories;


      },
      (error) => {
        console.error('Error fetching organizations:', error);
      }
    );
  }


  fetchLatest(): void {
    this.homepageservice.latestpage().subscribe(
      (data: any) => {
        this.slides = data.main_category;   
            
      },
      error => {
        console.error('Error fetching latest articles', error);
      }
    );
  }

  


//   // startAutoScroll(): void {
//   //   this.intervalId = setInterval(() => {
//   //     this.moveToNextSlide();
//   //   }, 3000); 
//   // }

//   // moveToNextSlide(): void {
//   //   if (this.slides.length > 0) {
//   //     const firstSlide = this.slides.shift(); 
//   //     this.slides.push(firstSlide); 
//   //   }
//   // }

//   // ngOnDestroy(): void {
//   //   if (this.intervalId) {
//   //     clearInterval(this.intervalId); 
//   //   }
//   // }
//   currentSlideIndex: number = 0; // Track the active slide


//   startAutoScroll(): void {
//     this.intervalId = setInterval(() => {
//       this.moveToNextSlide();
//     }, 3000);
//   }


// //   moveToNextSlide(): void {
// //   if (this.slides.length > 0) {
// //     this.currentSlideIndex = (this.currentSlideIndex + 1) % this.slides.length;
// //   }
// // }

// moveToPreviousSlide(): void {
//   if (this.slides.length > 0) {
//     const firstSlide = this.slides.shift();
//     this.slides.push(firstSlide);
//     this.currentSlideIndex = (this.currentSlideIndex - 1) % this.slides.length; // Update active slide index
//   }
// }

//   moveToNextSlide(): void {
//     if (this.slides.length > 0) {
//       const firstSlide = this.slides.shift();
//       this.slides.push(firstSlide);
//       this.currentSlideIndex = (this.currentSlideIndex + 1) % this.slides.length; // Update active slide index
//     }
//   }

//   moveToSlide(index: number): void {
//     if (index >= 0 && index < this.slides.length) {
//       this.currentSlideIndex = index;
//       // Reorder slides based on selected index
//       while (this.slides[0] !== this.slides[index]) {
//         this.moveToNextSlide();
//       }
//     }
//   }

//   ngOnDestroy(): void {
//     if (this.intervalId) {
//       clearInterval(this.intervalId);
//     }
//   }
  

startAutoScroll(): void {
  this.intervalId = setInterval(() => {
    this.moveToNextSlide();
  }, 3000); 
}

moveToNextSlide(): void {
  if (this.slides.length > 0) {
    this.currentSlideIndex = (this.currentSlideIndex + 1) % this.slides.length;
  }
}

moveToPreviousSlide(): void {
  if (this.slides.length > 0) {
    this.currentSlideIndex = 
      (this.currentSlideIndex - 1 + this.slides.length) % this.slides.length;
  }
}

moveToSlide(index: number): void {
  if (index >= 0 && index < this.slides.length) {
    this.currentSlideIndex = index;
  }
}

ngOnDestroy(): void {
  if (this.intervalId) {
    clearInterval(this.intervalId);
  }
}

currentSlideIndex: number = 0; 

// navigateToCategory(categoryId: number): void {
//   this.router.navigate(['religion', categoryId]); 
// }

// navigateToCategory(categoryId: number): void {
//   this.router.navigate(['Sanatana', categoryId]); 
// }



navigateToCategory(categoryId: string): void {
  
  const specificIds = [
    '4adc5d2f-26e9-4271-a788-ea687af9c434',
    'eb611b10-ad27-48c5-966b-dd0bf3f84510',
    '7634c1b1-027c-4a63-82e4-a03d5714802c',
    'e418af95-9db8-41ed-8c29-495218081ecd'
  ];

  if (specificIds.includes(categoryId)) {
    this.router.navigate(['saanatanasubcategeories', categoryId]);
  } else {
    this.router.navigate(['Sanatana', categoryId]);
  }
}


navigateToCategoryDetail(templeCategory: any): void {
  let userId = this.authenticationService.getCurrentUser();
    if (userId == undefined || userId == null) {
      this.authenticationService.showLoginModal()
      return;
    }
  
  this.router.navigate(["training2", templeCategory._id], { state: { templeCategory } })
    .then(() => console.log("Navigation successful"))
    .catch(error => console.error("Navigation failed:", error));
}


navigateToTempleFilters():void{
  this.router.navigate(["training1",'AllTrainings'])  
}



onLearnClick(){
  this.router.navigate(['/learn from sanatana_Dharam']);
}

}




