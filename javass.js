window.addEventListener("scroll", () => {
  const header = document.querySelector(".main-visual");
  const navbar = document.querySelector(".navbar");

  if (window.scrollY > 100) {
    header.style.height = "50vh";  // 영상 줄이기
    navbar.classList.remove("hidden");  // 내비게이션 보이기
  } else {
    header.style.height = "100vh";
    navbar.classList.add("hidden");
  }
});




document.getElementById("fighterImage").onclick = function(){
    var modal = document.getElementById("imageModal");
    var modalImg = document.getElementById("modalImg");
    modal.style.display = "block";
    modalImg.src = this.src;
}

document.querySelector(".close").onclick = function() {
  document.getElementById("imageModal").style.display = "none";
}





document.getElementById("fighterImage2").onclick = function(){
    var modal = document.getElementById("imageModal2");
    var modalImg = document.getElementById("modalImg2");
    modal.style.display = "block";
    modalImg.src = this.src;
}

document.querySelector(".close2").onclick = function() {
  document.getElementById("imageModal2").style.display = "none";
}



const imgs = document.querySelectorAll(".mySwiper2 .swiper-slide img");

imgs.forEach((img) => {
  img.addEventListener("mouseenter", () => {
    swiper2.autoplay.stop();
  });
  img.addEventListener("mouseleave", () => {
    swiper2.autoplay.start();
  });
});




 const modal = document.getElementById("video-modal");
  const closeBtn = document.querySelector(".close3");
  const iframe = modal.querySelector("iframe");

  const in2 = document.getElementById("in2");

  // 영상 원래 주소 (autoplay 없이)
  const baseURL = "https://www.youtube.com/embed/kUYCTGoHB88?mute=1&autoplay=1&clip=UgkxcaRhG7FEWjOnooCAS2DhGcRVMZAwMIVq&clipt=ELafEhj98BI";

  in2.addEventListener("click", () => {
    iframe.src = baseURL;         // autoplay=1로 바꿔서 재생
    modal.style.display = "flex";
  });

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
    iframe.src = "";             // 정지
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
      iframe.src = "";           // 정지
    }
  });

// 장바구니 기능
class ShoppingCart {
  constructor() {
    this.items = [];
    this.init();
  }

  init() {
    this.loadCart();
    this.bindEvents();
    this.updateCartDisplay();
  }

