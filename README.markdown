What is this
============

This allows you to show recently answered stackoverflow questions in an octopress sidebar

Installation
============

Copy `source/asides/stackoverflow.html` to `your_octopress_install/source/asides/stackoverflow.html`

Copy `source/javascripts/stackoverflow.js` to `your_octopress_install/source/javascripts/stackoverflow.js`

(Optional) Add the contents of `_stackoverlow.scss` to your `custom/_styles.scss` and override as you see fit

Add these to `_config.yml`

    stack_overflow_count: 4 #number of answers to show
    stack_overflow_user: <your user id>
    
Add `asides/stackoverflow.html` to the list of asides to use
