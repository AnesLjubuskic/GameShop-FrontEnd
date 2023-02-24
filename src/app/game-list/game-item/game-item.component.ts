import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-item',
  templateUrl: './game-item.component.html',
  styleUrls: ['./game-item.component.css']
})
export class GameItemComponent implements OnInit {
  @Input() game: any;
  @Input() index: number;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  openDetails(id: number) {
    this.router.navigateByUrl(`/details/${id}`);
  }
}