  bindEvents() {
    // 장바구니 버튼 이벤트
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const productId = e.target.dataset.productId;
        const productName = e.target.dataset.productName;
        const productPrice = parseInt(e.target.dataset.productPrice);
        
        this.addItem(productId, productName, productPrice);
        
        // 버튼 애니메이션 효과
        e.target.style.transform = 'scale(0.95)';
        setTimeout(() => {
          e.target.style.transform = 'scale(1)';
        }, 150);
      });
    });

    // 장바구니 아이콘 클릭
    document.getElementById('cartIcon').addEventListener('click', () => {
      this.showCart();
    });

    // 장바구니 모달 닫기
    document.querySelector('.close-cart').addEventListener('click', () => {
      this.hideCart();
    });

    // 모달 외부 클릭 시 닫기
    document.getElementById('cartModal').addEventListener('click', (e) => {
      if (e.target.id === 'cartModal') {
        this.hideCart();
      }
    });

    // 장바구니 비우기
    document.getElementById('clearCart').addEventListener('click', () => {
      this.clearCart();
    });

    // 주문하기
    document.getElementById('checkoutBtn').addEventListener('click', () => {
      this.checkout();
    });
  }

  addItem(id, name, price) {
    const existingItem = this.items.find(item => item.id === id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.items.push({
        id: id,
        name: name,
        price: price,
        quantity: 1
      });
    }
    
    this.saveCart();
    this.updateCartDisplay();
    this.showAddToCartMessage(name);
  }

  removeItem(id) {
    this.items = this.items.filter(item => item.id !== id);
    this.saveCart();
    this.updateCartDisplay();
  }

  updateQuantity(id, newQuantity) {
    const item = this.items.find(item => item.id === id);
    if (item) {
      if (newQuantity <= 0) {
        this.removeItem(id);
      } else {
        item.quantity = newQuantity;
        this.saveCart();
        this.updateCartDisplay();
      }
    }
  }

  clearCart() {
    if (this.items.length === 0) {
      alert('장바구니가 이미 비어있습니다.');
      return;
    }
    
    if (confirm('장바구니를 비우시겠습니까?')) {
      this.items = [];
      this.saveCart();
      this.updateCartDisplay();
      this.hideCart();
    }
  }

  getTotal() {
    return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  getItemCount() {
    return this.items.reduce((count, item) => count + item.quantity, 0);
  }

  saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.items));
  }

  loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.items = JSON.parse(savedCart);
    }
  }

  updateCartDisplay() {
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    // 장바구니 아이템 수 업데이트
    cartCount.textContent = this.getItemCount();
    
    // 장바구니 아이템 목록 업데이트
    if (this.items.length === 0) {
      cartItems.innerHTML = '<div class="empty-cart-message">장바구니가 비어있습니다.</div>';
    } else {
      cartItems.innerHTML = this.items.map(item => `
        <div class="cart-item" data-id="${item.id}">
          <div class="cart-item-info">
            <div class="cart-item-name">${item.name}</div>
            <div class="cart-item-price">₩${item.price.toLocaleString()}</div>
          </div>
          <div class="cart-item-quantity">
            <button class="quantity-btn" onclick="cart.updateQuantity('${item.id}', ${item.quantity - 1})">-</button>
            <span class="quantity-display">${item.quantity}</span>
            <button class="quantity-btn" onclick="cart.updateQuantity('${item.id}', ${item.quantity + 1})">+</button>
          </div>
          <div class="cart-item-total">₩${(item.price * item.quantity).toLocaleString()}</div>
          <button class="remove-item" onclick="cart.removeItem('${item.id}')">삭제</button>
        </div>
      `).join('');
    }
    
    // 총 금액 업데이트
    cartTotal.textContent = `₩${this.getTotal().toLocaleString()}`;
  }

  showCart() {
    document.getElementById('cartModal').style.display = 'block';
    this.updateCartDisplay();
  }

  hideCart() {
    document.getElementById('cartModal').style.display = 'none';
  }

  showAddToCartMessage(productName) {
    // 간단한 알림 메시지
    const message = document.createElement('div');
    message.style.cssText = `
      position: fixed;
      top: 100px;
      right: 20px;
      background-color: rgb(255, 200, 0);
      color: #000;
      padding: 15px 20px;
      border-radius: 5px;
      z-index: 10000;
      font-weight: bold;
      box-shadow: 0 4px 10px rgba(0,0,0,0.3);
      transform: translateX(100%);
      transition: transform 0.3s ease;
    `;
    message.textContent = `${productName}이(가) 장바구니에 추가되었습니다!`;
    
    document.body.appendChild(message);
    
    // 애니메이션 효과
    setTimeout(() => {
      message.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
      message.style.transform = 'translateX(100%)';
      setTimeout(() => {
        document.body.removeChild(message);
      }, 300);
    }, 2000);
  }

  checkout() {
    if (this.items.length === 0) {
      alert('장바구니가 비어있습니다.');
      return;
    }
    
    const total = this.getTotal();
    const itemCount = this.getItemCount();
    
    const message = `
주문 정보:
총 ${itemCount}개 상품
총 금액: ₩${total.toLocaleString()}

주문이 완료되었습니다!
감사합니다.
    `;
    
    alert(message);
    this.clearCart();
    this.hideCart();
  }
}

// 장바구니 인스턴스 생성
const cart = new ShoppingCart();

// 투표 기능
class VoteSystem {
  constructor() {
    this.votes = this.loadVotes();
    this.init();
  }

  init() {
    this.bindVoteEvents();
    this.updateVoteDisplay();
  }

