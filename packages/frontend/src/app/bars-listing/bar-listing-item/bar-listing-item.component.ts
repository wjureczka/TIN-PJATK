import {Component, Input, OnInit} from '@angular/core';
import {Bar} from "../../shared/bar.service";

@Component({
  selector: 'app-bar',
  templateUrl: './bar-list-item.component.html',
  styleUrls: ['./bar-list-item.component.scss']
})
export class BarListingItemComponent implements OnInit {

  @Input()
  public bar: Bar;

  constructor() { }

  ngOnInit(): void {
  }

}
