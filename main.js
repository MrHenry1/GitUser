    import { api } from "./config.js";


class App {
  constructor() {
    this.users = []
    
    
    this.listEl = document.getElementById("list")
    this.form = document.getElementById("form")
    this.input = document.querySelector("input[name='user']")
    
    
    this.submitHandler()
    this.loadSearches()
    
  }
  
  submitHandler() {
    
    
    this.form.onsubmit = event => this.apiGet(event)
    
  }
  
  loadSearches() {
    var state = document.getElementById('state')
    state.innerHTML = ""
    
    let searchs = document.createElement("p")
    
    searchs.appendChild(document.createTextNode(`${this.users.length} Users!`))
    searchs.setAttribute("id", "results")
    
    
    
    state.appendChild(searchs)
  }
  
  loading(state = true) {
    if(state === true) {
      var place = document.getElementById("state")
      place.innerHTML =""
      
      var wait = document.createElement("p")
      wait.appendChild(document.createTextNode("Searching..."))
      wait.setAttribute("id", "loader")
      
      
      place.appendChild(wait)
    }
    else {
      var searching = document.getElementById("loader")
      searching ? searching.remove() : "nada"
    }
  }
  
  async apiGet(event) {
    event.preventDefault()
    
    
    const userInp = this.input.value
    
    this.input.value = ""
    
    
    
    try {
      
      if(userInp.length === 0)
          return;
      
      this.loading()
      
      this.response = await api.get(`/users/${userInp}`)
      
      var name = this.response.data.name === null ? this.response.data.login : this.response.data.name
      
      var {bio, avatar_url, html_url } = this.response.data
      
      
      
      
    this.users.push({
        name, 
        bio,
        avatar_url,
        html_url, 
      })
      
      
      
    this.render()
    }
    catch(err) {
      alert('Não encontrado')
      console.error(err)
      this.loadSearches()
      
    }
    
    this.loading(false)
    
  }
  
  
  textView(text) {
    if(text === null) {
      return "Sem Biografia!"
    }
    else {
      if(text.length > 31) {
        var bio = text.substr(0, 31)
        
        return bio
      }
      else {
        return text
      }
    }
  }
  
  
  showMore(bio, text, li, ref) {
    var more = document.createElement("i")
    more.appendChild(document.createTextNode(" | Mais"))
    more.onclick = function() {
      bio.innerHTML = ""
      bio.appendChild(document.createTextNode(text))
      
      li.style.height = "140px"
      ref.style.marginTop = "110px"
    }
    
    return more
  }
  
  render() {
    this.listEl.innerHTML = ""
    
    
    
    this.users.forEach( user => {
      
  
      let li = document.createElement('li')
  
    
      
      let img = document.createElement('img')
      img.setAttribute("src", user.avatar_url)
      
      let strong = document.createElement("strong")
      strong.appendChild(document.createTextNode(user.name))
      
      
      
      let reference = document.createElement("a")
      reference.setAttribute("href", user.html_url)
      reference.setAttribute("target", "_blank")
      reference.appendChild(document.createTextNode("Acessar na GitHub"))
      
      let bio = document.createElement("p")
      bio.appendChild(document.createTextNode(this.textView(user.bio)))
      bio.appendChild(this.textView(user.bio) !== "Sem Biografia!" ? this.showMore(bio, user.bio, li, reference) : document.createTextNode(""))
      
      strong.style.opacity = 0
      reference.style.opacity = 0
      bio.style.opacity = 0
   
     li.appendChild(img)
     li.appendChild(strong)
     li.appendChild(bio)
     li.appendChild(reference)
   
     this.loadSearches()
     
     li.style.animation = "showUser 1.2s forwards"
     li.addEventListener("animationend", (ani) => {
       if(ani.animationName === "showUser") {
         strong.style.animation = "showName .50s forwards"
         reference.style.animation = "showRef .60s forwards"
         bio.style.animation = "showBio .70s forwards"
       }
     })
    
    
      
        this.listEl.appendChild(li)
    })
  
  }
}

new App()



    


