import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
// import { NgxSpinnerService, NgxSpinnerModule } from 'ngx-spinner';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
// import { OrganizationsService } from '../services/organizations.service';
import { state } from '@angular/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { NzUploadModule,NzUploadFile,NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { Router } from '@angular/router';
// import { AuthService } from '../services/auth.service';
import { AuthenticationService } from '../services/authentication.service';
import { NotificationHelper } from '../commons/notification';
import { TrainingService } from '../services/training.service';
import { MemberProfileComponent } from '../member-profile/member-profile.component';
import { TrainerUpdateComponent } from '../trainer-update/trainer-update.component';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerModule,NgxSpinnerService } from "ngx-spinner";
import { httpsUrlValidator } from '../https-url.validator';


@Component({
  selector: 'app-add-training',
  standalone: true,
  imports: [
    CommonModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    NzUploadModule,
    NgxSpinnerModule
  ],
    templateUrl: './add-training.component.html',
  styleUrl: './add-training.component.css'
})
export class AddTrainingComponent {


  organizationForm!: FormGroup;
  templeCategoryOptions: any[] = [];
  templePriorityOptions: any[] = [];
  templeStyleOptions: any[] = [];
  containsLocationDetails = false;
  countries: any;
  templeCountryOptions: any[] = [];
  templeStateOptions: any[] = [];
  templeDistrictOptions: any[] = [];
  templeMandalOptions: any[] = [];
  templeVillageOptions: any[] = [];
  countryID:any[]=[];
  formGroup: any;
  bannerFileList: NzUploadFile[] = [];
  imageLocation: string = '';
  fileList: NzUploadFile[] = [];
  villagedata: any;
  villageid:any;
  selectedLocationId:any;
  ContinentOptions:any[]=[];
  countrydata: any;
  districtdata:any;
  CountryOptions: any[]=[];
  StateOptions: any[]=[];
  DistrictOptions: any[]=[];
  formDisabled = false;



  combinedCategoryOptions: any[] = [];
  subcategoryToCategoryMap: { [key: string]: string } = {};
  CategoryOptions: any[] = [];
  slectedId: any;
  isOthers= false;

  // formGroup:any;

