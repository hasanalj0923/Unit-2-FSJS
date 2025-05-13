const showPage = (list, page) => {
   const start = (page - 1) * 9;
   const end = page * 9;
   const studentList = document.querySelector('.student-list');
   studentList.innerHTML = '';

   const pageStudents = list.slice(start, end);
   const fragment = document.createDocumentFragment();

   pageStudents.forEach(student => {
      const li = document.createElement('li');
      li.className = 'student-item cf';
      li.innerHTML = `
         <div class="student-details">
            <img class="avatar" src="${student.picture.medium}" alt="Profile Picture">
            <h3>${student.name.first} ${student.name.last}</h3>
            <span class="email">${student.email}</span>
         </div>
         <div class="joined-details">
            <span class="date">Joined ${student.registered.date}</span>
         </div>
      `;
      fragment.appendChild(li);
   });

   studentList.appendChild(fragment);
};

const addPagination = (list) => {
   const pages = Math.ceil(list.length / 9);
   const linkList = document.querySelector('.link-list');
   linkList.innerHTML = '';

   const fragment = document.createDocumentFragment();

   for (let i = 1; i <= pages; i++) {
      const li = document.createElement('li');
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = i;
      if (i === 1) button.className = 'active';
      li.appendChild(button);
      fragment.appendChild(li);
   }

   linkList.appendChild(fragment);

   linkList.addEventListener('click', (e) => {
      if (e.target.tagName === 'BUTTON') {
         document.querySelector('button.active')?.classList.remove('active');
         e.target.classList.add('active');
         showPage(list, parseInt(e.target.textContent));
      }
   });
};

const filterData = ({ target: { value } }) => {
   const inputVal = value.toLowerCase();
   const filtered = data.filter(student => {
      const fullName = `${student.name.first} ${student.name.last}`.toLowerCase();
      return fullName.includes(inputVal);
   });

   if (filtered.length === 0) {
      document.querySelector('.student-list').innerHTML = '<li>No results</li>';
      document.querySelector('.link-list').innerHTML = '';
      return;
   }

   showPage(filtered, 1);
   addPagination(filtered);
};

const addSearch = () => {
   const header = document.querySelector('header');
   const searchBar = `
      <label for="search" class="student-search">
         <span>Search by name</span>
         <input id="search" placeholder="Search by name...">
         <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
      </label>
   `;
   header.insertAdjacentHTML('beforeend', searchBar);
   document.querySelector('#search').addEventListener('keyup', filterData);
};

// Initialize the app
addSearch();
showPage(data, 1);
addPagination(data);
