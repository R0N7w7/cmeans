import { getCostFunction, getDistanceMatrix } from "./CMeans";

//Calcula la matriz de membresía dada una amtriz de distancia y el parametro de fuzzificación
export const getFuzzyMembershipMatrix = (distanceMatrix, fuzzyParameter) => {

    //Verifica que la matriz de distancias no esté vacía
    if (distanceMatrix.length == 0) {
        return [];
    }

    const membershipMatrix = []

    //Recorre cada elemento de la matriz
    for (let i = 0; i < distanceMatrix.length; i++) {
        const membershipRow = [];
        for (let j = 0; j < distanceMatrix[0].length; j++) {
            let clusterSum = 0;
            //Se vuelve a iterar por cada elemento k de la matriz
            for (let k = 0; k < distanceMatrix.length; k++) {
                if (distanceMatrix[k][j]!=0) {
                    clusterSum += Math.pow((distanceMatrix[i][j] / distanceMatrix[k][j]), 2 / (fuzzyParameter - 1));
                }
            }
            const membershipValue = clusterSum != 0 ? 1 / clusterSum : 1;
            membershipRow.push(membershipValue);
        }
        membershipMatrix.push(membershipRow);
    }
    return membershipMatrix;
}

//Calcula los nuevos centroides
export const getNewFuzzyCentroids = (points, membershipMatrix, fuzzyParameter) => {
    //Verifica que la matriz no esté vacía
    if (membershipMatrix.length == 0 || points.length == 0) {
        return [];
    }

    //Recorre y multiplica cada valor de pertenencia y mutiplica por las coordenadas x, y de cada putno
    const newCentroids = [];
    for (let i = 0; i < membershipMatrix.length; i++) {
        let membershipx = 0;
        let membershipy = 0;
        let membership = 0;
        for (let j = 0; j < membershipMatrix[0].length; j++) {
            const squareMembership = Math.pow(membershipMatrix[i][j], fuzzyParameter);
            membership += squareMembership;
            membershipx += squareMembership * points[j].x;
            membershipy += squareMembership * points[j].y;
        }
        const x = membershipx / membership;
        const y = membershipy / membership;

        newCentroids.push({ x, y });
    }
    return newCentroids;
}

//Calcula los costos de cada centroide
export const getFuzzyCostValues = (distanceMatrix, membershipMatrix, fuzzyParameter) => {
    if (distanceMatrix.length == 0 || membershipMatrix.length == 0) {
        return [];
    }
    const costValues = [];
    for (let i = 0; i < distanceMatrix.length; i++) {
        let costValue = 0;
        for (let j = 0; j < distanceMatrix[0].length; j++) {
            costValue += Math.pow(membershipMatrix[i][j], fuzzyParameter) * Math.pow(distanceMatrix[i][j], 2);
        }
        costValues.push(costValue);
    }
    return costValues;
}

export const fuzzyCMeans = (points, centroids) => {
    const distanceMatrix = getDistanceMatrix(points, centroids);
    const membershipMatrix = getFuzzyMembershipMatrix(distanceMatrix, 2);
    const newCentroids = getNewFuzzyCentroids(points, membershipMatrix, 2);
    const costValues = getFuzzyCostValues(distanceMatrix, membershipMatrix, 2);
    const costFunction = getCostFunction(costValues);

    return {
        distanceMatrix,
        membershipMatrix,
        newCentroids,
        costValues,
        costFunction,
    }
}