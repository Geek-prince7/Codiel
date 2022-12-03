{
    /*                                      Ajax create new post                                             */
    //method to submit a form using AJAX
    let createPost=()=>{
        let newPostForm=$('#new-post-form')
        newPostForm.submit((event)=>{
            //pre3venting submission
            event.preventDefault();

            //manually submit form
            $.ajax({
                type:'post',
                url:'/posts/new-post',
                data:newPostForm.serialize(),//convering data to json
                success:function(data){
                    console.log(data)
                    let newPost=newPostDOM(data.data.post);
                    $('#posts-list-container').prepend(newPost);
                    // deletePost($(' .delete-post-btn',newPost));
                },
                error:function(err){
                    console.log(error.response.Text);
                }
            })
        })

    }


    //method to create a post in DOM
    let newPostDOM=(post)=>{
        return(`
        <div id="post-${post._id}" class="post-container">
            <div class="post-header">
                <h3><a href="/users/profile/<%= post.user.id %>">${post.user.name}</a>  </h3>
                <p>
                ${JSON.stringify(post.user.updatedAt)}
                    
                    
                | <a class="delete-post-btn" href="/posts/destroy/${post._id}"> delete</a>
                    
                </p>
        
            </div>
            <div class="post-content">
                ${post.content}
            </div>
            
            <div class="comment-container">
                <form action="/comments/create" method="post">
                    <input type="text" placeholder="Comment..."  required name="comment">
                    <input type="hidden" name="post_id" value="${post._id}" >
                    <button type="submit">Comment</button>
        
                </form>
                <div class="existing-comment" id="${post._id}">
                    
                </div>
            </div>
        </div>
        
        `)

    }


    

    /*                                   delete post using ajax                                               */
    /*
    let deletePost=(deleteLink)=>
    {
        $(deleteLink).click((event)=>{
            event.preventDefault();
            $.ajax({
                type:'get',
                url:deleteLink.prop('href'),
                success:(data)=>{
                    console.log(data)
                    $(`#post-${data.data.post_id}`).remove()

                },
                error:(error)=>{
                    console.log(error.responseText);
                }
            })

        })
    }
    */


    createPost();



    /*                                    create new comment using AJAX                                       */
}