  bindVoteEvents() {
    document.querySelectorAll('.vote-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const fighter = e.target.dataset.fighter;
        const fightId = e.target.dataset.fightId;
        
        this.vote(fighter, fightId, e.target);
      });
    });
  }

  vote(fighter, fightId, button) {
    // 이미 투표했는지 확인
    const votedKey = `voted_${fightId}`;
    if (localStorage.getItem(votedKey)) {
      this.showVoteMessage('이미 투표하셨습니다!');
      return;
    }

    // 투표 애니메이션
    button.classList.add('voting');
    
    setTimeout(() => {
      button.classList.remove('voting');
      
      // 투표 처리
      this.processVote(fighter, fightId);
      
      // 투표 완료 표시
      button.classList.add('voted');
      button.innerHTML = `<i class="fas fa-check"></i> 투표 완료`;
      
      // 투표 기록 저장
      localStorage.setItem(votedKey, fighter);
      
      // 투표 완료 메시지
      this.showVoteMessage(`${fighter} 승리 예측 투표 완료!`);
      
    }, 300);
  }

  processVote(fighter, fightId) {
    // 현재 투표 데이터 가져오기
    const voteKey = `fight_votes_${fightId}`;
    let currentVotes = this.votes[fightId] || { left: 20, right: 80 };
    
    // 0.1%씩 증가
    if (fighter === '정원희') {
      currentVotes.left += 0.1;
      currentVotes.right -= 0.1;
    } else {
      currentVotes.right += 0.1;
      currentVotes.left -= 0.1;
    }
    
    // 최소값 보장
    currentVotes.left = Math.max(0, currentVotes.left);
    currentVotes.right = Math.max(0, currentVotes.right);
    
    // 투표 데이터 저장
    this.votes[fightId] = currentVotes;
    this.saveVotes();
    
    // 화면 업데이트
    this.updateVoteDisplay();
  }

  updateVoteDisplay() {
    // 첫 번째 경기 투표 업데이트
    const fight1Votes = this.votes[1] || { left: 20, right: 80 };
    
    // 퍼센트 표시 업데이트
    document.getElementById('vote-percentage-1-left').textContent = `${fight1Votes.left.toFixed(1)}%`;
    document.getElementById('vote-percentage-1-right').textContent = `${fight1Votes.right.toFixed(1)}%`;
    
    // 게이지 바 업데이트
    const leftBar = document.getElementById('vote-bar-1-left');
    const rightBar = document.getElementById('vote-bar-1-right');
    
    if (leftBar && rightBar) {
      leftBar.style.width = `${fight1Votes.left}%`;
      leftBar.textContent = `${fight1Votes.left.toFixed(1)}%`;
      rightBar.style.width = `${fight1Votes.right}%`;
      rightBar.textContent = `${fight1Votes.right.toFixed(1)}%`;
    }
  }

  showVoteMessage(message) {
    // 기존 메시지 제거
    const existingMessage = document.querySelector('.vote-message');
    if (existingMessage) {
      existingMessage.remove();
    }

    // 새 메시지 생성
    const voteMessage = document.createElement('div');
    voteMessage.className = 'vote-message';
    voteMessage.textContent = message;
    
    document.body.appendChild(voteMessage);
    
    // 애니메이션 표시
    setTimeout(() => {
      voteMessage.classList.add('show');
    }, 100);
    
    // 2초 후 제거
    setTimeout(() => {
      voteMessage.classList.remove('show');
      setTimeout(() => {
        if (voteMessage.parentNode) {
          voteMessage.parentNode.removeChild(voteMessage);
        }
      }, 300);
    }, 2000);
  }

  saveVotes() {
    localStorage.setItem('fight_votes', JSON.stringify(this.votes));
  }

  loadVotes() {
    const savedVotes = localStorage.getItem('fight_votes');
    return savedVotes ? JSON.parse(savedVotes) : {};
  }

  // 투표 초기화 (테스트용)
  resetVotes() {
    this.votes = {};
    localStorage.removeItem('fight_votes');
    localStorage.removeItem('voted_1');
    this.updateVoteDisplay();
    
    // 버튼 상태 초기화
    document.querySelectorAll('.vote-btn').forEach(btn => {
      btn.classList.remove('voted');
      btn.innerHTML = `<i class="fas fa-fist-raised"></i> ${btn.dataset.fighter} 승리 예측`;
    });
  }
}

// 투표 시스템 인스턴스 생성
const voteSystem = new VoteSystem();

// 개발자 콘솔에서 투표 초기화 가능
window.resetVotes = () => voteSystem.resetVotes();
