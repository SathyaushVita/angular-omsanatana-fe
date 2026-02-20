import { Component,Inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup,Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { otpValidator } from '../otpverify';
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';
import { NotificationHelper } from '../commons/notification';
import { NgxSpinnerModule,NgxSpinnerService } from "ngx-spinner";






@Component({
  selector: 'app-verify',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,NgxSpinnerModule],
  templateUrl: './verify.component.html',
  styleUrl: './verify.component.css'
})
export class VerifyComponent {
  verifyForm!: FormGroup;
  username:string;
  isDisabled = false;
  countdown: number=0;

  constructor(private userService:UserService,
     private fb:FormBuilder,
     public dialogRef: MatDialogRef<VerifyComponent>,
     @Inject(MAT_DIALOG_DATA) public data: any,
     private authenticationService: AuthenticationService,
     private userservice:UserService,
     private spinner: NgxSpinnerService,

     private notificationHelper: NotificationHelper,
     
    ){
      this.username = data.username;
  }

  ngOnInit():void{
    this.verifyForm = this.fb.group({
      verification_otp: ['', [Validators.required, Validators.pattern('^[0-9]{4}$')]]
    });
  }





  onSubmit(): void {
    if (this.verifyForm.valid) {
      this.spinner.show();
      const verificationData = {
        username: this.username,
        verification_otp: this.verifyForm.value.verification_otp
      };
      this.userService.verifyotp(verificationData).subscribe(
        response => {
          console.log('OTP verified successfully', response);
          this.spinner.hide();

          this.dialogRef.close(true);
          this.notificationHelper.showSuccessNotification('Login Success', '');

          let loginRresponsees = JSON.parse(JSON.stringify(response));
          loginRresponsees?.access
          ? localStorage.setItem('token', loginRresponsees.access)
          : null;
          loginRresponsees?.refresh
          ? localStorage.setItem('refresh', loginRresponsees.refresh)
          : null;
          loginRresponsees?.user_id
          ? localStorage.setItem('user', loginRresponsees.user_id)
          : null;
          loginRresponsees?.username
          ? localStorage.setItem('username', loginRresponsees.username)
          : null;
          loginRresponsees?.is_member
          ? localStorage.setItem('is_member', loginRresponsees.is_member)
          : null;
          loginRresponsees?.profile_pic
          ? localStorage.setItem('profile_pic', loginRresponsees.profile_pic)
          : null;

          console.log("swdefg",loginRresponsees)
          if (loginRresponsees.is_member === true) {
            console.log("swdefg")
            this.userService.isMemberIn = true;
          }
          else{
            this.userService.isMemberIn = false;
          }
          // this.userService.isMemberIn = true;
          
        
 
        this.authenticationService.isLoggedIn = true;
        window.location.reload();
        this.dialogRef.close()
        this.spinner.hide()
        // this.router.navigate(['/home']);
        },
        error => {
          console.error('Error verifying OTP', error);
          this.spinner.hide();

          this.notificationHelper.showErrorNotification('Invalid Otp');

          this.verifyForm.markAllAsTouched();
         
        }
      );
    } else {
      this.markAllAsTouched();
    }
  }


  private markAllAsTouched() {
    Object.keys(this.verifyForm.controls).forEach(field => {
      const control = this.verifyForm.get(field);
      control?.markAsTouched({ onlySelf: true });
    });
  }



  resendOtp(): void {
    this.isDisabled = true;
    this.countdown = 30;
  
    const interval = setInterval(() => {
      this.countdown--;
  
      if (this.countdown === 0) {
        clearInterval(interval);
        this.isDisabled = false;
      }
    }, 1000);
  
    const userData = {
      username: this.username,  
    };
  
    console.log(userData, "Resend OTP Request Data");
  
    this.userService.signup(userData).subscribe(
      response => {
        console.log('Resend OTP successful', response);
      },
      error => {
        console.error('Resend OTP failed', error);
      }
    );
  }
  






}

