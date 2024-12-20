
fetch('/server-info')
    .then(response => response.json())
    .then(data => {
        document.getElementById('serverName').textContent = data.name;
        document.getElementById('serverImage').style.backgroundImage = `url(${data.icon})`;
    })
    .catch(error => {
        console.error('Erro:', error);
        document.getElementById('serverName').textContent = 'Erro ao carregar.';
    });

async function fetchMembers() {

    try {
        const response = await fetch('/members');
        const members = await response.json();
        const membersContainer = document.getElementById('members');
        membersContainer.innerHTML = '';

        const checkedFilters = checkFilters();

        const filteredMembers = members.filter(member => {
            if (checkedFilters.length === 0) {
                return true;
            } else {
                return member.roles.some(role => checkedFilters.includes(role.name));
            }
        });



        filteredMembers.forEach(member => {
            const memberDiv = document.createElement('div');
            memberDiv.id = 'member';

            memberDiv.innerHTML = `
                    <div class="memberInfo row">
                        <div id="memberProfile" 
                            style="background-image: url(${member.avatar}); 
                                   background-size: cover; 
                                   background-position: center;">
                        </div>
                        <div class="column">
                            <h1 id="memberName">${member.name}</h1>
                            <p id="memberUser">${member.userTag}</p>
                        </div>
                    </div>
                    <div class="roles">
                        ${member.roles.map(role => `
                            <div class="role" style="background-color: #${role.color}50; border: solid 1px #${role.color}">
                                ${role.name}
                            </div>
                        `).join('')}
                    </div>
                `;

            // Adiciona o elemento criado ao container
            membersContainer.appendChild(memberDiv);
        });

        if (filteredMembers.length === 0) {
            const unfoundContainer = document.createElement('div');
            unfoundContainer.classList.add('unfound-container');

            unfoundContainer.innerHTML = `
                    <img src="assets/sad.png">
                    <h1>Desculpe, não encontramos ninguém...</h1>
            `;

            // Adiciona o elemento criado ao container
            membersContainer.appendChild(unfoundContainer);
        }

    } catch (error) {
        console.error('Erro ao buscar membros:', error);
    }
}


async function fetchRoles() {
    try {
        const response = await fetch('/roles');
        const roles = await response.json();
        const roleFilter = document.getElementById('roleFilter');

        roles.forEach(role => {
            console.log('CARGO')
            const filterRoleDiv = document.createElement('label');
            filterRoleDiv.classList.add('checkbox-container');
            filterRoleDiv.innerHTML = `
            <input type="checkbox" />
                  <span class="custom-checkbox"></span>
                  ${role.name}
            `

            roleFilter.appendChild(filterRoleDiv);
        });
    } catch (error) {
        console.error('Erro ao buscar membros:', error);
    }
}


// Chama a função para buscar membros quando a página carrega
document.addEventListener('DOMContentLoaded', fetchMembers);
document.addEventListener('DOMContentLoaded', fetchRoles);