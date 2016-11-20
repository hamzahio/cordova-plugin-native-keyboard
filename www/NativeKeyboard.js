function NativeKeyboard(){}function scrollTo(a,b,c,d){function e(b){a.scrollTop=b}function f(){return a.scrollTop}var g=f(),h=b-g,i=0,j=20;d="undefined"==typeof d?500:d;var k=function(){i+=j;var a=Math.easeInOutQuad(i,g,h,d);e(a),i<d?requestAnimFrame(k):c&&"function"==typeof c&&c()};k()}var isIOS=/iPad|iPhone|iPod/.test(navigator.userAgent);isIOS&&document.addEventListener("focusin",function(a){if(a.target.getAttribute("data-nativekeyboard")&&"false"!=a.target.getAttribute("data-nativekeyboard")){a.preventDefault(),a.stopPropagation();var b=document.activeElement;b&&document.activeElement.blur();var c=function(b){a.target.value=b};NativeKeyboard.prototype._showKeyboard(a.target,a.target.value,c)}}),NativeKeyboard.prototype.editText=function(a){var b=function(b){a.innerText=b};NativeKeyboard.prototype._showKeyboard(a,a.innerText,b)},NativeKeyboard.prototype.hideMessenger=function(a,b,c){var d=a||{},f=function(){_autocorrectHeightOfElement&&(_autocorrectHeightOfElement.style.marginBottom=0,_autocorrectHeightOfElement=null),b&&b()};cordova.exec(f,c,"NativeKeyboard","hideMessenger",[d])};var _autocorrectHeightOfElement=null,_autoscrollElement=null;NativeKeyboard.prototype.showMessenger=function(a,b,c){var d=a||{};_autoscrollElement=null,d.autoscrollElement&&(_autoscrollElement=d.autoscrollElement,d.autoscrollElement=null,d.scrollToBottomAfterKeyboardShows=!0,isIOS||_autoscrollElement&&(_autocorrectHeightOfElement=_autoscrollElement,_autoscrollElement.style.marginBottom="46px")),d.scrollToBottomAfterKeyboardShows&&void 0===d.scrollToBottomAfterMessengerShows&&(d.scrollToBottomAfterMessengerShows=!0);var e=function(a){a.messengerRightButtonPressed===!0&&d.rightButton&&"function"==typeof d.rightButton.onPress&&d.rightButton.onPress(),a.ready?(d.scrollToBottomAfterMessengerShows&&d.scrollToBottomAfterKeyboardShows&&scrollTo(_autoscrollElement,_autoscrollElement.scrollHeight),"function"==typeof b&&b()):a.keyboardDidShow===!0?(console.log("-- autoscrollElement: "+_autoscrollElement),_autoscrollElement&&scrollTo(_autoscrollElement,_autoscrollElement.scrollHeight),"function"==typeof d.onKeyboardDidShow&&d.onKeyboardDidShow(a.keyboardHeight)):a.keyboardDidHide===!0?"function"==typeof d.onKeyboardDidHide&&d.onKeyboardDidHide():void 0!==a.text?"function"==typeof d.onSubmit?d.onSubmit(a.text):console.log("Received "+a.text+", pass in an 'onSubmit' function to catch it in your app."):void 0!==a.contentHeightDiff&&0!==a.contentHeightDiff?"function"==typeof d.onContentHeightChanged&&d.onContentHeightChanged(a):a.messengerLeftButtonPressed===!0?"function"==typeof d.leftButton.onPress&&d.leftButton.onPress():console.log("JS Unexpected plugin result: "+JSON.stringify(a))},f=function(a){console.log("Error in showMessenger: "+a),c&&c(a)};cordova.exec(e,f,"NativeKeyboard","showMessenger",[d])},NativeKeyboard.prototype._showKeyboard=function(selector,text,onTextUpdate){var isTextarea="textarea"===selector.tagName.toLowerCase(),att=selector.getAttribute("data-nativekeyboard"),opts=null;opts=0===att.indexOf("{")?JSON.parse(att):"function"==typeof window[att]?eval(window[att]()):eval(att),"object"!=typeof opts&&(opts={}),opts.text=text,opts.type=opts.type||selector.type.toLowerCase(),opts.maxlength=opts.maxlength||selector.getAttribute("maxlength")||0,opts.caretColor=opts.caretColor||"#007AFF";var css=window.getComputedStyle(selector);opts.verticalAlign=css.verticalAlign,opts.textAlign=css.textAlign,opts.offsetTop=window.pageYOffset,opts.font="font-family:"+css.fontFamily+";font-size:"+css.fontSize+";font-weight:"+css.fontWeight+";font-style:"+css.fontStyle;var viewportOffset=selector.getBoundingClientRect(),top=selector.scrollTop,left=selector.scrollLeft;opts.boxSizing=css.boxSizing,opts.box=opts.box||{left:viewportOffset.left,top:viewportOffset.top,width:css.width,height:css.height},opts.padding=opts.padding||{top:css.paddingTop,right:css.paddingRight,bottom:css.paddingBottom,left:css.paddingLeft};var compensateLeft=0,compensateTop=isTextarea?1:0;opts.margin=opts.margin||{top:parseInt(css.marginTop)+compensateTop,right:css.marginRight,bottom:css.marginBottom,left:parseInt(css.marginLeft)+compensateLeft},opts.border=opts.border||{top:css.borderTopWidth,right:css.borderRightWidth,bottom:css.borderBottomWidth,left:css.borderLeftWidth},opts.borderRadius=opts.borderRadius||css.borderRadius,opts.lineHeight=opts.lineHeight||css.lineHeight;var onSuccess=function(a){if(a.textFieldDidEndEditing===!0&&(selector.scrollLeft=0),void 0!==a.text)onTextUpdate(a.text),isTextarea||(selector.scrollLeft=selector.scrollWidth);else if(a.returnKeyPressed===!0){var b=opts.returnKey;b&&"function"==typeof b.onPress&&b.onPress(),isTextarea||(selector.scrollLeft=0)}else if(void 0!==a.buttonIndex){var c=opts.accessorybar.buttons[a.buttonIndex];c.close===!0&&NativeKeyboard.prototype.hideKeyboard(),"function"==typeof c.callback&&c.callback()}else console.log("JS Unexpected plugin result: "+JSON.stringify(a))};isTextarea||(selector.scrollLeft=selector.scrollWidth),document.addEventListener("touchend",NativeKeyboard.prototype.touchHandler,!1),cordova.exec(onSuccess,null,"NativeKeyboard","show",[opts])},NativeKeyboard.prototype.hideKeyboard=function(){cordova.exec(null,null,"NativeKeyboard","hide",[]),document.removeEventListener("touchend",NativeKeyboard.prototype.touchHandler)},NativeKeyboard.prototype.touchHandler=function(a){var b=a.target.tagName.toLowerCase();"input"!==b&&"textarea"!==b&&NativeKeyboard.prototype.hideKeyboard()},NativeKeyboard.prototype.updateInput=function(a){var b=NativeKeyboard.prototype.activeInput.value;""===a.text?b=b.substring(0,b.length-1):b+=a.text,NativeKeyboard.prototype.activeInput.value=b},NativeKeyboard.prototype.activeInput=null,NativeKeyboard.install=function(){return window.plugins||(window.plugins={}),window.NativeKeyboard=new NativeKeyboard,window.NativeKeyboard},Math.easeInOutQuad=function(a,b,c,d){return a/=d/2,a<1?c/2*a*a+b:(a--,-c/2*(a*(a-2)-1)+b)},Math.easeInCubic=function(a,b,c,d){var e=(a/=d)*a*a;return b+c*e},Math.inOutQuintic=function(a,b,c,d){var e=(a/=d)*a,f=e*a;return b+c*(6*f*e+-15*e*e+10*f)};var requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(a){window.setTimeout(a,1e3/60)}}();cordova.addConstructor(NativeKeyboard.install);