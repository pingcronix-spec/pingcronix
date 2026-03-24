// WhatsApp
function openWhatsApp(){
  const numero = '+5939XXXXXXXX';
  const texto = encodeURIComponent('Hola, estoy interesado en sus servicios.');
  window.open('https://wa.me/' + numero.replace(/\+/g,'') + '?text=' + texto,'_blank');
}

// Telegram
function openTelegram(){
  const usuario = 'tu_usuario_telegram';
  window.open('https://t.me/' + usuario.replace(/^@/,''),'_blank');
}

// Animaciones y red de nodos
document.addEventListener("DOMContentLoaded", ()=>{
  // Animaciones iniciales
  document.querySelectorAll(".reveal").forEach((el,i)=>{
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    setTimeout(()=>{
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
      el.style.transition = "all 0.6s ease-out";
    }, i * 200);
  });

  // Red de nodos
  const canvas = document.getElementById('techCanvas');
  if(canvas){
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const nodes = [];
    const nodeCount = 100;
    for(let i=0;i<nodeCount;i++){
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random()-0.5)*0.5,
        vy: (Math.random()-0.5)*0.5
      });
    }

    function animateNodes(){
      ctx.fillStyle='rgba(15,23,36,0.15)';
      ctx.fillRect(0,0,width,height);

      nodes.forEach(n=>{
        n.x += n.vx;
        n.y += n.vy;
        if(n.x>width)n.x=0;
        if(n.x<0)n.x=width;
        if(n.y>height)n.y=0;
        if(n.y<0)n.y=height;

        ctx.fillStyle='#0ff';
        ctx.beginPath();
        ctx.arc(n.x,n.y,2,0,Math.PI*2);
        ctx.fill();
      });

      for(let i=0;i<nodes.length;i++){
        for(let j=i+1;j<nodes.length;j++){
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx*dx + dy*dy);
          if(dist < 100){
            ctx.strokeStyle = 'rgba(0,255,255,' + (1 - dist/100) + ')';
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(animateNodes);
    }
    animateNodes();

    window.addEventListener('resize', ()=>{
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });
  }

  // Observer para fade-in, slide y lista
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
      }
    });
  }, {threshold:0.2});

  document.querySelectorAll('.fade-in, .slide-left, .slide-right, .service-details ul li').forEach(el => {observer.observe(el);});

  // Parallax para imágenes de servicio
  const parallaxImages = document.querySelectorAll('.service-image img');
  window.addEventListener('scroll', () => {
    parallaxImages.forEach(img => {
      const speed = 0.3;
      const offset = window.scrollY * speed;
      img.style.transform = `translateY(${offset}px)`;
    });
  });
});

// Abrir servicios desde index.html
function openService(service){
  let url = '';
  switch(service){
    case 'redes': url='pages/servicios.html#redes'; break;
    case 'cctv': url='pages/servicios.html#cctv'; break;
    case 'pc': url='pages/servicios.html#pc'; break;
    case 'impresoras': url='pages/servicios.html#impresoras'; break;
    case 'licencias': url='pages/servicios.html#licencias'; break;
    case 'auditoria': url='pages/servicios.html#auditoria'; break;
    case 'ciberseguridad': url='pages/servicios.html#ciberseguridad'; break;
  }
  window.location.href = url;
}
