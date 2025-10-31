## Intro

New-Tab-Z is a web page designed for using as browser home page or "New tab".

It's mainly inspired by the new tab or main page design of Google Chrome, Microsoft Edge, Firefox, and Waterfox, thus focus on usability and highest efficiency for power users. No excess animation, no resource-intensive bluring and fancy material stuff, just productive.

This project is generated using [dyad](https://github.com/dyad-sh/dyad). Code written by AI.

<details>
  <summary>Why bother?</summary>
  <p>The direct reason is my Google (and Youtube) icon on my Waterfox New tab is broken, a white background is shown even with dark theme.</p>
  <p>My first thought was google changed their favicon again, but upon further investigation, it seems like my version of Waterfox cannot deal with transparent png and ico properly. I set up an http server for quick testing, it downloaded the image and stored as png format in thumbnail cache folder, but lost alpha channel for some reason.</p>
  <p>Plus, re-arranging the icons is always a pain if a new device is connected to the synced account, since new device don't retreive all data and create a mess, but then this mess is uploaded to other "good" devices and mess up those as well.</p>
  <p>I was going to find an alternative online page for my purpose, but seems like they are either not open-source (which just means it's gonna go down or ask for subscription at some point), or focus on beauty and fancy design instead of efficiency, thus not in my favor.</p>
</details> 

## Features

1. Logo area: Just like how firefox shows the logo, but you can set it to any file or URL.
2. Two rows of shortcuts: It's stricted to 2 rows for now, but I might update it to be customizable in the future. You can change the number of links in a row though.
	- Each shortcut has 4 props: Name, URL, Icon URL, and position index. 
	- The index number is basically a priority value, which determines where this shortcut will be. Smaller index means "in front" of others. Index starts from 1 (may be changed later), and shorcuts with same index is allowed.
3. Dark mode: Follow system by default, or set it to bright or dark theme as you want.
4. Shortcut style: Change the background color & transparency, and rounding value for icons. Also affects settings button.
5. Multilingual and easy i18n: Supports en-US and zh-CN for now, but it's easy to add more translation.
6. Wallpaper: None by default, but supports Bing daily wallpaper, load from URL, or upload an image.
7. Data management: Export or import all data. Useful when changing browser or clearing storage.

## How to use

Download from releases, then deploy it as static website. Google "how to deploy static webpage" if you don't know how.

Try or use it online: [Vercel]()

## To-do

- [] Option to open shortcuts in-page.
- [] Able to change how many rows for shortcuts
- [] Auto-hide the menu button of shorcuts when mouse is not hovered

## Others

In order to use this effectively in Firefox or Waterfox, it is recommended to install an extension that could change your new tab to other pages like [new-tab-override](https://addons.mozilla.org/zh-CN/firefox/addon/new-tab-override/).

This webpage use [bing-wallpaper](https://github.com/TimothyYe/bing-wallpaper) for Bing daily wallpaper feature.