  constructor(private fb: FormBuilder,
    private authService: AuthenticationService,
    private cdr: ChangeDetectorRef,
private trainingservice:TrainingService,
    private formBuilder: FormBuilder,
    private router:Router,
    private dialog:MatDialog,
    private notificationHelper: NotificationHelper,
    private spinner: NgxSpinnerService
  ) {
    const currentDate = this.getsFormattedMinDate();

    this.organizationForm = this.fb.group({

      object_id:['', [Validators.required]],
      name: ['', [Validators.required]],
      desc: ['',[Validators.required]],
      // image: ['', [Validators.required]],
      image: ['', [Validators.required]],
      location: ['', [Validators.required]],
      end_date: ['', [Validators.required]],
      start_date: ['', [Validators.required]],

      trainer_name: ['', Validators.required],
      // contact_details: ['', Validators.required],
      contact_details:['', [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]{10}$')]],
      video: ['',Validators.required],
      training_type: [''],
      geo_site: ['DISTRICT'],
      category: [''],
      user_id:localStorage.getItem('user'),
      continent: ['', [Validators.required]],
      status: ['PENDING'],
      country: ['', [Validators.required]],
      state: ['', [Validators.required]],
      sub_category: [''],
      // training_link: ['',Validators.required, Validators.pattern(/^https:\/\//), httpsUrlValidator()],
      training_link: ['', [Validators.required]],

      // is_member:'true'
      // start_time: ['', [Validators.required]],

      // end_time: ['', [Validators.required]],


     });

     this.formattedEndDateMin = currentDate; // Default to today
    //  this.formattedEndDateMax = currentDate; // Default to today
   }

  ngOnInit() {
    this.fetchCategories();



    this.trainingservice.getContinents().subscribe(
      (res) => {
        // console.log(res,'kishsdhsjfdskfb');
        if (res && Array.isArray(res)) {
          this.ContinentOptions = res.map((continent: any) => ({
            label: continent.name,
            value: continent._id
          }))
          .sort((a, b) => a.label.localeCompare(b.label));
        } else {
          console.error("Response is not in expected format", res);
        }
      },
      (err) => {
        console.error(err);
      }
    );




    this.organizationForm.get('continent')?.valueChanges.subscribe((continentID) => {
      console.log(continentID, "wdefrgh");
      if (continentID) {
        this.selectedLocationId = continentID;
        this.CategoryOptions=[];
        console.log(continentID, "zaxsdfg");
        this.resetFormControls();

        this.trainingservice.getCountries(continentID).subscribe(
          data => {
            this.countrydata = data;

            console.log(this.countrydata, "this.countrydata");

            if (this.countrydata && typeof this.countrydata === 'object' && this.countrydata.countries && Array.isArray(this.countrydata.countries)) {
              this.CountryOptions = this.countrydata.countries.map((country: any) => ({
                label: country.name,
                value: country._id
              })).sort((a: { label: string }, b: { label: string }) => a.label.localeCompare(b.label));
              console.log(this.CountryOptions, "2345678");
            } else {
              console.error("Response is not in expected format", this.countrydata);
            }
          },
          (err) => {
            console.error(err);
            this.resetFormControls();

          }
        );
        this.resetFormControls();
        this.CountryOptions=[];

      }
    });
    this.resetFormControls();


    this.organizationForm.get('country')?.valueChanges.subscribe((countryID) => {
      if (countryID) {
        this.selectedLocationId = countryID;
        this.StateOptions=[];
        this.trainingservice.getStates(countryID).subscribe(
          (data) => {
            this.countrydata = data;

            console.log(this.countrydata, "this.countrydata");

            if (this.countrydata && typeof this.countrydata === 'object' && this.countrydata.states && Array.isArray(this.countrydata.states)) {
              this.StateOptions = this.countrydata.states.map((state: any) => ({
                label: state.name,
                value: state._id
              })).sort((a: { label: string }, b: { label: string }) => a.label.localeCompare(b.label));
              console.log(this.StateOptions, "State Options");
            } else {
              console.error("Response is not in expected format", this.countrydata);
            }
          },
          (err) => {
            console.error(err);
          }
        );
        this.resetDistrictMandalVillage();
        this.StateOptions=[];



      }
    });


    this.organizationForm.get('state')?.valueChanges.subscribe((stateID) => {
      if (stateID) {
        this.selectedLocationId = stateID;
        
        this.DistrictOptions=[];

        this.trainingservice.getDistricts(stateID).subscribe(
          (data) => {
            this.districtdata = data;

            console.log(this.districtdata, "this.districtdata");

            if (this.districtdata && typeof this.districtdata === 'object' && this.districtdata.districts && Array.isArray(this.districtdata.districts)) {
              this.DistrictOptions = this.districtdata.districts.map((district: any) => ({
                label: district.name,
                value: district._id
              })).sort((a: { label: string }, b: { label: string }) => a.label.localeCompare(b.label));
              console.log(this.DistrictOptions, "District Options");
            } else {
              console.error("Response is not in expected format", this.districtdata);
            }
          },
          (err) => {
            console.error(err);
            this.resetMandalVillage();
          }
        );
        // this.resetMandalVillage();

      } else {
        this.DistrictOptions =[];

        this.resetMandalVillage();

      }
      
    }
  );        


    this.organizationForm.get('district')?.valueChanges.subscribe(districtID => {
      if (districtID) {
        this.selectedLocationId = districtID;
        console.log('district ID selected:', this.selectedLocationId);
      } else {
        this.resetDistricts();
        

      }
    });

  }




  resetStates() {
    this.StateOptions = [];
    this.organizationForm.get('state')?.reset();
    this.resetDistricts();
  }

  resetDistricts() {
    this.DistrictOptions = [];
    this.organizationForm.get('district')?.reset();
  }



  CountryFormControls(): void {
    this.organizationForm.get('continent')?.reset();
    this.organizationForm.get('country')?.reset();

    this.organizationForm.get('state')?.reset();
    this.organizationForm.get('district')?.reset();

  }

  resetFormControls(): void {
    this.organizationForm.get('country')?.reset();

    this.organizationForm.get('state')?.reset();
    this.organizationForm.get('district')?.reset();

  }

  resetDistrictMandalVillage(): void {
    this.organizationForm.get('state')?.reset();

    this.organizationForm.get('district')?.reset();

  }

  resetMandalVillage(): void {
    this.organizationForm.get('district')?.reset();


  }

 
  organization: any = null;
  displayName = 'Training';




  onSubmit() {
    if (!this.organizationForm.valid) {
      this.organizationForm.markAllAsTouched();
      this.notificationHelper.showErrorNotification('Please fill out all required fields.');
      return; 
    }
    this.slectedId = this.organizationForm.get('sub_category')?.value;
    let trainingData;
    if (this.slectedId === '6e470a11-65df-41cf-a9c5-af9da5a10b66') {
      const { sub_category, ...data } = this.organizationForm.value;
      trainingData = data;
    } else {
      trainingData = this.organizationForm.value;
    }
      this.spinner.show();
      const formValue = { ...trainingData }; 
      console.log('Form value before submitting:', formValue);
      this.trainingservice.addtraining(formValue).subscribe(
        (response) => {
          console.log('Training added successfully:', response);
          this.notificationHelper.showSuccessNotification('Add Training Success', '');
          this.organization = formValue;
          this.displayName = 'submission';
          this.resetForm();
        },
        (error) => {
          console.error('Error adding training:', error);
          if (error.status === 400) {
            this.notificationHelper.showErrorNotification(
              'You are not a member. Please update your profile and become a member first'
            );
            this.openMemberDialog();
          } else if (error.status === 403) {
            this.notificationHelper.showErrorNotification('Only ADMIN users can create training records.');
            this.adminTrainerDialog();
          } else {
            this.notificationHelper.showErrorNotification('Training not added.');
          }
	  this.spinner.hide();
        },
        () => {
          this.spinner.hide();
        }
      );
  }

  isSubCategoryDisabled = false;
  onCategoryChange(event: Event): void {
    const selectedCategory = (event.target as HTMLSelectElement).value;
  
    if (selectedCategory === 'others') {
      // Set sub_category to null and disable the control
      this.organizationForm.get('sub_category')?.setValue(null); // Explicitly set to null
      this.organizationForm.get('sub_category')?.clearValidators(); // Remove validators
      this.organizationForm.get('sub_category')?.disable(); // Disable the control
    } else {
      // Enable sub_category and add required validator
      this.organizationForm.get('sub_category')?.enable(); // Enable the control
      this.organizationForm.get('sub_category')?.setValidators([Validators.required]); // Add required validator
    }
  
    // Update form validity
    this.organizationForm.get('sub_category')?.updateValueAndValidity();
    this.organizationForm.updateValueAndValidity(); // Update entire form validity
  }
  
  
  
  
  
  
  
  

  openMemberDialog(): void {
    console.log('Opening member form dialog');
    const dialogRef = this.dialog.open(MemberProfileComponent, {
      data: { displayName: 'signup' },
      autoFocus: false,
      backdropClass: 'dialog-backdrop',
    });

    dialogRef.afterClosed().subscribe(() => {
    });
  }


  adminTrainerDialog(): void {
    console.log('Opening admin trainer update dialog');
    const dialogRef = this.dialog.open(TrainerUpdateComponent, {
      data: { displayName: 'ADMIN' },
      autoFocus: true,
      backdropClass: 'dialog-backdrop',
      disableClose: false
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Admin trainer dialog closed', result);

    });
  }

  getVideoUrl(): string {
    if (this.organization && this.organization.video) {
      return `data:video/mp4;base64, ${this.organization.video}`;
    }
    return '';
  }

  resetForm() {
    this.organizationForm.reset();
    this.fileList = [];
    this.bannerFileList = [];
    this.videoFileList =[];

    this.organizationForm.patchValue({
  image: '',
  video:''
    });
  }




fetchCategories(): void {
  this.trainingservice.getTrainingCategories().subscribe(
    (res) => {
      if (res && Array.isArray(res)) {
        this.mainCategory = res.map((category: any) => ({
          label: category.name,
          value: category._id,
        }));
      } else {
        console.error("Invalid response format for main categories");
      }
    },
    (err) => {
      console.error("Error fetching main categories:", err);
    }
  );

  this.organizationForm.get('category')?.valueChanges.subscribe((mainCategoryId) => {
    console.log('Selected main category ID:', mainCategoryId);
    

    this.slectedId  = mainCategoryId

    console.log('Selected slectedId ID:', this.slectedId);
    if (mainCategoryId === '6e470a11-65df-41cf-a9c5-af9da5a10b66') {
      
      this.isOthers = true;
    }else {
      this.isOthers = false;
    }

    

    if (mainCategoryId) {
      this.trainingservice.gettrainingsubCategories(mainCategoryId).subscribe(
        (res) => {
          console.log("Full Subcategories response:", res);

          if (res && Array.isArray(res)) {
            this.subcategories = res.map((subcategory: any) => ({
              label: subcategory.name,
              value: subcategory._id,
            }));
            console.log("Subcategories populated:",);
          } else {
            console.error("Invalid response format for subcategories");
            this.subcategories = [];
          }
        },
        (err) => {
          console.error("Error fetching subcategories:", err);
          this.subcategories = [];
        }
      );
    } else {
      this.subcategories = [];
    }
  });
}


mainCategory: any[] = [];
subcategories: any[] = [];


  selectedCategoryLabel: string | undefined;



handleBannerFileChange(info: NzUploadChangeParam): void {
  this.handleUpload(info, 'image');
}

// Handle video upload
handleVideoFileChange(info: NzUploadChangeParam): void {
  this.handleUpload(info, 'video');
}


handleBannerFileRemove(): void {
  if (this.bannerFileList.length === 0) {
    this.bannerFileList = [];
  }
}


handleUpload(info: NzUploadChangeParam, formControlName: string): void {
  const fileList = [...info.fileList];

  fileList.forEach((file: NzUploadFile) => {
    if (formControlName === 'image') {
      // If uploading an image, convert to base64
      this.getBase64(file.originFileObj!, (base64String: string) => {
        file['base64'] = base64String;
        this.organizationForm.patchValue({ image: base64String });
      });
    } else if (formControlName === 'video') {
      // Convert the video to base64
      this.getBase64(file.originFileObj!, (base64String: string) => {
        file['base64'] = base64String;
        this.organizationForm.patchValue({ video: base64String });  // Save base64 string for the video
      });
    }
  });

  // Update file list for the respective form control
  this.organizationForm.get(formControlName)?.setValue(fileList);

  // Set fileList variables based on the type of upload
  if (formControlName === 'image') {
    this.bannerFileList = fileList;
  } else if (formControlName === 'video') {
    this.videoFileList = fileList;
  }
  console.log(`${formControlName} submit`, this.organizationForm.value);
}

getBase64(file: File, callback: (base64String: string) => void): void {
  const reader = new FileReader();
  reader.onload = () => {
    const base64String = (reader.result as string).split(',')[1];   
    callback(base64String);
  };
  reader.readAsDataURL(file);
}

handleVideoFileRemove(): void {
  this.videoFileList = [];
  this.organizationForm.patchValue({ video: null });  // Remove video from the form
}
videoFileList: NzUploadFile[] = [];   // For video upload



  onVideoSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const base64Video = e.target.result.split(',')[1];  
        console.log(base64Video,'ddddfdfffffffffffffffffffffffffffffffffffffffff')
        this.organizationForm.patchValue({
          video: base64Video
        });
      };
      reader.readAsDataURL(file);
    }
  }

  formattedEndDateMin: any;
  formattedEndDateMax: any;

  // getsFormattedMinDate(): string {
  //   const currentDate = new Date();
  //   return currentDate.toISOString().slice(0, 16); // Returns current date and time in ISO format for `datetime-local`
  // }
  getsFormattedMinDate(): string {
    const currentDate = new Date();
    return currentDate.toISOString().slice(0, 16); 
  }

  onStartDateChange(): void {
    const startDateValue = this.organizationForm.get('start_date')?.value;

    if (startDateValue) {
      this.formattedEndDateMin = startDateValue;

      const endDateValue = this.organizationForm.get('end_date')?.value;
      if (endDateValue && new Date(endDateValue) < new Date(this.formattedEndDateMin)) {
        this.organizationForm.get('end_date')?.setValue(null);
      }
    }
  }

  
}
  