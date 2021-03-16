/* 
  This file is intended to simulate a backend response.
  Author: Chris Mabey
  Date: 05/02/2021
*/

const examplePosts = [
  {
    id: '1',
    title: 'Post One',
    category: 'Web Development',
    date: '2020-11-01'
  },
  {
    id: '2',
    title: 'Post Two',
    category: 'Health & Wellness',
    date: '2020-05-11'
  },
  {
    id: '3',
    title: 'Post Three',
    category: 'Web Development',
    date: '2020-04-20'
  },
  {
    id: '4',
    title: 'Post Four',
    category: 'Business',
    date: '2020-06-30'
  },
  {
    id: '5',
    title: 'Post Five',
    category: 'Tech Gadgets',
    date: '2020-01-01'
  }
];
const defaultCategories = [
  {
    id: 1,
    title: 'Web Development',
    date: Date('2020-11-01')
  },
  {
    id: 2,
    title: 'Tech Gadgets',
    date: Date('2020-11-01')
  },
  {
    id: 3,
    title: 'Business',
    date: Date('2020-11-01')
  },
  {
    id: 4,
    title: 'Health & Wellness',
    date: Date('2020-11-01')
  }
];

const postCountElem = document.getElementById('postCount');
const catCountElem = document.getElementById('categoryCount');
const categoryTitle = document.getElementById('categoryTitle');
const postCategory = document.getElementById('postCategory');
const allPosts = document.getElementById('postAllTable');
const latestPosts = document.getElementById('postLatestTable');
const userTable = document.getElementById('userTable');
const categoryTable = document.getElementById('categoryTable');
const addUserBtn = document.getElementById('addUserBtn');
const addCategoryBtn = document.getElementById('addCategoryBtn');
const addPostBtn = document.getElementById('addPostBtn');

// Init
window.addEventListener('DOMContentLoaded', function () {
  // Category Page
  if(categoryTable) {
    const ui = new CategoryUI;
    initCategoryTable(ui);
  };
  // Post Page
  if(allPosts) {
    const ui = new PostUI;
    initAllPosts(ui);
  };
  // Dashboard Page
  if(latestPosts)  {
    let postUI = new PostUI;
    let catUI = new CategoryUI;
    initLatestPosts(postUI);
    initCategories(catUI);
  };

  if(addPostBtn) {
    addPostBtn.addEventListener('click', function (e) {
      e.preventDefault();
      const ui = new PostUI;
      savePost(ui, 'latest');
    });
  };

  if(addCategoryBtn) {
    addCategoryBtn.addEventListener('click', function (e) {
      e.preventDefault();
      saveCategory();
    });
  };
});

class Post {
  constructor(id, title, category, date) {
    this.id = id;
    this.title = title;
    this.category = category;
    if (date) {
      this.date = Date(date);
    } else {
      this.date = Date.now();
    }
  }
};

class Category {
  constructor(id, title, date) {
    this.id = id;
    this.title = title;
    if (date) {
      this.date = Date(date);
    } else {
      this.date = Date.now();
    }
  }
};

class CategoryUI {
  constructor() {
    this.catTable = document.getElementById('categoryTable') || null;
    this.catParentElem = document.getElementById('categoryParent') || null;
    this.catContainer = document.getElementById('categoryContainer')|| null;
  };
  addCategories(catArray) {
    if(catArray.length > 0) {
      const ui = this;
      for(let i; i < catArray.length; i++) {
        ui.addCategory(catArray[i], false);
      }
    };
  };
  addCategory(cat, showAlert) {
    const row = document.createElement('tr');
    const dateRaw = new Date(cat.date)
    const formattedDate = dateRaw.toLocaleString('en-US', {
      weekday: 'short', // "Sat"
      month: 'long', // "June"
      day: '2-digit', // "01"
      year: 'numeric' // "2019"
    });
    row.innerHTML = `
      <td>${cat.id}</td>
      <td>${cat.title}</td>
      <td>${formattedDate}</td>
      <td><a href="details.html" class="btn background-secondary">
      <i class="fas fa-angle-double-right"></i> Details
    </a></td>
    `;
    this.catTable.appendChild(row);

    if(showAlert) {
      this.showCategoryAlert('Category Added!', 'success');
    }
  };
  showCategoryAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));
    this.catParentElem.insertBefore(div, this.catContainer);
    setTimeout(function () {
      document.querySelector('.alert').remove();
    }, 3000);
  };
  clearTable() {
    this.catTable.innerHTML = '';
  };
};

