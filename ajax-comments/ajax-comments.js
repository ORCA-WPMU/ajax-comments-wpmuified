var ajax_comment_loading=false;var ajax_comments_odd=true;var ajax_comments_path='';var ajax_comments_msgc='';var ajax_comments_form='commentform';var ajax_comments_list='commentlist';var ajax_comments_here='commentform';var ajax_comments_hide=new Array();function ajax_comments_find_element(b,c){var e=$(''+b+'');if(e==null&&c!=false){var a=document.getElementsByTagName(c);for(var i=0;i<a.length;i++){if(a[i].className.toLowerCase().indexOf(ajax_comments_list)!=-1){return a[i]}}}return e}function ajax_comments_find_list(){var a=ajax_comments_find_element(ajax_comments_list,'ol');if(a==null){var b=ajax_comments_find_element(ajax_comments_here,false);if(b!=null){a=new Insertion.Before(b,'<ol id="'+ajax_comments_list+'" class="'+ajax_comments_list+'"></ol>');return $(ajax_comments_list)}else{return null}}return a}function ajax_comments_loading(a){var f=ajax_comments_find_element(ajax_comments_form,'form');if(a){ajax_comment_loading=true;f.submit.disabled=true;new Insertion.Before(f,'<div id="ajax_comments_loading" style="display:none;">Submitting Comment...</div>');var l=$('ajax_comments_loading');new Effect.Appear(l,{beforeStart:function(){with(l.style){display='block';margin='0 auto';width='100px';font='normal 12px Arial';background='url('+ajax_comments_path+'ajax-comments/loading.gif) no-repeat 0 50%';padding='0 0 0 23px'}}})}else{Element.remove('ajax_comments_loading');f.submit.disabled=false;ajax_comment_loading=false}}function ajax_comments_message(a,b){if(!ajax_comments_msgc){ajax_comments_msgc=$('ajax-comments-message');if(ajax_comments_msgc==null){var c=ajax_comments_find_list();new Insertion.After(c,'<div id="ajax-comments-message"></div>');ajax_comments_msgc=$('ajax-comments-message')}}if(ajax_comments_msgc.empty()){new Insertion.Bottom(ajax_comments_msgc,'<div>'+a+'</div>')}else{ajax_comments_msgc.firstChild.replace('<div>'+a+'</div>')}if(!b){ajax_comments_msgc.addClassName('error')}else{ajax_comments_msgc.removeClassName('error')}}function ajax_comments_submit(){if(ajax_comment_loading)return false;ajax_comments_loading(true);var c=ajax_comments_find_list();var f=ajax_comments_find_element(ajax_comments_form,'form');new Ajax.Request(f.action,{method:'post',asynchronous:true,postBody:Form.serialize(f),onLoading:function(a){a['timeout_ID']=window.setTimeout(function(){switch(a.readyState){case 1:case 2:case 3:a.abort();ajax_comments_message('Timeout\nThe server is taking a long time to respond. Try again in a few minutes.',false);break}},25000)},onFailure:function(a){var r=a.responseText;msg=r.substring(r.indexOf('</h1>')+5,r.indexOf('</body>'));ajax_comments_message(msg,false)},onComplete:function(a){ajax_comments_loading(false);window.clearTimeout(a['timeout_ID']);if(a.status!=200)return;f.comment.value='';if(ajax_comments_hide_on_success){f.remove();while(ajax_comments_hide.length>0){Element.remove(ajax_comments_hide.pop())}}new Insertion.Bottom(c,a.responseText);var b=c.lastChild,className=b.className;b.hide();b.addClassName('ajax');if(ajax_comments_odd){b.addClassName('alt')}else{b.removeClassName('alt')}ajax_comments_odd=!ajax_comments_odd;ajax_comments_message('Your comment has been saved.',true);new Effect.Appear(b,{duration:1.5,afterFinish:function(){new Effect.Highlight(ajax_comments_msgc,{duration:3,startcolor:'#99ff00'})}})}});return false}ac_oldLoad=window.onload;window.onload=function(){ac_oldLoad;f=ajax_comments_find_element(ajax_comments_form,'form');if(f){f.onsubmit=ajax_comments_submit;new Insertion.Bottom(f,'<input id="ajax-comments-submit" name="ajax-comments-submit" type="hidden" value="1" />')}};