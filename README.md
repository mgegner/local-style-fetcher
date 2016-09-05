# local-style-fetcher

Automatically load and reload external style files.

## Usage:

```html
<script type="application/javascript" src="styleFetcher.js"></script>
<script type="application/javascript">
	styleFetcher.init({
		styleURL: "path/to/style.css",
		removeStylesOnStart: true,
		updateLinkTagsOnStart: true,
		reloadStyleTime: 2000
	});
</script>
```

The init parameters are all optional.

## Licence

MIT Licence 2016 Malte Gegner