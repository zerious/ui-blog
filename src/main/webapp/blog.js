// Author: Sam Eubank <sameubank@gmail.com>
// @use ./blog.css

/* global window Cute views */

var api = '/Blog/api/'
var state = {}

// Load the page.
loadPosts()

// Placeholder for CSS insertion.
Cute.css("BLOG_CSS") // eslint-disable-line

/**
 * Retrieve and show all posts.
 */
function loadPosts () {
  Cute.get(api, function (response) {
    var blog = response.blog
    var posts = blog.posts
    Cute.each(posts, formatPost)
    state.posts = posts
    renderView('index')
  })
}

/**
 * Edit a post with an optional ID.
 *
 * @param  {Number} id  The ID number of the post.
 * // TODO: Support GUIDs?
 */
function editPost (id) {
  if (!id) {
    state.post = {text: '', title: ''}
    return renderView('edit')
  }
  Cute.get(api + id, function (response) {
    state.post = response.post
    renderView('edit')
  })
}

/**
 * Update the post that's currently being edited.
 *
 * @param  {Number} id  Optional ID number of the post.
 */
function updatePost (id) {
  id = id || ''
  // Get form data.
  var title = Cute.value(Cute.one('#title'))
  var text = Cute.value(Cute.one('#text'))
  // Assemble POST data.
  var data = 'title=' + Cute.encode(title) +
    '&text=' + Cute.encode(text) +
    '&timestamp' + Cute.encode(Cute.stamp())
  Cute.get(api + id, data, function (response) {
    loadPosts()
  })
}

/**
 * Remove a specified post.
 * TODO: Ask for confirmation.
 *
 * @param  {Number} id  The ID number of the post.
 */
function removePost (id) {
  Cute.get(api + id, null, function () {
    loadPosts()
  })
}

/**
 * Remove all posts.
 * TODO: Ask for confirmation.
 */
function dropPosts () {
  Cute.get(api, null, function () {
    loadPosts()
  })
}

/**
 * Render a view with a given name (from the /views folder minus ".ltl").
 *
 * @param  {String} name  The view name.
 */
function renderView (name) {
  var body = Cute.body()
  var html = views[name](state, state)
  Cute.html(body, html)
}

/**
 * Format a post's timestamp and text.
 *
 * @param  {Object} post  The post to format.
 */
function formatPost (post) {
  post.when = Cute.formatDate(post.timestamp, 0, 1)
  post.text = post.text.replace()
}

// Expose a global to the page.
window.blog = {
  load: loadPosts,
  edit: editPost,
  update: updatePost,
  remove: removePost,
  drop: dropPosts
}
