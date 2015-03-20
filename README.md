# KnockToWindow
    
####_The plugin provides output to display a notification to the user in a convenient location._

Depends:
* JQuery version >= 2.1.1

***

## Overview

All blocks of notifications are placed in the block with ID 'KnockToWindow'",
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

3. **Connect the plugin to that element (default configuration):**
        
 ```
 Example:
         $("#KnockToWindow").KnockToWindow();
 ```
 
4. **For styles of the plugin is necessary to define CSS rules
for these selectors:**
 
  * \#KnockToWindow (if this main block or other selector),
  * .KTWNotice (block notice),
  * .KTWClose (element of the closing block notice)
         
  _Mandatory rules:_
 
  ```
             #KnockToWindow {
                 position:fixed;
             }
                         
             .KTWNotice {
                 position:relative;
             }
  ```
  
5. **Configure:**

 _Example of configuration :_

 ```
             $("#KnockToWindow").KnockToWindow({
                position: 'middle-center',
                width: '200px',
                height: '100px',
                addition: 'horizontal'
             });
 ```

 _Default options:_

 ```
            position: 'bottom-right',
            width: '200px',
            height: '100px',
            addition: 'vertical',
            transition: 'fade',
            timeOpen: 1,
            timeClose: 1,
            duration: 10000,
            actionOpen: 0,
            actionClose: 0,
            content: '',
            closeElement: "<button class='KTWClose'>Close</button>"`
 ```
               
***

### **Options of configuration**

 * **position** _[enum]_ - specifies the location on the page.

 ```
 Choose one from possible options:
        ['top-left', 'top-center', 'top-right', 'middle-left', 'middle-center',
        'middle-right', 'bottom-left', 'bottom-center', 'bottom-right'];
 ```

 * **width(height)** _[string]_ - width(height) of the block notice(100px, 20%, auto ...).
 ```
 Example:
            width: '200px',
            height: 'auto',
 ```

 > If you specify a non-fixed value (not in px), then some animation will may incorrectly
 > displayed (you must configure: position, addition, transition). Without animation (or option 'fade'),
 > always displayed correctly.

 * **addition** _[enum]_ - addition of the block notice.
 ```
 Choose one from possible options:
              ['horizontal', 'vertical'];
 ```

 * **transition** _[enum]_ - style of animation.
 ```
 Choose one from possible options:
            ['fade', 'slide', 'show'];
 ```

 * **timeOpen(timeClose)** _[number]_ - time to close(hide) the block notice(5000 = 5sec).
 ```
 Example:
         timeClose: 500,
 ```

 * **duration** _[number]_ - duration of the block notice(5000 = 5sec, 0 = infinite).
 ```
 Example:
         duration: 8000,
 ```

 * **actionOpen(actionClose)** _[function]_ - performed action, when block
 notice opening(closing).
 ```
 Example:
         funcName, function(){...};
 ```

 > Passed functions performed after the ending animation

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

***

## Additional information 

* All events of the plugin belong to namespace 'KnockToWindow'.

* Animation 'show' has not good fluency in cases:

 * transition = 'vertical' and position = ['middle-left', 'middle-center', 'middle-right'];
 * transition = 'horizontal' and position = [top-center','middle-center'];

* Link on the demonstration page: [KnockToWindow](http://chtoto.besaba.com).