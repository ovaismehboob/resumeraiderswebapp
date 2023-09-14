import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Job } from '../jobs/job';
import { NewJob } from './newjob';
import { ActivatedRoute } from '@angular/router';
import { AlertComponent } from '../alert/alert.component';
import { AlertService } from '../alert/alert.service';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from '../../environments/environment';
import { AppInsightsService } from 'src/app/app-insights.service';
import { AuthorizationService } from '../login/authorization.service';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'newjob',
  templateUrl: './newjob.component.html',
  providers: [AlertService, AlertComponent, NgbTooltipModule],

})
export class NewJobComponent implements OnInit {
  imageFile: any;
  bids: any;
  jobs: any={};
  JobID!: number;
  jobDetail: any;

  elapsedTime: number = -1;
  constructor(
    private authorizationService: AuthorizationService,
    private httpClient: HttpClient,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private _sanitizer: DomSanitizer,
    private appInsights: AppInsightsService
  ) { }


  ngOnInit() {
    this.route.queryParams.subscribe((params) => {


    });
  }

  public generateTag(title: String) {
    console.log("Generating Tag");
    this.jobs.Tags = "Generating Tag .......";
    this.httpClient
      .post(environment.getTagsAPI, title,{responseType: 'text'})
      .subscribe(
        (res) => {
          console.log('Response is ' + res);
          this.jobs.Tags = res;
          this.alertService.add({
            type: 'success',
            message: 'Tag Generated Successfully',
          });
        },
        (err) => {
          console.log(err);
          this.alertService.add({
            type: 'danger',
            message: 'Some error occured, please contact Administrator',
          });
          this.appInsights.instance.trackException(err);
        }
      );
  }

  
  public generateJD(tag: String) {
    console.log("Generating Description");
    this.jobs.Tags = "Generating Description ...";
    this.httpClient
      .post(environment.getJobDescriptionAPI, tag,{responseType: 'text'})
      .subscribe(
        (res) => {
          console.log('Response is ' + res);
          this.jobs.Description = res;
          this.alertService.add({
            type: 'success',
            message: 'Description Generated Successfully',
          });
        },
        (err) => {
          console.log(err);
          this.alertService.add({
            type: 'danger',
            message: 'Some error occured, please contact Administrator',
          });
          this.appInsights.instance.trackException(err);
        }
      );
  }

}
