class Usuario {
  constructor() {
    this.id;
    this.nome;
    this.apelido;
    this.email;
    this.senha;
  }

  criar(id, nome, email, apelido, senha) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.apelido = apelido;
    this.senha = senha;
  }

  atualizar(nome, email, apelido, senha) {
    this.nome = nome;
    this.email = email;
    this.apelido = apelido;
    this.senha = senha;
  }

  remover() {
    this.nome = null;
    this.email = null;
    this.apelido = null;
    this.senha = null;
  }

  atualizar(id, nome, email, apelido, senha) {
    if (this.id === id) {
      this.nome = nome;
      this.email = email;
      this.apelido = apelido;
      this.senha = senha;
    }
  }

  getPeloId(id) {
    if (this.id === id) {
      this.nome = nome;
      this.email = email;
      this.apelido = apelido;
      this.senha = senha;

      return this;
    }
  }

  getPeloNome(nome) {
    if (this.nome === nome) {
      this.nome = nome;
      this.email = email;
      this.apelido = apelido;
      this.senha = senha;

      return this;
    }
  }

  getConta(nome, senha) {
    if (this.nome === nome && this.senha === senha) {
      this.nome = nome;
      this.email = email;
      this.apelido = apelido;
      this.senha = senha;

      return this;
    }
  }
}

class Usuarios {
  constructor() {
    this.usuarios = [];
    this.numUsuarios = 0;
  }

  criar(nome, email, apelido, senha) {
    console.log("entrou criar");
    usuario = new Usuario();

    usuario.criar(this.numUsuarios, nome, email, apelido, senha);

    this.usuarios.append(usuario);
    this.numUsuarios = this.numUsuarios + 1;
  }

  atualizar(nome, email, apelido, senha) {
    const index = this.getPeloNome(nome);

    if (index > -1) {
      this.usuarios[index].atualizar(nome, email, apelido, senha);
    }
  }

  remover(id) {
    const index = this.getPeloNome(nome);

    if (index > -1) {
      this.usuarios[index].remover(nome, email, apelido, senha);
      this.usuarios.splice(index, 1);
    }
  }

  getPeloId(id) {
    const index = this.usuarios.findIndex((usuario) => usuario.getPeloId(id));

    if (index > -1) {
      return this.usuarios[index];
    }

    throw Error("Usuário não encontrado!");
  }

  getPeloNome(nome) {
    const index = this.usuarios.findIndex((usuario) =>
      usuario.getPeloNome(nome)
    );

    if (index > -1) {
      return this.usuarios[index];
    }

    throw Error("Usuário não encontrado!");
  }

  getConta(nome, senha) {
    const index = this.usuarios.findIndex((usuario) =>
      usuario.getConta(nome, senha)
    );

    if (index > -1) {
      return this.usuarios[index];
    }

    throw Error("Usuário não encontrado!");
  }
}

class TelaLogin {
  constructor() {
    this.app = this.getElement("#root");
  }

  createElement(tag, className) {
    const element = document.createElement(tag);

    if (className) element.classList.add(className);

    return element;
  }

  getElement(selector) {
    const element = document.querySelector(selector);

    return element;
  }

  ligarEntrar(handler) {
    const entrar = this.getElement(".formEntrar");

    entrar.addEventListener("submit", (event) => {
      event.preventDefault();
      handler(event.target.email, event.target.password);
    });
  }
}
class TelaCadastro {
  constructor() {
    this.app = this.getElement("#root");
  }

  createElement(tag, className) {
    const element = document.createElement(tag);

    if (className) element.classList.add(className);

    return element;
  }

  getElement(selector) {
    const element = document.querySelector(selector);

    return element;
  }

  ligarCadastro(handler) {
    const cadastrar = this.getElement(".formCadastro");

    cadastrar.addEventListener("submit", (event) => {
      event.preventDefault();
      handler(
        event.target.name,
        event.target.email,
        event.target.nickname,
        event.target.password
      );
    });
  }
}

class ManterUsuarios {
  constructor(model, viewCadastro, viewLogin) {
    this.model = model;
    this.viewCadastro = viewCadastro;
    this.viewLogin = viewLogin;

    this.viewCadastro.ligarCadastro(this.lidarCadastro);
    this.viewLogin.ligarEntrar(this.lidarEntrar);
  }

  lidarCadastro(nome, email, apelido, senha) {
    console.log(this.model);
    this.model.criar(nome, email, apelido, senha);
  }

  lidarEntrar(email, senha) {
    try {
      this.model.getConta(email, senha);
      window.alert("Usuário logado com sucesso!");
    } catch (err) {
      window.alert("Erro no login!");
    }
  }
}

const app = new ManterUsuarios(
  new Usuarios(),
  new TelaCadastro(),
  new TelaLogin()
);
