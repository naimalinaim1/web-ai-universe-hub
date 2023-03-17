// select element
const toolContainerEl = document.getElementById("tools-container");
const seeMoreBtn = document.getElementById("see-more-data-btn");
const modalEl = document.getElementById("toolInfoContainer");
let data;
let loadDataLen = 6;
// load ai data
const loadAiData = async () => {
  // loader start
  isLoader(true);
  const url = "https://openapi.programming-hero.com/api/ai/tools";
  const getData = await loadApiData(url);
  data = getData.data.tools;
  processData(loadDataLen);
};
let processInfo = false;
// process data
const processData = (showDataLen) => {
  let sliceData = data;
  if (showDataLen && sliceData.length > showDataLen) {
    sliceData = data.slice(0, showDataLen);
    seeMoreBtn.classList.remove("hidden");
  } else {
    // see more button hidden
    seeMoreBtn.classList.add("hidden");
    processInfo = !processInfo;
  }
  toolContainerEl.innerHTML = "";
  sliceData.forEach((toolInfo) => {
    displayAiData(toolInfo);
  });
  // loader end
  isLoader();
};

// display data
const displayAiData = (data) => {
  const { id, name, image: img, features, published_in: date } = data;

  const toolInfo = document.createElement("div");
  toolInfo.className = "card w-full border";
  toolInfo.innerHTML = `
    <figure class="px-6 pt-6">
        <img src="${img}" alt="Shoes" class="rounded-xl" />
    </figure>
    <div class="card-body p-0 pl-4 py-5">
        <h2 class="text-2xl font-bold">Features</h2>
        <!-- features list container -->
        <ol class="text-gray-500 pl-7 pb-4 mt-2 space-y-0.5" style="list-style: decimal;">
          ${
            features
              ? features?.map((feature) => `<li>${feature}</li>`).join("")
              : "No Feature found"
          }
        </ol>
        <hr class="w-11/12">
        <!-- technology information-->
        <div class="flex items-center justify-between pr-10 pt-4">
            <div>
                <h3 class="text-2xl font-bold">${name}</h3>
                <p class="flex items-center gap-2 text-gray-500 mt-1.5">
                    <i class="fa-regular fa-calendar-days"></i>
                    <span>${date ? date : "No date found"}</span>
                </p>
            </div>
            <label for="toolDetailsInfo">
              <i onclick="showDetails('${id}')" class="fa-solid fa-arrow-right text-red-500 bg-red-100 p-4 rounded-full" style="cursor: pointer;"></i>
            </label>
        </div>
    </div>
    `;
  toolContainerEl.appendChild(toolInfo);
};

const isLoader = (isLod) => {
  const loader = document.getElementById("loader");
  if (isLod) {
    loader.classList.remove("hidden");
  } else {
    loader.classList.add("hidden");
  }
};

const getToolInfo = async (id) => {
  const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
  const data = await loadApiData(url);
  return data.data;
};

const showDetails = async (id) => {
  // clear previous data
  modalEl.innerHTML = "";
  const toolInfo = await getToolInfo(id);
  const {
    description: des,
    pricing,
    features,
    integrations,
    accuracy,
    image_link,
    input_output_examples,
  } = toolInfo;
  modalEl.innerHTML = `
    <div class="bg-red-100 rounded-md border border-red-400 p-2.5">
      <p class="text-xl font-bold">${des ? des : "No description"}</p>
      <!-- price plane -->
      <style>
          #pricing p:first-child {
            color: green;
          }
          #pricing p:nth-child(2) {
              color: orange;
          }
          #pricing p:last-child {
              color: red;
          }
      </style>
      <div id="pricing" class="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-2 my-6">
        ${
          pricing
            ? pricing
                ?.map((prices) => {
                  const { plan, price } = prices;
                  return price
                    ? `
                      <p class="flex justify-center items-center bg-white text-center p-3 rounded-md text-xl">${price} ${
                        plan.toLowerCase() == "Enterprise".toLowerCase()
                          ? ""
                          : plan
                      }</p>`
                    : `<p class="flex justify-center items-center bg-white text-center p-3 rounded-md text-xl">Free of Cost/${plan}</p>`;
                })
                .join("")
            : `
                <p class="flex justify-center items-center bg-white text-center p-3 rounded-md text-xl">Free of Cost/ Basic</p>
                <p class="flex justify-center items-center bg-white text-center p-3 rounded-md text-xl">Free of Cost/ Pro</p>
                <p class="flex justify-center items-center bg-white text-center p-3 rounded-md text-xl">Free of Cost/ Enterprise</p>`
        }
      </div>
      <!-- feature -->
      <div class="grid grid-cols-1 sm:grid-cols-2  gap-5">
        <!-- feature -->
        <div>
          <p class="text-xl font-bold">Features</p>
            <ul class="py-3 pl-4 text-gray-500" style="list-style: disc;">
            ${
              showFeatures(features)
            }
            </ul>
        </div>
        <!-- integrations -->
        <div>
          <p class="text-xl font-bold">Integrations</p>
          <ul class="py-3 pl-4 text-gray-500" style="list-style: disc;">
            ${
              showIntegrations(integrations)
            }
          </ul>
        </div>
      </div>
    </div>
    <div class="rounded-md relative border p-4 hidden md:block">
      <div>
        ${image_link && `<img src="${image_link[0]}" class="w-full rounded-lg">` }
      </div>
      ${accuracy?.score ? `<p class="bg-red-500 absolute top-2 right-2 text-white rounded-md p-1">${accuracy?.score && accuracy?.score * 100 +'% accuracy'}</p>` : ''}
      
      <div class="mt-5 text-center">
          <p class="text-xl font-bold mb-2">${input_output_examples ? input_output_examples[0].input : 'Can you give any example?'}</p>
          <p>${input_output_examples ? input_output_examples[0].output : 'No! Not Yet! Take a break!!!'}</p>
      </div>
    </div>
  `;
};
// show feature
const showFeatures = (feature) => {
  let featureList = '';
  if(feature) {
    for (const key in feature) {
        const ele = feature[key] && feature[key]?.feature_name;
        featureList += `<li>${ele}</li>`;
    }
    return featureList;
  }
  return 'No feature found'
}

// show integrations
const showIntegrations = (integrations) => {
  let integrationList = '';
  if (integrations) {
    integrations.forEach(ele => {
      integrationList += `<li>${ele}</li>`;
    });
      return integrationList;
  }
  return 'No data Found';
}

const sortByDate = () => {
  data.forEach(tool => {
    tool.published_in = new Date(tool.published_in);
  });
  
  // Sort the array by published_in in ascending order
  data.sort((a, b) => a.published_in - b.published_in);
  if(processInfo) {
    processData();
  } else {
    processData(loadDataLen);
  }

}

loadAiData();
