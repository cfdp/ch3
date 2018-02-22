
-- SUMMARY --

Adds a number of popup widgets to the Drupal site.

The widgets can be styled following the guidelines of the customer site.

The behaviour of the popup widget is simple: if the chat is open, the popup slides up from the bottom of the screen. From here the user can enter the chat directly. 
The popup can be closed by clicking the X. This choice will be saved in a cookie that persists throughout the current session of the user.

When a chat is occupied it changes color and the chat can no longer be entered.

Popups will stack on top of each other if multiple are active at the same time.


-- HOW IT WORKS --

When the module is activated, the script opeka_widgets.js is loaded on all front end pages.

The popups defined in opeka_widgets.js is then instantiated with calls to the popupController constructor.

Currently the chat URLs are hardcoded in the module. This might be fixed in a later version.

The chats widgets are loaded sequentially to avoid stalling the server.

A link to a CSS file with custom client styling can be sent along to the chat server.

-- REQUIREMENTS --

None.


-- INSTALLATION --

* 

-- CONFIGURATION --

* @todo: By defining the opeka chat URLs in the admin settings, and choosing the type of 
  widget (primary or secondary) and the the type of chat (pair or group) the user can add popup widget to his site.
* @todo: Customize the menu settings in Administration » Configuration and modules »
  Administration » Opeka Popup Widgets.



-- CUSTOMIZATION --



* 

-- TROUBLESHOOTING --

* 

-- CONTACT --

Current maintainers:
* Benjamin Christensen 
