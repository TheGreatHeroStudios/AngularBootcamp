import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { Video } from '../dashboard.types';

// This component serves as a small example of
// a view component. In this case, the dashboard
// is acting as the corresponding smart component
@Component({
  selector: 'vst-top-list',
  templateUrl: './top-list.component.html',
  styleUrls: ['./top-list.component.css']
})
export class TopListComponent {
  @Input() topList: Video[] = [];
  @Input() selectedVideo: Video | undefined;
  @Output() videoChanged = new EventEmitter<Video>();

  selectVideo(video: Video) {
    this.videoChanged.emit(video);
  }
}
