import { Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

import { LayoutComponent } from './components/layout/layout.component'; 
import { HomeComponent } from './components/home/home.component';

import { DealListComponent } from './components/product-list/product-list.component';
import { DealDetailsComponent } from './components/product-details/product-details.component';
import { DealFormComponent } from './components/product-form/product-form.component';

import { ChatListComponent } from './components/chat-list/chat-list.component';
import { ChatDetailsComponent } from './components/chat-details/chat-details.component';
import { ChatFormComponent } from './components/chat-form/chat-form.component';

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
//     { path: 'shop', component: DealListComponent },
//     { path: 'product/:id', component: DealDetailsComponent },
//     //{ path: 'cart', component: CartComponent },
//     { path: '**', redirectTo: 'home', pathMatch: 'prefix' } // Redirect unknown paths to Home
//   ];

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [

      { path: 'home', component: HomeComponent },

      { path: 'deals', component: DealListComponent },
      { path: 'deals/id/:id', component: DealDetailsComponent },
      { path: 'deals/add', component: DealFormComponent, canActivate: [AdminGuard] },
      { path: 'deals/edit/:id', component: DealFormComponent }, // Edit existing product

      { path: 'chats', component: ChatListComponent },
      { path: 'chats/id/:id', component: ChatDetailsComponent },
      { path: 'chats/add', component: ChatFormComponent, canActivate: [AdminGuard] },
      { path: 'chats/edit/:id', component: ChatFormComponent }, // Edit existing chat
      
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