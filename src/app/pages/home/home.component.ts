import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private usersSubscription: Subscription | any;
  private pageNumCounter: number = 1;

  public usersData: any[] = [];
  public spinner: boolean = false;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getUsers(this.pageNumCounter);
  }

  private getUsers(pageNum: string | number = 1): void {
    this.spinner = true;
    this.usersSubscription = this.apiService
      .getUsers(pageNum)
      .subscribe((response: any) => {
        this.spinner = false;
        this.usersData = [...this.usersData, ...response?.list];
      });
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight) {
      this.pageNumCounter++;
      this.getUsers(this.pageNumCounter);
    }
  }

  ngOnDestroy(): void {
    if (this.usersSubscription) this.usersSubscription.unsubscribe();
  }
}
