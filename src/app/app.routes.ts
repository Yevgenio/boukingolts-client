import { Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

import { LayoutComponent } from './components/layout/layout.component'; 
import { HomeComponent } from './components/home/home.component';

import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductFormComponent } from './components/product-form/product-form.component';

import { EventListComponent } from './components/event-list/event-list.component';
import { EventDetailsComponent } from './components/event-details/event-details.component';
import { EventFormComponent } from './components/event-form/event-form.component';

import { MemoListComponent } from './components/memo-list/memo-list.component';
import { MemoDetailsComponent } from './components/memo-details/memo-details.component';
import { MemoFormComponent } from './components/memo-form/memo-form.component';

import { UserSignupComponent } from './components/user-signup/user-signup.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserSettingsComponent } from './components/user-settings/user-settings.component';

import { UserProfileComponent } from './components/user-profile/user-profile.component';

import { ErrorMessageComponent } from './components/error-message/error-message.component';

// export const routes: Routes = [  
//     { path: '', component: HomeComponent },
//     { path: 'home', component: HomeComponent },
//     { path: 'shop', component: ProductListComponent },
//     { path: 'product/:id', component: ProductDetailsComponent },
//     //{ path: 'cart', component: CartComponent },
//     { path: '**', redirectTo: 'home', pathMatch: 'prefix' } // Redirect unknown paths to Home
//   ];

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [

      { path: 'home', component: HomeComponent },

      { path: 'products', component: ProductListComponent },
      { path: 'products/id/:id', component: ProductDetailsComponent },
      { path: 'products/add', component: ProductFormComponent, canActivate: [AdminGuard] },
      { path: 'products/edit/:id', component: ProductFormComponent }, // Edit existing product

      { path: 'events', component: EventListComponent },
      { path: 'events/id/:id', component: EventDetailsComponent },
      { path: 'events/add', component: EventFormComponent, canActivate: [AdminGuard] },
      { path: 'events/edit/:id', component: EventFormComponent }, // Edit existing event
      
      { path: 'memos', component: MemoListComponent },
      { path: 'memos/id/:id', component: MemoDetailsComponent },
      { path: 'memos/add', component: MemoFormComponent, canActivate: [AdminGuard] },
      { path: 'memos/edit/:id', component: MemoFormComponent }, // Edit existing product

      { path: 'signup', component: UserSignupComponent },
      { path: 'login', component: UserLoginComponent },
      { path: 'settings', component: UserSettingsComponent, canActivate: [AuthGuard]},

      { path: 'error',component: ErrorMessageComponent },
      { path: 'error/:message', component: ErrorMessageComponent },

      { path: 'u/:username',component: UserProfileComponent },

      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '**', redirectTo: 'error' },
      //{ path: '**', redirectTo: 'home', pathMatch: 'prefix' } // Redirect unknown paths to Home
    ]
  },
];