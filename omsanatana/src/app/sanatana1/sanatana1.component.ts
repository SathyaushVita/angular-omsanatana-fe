import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeService } from '../services/home.service';
import { ReligiousService } from '../services/religious.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule} from "ngx-spinner";
import {SafeHtml } from '@angular/platform-browser';



@Component({
  selector: 'app-sanatana1',
  standalone: true,
  imports: [CommonModule,NgxSpinnerModule],
  templateUrl: './sanatana1.component.html',
  styleUrl: './sanatana1.component.css'
})
export class Sanatana1Component {


  categoryId!: number;
  category: any = null;
  subcategories: any[] = [];
  selectedCategoryId: string | null = null;
  categoryData: any;
  isSideMenuOpen = false;
  lastSelectedCategoryId: string | null = null;
  selectedSubcategory: any;  

  constructor(
    private route: ActivatedRoute,
    private homepageservice: HomeService,private religiousservice:ReligiousService,private spinner: NgxSpinnerService,
    private router:Router,private sanitizer: DomSanitizer,
  ) {}



  toggleSideMenu() {
    this.isSideMenuOpen = !this.isSideMenuOpen;


    if (!this.isSideMenuOpen && this.lastSelectedCategoryId) {
      this.selectedCategoryId = this.lastSelectedCategoryId;
      this.fetchAllCategoryData(this.selectedCategoryId);
    }
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.selectedCategoryId = params.get('id');
      if (this.selectedCategoryId) {
        this.fetchcategeoriesbyid(this.selectedCategoryId);
        this.fetchAllCategoryData(this.selectedCategoryId); 

      }
    });
  }

  fetchcategeoriesbyid(categoryId: string): void {
    this.religiousservice.categeoriesbyid(categoryId).subscribe(
      (category) => {
        this.category = category;
        this.fetchAllCategoryData(categoryId); 
        this.fetchSubcategories(categoryId);

      },
      (error) => console.error('Error fetching category details:', error)
    );
  }


  
  fetchSubcategories(categoryId: string): void {
    this.religiousservice.minisubcategeories(categoryId).subscribe(
      (subcategories) => {
        this.subcategories = subcategories;
      },
      (error) => console.error('Error fetching subcategories:', error)
    );
  }

  fetchAllCategoryData(categoryIdentifier: string): void {
    this.spinner.show();
    this.religiousservice.getbydata(categoryIdentifier).subscribe(
      (data: any) => {
        this.categoryData = data;
        console.log('Fetched category data:', this.categoryData);
        this.spinner.hide();
      },
      (err: any) => {
        console.error('Error fetching category data:', err);
        this.spinner.hide();
      }
    );
  }



  onclick(categoryId: number): void {
    this.router.navigate(['sanatanaspecificcategeory', categoryId]); 
  }


  preventCopy(event: ClipboardEvent): void {
    event.preventDefault(); // Prevent the default copy behavior
    console.log("Copy action is disabled");
  }
  

  

