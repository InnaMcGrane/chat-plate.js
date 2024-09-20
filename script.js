function createElement(html) {
  const element = document.createElement("div");
  element.insertAdjacentHTML("beforeend", html);
  return element.firstElementChild;
}

const data = [
  {
    id: 36245,
    name: "John",
    photo:
      "https://sun9-9.userapi.com/impf/c849028/v849028127/1910b2/WStbc12InzM.jpg?size=320x399&quality=96&sign=959a23f5d74f782d2632f763b14dcc00&c_uniq_tag=0NH1KEHYAObR1WODQ2c-W_MSM2zS0MA9iHKuAtu71lo&type=album",
    icon: "check",
  },
  {
    id: 345,
    name: "Mary",
    photo:
      "https://sun9-9.userapi.com/impf/c849028/v849028127/1910b2/WStbc12InzM.jpg?size=320x399&quality=96&sign=959a23f5d74f782d2632f763b14dcc00&c_uniq_tag=0NH1KEHYAObR1WODQ2c-W_MSM2zS0MA9iHKuAtu71lo&type=album",
    icon: "check",
  },
  {
    id: 567,
    name: "Garry",
    photo:
      "https://sun9-9.userapi.com/impf/c849028/v849028127/1910b2/WStbc12InzM.jpg?size=320x399&quality=96&sign=959a23f5d74f782d2632f763b14dcc00&c_uniq_tag=0NH1KEHYAObR1WODQ2c-W_MSM2zS0MA9iHKuAtu71lo&type=album",
    icon: "check",
  },
  {
    id: 768,
    name: "Mark",
    photo:
      "https://sun9-9.userapi.com/impf/c849028/v849028127/1910b2/WStbc12InzM.jpg?size=320x399&quality=96&sign=959a23f5d74f782d2632f763b14dcc00&c_uniq_tag=0NH1KEHYAObR1WODQ2c-W_MSM2zS0MA9iHKuAtu71lo&type=album",
    icon: "check",
  },
];

class ChatPlates {
  _state = {
    users: [],
  };

  constructor(data, UserCard, Avatar) {
    this._UserCard = UserCard;
    this._Avatar = Avatar;
    this._data = data;
    this._init();
  }

  _init() {
    this._element = createElement(this._getTemplate());
    this._addListeners();
    this._render();
  }

  _setStateUsers(id) {
    if (this._state.users.includes(id)) {
      // id уже есть в массиве, надо удалять
      const filteredUsers = this._state.users.filter((el) => el !== id);
      this._state.users = filteredUsers;
      return;
    }

    // id нет в массиве, надо добавлять
    this._state.users = [...this._state.users, id];
  }

  _setStateUsersHandler(id) {
    this._setStateUsers(id);
    this._render();
  }

  _addListeners() {
    this._element.querySelector(".chat-plates__input").addEventListener("change", (event) => {
      if (this._state.users.length === 0 ){
        console.log('error: empty users');
        return;
      }

      const serverData = {
        message: event.target.value,
        users: this._state.users,
      };

      console.log(JSON.stringify(serverData));

      // fetch('https://google.com/api/create/message', {
      // body: JSON.stringify(serverData)
      // }).then(responce => {
      //   if (responce.status !== 200) {
      //     return 'server error'
      //   }
      // })

      // console.log(`сообщение: ${event.target.value}, отправлено: ${this._state.users}`)
    });
  }

  _getTemplate() {
    return `<div class="chat-plates">
        <div class="chat-plates__list"></div>
         <input class="chat-plates__input" type="text" placeholder="text me" />
         <button class="btn btn--send chat-plates__btn">send</button>
         </div>`;
  }

  _generateItems() {
    return this._data.map((el) => {
      return new this._UserCard({ ...el, active: this._state.users.includes(el.id) }, this._Avatar, this._setStateUsersHandler.bind(this)).element;
    });
  }

  _render() {
    this._element.querySelector(".chat-plates__list").textContent = "";
    this._element.querySelector(".chat-plates__list").append(...this._generateItems());
  }

  get element() {
    return this._element;
  }
}

class UserCard {
  constructor({ id, name, photo, icon, active }, Avatar, setStateUsersHandler) {
    this._id = id;
    this._name = name;
    this._photo = photo;
    this._icon = icon;
    this._active = active;
    this._Avatar = Avatar;
    this._setStateUsersHandler = setStateUsersHandler;
    this._init();
  }

  _init() {
    this._element = createElement(this._getTemplate());
    this._addListeners();
    this._render();
  }

  _addListeners() {
    this._element.addEventListener("click", () => {
      this._setStateUsersHandler(this._id);
    });
  }

  _getTemplate() {
    return `<div class="user-card">
        <div class="user-card__avatar"></div>
      <span class="user-card__name">${this._name}</span>
      </div>`;
  }

  _render() {
    this._element.querySelector(".user-card__avatar").insertAdjacentElement(
      "beforeend",
      new this._Avatar({
        photo: this._photo,
        icon: this._icon,
        active: this._active,
      }).element
    );
  }

  get element() {
    return this._element;
  }
}

class Avatar {
  constructor({ photo, icon, active }) {
    this._photo = photo;
    this._icon = icon;
    this._active = active;
    this._init();
  }

  _init() {
    this._element = createElement(this._getTemplate());
  }

  _getTemplate() {
    // avatar--active
    return `<div class="avatar ${this._active === true ? "avatar--active" : ""}">
              <img
                class="avatar__img"
                src=${this._photo}
                alt=""
              />
              <div class="avatar__circle">
                <i class="fa-solid fa-${this._icon}"></i>
              </div>
            </div>`;
  }

  get element() {
    return this._element;
  }
}

const root = document.querySelector(".root");
// root.insertAdjacentElement(
//   "beforeend",
//   new Avatar({
//     photo:
//       "https://sun9-9.userapi.com/impf/c849028/v849028127/1910b2/WStbc12InzM.jpg?size=320x399&quality=96&sign=959a23f5d74f782d2632f763b14dcc00&c_uniq_tag=0NH1KEHYAObR1WODQ2c-W_MSM2zS0MA9iHKuAtu71lo&type=album",
//     icon: "check",
//   }).element
// );
// root.insertAdjacentElement("beforeend", new UserCard({name: "John"}, Avatar).element)
root.insertAdjacentElement("beforeend", new ChatPlates(data, UserCard, Avatar).element);
