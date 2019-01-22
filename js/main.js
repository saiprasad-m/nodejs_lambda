
const fetchUsers = async() =>
    await (await fetch('/.netlify/functions/getusers')).json();
    //    await(await fetch('http://localhost:9000/getusers')).json(); 

const getBlogs = async() =>
    await(await fetch('/.netlify/functions/getblogs')).json();

    const getCache = async() =>
    await(await fetch('/.netlify/functions/getcache')).json();    
  //  await(await fetch('http://localhost:9000/getcache')).json();
    

// /.netlify/functions/getusers - PROD
// http://localhost:9000/getusers


fetchUsers().then(data => {

    userList = document.querySelector('#users');
    const MAX_LIST = 5;

    data.forEach(user => {
        const header = document.querySelector('h1.text-center.display-4')
        header.setAttribute("data-count", " " + data.length + " ");

        const li = document.createElement('li');
        li.className = 'list-unstyled';
        const div = document.createElement('div');
        div.className = "card card-body mt-1 d-inline-block";

        const image = document.createElement('img');
        image.src = user.avatar_url + "&s=90";
        image.style.borderRadius = '50%';
        image.style.width = '40px';
        image.style.height = '40px';
        const link = document.createElement('a');

        link.appendChild(document.createTextNode(user.login));
        link.href = user.html_url;
        link.className = "ml-3"
        link.target = '_blank';

        div.appendChild(image);
        div.appendChild(link);
        li.appendChild(div);
        userList.appendChild(li);

    });

})

getCache().then(data => {
    console.log(data);
});