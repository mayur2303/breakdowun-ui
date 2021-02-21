import {Component, OnChanges, OnInit} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {filter, map, shareReplay} from 'rxjs/operators';
import {AuthService} from '../service/auth.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  loginUserName: string;
  username: string;
  password: string;
  isLoggedInUser: boolean;
  componentName: string;
  constructor(
    private breakpointObserver: BreakpointObserver,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService) {
  }

  ngOnInit(): void {
    this.isLoggedInUser = this.authService.isUserLoggedIn();
    const loginUser = this.authService.getLoggedInUser();
    this.loginUserName = loginUser.firstName;
    this.updateCompName();

  }
  updateCompName(): void {
    this.componentName = this.authService.getComponentName();
  }

  logOut(): void {
    this.authService.logout();
    this.isLoggedInUser = this.authService.isUserLoggedIn();
    this.componentName = '';
    this.router.navigate(['']);
  }

  onSubmit(loginForm): void {
    this.authService.login(loginForm.value).subscribe((data) => {
      this.authService.saveUser(data);
      this.isLoggedInUser = this.authService.isUserLoggedIn();
      const loginUser = this.authService.getLoggedInUser();
      this.loginUserName = loginUser.firstName;
      this.componentName = 'Dashboard';
      this.router.navigate(['/dashboard']);
    }, (err) => {
      console.log(err);
    });
  }


}