class PostUI {
  constructor() {
    this.postLatestTable = document.getElementById('postLatestTableBody') || null;
    this.postLatestParentElem = document.getElementById('postLatestParent') || null;
    this.postLatestContainer = document.getElementById('postLatestContainer')|| null;
    this.postAllTable = document.getElementById('postAllTableBody') || null;
    this.postAllParentElm = document.getElementById('postAllParent') || null;
    this.postAllContainer = document.getElementById('postAllContainer') || null;
  };
  addPost(post, showAlert, table) {
    const row = document.createElement('tr');
    const dateRaw = new Date(post.date)
    const formattedDate = dateRaw.toLocaleString('en-US', {
      weekday: 'short', // "Sat"
      month: 'long', // "June"
      day: '2-digit', // "01"
      year: 'numeric' // "2019"
    });
    row.innerHTML = `
      <td>${post.id}</td>
      <td>${post.title}</td>
      <td>${post.category}</td>
      <td>${formattedDate}</td>
      <td><a href="details.html" class="btn background-secondary">
      <i class="fas fa-angle-double-right"></i> Details
    </a></td>
    `;
    if(table === 'all') {
      this.postAllTable.appendChild(row);
    } else if(table === 'latest' || postLatestTable.firstChild) {
      this.postLatestTable.appendChild(row);
    }

    if(showAlert) {
      this.showPostAlert('Post Added!', 'success');
    }
  };
  showPostAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));
    this.postLatestParentElem.insertBefore(div, this.postLatestContainer);
    setTimeout(function () {
      document.querySelector('.alert').remove();
    }, 3000);
  };
  clearTable() {
    this.postLatestTable.innerHTML = '';
  };
};

class Store {
  static getPosts() {
    let posts;
    if (localStorage.getItem('posts') === null) {
      posts = [];
    } else {
      posts = JSON.parse(localStorage.getItem('posts'));
    }
    return posts;
  };

  static getLatestPosts() {
    let posts = Store.getPosts();
    if(posts.length > 0) {
      let latest = posts.reverse();
      posts = latest;
    }
    return posts;
  };

  static getRecentPosts(numPosts) {
    const posts = Store.getPosts();
    let recentPosts = posts.reverse();
    recentPosts.length = Number(numPosts);
    return recentPosts;
  };

  static addPosts(posts) {
    let state = Store.getPosts();
    if (state.length > 0) {
      state.push(posts);
    } else {
      state = posts;
    }
    localStorage.setItem('posts', JSON.stringify(state));
    updatePostCount();
  };

  static removePost(id) {
    const posts = Store.getPosts();
    posts.forEach(function (post, index) {
      if (post.id === id) {
        posts.splice(index, 1);
      }
    });
    window.localStorage.setItem('posts', JSON.stringify(posts));
    updatePostCount();
  };

  static getCategories() {
    let cat;
    if (localStorage.getItem('categories') === null) {
      cat = [];
    } else {
      cat = JSON.parse(localStorage.getItem('categories'));
    }
    return cat;
  };

  static addCategory(cat) {
    let state = Store.getCategories();
    if (state.length > 0) {
      state.push(cat);
    } else {
      state = cat;
    }
    localStorage.setItem('categories', JSON.stringify(state));
    updateCategoryCount();
    reloadPostCategories();
  };

