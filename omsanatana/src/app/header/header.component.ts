import { CommonModule } from '@angular/common';
import { Component, HostListener, Renderer2 } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NzModalModule } from 'ng-zorro-antd/modal';

import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzLayoutModule } from 'ng-zorro-antd/layout';


import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { MatDialog } from '@angular/material/dialog';

// import { SignupComponent } from '../signup/signup.component';
// import { AuthenticationService } from '../services/authentication.service';
// import { UserService } from '../services/user.service';
// import { MemberProfileComponent } from '../member-profile/member-profile.component';
// import { SharedService } from '../services/shared.service';
import { Subscription } from 'rxjs';
import { HomeService } from '../services/home.service';
import { SignupComponent } from '../signup/signup.component';
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';
import { SharedService } from '../services/shared.service';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule, NzModalModule,   NzLayoutModule, NzMenuModule,  NzAvatarModule, NzDropDownModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  private subscription: Subscription = new Subscription();


  isSmallScreen = window.innerWidth < 992;
  newscategories: any[] = [];  
  selectedCategoryId: string | null = null;
  activeRoute: string = ''; 
  categories:any;

  constructor(private dialog:MatDialog,private router:Router,private homeservice:HomeService,protected authenticationService:AuthenticationService,private userservice:UserService,private sharedService:SharedService,
    private renderer: Renderer2
  ){
  }


  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.checkScreenSize();
  }

  checkScreenSize(): void {
    this.isSmallScreen = window.innerWidth < 992;
  }

  getButtonClasses(): string[] {
    if (this.isSmallScreen) {
      return ['nav-link'];
    } else {
      return ['btn', 'btn-primary', 'rounded-pill'];
    }
  }


  ngOnInit(): void {


    this.getUserProfile();
    this.fetchheader();
    this.subscription.add(
      this.sharedService.triggerFetchprofileData$.subscribe(() => {
        this.getUserProfile();
      })
    );
    
this .loadGoogleTranslate();


    

  }

  handleImageError(event: Event) {
  const imgElement = event.target as HTMLImageElement;
  imgElement.src = 'assets/images/profile1.webp';
  }

  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  isLoggedIn: boolean = false;
  sidebarOpen: boolean = false;



  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  // ngOnInit(): void {
  //   this.fetchheader();
  // }

   fetchheader(): void {
    this.homeservice.header().subscribe(
      (data: any) => {
        this.categories = data.results.sort((a: any, b: any) => {
          return a.name.localeCompare(b.name); 
        });;

      },
      (error) => {
        console.error('Error fetching organizations:', error);
      }
    );
  }


  onCategoryClick(categoryId: string, categoryName: string) {
    // this.router.navigate(['/religion', categoryId]);
    this.selectedCategoryId = categoryId;
    this.router.navigate(['Sanatana', categoryId]); 
    localStorage.setItem('selectedCategoryId', categoryId.toString()); 

  }
  

  openSignupDialog(): void {
    const dialogRef = this.dialog.open(SignupComponent, {
      data: { displayName: 'signup' }, 
      autoFocus: false, 
      backdropClass: 'dialog-backdrop',
    });
    
    dialogRef.afterClosed().subscribe(() => {
      
    });
  }

  doLogout(){
    this.authenticationService.logout();
  }


  resetSelectedCategory(): void {
    this.selectedCategoryId = null;
    localStorage.removeItem('selectedCategoryId'); 

  }



  user: any = {};
  getUserProfile(): void {
    const userId = localStorage.getItem('user'); 
    this.userservice.profiledata(userId).subscribe(
      (data) => {
        this.user = data;
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
  }





  navigateTo(route: string): void {
    const ismember = localStorage.getItem('is_member') === 'true'; 
    console.log("hsjfdjdkjfkdfjhdhfu",ismember)
  
    if (ismember) {
      this.router.navigate([route]);
    } else {
      this.userservice.showMemberModal();
    }
  }

  navigateToTempleFilters():void{
    this.router.navigate(["training1",'AllTrainings'])  
}
  

//  ngAfterViewInit(): void {
//     this.loadGoogleTranslate();
//   }

  // loadGoogleTranslate() {
  //   const excludedComponents = ['add-temple', 'add-goshala', 'add-event'];
  //   const currentRoute = this.router.url.split('/')[1];

  //   if (excludedComponents.includes(currentRoute)) {
  //     return;
  //   }

  //   if (!(window as any).googleTranslateElementInit) {
  //     (window as any).googleTranslateElementInit = () => {
  //       new (window as any).google.translate.TranslateElement(
  //         { pageLanguage: 'en', includedLanguages: 'en,te,hi,kn,ta,ml,or,bn,as,gu' },
  //         'google_translate_element'
  //       );

  //       // Apply styles after the widget loads
  //       setTimeout(() => {
  //         const combo = document.querySelector('.goog-te-combo') as HTMLElement;
  //         if (combo) {
  //           combo.style.background = '#333';  // Set dark background
  //           combo.style.border = 'none';
  //           combo.style.color = 'white';  // Set text color to white
  //           combo.style.fontWeight = 'bold';  // Set font weight to bold
  //         }

  //         const iframe = document.querySelector('iframe') as HTMLIFrameElement;
  //         if (iframe) {
  //           iframe.style.border = 'none';
  //         }
  //       }, 1000); // Adjust timeout as needed
  //     };
  //   }

  //   if (!window.google || !window.google.translate) {
  //     const script = this.renderer.createElement('script');
  //     script.src =
  //       '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
  //     script.async = true;
  //     this.renderer.appendChild(document.body, script);
  //   } else {
  //     (window as any).googleTranslateElementInit();
  //   }
  // }

  loadGoogleTranslate() {
  const excludedComponents = ['ff'];
  const currentRoute = this.router.url.split('/')[1];

  if (excludedComponents.includes(currentRoute)) {
    return;
  }

  const win = window as any;

  if (!win.googleTranslateElementInit) {
    win.googleTranslateElementInit = () => {
      new win.google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          includedLanguages: 'en,hi,te,ta,mr,ml,kn,bn,as,gu,pa,ne,or,ur,sa,kok,ks,mni,brx'
        },
        'google_translate_element'
      );

      setTimeout(() => {
        const combo = document.querySelector('.goog-te-combo') as HTMLElement;
        if (combo) {
          combo.style.background = '#333';
          combo.style.border = 'none';
          combo.style.color = 'white';
          combo.style.fontWeight = 'bold';
        }

        const iframe = document.querySelector('iframe') as HTMLIFrameElement;
        if (iframe) {
          iframe.style.border = 'none';
        }
      }, 1000);
    };
  }

  if (!win.google || !win.google.translate) {
    const script = this.renderer.createElement('script');
    script.src =
      '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    this.renderer.appendChild(document.body, script);
  } else {
    win.googleTranslateElementInit();
  }
}


}
