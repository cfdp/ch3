WHAT DOES THIS MODULE DO?
---
Integrates the CIM Mobility chat on cyberhus.dk.

To setup a new chat integration on cyberhus.dk a cim chat integration paragraph (entity) 
should be added to a content type.

After this content managers can add new chats to their liking.

All the needed chat info will be fetched via Views generated JSON / JSONP (see the views folder).

It does this in to ways

## Via the global widget

Here the status of all active chats are loaded.

jsonp URLs: /cim-chat-jsonp-all

and for testing

/cim-chat-jsonp-all-test

## Via the single page widget

Here only one chat is fetched. The integration is made with the aim that the widget can be included
on external sites.

Example embedding code:

  <div id="cim-widget-data" data-shortname="demo"></div>
  <script src="http://dev.cyberhus/sites/all/modules/custom/cim_chat/js/chat_integrator.js"></script>

The data-shortname property should match the one defined in the corresponding Cyberhus 
paragraph entity field.

jsonp URLs: /cim-chat-jsonp-single/%

and for testing

/cim-chat-jsonp-single-test/%

TEST CHAT SUPPORT
---

The following div with appropriate test URLs should be added to the DOM if testing is needed.
Just add it next to the call to the chat_integration.js script.

This is done autmatically on cyberhus sites if test mode is enabled.

  <div id="cim-chat-test-mode" data-cim-test-url="https://chattest.ecmr.biz" data-cyberhus-test-url="http://st.cyberhus.dk"></div>
  
CIMs chat server is at the time of writing not very forgiving when it comes to responding to requests
for non-existent chat ids. The test mode lets us control to which servers we want to connect.

To test the chat via CIMs testserver on chattest.ecmr.biz, go to /admin/config/services/cim_chat 
and select "Activate test mode" and enter the URL.

Doing this will make sure ressources are fetched from the test server and only the chats 
marked as "Test chat" on the paragraph item(s) will be fetched.


CREDITS
---
Graphics / Icons
* exclamation by Milinda Courey from the Noun Project

* Question by Gregor Cresnar from the Noun Project

* up by Eliricon from the Noun Project