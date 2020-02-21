# Workshop for this step

Move initializing the video list into Effects.

1. Add the appropriate ngrx dependency.
2. Create an effect that will be run when the app is initialized
   (remember `ROOT_EFFECTS_INIT`). This effect should use the
   VideoDataService to obtain the video list and dispatch the
   relevant action.
3. Register the effect with your application module.
4. Remove the previous data initialization code from the component
   or service where the initialization previously happened.
