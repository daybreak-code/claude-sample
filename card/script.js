function updateCard() {
    const name = document.getElementById('name').value || '姓名';
    const title = document.getElementById('title').value || '职位';
    const email = document.getElementById('email').value || '邮箱';
    const phone = document.getElementById('phone').value || '电话';
    const bio = document.getElementById('bio').value || '个人简介';
    const skills = document.getElementById('skills').value || '技能标签';
    const cardColor = document.getElementById('cardColor').value;
    
    document.getElementById('cardName').textContent = name;
    document.getElementById('cardTitle').textContent = title;
    document.getElementById('cardEmail').textContent = email;
    document.getElementById('cardPhone').textContent = phone;
    document.getElementById('cardBio').textContent = bio;
    
    const skillsTags = document.getElementById('cardSkills');
    skillsTags.innerHTML = '';
    
    if (skills.trim()) {
        const skillsArray = skills.split(',').map(skill => skill.trim()).filter(skill => skill);
        skillsArray.forEach(skill => {
            const tag = document.createElement('span');
            tag.className = 'skill-tag';
            tag.textContent = skill;
            skillsTags.appendChild(tag);
        });
    }
    
    const card = document.getElementById('profileCard');
    card.style.background = cardColor;
}

function downloadCard() {
    const card = document.getElementById('profileCard');
    
    html2canvas(card, {
        backgroundColor: null,
        scale: 2,
        useCORS: true,
        logging: false,
        width: 400,
        height: card.offsetHeight
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = `个人名片_${document.getElementById('cardName').textContent}_${new Date().toISOString().slice(0, 10)}.png`;
        link.href = canvas.toDataURL();
        link.click();
    }).catch(error => {
        console.error('下载失败:', error);
        alert('下载失败，请重试');
    });
}

function initializeEventListeners() {
    const inputs = ['name', 'title', 'email', 'phone', 'bio', 'skills', 'cardColor'];
    
    inputs.forEach(id => {
        const element = document.getElementById(id);
        element.addEventListener('input', updateCard);
        element.addEventListener('change', updateCard);
    });
    
    updateCard();
}

document.addEventListener('DOMContentLoaded', initializeEventListeners);