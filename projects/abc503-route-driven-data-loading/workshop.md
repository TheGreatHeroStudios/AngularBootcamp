# Workshop for this step

Add route-driven data loading to your project. You already have a list
of videos on the screen -- make it so that clicking on one will load
viewer statistics about that one in the view breakdown component.

You can request a single item from the demo API server, as long as the
items contain an "id" property. For example, you could retrieve
information about a video where the "id" property is "xyz123" like so:

  http://localhost:8085/videos/xyz123

  https://api.angularbootcamp.com/videos/xyz123

(Adjust as appropriate if your API URL is different.)

Displaying the stats can be as simple or complex as you desire. The
purpose of this workshop is to exercise the fetching of route-based data.
