var views = {$:function (v) {
      return (!v && v !== 0 ? '' : (typeof v === 'object' ? JSON.stringify(v) || '' : '' + v)).replace(/</g, '&lt;')
    },"&":undefined,edit:function (scope,state){state=state||scope;var cache=this;var output=''+cache['page']({block:function(){var cache=this;function ltl0(v) {
      return (!v && v !== 0 ? '' : (typeof v === 'object' ? JSON.stringify(v) || '' : '' + v)).replace(/</g, '&lt;')
    };var output='<form id="edit">';if(scope.post.id){output+='<h1>Edit Post</h1>'}else{output+='<h2>New Post</h2>'}output+='<div class="field"><label for="title">Title</label><input id="title" type="text" name="title" value="'+ltl0(scope.post.title)+'" style="width:100%"></div><div class="field"><label for="text">Text</label><textarea id="text" name="text" rows="20">'+ltl0(scope.post.text)+'</textarea></div><div class="field"><button onclick="blog.update('+(scope.post.id)+');return false">';if(scope.post.id){output+='Update Post'}else{output+='Create Post'}output+='</button></div></form>';return output}},state)+'';return output},index:function (scope,state){state=state||scope;var cache=this;var output=''+cache['page']({block:function(){var cache=this;function ltl3(v) {
      return (!v && v !== 0 ? '' : (typeof v === 'object' ? JSON.stringify(v) || '' : '' + v)).replace(/</g, '&lt;')
    };var output='';for(var ltl2,ltl0=0,ltl1=scope.posts.length;ltl0<ltl1;++ltl0){ltl2=scope.posts[ltl0];output+='<a name="'+(ltl2.id)+'"></a><div class="post"><h2>'+ltl3(ltl2.title)+' <i class="when">- '+ltl3(ltl2.when)+'</i></h2>'+(ltl2.text)+'<p><button onclick="blog.edit('+(ltl2.id)+')">Edit</button> <button onclick="blog.remove('+(ltl2.id)+')">Delete</button></p></div>'}return output}},state)+'';return output},page:function (scope,state){state=state||scope;var cache=this;var ltl0=cache.$;var output='';scope.appName = 'My Blog';scope.posts = state.posts;output+='<!DOCTYPE html><html><head><title>';if(scope.title){output+=''+ltl0(scope.title)+' - '+ltl0(scope.appName)+''}else{output+=''+ltl0(scope.appName)+''}output+='</title></head><body><div id="top"><h1><a id="logo" onclick="blog.load()">'+ltl0(scope.appName)+'</a></h1></div><div id="side"><h3>Posts</h3>';for(var ltl3,ltl1=0,ltl2=scope.posts.length;ltl1<ltl2;++ltl1){ltl3=scope.posts[ltl1];output+='<a href="#'+(ltl3.id)+'">'+ltl0(ltl3.when)+' - '+ltl0(ltl3.title)+'</a>'}output+='<p><button onclick="blog.edit()">New Post</button></p></div><div id="content">'+(scope.block.call(cache,scope))+'</div></body></html>';return output}}