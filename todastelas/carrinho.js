document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".item");
  const totalElement = document.querySelector(".total .final span");
  const subtotalElement = document.querySelector(".total p:nth-child(1) span");
  const impostoElement = document.querySelector(".total p:nth-child(2) span");
  const cupomElement = document.querySelector(".total p:nth-child(4) span");
  
  function atualizarTotal() {
      let subtotal = 0;
      items.forEach(item => {
          const quantidade = parseInt(item.querySelector(".quantidade span").textContent);
          const preco = parseFloat(item.querySelector(".preco").textContent.replace("R$", "").replace(",", ""));
          subtotal += quantidade * preco;
      });

      const imposto = 50; // Valor fixo
      const desconto = parseFloat(cupomElement.textContent.replace("R$", "").replace(",", "")) || 0;
      const total = subtotal + imposto - desconto;
      
      subtotalElement.textContent = `R$ ${subtotal.toFixed(2)}`;
      impostoElement.textContent = `R$ ${imposto.toFixed(2)}`;
      totalElement.textContent = `R$ ${total.toFixed(2)}`;
  }

  items.forEach(item => {
      const increaseBtn = item.querySelector(".increase");
      const decreaseBtn = item.querySelector(".decrease");
      const removeBtn = item.querySelector(".remover");
      const quantityElement = item.querySelector(".quantidade span");

      increaseBtn.addEventListener("click", () => {
          let quantidade = parseInt(quantityElement.textContent);
          quantityElement.textContent = quantidade + 1;
          atualizarTotal();
      });

      decreaseBtn.addEventListener("click", () => {
          let quantidade = parseInt(quantityElement.textContent);
          if (quantidade > 1) {
              quantityElement.textContent = quantidade - 1;
              atualizarTotal();
          }
      });

      removeBtn.addEventListener("click", () => {
          item.remove();
          atualizarTotal();
      });
  });

  atualizarTotal();
});
