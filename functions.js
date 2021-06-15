function stripHtmlTags (elemento) {
    return elemento.textContent||elemento.innerText;
}
  
function filter(tag) {
    currentTag = tag
    setActiveTag(tag);
    showContainer(tag);
}

function setActiveTag(tag) {
    // loop through all items and remove active class
    let items = document.getElementsByClassName('blog-tag-item');
    for (var i = 0; i < items.length; i++) {
        items[i].setAttribute('class', 'blog-tag-item');
        let itemChild = items[i].children[0]
        itemChild.removeAttribute('class')
    }

    // set the selected tag's item to active
    let item = document.getElementById(tag + '-item');
    if (item) {
        item.setAttribute('class', 'blog-tag-item active-tag');
        let itemChild = item.children[0]
        itemChild.setAttribute('class', 'blog-tag-item active-tag');
    }
    
}

function showContainer(tag) {
    // loop through all lists and hide them
    let posts = document.getElementsByClassName('post');
    for(let i=0; i<posts.length;i++){
        let post = posts[i]
        let postTags = JSON.parse(stripHtmlTags(post.children[0]))
        if( currentTag==='all' || postTags.includes(currentTag) ){
            post.setAttribute('class', 'post')
        }   else{
            post.setAttribute('class', 'post hidden')
        }
    }
    let pinnedPost = document.getElementById('pinned-post')
    if(tag==='all'){
        pinnedPost.removeAttribute('class')
    }   else{
        pinnedPost.setAttribute('class', 'hidden')
    }
}