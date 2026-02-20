import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeService } from '../services/home.service';
import { ReligiousService } from '../services/religious.service';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule,NgxSpinnerService } from "ngx-spinner";
import { DomSanitizer ,SafeHtml } from '@angular/platform-browser';
//import { ShareButtonDirective } from 'ngx-sharebuttons';




@Component({
  selector: 'app-sanatana',
  standalone: true,
  imports: [CommonModule,NgxSpinnerModule],
  templateUrl: './sanatana.component.html',
  styleUrl: './sanatana.component.css'
})
export class SanatanaComponent {


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
        this.fetchmaincategeoriesbyid(this.selectedCategoryId);
        this.fetchAllCategoryData(this.selectedCategoryId); 

      }
    });
  }
  

  fetchmaincategeoriesbyid(categoryId: string): void {
    this.religiousservice.maincategeoriesbyid(categoryId).subscribe(
      (category) => {
        this.category = category;
        this.fetchAllCategoryData(categoryId); 
        this.fetchcategories(categoryId);
      },
      (error) => console.error('Error fetching category details:', error)
    );
  }

  fetchcategories(categoryId: string): void {
    this.religiousservice.subcategeories(categoryId).subscribe(
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




  navigate(categoryId: number): void {
    this.router.navigate(['saanatanasubcategeories', categoryId]); 
  }



  preventCopy(event: ClipboardEvent): void {
    event.preventDefault(); // Prevent the default copy behavior
    console.log("Copy action is disabled");
  }
  


//   keywords: any = {

//     'Ancient Literature': ['Smriti', 'Shruti','Rigveda'],
//     'Shruti':['Atharvaveda','Samaveda','Yajurveda','Rigveda'],
//     'Smriti':['Ithihas(Epic)','Up-Puranas','Puranas','Dharshana','Upavedas','Vedangas'],
//     'Rigveda':['RigVeda-Upanishad','RigVeda-Aranyak','RigVeda-Brahamana','RigVeda-Samhita'],
//     'Yajurveda':['YajurVeda-Shukla','YajurVeda-Upanishad','YajurVeda-Aranyak','YajurVeda-Brahmana','YajurVeda-Samhita'],
//     'Samaveda':['SamaVeda-Upanishad','SamaVeda-Aranyak','SamaVeda-Brahmana','SamaVeda-Samhita'],
//     'Atharvaveda':['AtharvaVeda-Upanishad','AtharvaVeda-Aranyak','AtharvaVeda-Brahmana','AtharvaVeda-Samhita'],
//     'Vedangas':['Chhanda','Arthashashtra(Economics)','Jyotisha(Astrology)','Kanda(Metre)','Nirukta(Glossary)','Vyakarana(Grammer)','Kalpa(Religious Rights)','Shikha(Phonetics)'],
//     'Upavedas':['Arthveda Veda(Economics and politics)','Gandharva Veda(Art and Music)','Gandharva Veda(Art and Music)','Ayurveda(Health Science)'],
//     'Puranas':['Brahmanda Purana','Garuda Purana','Matshya Purana','Kurma Purana','Vamana Purana','Skanda Purana','Varaha Purana','Linga Purana','Brahma vaivartha Purana','Bhavishya Purana','Agni Purana','Markandeya Purana','Narada Purana','Bagavath Purana','Vayu Purana','Vishnu purana','Padma Purana','Brahma Purana','Puranas'],
//     'Up-Puranas':['Samba Purana','Devibhagavata Purana','Kalika Purana','Lakhunaradheeya Purana','Harivamsa Purana','Vishnudharmmoththara Purana','Kaliki Purana','Mulgala Purana','Aadhi Purana',' Aathma Purana', 'Brahma Purana', 'Vishnudharma Purana','Narasimha Purana','Kriyaayoga Purana','Surya Purana', 'Bruhat Naradheeya Purana', 'Prushoththma Purana','Bruhat Vishnu Purana'],
//     'Ithihas(Epic)':['Bhagvat Gita','Mahabharatha','Ramayana'],
//     // Vedic Science and Traditions
//     'Vedic Science and Traditions': [ 'Astronomy', 'Ayurveda', 'Yoga',  'Vasthu','Astrology', ],
//     'Astrology':["Chinese astrology","Judicial astrology","Locational astrology","Mayan astrology","Natal astrology","Relationship astrology","Uranian astrology","Vedic astrology"],
//     'Ayurveda': ["Agada Tantra (Toxicology)","Ayurvedic Nutrition (Ahara Chikitsa)","Bhuta Vidya (Psychiatry and Mental Health)","Doshas in Ayurveda (Vata, Pitta, Kapha)","Kaumarbhritya (Pediatrics and Obstetrics)","Kayachikitsa (Internal Medicine)","Panchakarma","Rasayana (Rejuvenation and Anti-Aging)","Shalakya Tantra (ENT and Eye Disorders)","Shalya Tantra (Surgery)","Swastavritta (Preventive Medicine and Lifestyle Management)","Vajikarana (Aphrodisiacs and Fertility)"],
//     "Yoga": ["Ashtanga Yoga","Bhakti Yoga","Hatha Yoga","Integral Yoga","Jivamukti Yoga","Jnana Yoga","Karma Yoga","Kundalini Yoga","Raja Yoga","Tantra Yoga","Yin Yoga"],
//     "Vasthu": ["Agricultural Vastu (Krishi Vastu)","Commercial Vastu","Corporate Vastu","Educational Vastu","Health Care Vastu (Hospital Vastu)","Industrial Vastu","Plot Vastu","Residential Vastu (Griha Vastu)","Temple Vastu (Mandir Vastu)","Vastu for Hotels & Restaurants"],
//     "Astronomy":["Calculation of Time (Kala)","Calendrical Astronomy","Cosmic Cycles and Yugas","Eclipse Prediction","Graha (Planets)","Nakshatras (Lunar Mansions)","Parallax and Distance Measurement","Siddhantic Astronomy (Siddhanta Jyotisha)","Surya Siddhanta"],
//     // Religion
//     'Religion': ['Hinduism', 'Buddhism', 'Jainism', 'Sikhism'],
//     'Hinduism': ['Festivals', 'Functions', 'Pujas', "Famous Guru's and Saints", 'Temples', 'Muhurtas', 'Philosophy', 'Cultural Arts', ],
//    // Hinduism
//    'Festivals': ['Ugadi(Baisakhi )', 'Sri Rama Navami', 'Hanuman Jayanti', 'Janmastami', 'Guru Purnima', 'Ganesh Chaturti','Navaratri','Diwali','Makara Sankranthi','Maha Shivarathri','Holi','Raksha Bandhan','Ekadashi','Dhnateras','Chhath Puja','Basant Panchami','Karva Chauth','Onam'],
//    'Functions': ['Garbhadan(Conception)','Pumsavana(Engendering a male issue)','Simantonayana (Hair-parting)','Jatakarma (Birth rituals)','Namkaran (Name-giving)','Nishkrama (First outing)','Annaprashan (First feeding)','Chudakarma (Chaul) (Shaving of head)','Karnavedh (Piercing the earlobes)','Vidyarambh (Learning the alphabet)','Upanayan (Yagnopavit)','Vedarambh (Beginning Vedic study)','Keshant (Godaan) (Shaving the beard)','Samavartan (End of Studentship)','Vivaha','Antyesthi (Death rites)'],
//    'Pujas': [' Ganesh Pooja','Lakshmi Pooja','Durga Pooja','Shiva Pooja(Mahashivaratri)','Vishnu Pooja','Saraswati Pooja(Vasant Panchami )','Satyanarayana Pooja','Hanuman Pooja(Hanuman Jayanti)','Navagraha Pooja','Kali Pooja','Chandi Homa/Pooja','Vastu Pooja','Pitru Pooja (Shraddha)','Gayatri Pooja','Karthika Deepam Pooja'],
//    "Famous Guru's and Saints":['Adi Shankaracharya (8th Century CE)','Rishi Vyasa','Patanjali','Ramanujacharya (1017–1137 CE)','Sant Kabir (1440–1518 CE)','Madhvacharya (1238–1317 CE)','Sant Tulsidas (1532–1623 CE)','Sant Mirabai (1498–1547 CE)','Sant Eknath (1533–1599 CE)','Swami Vivekananda (1863–1902 CE)','Ramakrishna Paramahamsa (1836–1886 CE)','Sri Aurobindo (1872–1950 CE)','Sri Ramana Maharshi','DATTATREYA','Dayananda Saraswati'],
//    'Temples':['Ruins','Ayyappa Swamy','Asta Vinayaka','Brahma','Bala Rama','Chota Chardham','Chardham','Chandi Mata','Durga Mata','Danteswari Mata','Gramadevata','Gayatri Mata','Ganapati','Hanuman','Iskon','Janaki','Jyothi Lingas','Jagannath','Kala Birava','Kali Mata','Muththmari Amman','Maha Lakshmi','Murugan','Maha Sakthi peetas','Maha Vishnu','Narasimha', 'Nava Grahalu','Other Category','Pancha Bhutha','Pancha Kedar','Pancha Preyar','Shani','Sri Krishna','Shitla Mata','Swamy Narayan','Sathya Narayana Swamy','Sakthi Peetas','Sri Rama','Subramanya Swamy','Shiva','Saraswati','Veera Badhra','Venkateshwara Swamy','Antediluvian','Matam'],
//    'Muhurtas': ['Tithi','Vaasara','Nakshatra','the yoga','Karan'],
//    'Philosophy':['Samkhya (Kapila)','Yoga (Patanjali)','Nyaya (Gautama Muni)','Vaisheshika (Kanada)','Purva Mimamsa (Jaimini)','Vedanta'],
//    'Cultural Arts': ['Dance','Music','Singing','Painting','Sculpture','Sewing','Embroidery','Dressing','Jewelry & Gems','Cooking - Eating - Drinking','Organic Food','Old Hindu Traditional - Festival Games','Games - Children Games','Ancient Martial Arts','Stories - Pancha Tantra Stories'],
//    'Buddhism': ['Festivals', 'Functions', 'Pujas', "Famous Guru's and Saints", 'Temples', 'Muhurtas', 'Philosophy', 'Cultural Arts', ],
//    'Jainism' : ['Festivals', 'Functions', 'Pujas', "Famous Guru's and Saints", 'Temples', 'Muhurtas', 'Philosophy', 'Cultural Arts', ],
//     'Sikhism' : ['Festivals', 'Functions', 'Pujas', "Famous Guru's and Saints", 'Temples', 'Muhurtas', 'Philosophy', 'Cultural Arts', ],
// // Buddhism


//   };


// keywords: any = {

//   'Ancient Literature': ['Smriti', 'Shruti',],
//     'Religion': ['Hinduism', 'Buddhism', 'Jainism', 'Sikhism'],
//     'Vedic Science and Traditions': [ 'Astronomy', 'Ayurveda', 'Yoga',  'Vasthu','Astrology',],

// }


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


navigateToCategory(keyword: string) {
  this.router.navigate(['/Sanatana', keyword]);
}



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

handleKeywordClick(event: Event): void {
  const clickedText = (event.target as HTMLElement).textContent?.trim();
  if (clickedText) {
    const matchedSubcategory = this.subcategories.find(subcategory => subcategory.name === clickedText);
    if (matchedSubcategory) {
      this.navigate(matchedSubcategory._id);
    }
  }
}




  


private escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}



onLearnClick(){
  this.router.navigate(['/learn from sanatana_Dharam']);

}

// sharegetbysanatana(temple: any) {
//   if (!temple || !temple._id) {
//     console.error('Invalid temple data provided.');
//     return;
//   }

//   const shareUrl = `${window.location.origin}/Sanatana/${temple._id}`;
//   console.log('Share URL:', shareUrl);

//   if (navigator.share) {
//     navigator.share({
//       title: temple.name,
//       text: temple.desc || 'Check out this temple!',
//       url: shareUrl
//     }).then(() => {
//       console.log('Sharing successful');
//     }).catch((error) => {
//       console.error('Error sharing:', error);
//     });
//   } else {
//     alert(`Share URL: ${shareUrl}`);
//   }
// }
// sharegetbysanatana(temple: any) {
//   if (!temple || !temple._id) {
//     console.error('Invalid temple data provided.');
//     return;
//   }

//   const shareUrl = `${window.location.origin}/Sanatana/${temple._id}`;
//   console.log('Share URL:', shareUrl);

//   if (navigator.share) {
//     navigator.share({
//       title: temple.name,
//       // text: `${temple.desc || 'Check out this temple!'} \nLink: ${shareUrl}`, // Including URL in text
//       url: shareUrl
//     }).then(() => {
//       console.log('Sharing successful');
//     }).catch((error) => {
//       console.error('Error sharing:', error);
//     });
//   } else {
//     alert(`Share URL: ${shareUrl}`);
//   }
// }


// sharegetbysanatana(categoryData: any) {
//   if (!categoryData || !categoryData._id) {
//     console.error('Invalid temple data provided.');
//     return;
//   }

//   const shareUrl = `${window.location.origin}/Sanatana/${categoryData._id}`; 
//   console.log('Share URL:', shareUrl);

//   if (navigator.share) {
//     navigator.share({
//       title: categoryData.name,
//       text: categoryData.desc || 'Check out this temple!',
//       url: shareUrl
//     }).then(() => {
//       console.log('Sharing successful');
//     }).catch((error) => {
//       console.error('Error sharing:', error);
//     });
//   } else {
//     alert(`Share URL: ${shareUrl}`);
//   }
// }

shareContent(categoryData: any) {
  const shareUrl = window.location.href; // The current page URL

  // Prepare the share message with the URL that will be recognized as a link on most platforms
  const shareMessage = `Check out this category: ${categoryData.name}\n\nDescription: ${categoryData.desc}\n\nClick here to visit: ${shareUrl}`;

  if (navigator.share) {
    navigator.share({
      title: categoryData.name,
      text: shareMessage, // Share message with the URL
      url: shareUrl,      // Share the current URL directly
    })
    .then(() => console.log('Successfully shared'))
    .catch((error) => console.error('Error sharing', error));
  } else {
    alert('Sharing is not supported on this browser.');
  }
}











}
