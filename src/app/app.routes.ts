import { Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';
import { StudentPage } from './pages/student-page/student-page';
import { AdvisorPageComponent } from './pages/advisor-page/advisor-page';
import { CompanyPage } from './pages/company-page/company-page';
import { LoginPage } from './pages/login-page/login-page';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {path: 'home', component: HomePage},
    {path: 'student', component: StudentPage, canActivate: [authGuard]},
    {path: 'advisor', component: AdvisorPageComponent},
    {path: 'company', component: CompanyPage},
    {path: 'login', component: LoginPage},
    { path: '**', redirectTo: 'home' }
];

