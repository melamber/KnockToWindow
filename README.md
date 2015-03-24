# KnockToWindow
    
####_The plugin provides output to display a notification to the user in a convenient location._

Depends:
* JQuery version >= 2.1.1

***

## Overview

All blocks of notifications are placed in the main block with ID 'KnockToWindow'",
and have class 'KTWNotice'. Elements for closing notification have class 'KTWClose'.
Notifications are free to close after a specified time. When you click on the notification,
timer of closing is disabled. When the notification is opening or closing,
it possible to perform the specified functions.
Notification styles are defined in a separate file KTWStyle.css. You can also specify
different behavior notifications in plugin configuration. 

***

## Instruction

1. **Insert in a page main block(or create an element using js). Block must have ID "KnockToWindow" for use default CSS.**

 ```
 Example:
         <div id="KnockToWindow"></div>
 ```
    
2. **Connect CSS file. There are many variants. That's the easiest variant:**

 ```
 Example:
         $('head').append('<link href="KTWStyle.css" type="text/css" rel="stylesheet" />');
 ```

3. **Connect the plugin to that element and configure(default configuration):**
        
 _Example with default configuration:_
 
 ```
         $("#KnockToWindow").KnockToWindow();
 ```

 _Example of configuration:_
 ```
             $("#KnockToWindow").KnockToWindow({
                    position: 'middle-center',
                    width: '200px',
                    height: 'auto',
                    direction: 'top-to-bottom',
                    content: 'Something...'
             });
 ```
               
***

### **Options of configuration**

 _Default options:_
 ```
            position: 'bottom-right',
            width: '200px',
            height: 'auto',
            direction: 'bottom-to-top',
            duration: 10000,
            animateOpen: '', (see .KTW-Animation-Open in css)
            animateClose: '', (see .KTW-Animation-Close in css)
            content: '',
            closeElement: "<button class='KTWClose'>Close</button>",
            actionOpen: null,
            actionClose: null
 ```

 * **position** _[enum]_ - specifies the location on the page.

 ```
 Choose one from possible options:
        ['top-left', 'top-center', 'top-right', 'middle-left', 'middle-center',
        'middle-right', 'bottom-left', 'bottom-center', 'bottom-right'];
 ```

 * **width(height)** _[string]_ - width(height) of the block notice(...px, ...%, auto).
 ```
 Example:
            width: '200px',
            height: 'auto',
 ```

 * **direction** _[enum]_ - direction of the adding block notices.
 ```
 Choose one from possible options:
              ['left-to-right', 'right-to-left', 'top-to-bottom', 'bottom-to-top'];
 ```

 * **duration** _[number]_ - duration of the block notice(5000 = 5sec, 0 = infinite).
 ```
 Example:
         duration: 8000,
 ```
 
 * **animateOpen(animateClose)** _[string]_ - params of animation.
 ```
  Example:
          animateOpen:'show 1s',
  ```
  
  Format: [animation](http://www.w3schools.com/cssref/css3_pr_animation.asp).
  
  There are a set of predefined @keyframes:
   * for opening: [fade-in, show, slide-open-ltr, slide-open-rtl, slide-open-ttb, slide-open-btt];
   * for closing: [fade-out, hide, slide-close-ltr, slide-close-rtl, slide-close-ttb, slide-close-btt];
   
 * **actionOpen(actionClose)** _[function]_ - performed action, when block
 notice opening(closing).
 ```
 Example:
         funcName, function(){...};
 ```

 * **content** _[string, object|HTMLElement]_ - content of the block notice.
 ```
 Example:
         <p>Hello</p>, $('<div/>'), ...; 
 ```

 * **closeElement** _[string, object|HTMLElement]_ - HTML Element for closing the block notice.
 Element must have a class 'KTWClose'.
 ```
 Example:
         "<a href='#' class='KTWClose'>Close</a>";
 ```

### **Advanced configure**

CSS styles are defined by assigning classes to elements. 
You can change exists classes or create new classes with necessary prefix and 
assign the name of the class to the desired property.
 

         
  _Example:_
 
  ```
  css:
             .KTW-Position-Custom{
                  top: 20%;
                  right: 15%;
             } 
              
  config:
             $("#KnockToWindow").KnockToWindow({
                  position: 'custom'
             });
  ```
  
  * \#KnockToWindow (if this main block or other selector),
  * .KTWNotice (block notice),
  * .KTWClose (element of the closing block notice)

***

## Additional information 

* The plugin uses latest features of CSS3, therefore it correct work in latest versions browsers.
* All events of the plugin belong to namespace 'KTW'.
* Link on the demonstration page: [KnockToWindow](http://chtoto.besaba.com).