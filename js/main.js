const navButton=document.querySelector('.menu-btn');
const mobileNav=document.querySelector('.mobile-nav');
navButton.addEventListener('click',()=>{const open=mobileNav.classList.toggle('open');navButton.setAttribute('aria-expanded',String(open));navButton.setAttribute('aria-label',open?'Close navigation':'Open navigation')});
mobileNav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{mobileNav.classList.remove('open');navButton.setAttribute('aria-expanded','false')}));

const revealObserver=new IntersectionObserver((entries,observer)=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}})},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));

const countObserver=new IntersectionObserver((entries,observer)=>{entries.forEach(entry=>{if(!entry.isIntersecting)return;const el=entry.target,target=Number(el.dataset.count),start=performance.now(),duration=1100;function tick(now){const p=Math.min((now-start)/duration,1),eased=1-Math.pow(1-p,4);el.textContent=String(Math.round(target*eased)).padStart(2,'0')+(target===100?'%':'+');if(p<1)requestAnimationFrame(tick)}requestAnimationFrame(tick);observer.unobserve(el)})},{threshold:.6});
document.querySelectorAll('[data-count]').forEach(el=>countObserver.observe(el));

document.querySelectorAll('.menu-tab').forEach(tab=>tab.addEventListener('click',()=>{document.querySelectorAll('.menu-tab').forEach(t=>{t.classList.remove('active');t.setAttribute('aria-selected','false')});tab.classList.add('active');tab.setAttribute('aria-selected','true');const category=tab.dataset.category;document.querySelectorAll('.dish-card').forEach(card=>{card.classList.toggle('hidden',category!=='all'&&card.dataset.type!==category)})}));

const dateInput=document.querySelector('input[name="date"]');
const today=new Date();dateInput.min=`${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;

const BOOKING_EMAIL='hello@example.com'; // Replace with the restaurant's real booking email.
document.getElementById('bookingForm').addEventListener('submit',event=>{event.preventDefault();const data=new FormData(event.currentTarget);const subject=encodeURIComponent(`Table request — ${data.get('name')}`);const body=encodeURIComponent(`Name: ${data.get('name')}\nEmail: ${data.get('email')}\nGuests: ${data.get('guests')}\nDate: ${data.get('date')}\nTime: ${data.get('time')}\nNotes: ${data.get('notes')||'None'}\n\nThis is a reservation request from the website.`);document.getElementById('formMessage').textContent='Opening your email app to send the request…';window.location.href=`mailto:${BOOKING_EMAIL}?subject=${subject}&body=${body}`});

document.getElementById('year').textContent=new Date().getFullYear();