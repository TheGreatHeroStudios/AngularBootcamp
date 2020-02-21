import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, combineLatest } from 'rxjs';
import {
  shareReplay,
  withLatestFrom,
  map,
  tap
} from 'rxjs/operators';
import * as moment from 'moment';

import { Video } from './dashboard.types';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  filterForm: FormGroup;
  currentVideo: Observable<Video | undefined>;
  videoList: Observable<Video[]>;

  private selectedVideoId: Observable<string | undefined>;

  constructor(
    private http: HttpClient,
    private router: Router,
    formBuilder: FormBuilder,
    activeRoute: ActivatedRoute
  ) {
    this.selectedVideoId = activeRoute.queryParamMap.pipe(
      // query params are optional, so make sure we explicitly handle
      // that fact
      map(paramMap => paramMap.get('videoId') || undefined)
    );

    this.videoList = this.http
      .get<Video[]>('/assets/videos.json')
      .pipe(
        // Consider the selected video once the list arrives
        // If we don't have one yet, we need to set the first video
        // as the selected video.
        // withLatestFrom will only trigger as the list changes
        withLatestFrom(this.selectedVideoId, (list, id) => ({
          list,
          id
        })),
        // use a tap to make it explicit that we are triggering
        // a side effect
        tap(({ list, id }) => {
          if (!id) {
            // no selected video id, so initialize it with the first
            // video in the list
            const navigationExtras = {
              queryParams: { videoId: list[0].id }
            };
            // "[]" means don't actually navigate, we are just looking
            // to update the query parameters
            this.router.navigate([], navigationExtras);
          }
        }),
        // We are done with tasks involving the selected id
        // so pair back to just the list
        map(({ list }) => list),
        // If any future subscribers arrive, make sure
        // that we are giving them the previous results
        // rather than repeating the process described above
        shareReplay(1)
      );

    // Create the form in the service that way any concerned party
    // can see and react to how the user is changing the filter values
    this.filterForm = formBuilder.group({
      region: ['All'],
      dateTo: [
        moment()
          .startOf('day')
          .format('YYYY-MM-DD')
      ],
      dateFrom: [moment('1995-01-01').format('YYYY-MM-DD')],
      minor: [true],
      adults: [true],
      middleAged: [true],
      retired: [true]
    });

    // If the video list or selected video id change
    // lookup the video in the list and return it
    this.currentVideo = combineLatest(
      this.selectedVideoId,
      this.videoList
    ).pipe(map(([id, list]) => list.find(video => video.id === id)));
  }

  updateVideo(video: Video) {
    this.router.navigate([], { queryParams: { videoId: video.id } });
  }
}
