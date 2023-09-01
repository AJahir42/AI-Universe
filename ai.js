const laodTools = async () => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    const res = await fetch(url)
    const data = await res.json();
    displayTools(data.data.tools)

}

// generate dynamic url

const displayTools = (tools) => {


    tools.forEach(tool => {
        const url = `https://openapi.programming-hero.com/api/ai/tool/${tool.id}`
        fetch(url)
            .then(res => res.json())
            .then(data => displayAi(data))
    });


}

// display Ai tools in cards

const displayAi = (technology) => {
    const techContainer = document.getElementById('tech-container')
    // console.log(technology.data.features)
    const techDiv = document.createElement('div')
    techDiv.classList.add('col')

    // array of objects of the features
    const valuesFeature=Object.values(technology.data.features)
    // array of features
    const features=valuesFeature.map(feature=>feature.feature_name)

    // console.log(valuesFeature)
    console.log(features)



    techDiv.innerHTML = `
        <div class="card h-100">
          <img src="${technology.data.image_link[0]}" class="card-img-top" alt="...">
          <div class="card-body">
              <h5 class="card-title">Features</h5> 
          </div>
          
        <div>
        <ol>
          ${features.map((item, i) => `<li>${item}</li>`).join('')}
        </ol>   
        </div>
            <div class="card-footer">
              <small class="text-body-secondary">Last updated 3 mins ago</small>
            </div>
        </div>
      `
    techContainer.appendChild(techDiv)



}


laodTools()