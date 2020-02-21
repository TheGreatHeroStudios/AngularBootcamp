import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import { Video } from '../dashboard.types';

const URLPREFIX = 'https://www.youtube.com/embed/';

@Component({
  selector: 'vst-video-container',
  templateUrl: './video-container.component.html',
  styleUrls: ['./video-container.component.css']
})
export class VideoContainerComponent {
  // Using an input setter is much more concise than
  // the use of ngOnChanges
  @Input() set currentVideo(value: Video | undefined) {
    if (value) {
      // iframe src attributes are a potential
      // source of attack. Tell Angular we have vetted the URL as
      // safe to use. (You would normally check the URL before passing it
      // on )
      this.videoUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(
        URLPREFIX + '/' + value.id
      );
    }
  }

  videoUrl: SafeUrl | undefined;

  constructor(private domSanitizer: DomSanitizer) {}
}
