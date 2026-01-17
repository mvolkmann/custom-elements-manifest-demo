const html = String.raw;

const template = document.createElement("template");
template.innerHTML = html`
  <style>
    :host {
      --font-size: 2rem;
      font-size: var(--font-size);
    }

    .counter {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    button {
      background-color: var(--button-bg-color, lightgreen);
      border: none;
      border-radius: 50%;
      font-size: var(--font-size);
      height: calc(var(--font-size) * 1.2);
      width: calc(var(--font-size) * 1.2);
    }

    button:disabled {
      opacity: 0.7;
    }
  </style>
  <div>
    <button type="button">-</button>
    <span></span>
    <button type="button">+</button>
  </div>
`;

/**
 * This is a counter web component.
 * @attr {number} count - initial count
 * @prop {number} [count=3] - current count
 * @tag my-counter
 */
class MyCounter extends HTMLElement {
  count = 3;
  #decBtn;
  #span;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const dom = template.content.cloneNode(true);
    const [decBtn, incBtn] = dom.querySelectorAll("button");
    this.#decBtn = decBtn;
    decBtn.addEventListener("click", () => this.decrement());
    incBtn.addEventListener("click", () => this.increment());
    this.#span = dom.querySelector("span");
    this.#update(0);
    this.shadowRoot.replaceChildren(dom);
  }

  decrement() {
    if (this.count > 0) this.#update(-1);
  }

  increment() {
    this.#update(1);
  }

  #update(delta) {
    this.count += delta;
    this.#span.textContent = this.count;
    this.#decBtn.toggleAttribute("disabled", this.count === 0);
  }
}

customElements.define("my-counter", MyCounter);
