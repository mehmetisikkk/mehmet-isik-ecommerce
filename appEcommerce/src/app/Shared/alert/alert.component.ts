import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  constructor() { }

  @Input("alertmessage") message:string;

  @Output() mycustomCloseEvent=new EventEmitter<string>();



  ngOnInit(): void {

  }

  onClose()
  {

    this.mycustomCloseEvent.emit("Work my custom CloseEvent");
  }

}
