
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

        members.forEach(member => {
            const memberDiv = document.createElement('div');
            memberDiv.id = 'member';

            // const roleColor = member.roles.length > 0 ? member.roles[0].color : '000000';

            // memberDiv.style.backgroundImage = `linear-gradient(to right, #${roleColor}65, #3c4046 40%)`; // Adiciona opacidade à cor (50%)

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
    } catch (error) {
        console.error('Erro ao buscar membros:', error);
    }
}


// Chama a função para buscar membros quando a página carrega
document.addEventListener('DOMContentLoaded', fetchMembers);
