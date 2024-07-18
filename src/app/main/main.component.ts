import { Component, OnInit } from '@angular/core';
import { OperationIndicationService } from '../operation-indication.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass']
})
export class MainComponent implements OnInit {
  loading = false;
  constructor(private operationIndicator: OperationIndicationService) { }

  ngOnInit(): void {
    this.operationIndicator.requestInFlight$.subscribe((isInFlight: boolean) => {
      this.loading = isInFlight;
    });
  }

}
