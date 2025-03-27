# YouTube Full Titles

This Tampermonkey/Greasemonkey user script ensures that long YouTube video titles (4+ lines) are displayed in full without overlapping other elements, even when YouTube dynamically updates its layout. It uses both CSS overrides and a MutationObserver to remove any inline styles that YouTube may apply to truncate titles.

## Features
	•	Multi-Line Titles: Removes -webkit-line-clamp, text-overflow, and other truncation properties so you can see the entire video title.
	•	No Overlaps: Adjusts container heights and margins to prevent the title from colliding with channel info or view count.
	•	Works Dynamically: Uses a MutationObserver to catch YouTube’s AJAX navigation and infinite scrolling, re-applying fixes whenever new videos are loaded.

## Installation
	1.	Install Tampermonkey or Greasemonkey
	•	Tampermonkey for Chrome/Edge/Firefox
	•	Greasemonkey for Firefox
	2.	Create a New Script
	•	Open the Tampermonkey or Greasemonkey dashboard.
	•	Click “Create a new script…”
	3.	Copy the Script
	•	Paste the contents of the YouTube Full Titles script into the editor.
	•	Save the script.
	4.	Go to YouTube
	•	Refresh or open YouTube.
	•	You should now see long titles displayed without truncation or overlap.

## Usage & Configuration
	•	Line Height
In the script, look for line-height: 1.4 !important;. Increase this to 1.5 or 1.6 if the text still feels cramped or overlaps.
	•	Margin Below Title
Look for margin-bottom: 1em !important;. Increase to 1.2em, 1.5em, etc., if the channel name is still too close to the last line of the title.
	•	Margin Above Channel Info
Look for margin-top: 0.6em !important; in the channel info section. Increasing this can help push the channel name down further.
	•	Selectors
YouTube periodically changes its HTML structure and CSS class names. If the script stops working, open your browser’s Developer Tools (right-click → Inspect Element), check if YouTube has changed its selectors (e.g., #video-title), and update the script accordingly.

## Contributing
	1.	Fork this repository.
	2.	Create a new branch with your feature or fix.
	3.	Commit your changes.
	4.	Open a Pull Request to merge your changes back into the main branch.

## License

This project is licensed under the MIT License.

## Notes
	•	This script is provided as-is, without any guarantee that it will work for every YouTube layout variation.
	•	If you need additional help or want to suggest improvements, please open an issue or submit a pull request.

Enjoy fully visible YouTube titles!
