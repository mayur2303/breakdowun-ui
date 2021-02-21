import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {BreakdownService} from '../service/breakdown.service';

@Component({
  selector: 'app-breakdown-slip',
  templateUrl: './breakdown-slip.component.html',
  styleUrls: ['./breakdown-slip.component.css']
})
export class BreakdownSlipComponent implements OnInit {

  breakDownForm = this.fb.group({
    lineName: [null, Validators.required],
    machineName: [null, Validators.required],
    shift: [null, Validators.required],
    operatorName: [null, Validators.required],
    maintenanceName: [null, Validators.required],
    startTime: [null, Validators.required],
    receivedTime: [null, Validators.required],
    endTime: [null, Validators.required],
    dateCreated: [null, Validators.required],
    problemDescription: [null, Validators.required],
    note: [null, Validators.required],
    microCategory: [null, Validators.required],
    usedPart: [null, Validators.required],
    requiredPart: [null, Validators.required]
  });
  constructor(private fb: FormBuilder, private breakDownservice: BreakdownService) { }


  ngOnInit(): void {
  }



  onSubmit(): void{
    this.breakDownservice.saveBDForm(this.breakDownForm.value).subscribe(bdDto => {
      console.log('bdDto:' + JSON.stringify(bdDto));
    }, error => {
      console.log('Error While saving user!');
    });
  }

}
