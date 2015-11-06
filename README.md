# segmentio-commonjs-client

A npm-based client for SegmentIO that is expected to be used client-side via CommonJS. For server-side, look to [analytics-node](https://github.com/segmentio/analytics-node) which supports buffering. This project exists because while analytics-node can be used client-side, doing so has some downsides:

* results in big payload because need NodeJS buffer implementation for browsers
* leaks lodash to `window._` (reported [as an issue](https://github.com/segmentio/analytics-node/issues/48) so may change)


## Basic overview

To create an instance of the client pass the SegmentIO write key:

```javascript
var Analytics = require('segmentio-commonjs-client');

var client = new Analytics('my_segment_write_key');
```


## track
SegmentIO [track](https://segment.com/docs/spec/track/) event.

```javascript

client.track({
  userId: 'abc123',
  event: 'MyEvent',
  properties: {
    arbitraryKey: 'someValue'
  }
});
```


## setLoggingOnly

The client has a `setLoggingOnly()` function that can be called to disable actually interacting with the SegmentIO API -- instead the calls are logged to the console. This is useful when in non-production model.


## status

Early stage currently with only support for the [track](https://segment.com/docs/spec/track/) event. It is straight forward to implement the rest but doing so as needed (PRs welcomed).


## License

MIT
