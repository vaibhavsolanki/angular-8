import { BrowserModule} from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, PreloadAllModules } from '@angular/router';

import { AppComponent } from './app.component';



import { LoginComponent } from './Login/LoginComponent';
import { ReactiveFormsModule } from '@angular/forms';
import { JwtInterceptor } from './services/jwt.interceptor';
import { ErrorInterceptor } from './services/error.interceptor';
import { AuthenticationService } from './services/authentication.service';
import { AuthGuard } from './services/auth.guard';



import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { LoaderInterceptorService } from './services/loaderintercepter';
import { LoaderComponent } from './Loader/loaderComponent';

import { HomeComponent } from './home/home.component';

import { ComponentService } from './services/ComponentService';

import { OnlynumberDirective } from './Directive/onlynumber';

import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import {
    
    MatFormFieldModule, 
    MatInputModule,
    MatCardModule,
  MatToolbarModule, MatSidenavModule, MatIconModule, MatButtonModule
  
} from '@angular/material';


@NgModule({
    declarations: [HomeComponent,
    AppComponent, LoaderComponent, 
      
    LoginComponent,
    OnlynumberDirective
      
    ],
    imports: [FormsModule, ReactiveFormsModule, //MatIconModule, 
        BrowserModule,
        HttpClientModule, 
      MatButtonModule,
        MatInputModule, 
        BrowserAnimationsModule, MatToolbarModule, MatSidenavModule, 
      MatFormFieldModule, MatCardModule,
    
   
        RouterModule.forRoot([
         
          { path: '', component: HomeComponent, pathMatch: 'full', canActivate: [AuthGuard]},

          { path: 'login', component: LoginComponent },
         

       { path: 'stationary', loadChildren: () => import('./Department/stationary/stationarymodule').then(m => m.StationaryModule), canActivate: [AuthGuard] },
      { path: 'IT', loadChildren: () => import('./Department/it/ithardwaremodule').then(m => m.IthardwareModule), canActivate: [AuthGuard] },

         
            { path: '**', redirectTo: '' }
        ], { preloadingStrategy: PreloadAllModules })
    ],
  exports: [RouterModule, NgxMaterialTimepickerModule],
  providers: [ AuthenticationService, AuthGuard, ComponentService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    {
        provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptorService,
        multi: true
    }],
    bootstrap: [AppComponent]
})
export class AppModule { }
