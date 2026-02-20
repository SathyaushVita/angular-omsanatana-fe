import { Routes } from '@angular/router';
// import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ReligionComponent } from './religion/religion.component';
import { ProfileComponent } from './profile/profile.component';
import { TrainingComponent } from './training/training.component';
import { GetbyTrainingComponent } from './getby-training/getby-training.component';
import { AddTrainingComponent } from './add-training/add-training.component';
import { LoggedinguardGuard } from './guards/login.guard';
import { SignupComponent } from './signup/signup.component';
import { VerifyComponent } from './verify/verify.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { Training1Component } from './training1/training1.component';
import { Training2Component } from './training2/training2.component';
import { SanatanaComponent } from './sanatana/sanatana.component';
import { Sanatana1Component } from './sanatana1/sanatana1.component';
import { Sanatana2Component } from './sanatana2/sanatana2.component';
import { LearnFromSanatanaDharamComponent } from './learn-from-sanatana-dharam/learn-from-sanatana-dharam.component';

export const routes: Routes = [
    {path:'home',component:HomeComponent},
    {path:'',pathMatch:'full',redirectTo:'home'},
    {path:'religion/:id',component:ReligionComponent,canActivate: [LoggedinguardGuard]},
    {path:'profile',component:ProfileComponent,canActivate: [LoggedinguardGuard],},
    {path:'Training',component:TrainingComponent,canActivate: [LoggedinguardGuard],},
    {path:'getbytraining/:id',component:GetbyTrainingComponent},
    {path:'add-training',component:AddTrainingComponent,canActivate: [LoggedinguardGuard], },
    {path:'signup',component:SignupComponent},
    {path:'verify',component:VerifyComponent},
    {path:'About-us',component:AboutUsComponent},
    {path:'training1/:id',component:Training1Component,canActivate: [LoggedinguardGuard]},
    {path:'training2/:id',component:Training2Component},
    {path:'Sanatana/:id',component:SanatanaComponent,canActivate: [LoggedinguardGuard]},
    {path:'saanatanasubcategeories/:id',component:Sanatana1Component,canActivate: [LoggedinguardGuard]},
    {path:'sanatanaspecificcategeory/:id',component:Sanatana2Component},
    {path:'learn from sanatana_Dharam',component:LearnFromSanatanaDharamComponent}




];
