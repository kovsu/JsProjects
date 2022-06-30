const container = document.querySelector(".notes__container");

let item = document.createElement("div");
item.classList.add("notes__item");
item.innerHTML = `
  <header class="notes__header">
    <button class="notes__btn notes__btn-search">
      <i class="fa fa-magnifying-glass"></i>
    </button>
    <button class="notes__btn notes__btn-write">
      <i class="fa fa-pen-to-square"></i>
    </button>
    <button class="notes__btn notes__btn-delete">
      <i class="fa fa-trash-can"></i>
    </button>
  </header>
  <section class="notes__content">
    <p>
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrum
      dignissimos dolorum asperiores, error nam id. Unde, neque! Unde
      ducimus veniam a, molestiae itaque, dolor, tempore animi iusto
      perspiciatis quisquam repellat.
    </p>
  </section>
`;

const header = item.querySelector(".notes__header");
const btn = item.querySelector(".notes__btn-search");

btn.addEventListener("click", () => {
  header.classList.toggle("active");
});

container.appendChild(item);
