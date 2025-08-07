document.addEventListener('DOMContentLoaded', domReady);

function domReady() {
    // Initialize render comparison sliders
    const renderSliders = document.querySelectorAll('.render-comparison .b-dics');
    renderSliders.forEach((slider, index) => {
        new Dics({
            container: slider,
            hideTexts: false,
            textPosition: "bottom"
        });
    });
}

function renderComparisonEvent(datasetType, sceneIdx) {
    let dics = document.querySelector(`.render-comparison-${datasetType} .b-dics`);
    let sections = dics.getElementsByClassName('b-dics__section');
    let imagesLength = sections.length;
    
    // Define the datasets and scenes
    const datasets = {
        'replica': ['room0', 'room1', 'room2', 'office0', 'office1', 'office2', 'office3', 'office4'],
        'tum': ['desk', 'desk2', 'room', 'xyz', 'fr3'],
        'scannet': ['000', '059', '106', '169', '181', '207']
    };
    
    const methods = ['baseline', 'nice_slam', 'coslam', 'eags_slam', 'ground_truth'];
    
    // Update images
    for (let i = 0; i < imagesLength; i++) {
        let image = sections[i].getElementsByClassName('b-dics__image-container')[0].getElementsByClassName('b-dics__image')[0];
        let sceneName = datasets[datasetType][sceneIdx];
        let methodName = methods[i];
        
        image.src = `images/render/${datasetType}/${sceneName}/${methodName}.png`;
    }

    // Update active navigation
    let scene_list = document.getElementById(`render-${datasetType}-nav`).children;
    for (let i = 0; i < scene_list.length; i++) {
        if (sceneIdx === i) {
            scene_list[i].children[0].className = "nav-link active";
        } else {
            scene_list[i].children[0].className = "nav-link";
        }
    }
}
