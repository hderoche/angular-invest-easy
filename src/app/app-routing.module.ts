import { StatsComponent } from './stats/stats.component';
import { CartComponent } from './cart/cart.component';
import { ShareDetailsComponent } from './share-details/share-details.component';
import { LandingComponent } from './landing/landing.component';
import { WalletComponent } from './wallet/wallet.component';
import { SharesComponent } from './shares/shares.component';
import { RegisterComponent } from './register/register.component';
import { SigninComponent } from './signin/signin.component';
import { GodComponent } from './god/god.component';
import { ProfileComponent } from './profile/profile.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'profile', component: ProfileComponent },
  { path: 'godmode', component: GodComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'shares', component: SharesComponent },
  { path: 'wallet', component: WalletComponent },
  { path: 'cart', component: CartComponent },
  { path: 'stats', component: StatsComponent },
  { path: '', component: LandingComponent },
  { path: 'shares/:ticker', component: ShareDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
