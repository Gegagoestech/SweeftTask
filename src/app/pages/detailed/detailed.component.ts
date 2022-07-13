import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Event, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-detailed',
  templateUrl: './detailed.component.html',
  styleUrls: ['./detailed.component.scss'],
})
export class DetailedComponent implements OnInit, OnDestroy {
  private userSubscription: Subscription | any;
  private userFriendsSubscription: Subscription | any;
  private pageNumCounter: number = 1;
  private userId: string = '1';
  public userFriendsData: any[] = [];
  public userData: any = {};
  public spinner: boolean = false;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.userId = this.activatedRoute.snapshot.paramMap.get('userId')!;

    this.getDatas();
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.userId = this.activatedRoute.snapshot.paramMap.get('userId')!;
        this.userFriendsData = [];
        this.getDatas();
      }
    });
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight) {
      this.pageNumCounter++;
      this.getUserFriends(this.pageNumCounter);
    }
  }

  private getDatas(): void {
    this.userSubscription = this.apiService
      .getUser(this.userId)
      .subscribe((response: any) => {
        this.userData = response;
      });

    this.getUserFriends(this.pageNumCounter);
  }

  private getUserFriends(pageNum: string | number = 1) {
    this.spinner = true;

    this.userFriendsSubscription = this.apiService
      .getUserFriends(this.userId, pageNum)
      .subscribe((response: any) => {
        this.spinner = false;

        this.userFriendsData = [...this.userFriendsData, ...response.list];
      });
  }

  ngOnDestroy(): void {
    if (this.userSubscription) this.userSubscription.unsubscribe();
    if (this.userFriendsSubscription)
      this.userFriendsSubscription.unsubscribe();
  }
}