//   keywords: any = {
//     'Atharvaveda':[
//       'Atharvaveda','Samaveda','Yajurveda','Rigveda',
//       'Ithihas(Epic)','Up-Puranas','Puranas','Dharshana','Upavedas','Vedangas',
//       'Festivals', 'Functions', 'Pujas', "Famous Guru's and Saints", 'Temples', 'Muhurtas', 'Philosophy', "Cultural Arts",
//       "Calculation of Time (Kala)","Calendrical Astronomy","Cosmic Cycles and Yugas","Eclipse Prediction","Graha (Planets)","Nakshatras (Lunar Mansions)","Parallax and Distance Measurement","Siddhantic Astronomy (Siddhanta Jyotisha)","Surya Siddhanta",
//       "Chinese astrology","Judicial astrology","Locational astrology","Mayan astrology","Natal astrology","Relationship astrology","Uranian astrology","Vedic astrology",
//       "Ashtanga Yoga","Bhakti Yoga","Hatha Yoga","Integral Yoga","Jivamukti Yoga","Jnana Yoga","Karma Yoga","Kundalini Yoga","Raja Yoga","Tantra Yoga","Yin Yoga",
//       "Mantra Meditation (Japa Yoga)","Kundalini Meditation","Laya Yoga Meditation", "Vedantic Meditation (Jnana Yoga Meditation)","Satsang Meditation", "Transcendental Meditation", "Trataka (Gazing Meditation)", "Chakra Meditation", "Bhakti Meditation (Devotional Meditation)", "Raja Yoga Meditation", "Tantric Meditation", "Nada Yoga (Sound Meditation)",
//       "Agada Tantra (Toxicology)","Ayurvedic Nutrition (Ahara Chikitsa)","Bhuta Vidya (Psychiatry and Mental Health)","Doshas in Ayurveda (Vata, Pitta, Kapha)","Kaumarbhritya (Pediatrics and Obstetrics)","Kayachikitsa (Internal Medicine)","Panchakarma","Rasayana (Rejuvenation and Anti-Aging)","Shalakya Tantra (ENT and Eye Disorders)","Shalya Tantra (Surgery)","Swastavritta (Preventive Medicine and Lifestyle Management)","Vajikarana (Aphrodisiacs and Fertility)",
//       "Agricultural Vastu (Krishi Vastu)","Commercial Vastu","Corporate Vastu","Educational Vastu","Health Care Vastu (Hospital Vastu)","Industrial Vastu","Plot Vastu","Residential Vastu (Griha Vastu)","Temple Vastu (Mandir Vastu)","Vastu for Hotels & Restaurants",
//     ]



//   };





// highlightText(text: string): SafeHtml {
//   const allKeywords = Object.keys(this.keywords).flatMap(key => this.keywords[key]);
//   const regex = new RegExp(`\\b(${allKeywords.join('|')})\\b`, 'gi');  
//   const highlightedText = text.replace(regex, (matched) => {
//     return `<span class="highlight-keyword" style="color: #FF5500; font-weight: bold; cursor: pointer;">${matched}</span>`;
//   });
//   return this.sanitizer.bypassSecurityTrustHtml(highlightedText);
// }
// handleKeywordClick(event: MouseEvent) {
//   const target = event.target as HTMLElement;
//   const clickedKeyword = target.innerText.toLowerCase();  
//   const matchedKeyword = Object.values(this.keywords)
//     .flat()
//     .find((keyword) => (keyword as string).toLowerCase() === clickedKeyword);  
//   if (typeof matchedKeyword === 'string') {  
//     this.navigateToCategory(matchedKeyword);  
//   }
// }
// navigateToCategory(keyword: string) {
//   this.router.navigate(['/saanatanasubcategeories', keyword]);
// }


  // Method to highlight text that matches subcategory names
  highlightText(text: string): string {
    if (!text || !this.subcategories) {
      return text;
    }

    this.subcategories.forEach(subcategory => {
      const regex = new RegExp(`\\b${subcategory.name}\\b`, 'gi'); 
      text = text.replace(regex, `<mark class="highlight-keyword">${subcategory.name}</mark>`); 
    });

    return text;
  }

  handleTextClick(event: Event): void {
    const clickedText = (event.target as HTMLElement).textContent?.trim();
    if (clickedText) {
      const matchedSubcategory = this.subcategories.find(subcategory => subcategory.name === clickedText);
      if (matchedSubcategory) {
        this.router.navigate([`sanatanaspecificcategeory/${matchedSubcategory._id}`]); 
      }
    }
  }
  


private escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

sharegetbysanatana(temple: any) {
  if (!temple || !temple._id) {
    console.error('Invalid temple data provided.');
    return;
  }

  const shareUrl = `${window.location.origin}/saanatanasubcategeories/${temple._id}`;
  console.log('Share URL:', shareUrl);

  if (navigator.share) {
    navigator.share({
      title: temple.name,
      text: temple.desc || 'Check out this temple!',
      url: shareUrl
    }).then(() => {
      console.log('Sharing successful');
    }).catch((error) => {
      console.error('Error sharing:', error);
    });
  } else {
    alert(`Share URL: ${shareUrl}`);
  }
}






}
