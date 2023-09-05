const laodTools = async () => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    const res = await fetch(url)
    const data = await res.json();
    displayTools(data.data.tools)

}

// display Ai tools in cards

const displayTools = (technologies) => {
    const techContainer = document.getElementById('tech-container')
    // console.log(technologies)  
    technologies.forEach(technology => {
        const techDiv = document.createElement('div')
        // console.log(technology.id)
        techDiv.classList.add('col')
        techDiv.innerHTML = `
        <div class="card h-100">
          <img src="${technology.image}" class="card-img-top" alt="...">
          <div class="card-body">
              <h5 class="card-title">Features</h5> 
          </div>
          
            <div>
                <ol>
                 ${technology.features.map((item, i) => `<li>${item}</li>`).join('')}
                </ol>   
            </div>
            <div class="card-footer p-5">
               
                <h4>${technology.name}</h4>
                
                

                <div class="position-relative mb-3">
                    <div class="position-absolute top-0 start-0">
                        <i class="fa-regular fa-calendar">  ${technology.published_in}</i>
                    </div>
                    <div class="position-absolute top-0 end-0">
                        <button onclick="loadToolDetails('${technology.id}')" type="button" class="btn btn-light btn-lg float-right" data-bs-toggle="modal" data-bs-target="#toolDetailModal"> <i class="fa-solid fa-arrow-right" style="color: #fb1818;"></i></button>
                    </div>
                </div>
                
                                  
            </div>
        </div>
      `
      techContainer.appendChild(techDiv)

    });
   
 

}

const loadToolDetails=async id=>{
   const url=`https://openapi.programming-hero.com/api/ai/tool/${id}`
   const res=await fetch(url);
   const data=await res.json();
   openModal(data);
   
}

const openModal=tool=>{
    console.log(tool.data.integrations)
    const toolDescription=document.getElementById("description")
    // object of objects of features
    toolDescription.innerText=tool.data.description
    // array of object values
    const cardFeatures=Object.values(tool.data.features)
    // features added in card
    const featureDiv=document.getElementById('card-features')
    featureDiv.innerHTML=`
    <h4>Features</h4>
    ${cardFeatures.map(item=>`
    
    <li>${item.feature_name}</li>
    `).join("")}`



}

laodTools()