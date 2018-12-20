export function createGeoJsonPolys(data) {
  const newArray = data.map((item) => {
    return {
      "id": item.id,
      "properties": item.attributes,
      "geometry": item.attributes.boundary
    }
  })
  const featureCollection = {
    "id": "farms",
    "type": "FeatureCollection",
    "boundingBox": [-115.996822, 25.589321, -71.372368, 55.571981],
    "features": newArray
  }
  return featureCollection;
}
export function createGeoJsonPoints(data) {
  const newArray = data.map((item) => {
    return {
      "id": item.id,
      "properties": item.attributes,
      "geometry": item.attributes.centroid
    }
  })
  const featureCollection = {
    "id": "farms",
    "type": "FeatureCollection",
    "features": newArray
  }
  return featureCollection;
}

export function getDistrictList(id) {
  const regionObject = {
    0: 
      [
        { value: '0', label: 'CPS - Northwest' }
      ],
    1: 
      [
        { value: '1', label: 'CPS - Nebraska' },
        { value: '2', label: 'CPS - Northern IL/Wisconsin' },
        { value: '3', label: 'CPS - Southern Illinois' },
        { value: '4', label: 'CPS - Eastern Illinois' }
      ],
    2: 
      [
        { value: '5', label: 'CPS - Coastal Plains' },
        { value: '6', label: 'CPS - Mid-South' },
        { value: '7', label: 'CPS - Mississippi' },
        { value: '8', label: 'CPS - South Plains' },
        { value: '9', label: 'CPS - Florida' },
        { value: '10', label: 'CPS - Alabama' },
        { value: '11', label: 'CPS - South Delta' }
      ],
    3: 
      [
        { value: '5', label: 'Nutrien Central Valley' },
        { value: '6', label: 'Nutrien North Valley' },
        { value: '7', label: 'Nutrien Coastal' },
        { value: '8', label: 'Nutrien Precision Agri Labs' },
        { value: '9', label: 'Nutrien Southwest' },
        { value: '10', label: 'Nutrien Snake River' },
        { value: '11', label: 'Nutrien Northwest' }
      ],
    4: 
      [
        { value: '5', label: 'Nutrien Northeast Iowa' },
        { value: '6', label: 'Nutrien Central Iowa' },
        { value: '7', label: 'Nutrien Southeast Iowa' },
        { value: '8', label: 'Nutrien W Iowa & NE Nebraska' },
        { value: '9', label: 'Nutrien North Dakota/NE MT/NW MN' }
      ],
    5: 
      [
        { value: '5', label: 'CPS - Southwest Indiana/Northern Kentucky' },
        { value: '6', label: 'CPS - Central Indiana' },
        { value: '7', label: 'CPS - Michigan' }
      ],
    6: 
      [
        { value: '5', label: 'Nutrien Mid-South' },
        { value: '6', label: 'Nutrien Mid North Carolina/Virginia' },
        { value: '7', label: 'Nutrien Coastal Plains' },
        { value: '8', label: 'Nutrien South Carolina/Western NC' },
        { value: '9', label: 'Nutrien Alabama' },
        { value: '9', label: 'Nutrien Georgia' },
        { value: '9', label: 'Nutrien South Plains' },
        { value: '9', label: 'Nutrien Mississippi' },
        { value: '9', label: 'Nutrien South Delta' }
      ],
    7:
      [
        { value: '5', label: 'Nutrien Southern Ohio' },
        { value: '6', label: 'Nutrien Michigan' },
        { value: '7', label: 'Nutrien Northern Ohio' },
        { value: '8', label: 'Nutrien Colonial' },
        { value: '9', label: 'Nutrien Central Indiana' },
        { value: '9', label: 'Nutrien Eastern Kentucky' },
        { value: '9', label: 'Nutrien Southwest Indiana/Northern Kentucky' },
        { value: '9', label: 'Nutrien Northeast' },
        { value: '9', label: 'Northern IL/Wisconsin' }
      ],
    8:
      [
        { value: '5', label: 'Nutrien Eastern Illinois' },
        { value: '6', label: 'Nutrien Western Illinois' },
        { value: '7', label: 'Nutrien West Central Illinois' },
        { value: '8', label: 'Nutrien Southern Illinois' },
        { value: '9', label: 'Nutrien Northern High Plains' },
        { value: '9', label: 'Nutrien Southern High Plains' },
        { value: '9', label: 'Nutrien Southwest Indiana/Northern Kentucky' },
        { value: '9', label: 'Nutrien Northeast' },
        { value: '9', label: 'Nutrien Tennessee/W KY Division ' }
      ],
    9: 
      [
        { value: '5', label: 'CPS - Northeast Iowa' },
        { value: '6', label: 'CPS - W Iowa & NE Nebraska' },
        { value: '7', label: 'CPS - Minnesota/South Dakota' },
        { value: '8', label: 'CPS - Southeast Iowa' },
        { value: '9', label: 'CPS - Central Iowa' }
      ],
  }
  return regionObject[id];
}