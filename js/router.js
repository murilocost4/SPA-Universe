export class Router {
    routes = {} 
  
    add(routeName, page) {
      this.routes[routeName] = page
    }
    
    route(event) {
      event = event || window.event
      event.preventDefault()
  
      window.history.pushState({}, "", event.target.href)
  
      this.handle()
    }
  
    handle() {
      const { pathname }  = window.location
      const route = this.routes[pathname] || this.routes[404]
      fetch(route)
      .then(data => data.text())
      .then(html => {
        document.querySelector('#app').innerHTML = html
        let imageName = pathname.substring(1)
        let imagePath = '/assets/bg-'+imageName+'.png'
            document.querySelector('body').style.backgroundImage = "url("+imagePath+")"

            const elements = document.querySelectorAll('a')
            for (const element of elements) {
                element.style.color = "#C4C4CC"
                element.style.fontWeight = "normal"
            }

            document.getElementById(imageName).style.fontWeight = "bold"
            document.getElementById(imageName).style.color = "white"
            
      })
    }
  
  }