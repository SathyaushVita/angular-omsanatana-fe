import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeService } from '../services/home.service';
import { ReligiousService } from '../services/religious.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DomSanitizer,SafeHtml } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule} from "ngx-spinner";
// import { DomSanitizer ,SafeHtml } from '@angular/platform-browser';


@Component({
  selector: 'app-sanatana2',
  standalone: true,
  imports: [CommonModule,NgxSpinnerModule],
  templateUrl: './sanatana2.component.html',
  styleUrl: './sanatana2.component.css'
})
export class Sanatana2Component {


  

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
        this.fetchsubcategeoriesbyid(this.selectedCategoryId);
        this.fetchAllCategoryData(this.selectedCategoryId); 
        // this.fetchspecificSubcategories(this.selectedCategoryId); 


      }
    });
  }

  fetchsubcategeoriesbyid(categoryId: string): void {
    this.religiousservice.subcategeoriesbyid(categoryId).subscribe(
      (category) => {
        this.category = category;
        this.fetchAllCategoryData(categoryId); 
        this.fetchspecificSubcategories(categoryId);

      },
      (error) => console.error('Error fetching category details:', error)
    );
  }


  
  fetchspecificSubcategories(categoryId: string): void {
    this.religiousservice.specificminisubcategeories(categoryId).subscribe(
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


  selectedSubcategoryId: string | null = null;

  toggleCategorySelection(categoryId: string): void {
    if (this.selectedCategoryId === categoryId) {
      this.selectedCategoryId = null;  // Unselect category if it's already selected
      this.selectedSubcategoryId = null; // Deselect any selected subcategory
    } else {
      this.selectedCategoryId = categoryId;  // Select new category
      this.fetchAllCategoryData(categoryId);  // Fetch data for the selected category
      this.selectedSubcategoryId = null;  // Deselect any subcategory
    }
  }
  

  onclick(categoryId: number): void {
    this.router.navigate(['sanatanaspecificcategeory', categoryId]); 
  }




  preventCopy(event: ClipboardEvent): void {
    event.preventDefault(); // Prevent the default copy behavior
    console.log("Copy action is disabled");
  }
  
  

//   keywords: any = {

//     'YajurVeda-Upanishad': [//MINI SUB-CATEGORIES
//       //SHRUTI
//       'YajurVeda-Upanishad','YajurVeda-Aranyak','YajurVeda-Brahmana','YajurVeda-Samhita',
//       'AtharvaVeda-Upanishad','AtharvaVeda-Aranyak','AtharvaVeda-Brahmana','AtharvaVeda-Samhita',
//       'SamaVeda-Upanishad','SamaVeda-Aranyak','SamaVeda-Brahmana','SamaVeda-Samhita',
//       'RigVeda-Upanishad','RigVeda-Aranyak','RigVeda-Brahamana','RigVeda-Samhita',
//       //SMIRITI
//       "Purva Mimamsa","Sankhya Darshan","Nyaya Darshan","Viseshikha","Yoga Darshan","Uttara Mimamsa",
//       "Bhagvat Gita","Mahabharatha","Ramayana",
//       "Nirukta(Glossary)","Kalpa(Religious Rights)","Shikha(Phonetics)","Vyakarana(Grammar)","Chhanda (Metre)","Jyotisha(Astrology)",
//       "Gandharva Veda(Art and Music)","Arthveda Veda(Economics and politics)","Dhanurva Veda(WarFare)","Ayurveda(Health Science)",
//       "Kalki Purana","Samba Purana","Aadhi Purana","Kalika Purana","Aathma Purana","Devibhagavata Purana","Vishnudharmmoththara Purana","Narasimha Purana","Lakhunaradheeya Purana","Brahma Purana","Prushoththma Purana","Surya Purana","Bruhat Vishnu Purana","Bruhat Naradheeya Purana","Harivamsa Purana","Mulgala Purana","Vishnudharma Purana","Kriyaayoga Purana",
//       "Brahma Vaivarta Purana","Naradiya Purana","Varaha Purana","Vayu Purana","Bhavishya Purana","Markandeya Purana","Linga Purana","Shiva Purana","Kurma Purana","Maha Bhagavatha Purana","Skanda Purana","Padma Purana","Garuda Purana","Vamana Purana","Matsya Purana","Vishnu Purana","Agni Purana","Brahmaanda Purana",
//       //RELIGION
//       "Ugadi(Baisakhi)","Sri Rama Navami","Hanuman Jayanti","Janmastami","Guru Purnima","Ganesh Chaturti","Navaratri","Diwali","Makara Sankranthi","Maha Shivarathri","Holi","Raksha Bandhan","Ekadashi","Dhnateras","Chhath Puja","Basant Panchami","Karva Chauth","Onam",
//       "Ganesh Pooja","Lakshmi Pooja","Durga Pooja","Shiva Pooja(Mahashivaratri)","Vishnu Pooja","Saraswati Pooja(Vasant Panchami )","Satyanarayana Pooja","Hanuman Pooja(Hanuman Jayanti)","Navagraha Pooja","Kali Pooja","Chandi Homa/Pooja","Vastu Pooja","Pitru Pooja (Shraddha)","Gayatri Pooja","Karthika Deepam Pooja",
//       'Adi Shankaracharya (8th Century CE)','Rishi Vyasa','Patanjali','Ramanujacharya (1017–1137 CE)','Sant Kabir (1440–1518 CE)','Madhvacharya (1238–1317 CE)','Sant Tulsidas (1532–1623 CE)','Sant Mirabai (1498–1547 CE)','Sant Eknath (1533–1599 CE)','Swami Vivekananda (1863–1902 CE)','Ramakrishna Paramahamsa (1836–1886 CE)','Sri Aurobindo (1872–1950 CE)','Sri Ramana Maharshi','DATTATREYA','Dayananda Saraswati',
//       "Tithi","Vaasara","Nakshatra","the yoga","Karan",
//       "Samkhya (Kapila)","Yoga (Patanjali)","Nyaya (Gautama Muni)","Vaisheshika (Kanada)","Purva Mimamsa (Jaimini)","Vedanta",
//       'Garbhadan(Conception)','Pumsavana(Engendering a male issue)','Simantonayana (Hair-parting)','Jatakarma (Birth rituals)','Namkaran (Name-giving)','Nishkrama (First outing)','Annaprashan (First feeding)','Chudakarma (Chaul) (Shaving of head)','Karnavedh (Piercing the earlobes)','Vidyarambh (Learning the alphabet)','Upanayan (Yagnopavit)','Vedarambh (Beginning Vedic study)','Keshant (Godaan) (Shaving the beard)','Samavartan (End of Studentship)','Vivaha','Antyesthi (Death rites)',
//       "Ruins","Ayyappa Swamy","Asta Vinayaka","Brahma","Bala Rama","Chota Chardham","Chardham","Chandi Mata","Durga Mata","Danteswari Mata","Gramadevata","Gayatri Mata","Ganapati","Hanuman","Iskon","Janaki","Jyothi Lingas","Jagannath","Kala Birava","Kali Mata","Muththmari Amman","Maha Lakshmi","Murugan","Maha Sakthi peetas","Maha Vishnu","Narasimha","Nava Grahalu","Other Category","Pancha Bhutha","Pancha Kedar","Pancha Preyar","Shani","Sri Krishna","Shitla Mata","Swamy Narayan","Sathya Narayana Swamy","Sakthi Peetas","Sri Rama","Subramanya Swamy","Shiva","Saraswati","Veera Badhra","Venkateshwara Swamy","Antediluvian","Matam",
//       "Dance","Music","Singing","Painting","Sculpture","Sewing","Embroidery","Dressing","Jewelry & Gems","Cooking - Eating - Drinking","Organic Food","Old Hindu Traditional - Festival Games","Games - Children Games","Ancient Martial ArtS","Stories - Pancha Tantra Stories"
//      ],
// // Buddhism


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
//   this.router.navigate(['/sanatanaspecificcategeory', keyword]);
// }


highlightText(text: string): string {
  if (!text || !this.subcategories) {
    return text;
  }

  this.subcategories.forEach(subcategory => {
    const regex = new RegExp(`\\b${this.escapeRegExp(subcategory.name)}\\b`, 'gi');
    text = text.replace(regex, `<mark class="highlight-keyword">${subcategory.name}</mark>`); 
  });

  return text;
}

private escapeRegExp(string: string): string {
  return string.replace(/[.*+?^=!:${}()|\[\]\/\\]/g, '\\$&');
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

// private escapeRegExp(string: string): string {
//   return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
// }





// sharegetbysanatana(temple: any) {
//   if (!temple || !temple._id) {
//     console.error('Invalid temple data provided.');
//     return;
//   }

//   const shareUrl = `${window.location.origin}/sanatanaspecificcategeory/${temple._id}`;
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

//   const shareUrl = `${window.location.origin}/sanatanaspecificcategeory/${temple._id}`;
//   const shareText = `${temple.name}\n\n${temple.desc || 'Check out this temple!'}\n\n${shareUrl}`;

//   // Check if `navigator.share` is supported
//   if (navigator.share) {
//     navigator.share({
//       title: temple.name,
//       text: shareText ,
//     }).then(() => {
//       console.log('Sharing successful');
//     }).catch((error) => {
//       console.error('Error sharing:', error);
//     });
//   } else {
//     // Fallback for unsupported browsers
//     this.shareViaClipboardOrFallback(shareText);
//   }
// }

// shareViaClipboardOrFallback(shareText: string) {
//   if (navigator.clipboard) {
//     // Copy the share text to the clipboard
//     navigator.clipboard.writeText(shareText).then(() => {
//       alert('Share details copied to clipboard! You can now paste it to share.');
//       console.log('Share details copied to clipboard:', shareText);
//     }).catch((err) => {
//       console.error('Error copying to clipboard:', err);
//       alert(`Share manually:\n\n${shareText}`);
//     });
//   } else {
//     // Fallback to manual sharing
//     alert(`Share manually:\n\n${shareText}`);
//   }
// }







sharegetbysanatana(temple: any) {
  if (!temple || !temple._id) {
    console.error('Invalid temple data provided.');
    return;
  }

  // Create the URL (plain text)
  const shareUrl = `${window.location.origin}/sanatanaspecificcategeory/${temple._id}`;

  // Prepare the text (name, description, and URL)
  const shareText = `${temple.name}\n\n${temple.desc || 'Check out this temple!'}\n\n${shareUrl}`;

  // Check if `navigator.share` is supported
  if (navigator.share) {
    navigator.share({
      title: temple.name,   // The title is optional, here it can be the temple name
      text: shareText,      // Share the name, description, and the URL as plain text
    }).then(() => {
      console.log('Sharing successful');
    }).catch((error) => {
      console.error('Error sharing:', error);
    });
  } else {
    // Fallback for unsupported browsers
    this.shareViaClipboardOrFallback(shareText);
  }
}

shareViaClipboardOrFallback(shareText: string) {
  if (navigator.clipboard) {
    // Copy the share text (name, description, and URL) to the clipboard
    navigator.clipboard.writeText(shareText).then(() => {
      alert('Share details copied to clipboard! You can now paste it to share.');
      console.log('Share details copied to clipboard:', shareText);
    }).catch((err) => {
      console.error('Error copying to clipboard:', err);
      alert(`Share manually:\n\n${shareText}`);
    });
  } else {
    // Fallback to manual sharing if clipboard is not available
    alert(`Share manually:\n\n${shareText}`);
  }
}











}
