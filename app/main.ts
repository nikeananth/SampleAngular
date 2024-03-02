// aws-parameter-store.service.ts

import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk';

@Injectable({
  providedIn: 'root',
})
export class AwsParameterStoreService {
  private ssm: AWS.SSM;

  constructor() {
    AWS.config.update({
      region: 'your-aws-region', // Replace with your AWS region
    });

    this.ssm = new AWS.SSM();
  }

  getParameter(parameterName: string): Promise<string> {
    const params = {
      Name: parameterName,
      WithDecryption: true,
    };

    return this.ssm.getParameter(params).promise()
      .then(data => data.Parameter?.Value || '')
      .catch(err => {
        console.error('Error getting parameter:', err);
        return '';
      });
  }
}




import { Component, OnInit } from '@angular/core';
import { AwsParameterStoreService } from './aws-parameter-store.service';

@Component({
  selector: 'app-your-component',
  templateUrl: './your.component.html',
  styleUrls: ['./your.component.css'],
})
export class YourComponent implements OnInit {
  parameterValue: string;

  constructor(private awsParameterStoreService: AwsParameterStoreService) {}

  ngOnInit(): void {
    const parameterName = '/your/parameter/name'; // Replace with your parameter name

    this.awsParameterStoreService.getParameter(parameterName)
      .then(value => {
        this.parameterValue = value;
        console.log(`Parameter Value: ${value}`);
      })
      .catch(error => console.error('Error:', error));
  }
}
