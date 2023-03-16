// select element
const toolContainerEl = document.getElementById("tools-container");

// load ai data
const loadAiData = async () => {
  const url = "https://openapi.programming-hero.com/api/ai/tools";
  const data = await loadApiData(url);
  processData(data.data.tools);
};

// process data
const processData = (data) => {
  toolContainerEl.innerHTML = "";
  data.forEach((toolInfo) => {
    displayAiData(toolInfo);
  });
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
          ${features ? features?.map((feature) => `<li>${feature}</li>`).join("") : 'No Feature found'}
        </ol>
        <hr class="w-11/12">
        <!-- technology information-->
        <div class="flex items-center justify-between pr-10 pt-4">
            <div>
                <h3 class="text-2xl font-bold">${name}</h3>
                <p class="flex items-center gap-2 text-gray-500 mt-1.5">
                    <i class="fa-regular fa-calendar-days"></i>
                    <span>${date ? date : 'No date found'}</span>
                </p>
            </div>
            <i onclick="showDetails(${id})" class="fa-solid fa-arrow-right text-red-500 bg-red-100 p-4 rounded-full" style="cursor: pointer;"></i>
        </div>
    </div>
    `;
  toolContainerEl.appendChild(toolInfo);
};

const showDetails = (id) => {
  console.log(id);
};

loadAiData();
