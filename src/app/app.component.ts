import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {filter, map} from 'rxjs/operators';
import {AuthService} from './service/auth.service';
import {BreakpointObserver} from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'frontend';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService) {
  }
  ngOnInit(): void {

    const compName = '';
    this.router
      .events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        const child = this.route.firstChild;
        if (child.snapshot.data['compName']) {
          return child.snapshot.data['compName'];
        }
        return compName;
      })
    ).subscribe((compname: string) => {
      this.authService.setComponentName(compname);
    });
  }
}
