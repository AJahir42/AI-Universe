const laodTools = async (dataLimit) => {
    // start loader 
    toggleSpinner(true);
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    const res = await fetch(url)
    const data = await res.json();
    displayTools(data.data.tools,dataLimit)

}

// display Ai tools in cards

const displayTools = (technologies, dataLimit) => {
    const techContainer = document.getElementById('tech-container')
    techContainer.innerText=""

    const showAll=document.getElementById('show-all')
    if(dataLimit && technologies.length>6){
        technologies=technologies.slice(0,6);
        
        showAll.classList.remove('d-none')
    }
    else{
        showAll.classList.add('d-none')
    }

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
   
    // stop loader 
    toggleSpinner(false);

}

const loadToolDetails=async id=>{
   const url=`https://openapi.programming-hero.com/api/ai/tool/${id}`
   const res=await fetch(url);
   const data=await res.json();
   openModal(data);
   
}

const openModal=tool=>{
    console.log(tool.data)
    console.log(tool.data.pricing!==null?tool.data.pricing[0].price: 'no data found')
    
    const toolDescription=document.getElementById("description")
    // object of objects of features
    toolDescription.innerText=tool.data.description

    const price1=document.getElementById("price-1")
    price1.innerText=tool.data.pricing!==null?tool.data.pricing[0].price: 'no data found'
    const price2=document.getElementById("price-2")
    price2.innerText=tool.data.pricing!==null?tool.data.pricing[1].price: 'no data found'
    const price3=document.getElementById("price-3")
    price3.innerText=tool.data.pricing!==null?tool.data.pricing[2].price: 'no data found'

    // array of object values
    const cardFeatures=Object.values(tool.data.features)
    // features added in card
    const featureDiv=document.getElementById('card-features')
    featureDiv.innerHTML=`
    <h4>Features</h4>
    ${cardFeatures.map(item=>`
    
    <li>${item.feature_name}</li>
    `).join("")}`

    const integrationsDiv=document.getElementById("card-integrations")
    const integrationsElements=tool.data.integrations
    integrationsDiv.innerHTML=`
    <h4>Integrations</h4>
    ${integrationsElements?.map(item=>`
    <li>${item}</li>
    `).join("")}`

    // card image added 
    const cardImage=document.getElementById("card-image")
    cardImage.innerText=""
    const cardImageDiv=document.createElement("div")
    
    cardImageDiv.classList.add("mt-3")
    cardImageDiv.innerHTML=`
    
    <div>
        <div style="background-image: url('${tool.data.image_link[0]}');background-size:contain;background-repeat:no-repeat;height:50vh;">
           
            <div class="position-absolute top-0 end-0 me-5 mt-5 pe-4">
            <button type="button" class="btn btn-danger me-5">${tool.data.accuracy.score*100}<span>% accuracy</span>
            </button>
            </div>

        </div>
        <div>
            <div>
                <h3>Hi, How are you doing today?</h3>
                <p>${tool.data.accuracy.description}</p>
            </div>
            
        </div>

    </div>
    
    `
    cardImage.appendChild(cardImageDiv)

}

document.getElementById('sort-btn').addEventListener('click',function(){
    fetch(`https://openapi.programming-hero.com/api/ai/tools`)
    .then(res=>res.json())
    .then(data=>sortTools(data.data.tools))
})

// sort by date 
const sortTools=(aiTools)=>{
    aiTools.sort((a, b) => new Date(a.published_in) - new Date(b.published_in));
    // console.log(aiTools)
    const techContainer = document.getElementById('tech-container')
    techContainer.innerText=""
    displayTools(aiTools)

}

// add loader 
const toggleSpinner=isLoading=>{
    const loaderSection=document.getElementById('loader');
    if(isLoading){
        loaderSection.classList.remove('d-none')
    }
    else{
        loaderSection.classList.add('d-none') 
    }

}


// display 6 tools only 
laodTools(6)

// show all 
document.getElementById('btn-show-all').addEventListener('click',function(){
    laodTools()
})