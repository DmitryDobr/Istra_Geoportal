

function initLayerControlGroup(groupName, layers) {
    // 0 - name
    // 1 - layer

    var x = document.getElementById("LayerControlBox");
    // x.innerHTML = "";

    let div1 = document.createElement('div');
    div1.innerHTML = groupName;
    div1.className = "LayerControlGroupName";
    // x.append(div1);

    let div2 = document.createElement('div');
    div2.className = "LayerControlGroup";

    for (var layer of layers)
    {
        let layerName = layer[0]
        let basemap = layer[1]

        let div = document.createElement('div');
        div.className = "LayerControlElem";

        let checkbox = document.createElement('input');
        checkbox.type ='checkbox'; 
        checkbox.checked = true;
        checkbox.className = "MapLayerCheckbox";

        div.append(checkbox);
        div.append(layerName);

        checkbox.addEventListener("click", () => {basemap.setVisible(!basemap.isVisible())});

        div2.prepend(div)
    }
    div2.prepend(div1)

    x.prepend(div2)
}

export default initLayerControlGroup