  static removeCategory(id) {
    const cats = Store.getCategories();
    cats.forEach(function (cat, index) {
      if (cat.id === id) {
        cats.splice(index, 1);
      }
    });
    window.localStorage.setItem('categories', JSON.stringify(cats));
    updateCategoryCount();
    reloadPostCategories();
  };
};

function initLatestPosts(ui) {
  const localPosts = Store.getLatestPosts();
  if(localPosts.length === 0) {
    Store.addPosts(examplePosts);
    examplePosts.forEach(function (post) {
      ui.addPost(post, false, 'latest');
    })
  } else {
    localPosts.forEach(function (post) {
      ui.addPost(post, false, 'latest');
    });
  }
  updatePostCount();
};

function initAllPosts(ui) {
  const localPosts = Store.getPosts();
  if(localPosts.length === 0) {
    Store.addPosts(examplePosts);
    examplePosts.forEach(function(post) {
      ui.addPost(post, false, 'all');
    });
  } else {
    localPosts.forEach(function(post) {
      ui.addPost(post, false, 'all');
    });
  };
};

function initCategories(ui) {
  const localCategories = Store.getCategories();
  if(localCategories.length === 0) {
    Store.addCategory(defaultCategories);   
  }
  ui.addCategories(localCategories);
  updateCategoryCount();
  reloadPostCategories();
};

function initCategoryTable(ui) {
  const localCategories = Store.getCategories();
  if(localCategories.length === 0) {
    Store.addCategory(defaultCategories);
    defaultCategories.forEach(function(cat) {
      ui.addCategory(cat);
    });
  } else {
    localCategories.forEach(function(cat) {
      ui.addCategory(cat);
    });
  };
};

function updatePostCount() {
  if(postCountElem) {
    const posts = Store.getPosts();
    const count = posts.length;
    postCountElem.innerHTML = Number(count);
  }
};

function updateCategoryCount() {
  if(catCountElem) {
    const cats = Store.getCategories();
    const count = cats.length;
    catCountElem.innerHTML = Number(count);
  }
};

function reloadPostCategories() {
  if(postCategory) {
    const categories = Store.getCategories();
    if(categories.length > 0) {
      postCategory.innerHTML = '<option selected="selected">Choose One...</option>'; // reset
      categories.forEach(function(cat) {
        let option = document.createElement('option');
        option.innerHTML = cat.title;
        postCategory.appendChild(option);
      });
    }
  }
};

function saveCategory() {
  const title = document.getElementById('categoryTitle');
  const id = Math.floor(Math.random() * 100); // Random ID between 1 and 100
  if (title.value === '') {
    // Error Handling
    console.log('Error: Category incomplete. Please include a title');
  } else {
    const cat = new Category(id, title.value);
    Store.addCategory(cat);                          
    // Clear Inputs
    title.value = '';
  }
};

function savePost(ui, postType) {
  const title = document.getElementById('postTitle');
    const category = document.getElementById('postCategory');
    // Random ID
    const id = Math.floor(Math.random() * 100);
    if (title.value === '' || category.value === '') {
      // Error Handling
      console.log('Error: Post incomplete. Please include both a title and category');
    } else {
      // Inputs Validated - Create new post
      const post = new Post(id, title.value, category.value);
      Store.addPosts(post);                       
      // Add Posts to UI
      ui.addPost(post, true, postType);
    }
    // Clear Inputs
    title.value = '';
    category.value = '';
};

async function getAPIPosts() {
    let postArray;
    const postsFetch = await fetch('https://jsonplaceholder.typicode.com/posts/')
    const posts = await postsFetch.json()
    
    return posts
    // for (let i; i <= 5; i++) {
    //   postArray.push(posts[i])
    // }
    // return postArray;
}

getAPIPosts()
  .then(posts => console.log(posts))
  .catch(err => console.log(err))