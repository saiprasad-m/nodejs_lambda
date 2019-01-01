const fetchUsers = async() =>
    await (await fetch('/.netlify/functions/getusers')).json();

    // /.netlify/functions/getusers - PROD
    // http://localhost:9000/getusers


fetchUsers().then(data => {

    userList = document.querySelector('#users');
    const MAX_LIST = 5;

    data.forEach(user => {
            const header = document.querySelector('h1.text-center.display-4')
            header.innerHTML = header.textContent + "("+ data.length +")"
        
            const li = document.createElement('li');
            li.className = 'list-group-item';

            const image = document.createElement('img');
            image.src = user.avatar_url + "&s=120";
            image.style.borderRadius='50%';
            image.style.width='40px';
            image.style.height='40px';
            const link = document.createElement('a');

            link.appendChild(document.createTextNode(user.login));
            link.href = user.html_url;
            link.className = "ml-3"
            link.target = '_blank';
            li.appendChild(image);
            li.appendChild(link);
            userList.appendChild(li);
                  
    });

})