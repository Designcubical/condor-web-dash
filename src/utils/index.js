// import { findIndex } from 'lodash'

export  const apiToLineGraph2 = (data) => {
    let lineGraphData = [];
    if(!data)
        return lineGraphData;

    data.forEach((item, i) => {
        const type = item.staffSystem[0];
        let data = [];

        type.groups.forEach((groupItem, index) => {
            data.push({
                "x": index,
                "y": groupItem.incl
            })
        });

        lineGraphData.push({
            "id": type.name + i,
            data
        })
    });

    console.warn(lineGraphData);
    return lineGraphData;
}

export  const apiToLineGraph = (data) => {
    let lineGraphData = [];
    if(!data)
        return lineGraphData;

    data.forEach((item, i) => {
        const type = item.staffSystem[0];
        let data = [];

        type.groups.forEach((groupItem, index) => {
            data.push({
                "x": index,
                "y": groupItem.incl
            })
        });

        lineGraphData.push({
            "id": type.name + i,
            data
        })
    });

    console.warn(lineGraphData);
    return lineGraphData;
}